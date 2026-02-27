import { adminDb } from "@/lib/firebase-admin"
import redis from "@/lib/redis"
import { Timestamp } from "firebase-admin/firestore"

const RATE_LIMIT_PREFIX = "rate_limit:"
const REDIS_TIMEOUT_MS = 200

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    let timeoutId: ReturnType<typeof setTimeout>;
    const timeoutPromise = new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(`Redis operation timed out after ${ms}ms`)), ms);
    });

    try {
        const result = await Promise.race([promise, timeoutPromise]);
        clearTimeout(timeoutId!);
        return result;
    } catch (error) {
        clearTimeout(timeoutId!);
        throw error;
    }
}

export async function checkRateLimit(
    userId: string,
    action: string,
    limit: number = 10,
    windowSeconds: number = 3600
): Promise<boolean> {
    const key = `${RATE_LIMIT_PREFIX}${userId}:${action}`
    const now = Date.now()
    const windowStart = now - windowSeconds * 1000

    try {
        const exists = await withTimeout(redis.exists(key), REDIS_TIMEOUT_MS)

        if (!exists) {
            // Hydrate from Firestore
            if (!adminDb) throw new Error("Firestore Admin not initialized for rate limit hydration")
            
            const snapshot = await adminDb.collection('aiUsageLogs')
                .where('userId', '==', userId)
                .where('action', '==', action)
                .where('createdAt', '>=', Timestamp.fromMillis(windowStart))
                .get()

            const pipeline = redis.pipeline()
            if (!snapshot.empty) {
                snapshot.docs.forEach((doc, index) => {
                    const time = (doc.data().createdAt as Timestamp).toMillis()
                    pipeline.zadd(key, time, `${time}-${index}`)
                })
            } else {
                pipeline.zadd(key, 0, "INIT")
            }
            pipeline.expire(key, windowSeconds)
            await withTimeout(pipeline.exec(), REDIS_TIMEOUT_MS)
        }

        const pipeline = redis.pipeline()
        pipeline.zremrangebyscore(key, 1, windowStart - 1)
        pipeline.zcount(key, windowStart, "+inf")
        pipeline.expire(key, windowSeconds)

        const results = await withTimeout(pipeline.exec(), REDIS_TIMEOUT_MS)
        if (!results) throw new Error("Redis pipeline returned no results")
        if (results[1][0]) throw results[1][0] // Propagate specific error

        const count = results[1][1] as number
        return count < limit

    } catch (error) {
        console.error("Rate limit fallback to Firestore:", error)
        try {
            if (!adminDb) return true // Fail open if no DB
            const snapshot = await adminDb.collection('aiUsageLogs')
                .where('userId', '==', userId)
                .where('action', '==', action)
                .where('createdAt', '>=', Timestamp.fromMillis(windowStart))
                .count()
                .get()
            return snapshot.data().count < limit
        } catch (dbError) {
            return true // Fail open
        }
    }
}

export async function incrementRateLimit(
    userId: string,
    action: string,
    windowSeconds: number = 3600
): Promise<void> {
    const key = `${RATE_LIMIT_PREFIX}${userId}:${action}`
    const now = Date.now()
    const member = `${now}-${Math.random().toString(36).substring(7)}`

    try {
        await withTimeout(
            redis.pipeline().zadd(key, now, member).expire(key, windowSeconds).exec(),
            REDIS_TIMEOUT_MS
        )
    } catch (e) {}
}
