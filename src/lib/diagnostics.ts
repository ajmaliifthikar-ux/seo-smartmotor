import { adminDb } from './firebase-admin'
import { Timestamp } from "firebase-admin/firestore"

export type ServiceName = 'Firebase' | 'Gemini' | 'Redis' | 'Resend' | 'GoogleBusiness'

export interface TraceParams {
    service: ServiceName
    operation: string
    metadata?: any
}

export async function traceIntegration<T>(
    params: TraceParams,
    fn: () => Promise<T>
): Promise<T> {
    const start = Date.now()
    try {
        const result = await fn()
        const duration = Date.now() - start
        
        logTrace({ ...params, status: 'SUCCESS', duration }).catch(() => {})
        return result
    } catch (error: any) {
        const duration = Date.now() - start
        await logTrace({ ...params, status: 'FAILURE', duration, error: error.message || String(error) }).catch(() => {})
        throw error
    }
}

async function logTrace(data: any) {
    if (!adminDb) return
    try {
        await adminDb.collection('integrationTraces').add({
            ...data,
            timestamp: Timestamp.now()
        })
    } catch (e) {}
}

export async function runSystemDiagnostics() {
    const results: any[] = []

    // 1. Firestore Check
    const fsStart = Date.now()
    try {
        if (!adminDb) throw new Error('Database not initialized')
        await adminDb.collection('test').limit(1).get()
        results.push({ service: 'Firebase', status: 'WORKING', duration: Date.now() - fsStart })
    } catch (e: any) {
        results.push({ service: 'Firebase', status: 'FAILED', error: e.message })
    }

    // 2. Redis Check
    const redisStart = Date.now()
    try {
        const { default: redis } = await import('./redis')
        await redis.ping()
        results.push({ service: 'Redis', status: 'WORKING', duration: Date.now() - redisStart })
    } catch (e: any) {
        results.push({ service: 'Redis', status: 'FAILED', error: e.message })
    }

    // 3. Gemini Check
    const geminiStart = Date.now()
    try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai')
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
        await model.generateContent('ping')
        results.push({ service: 'Gemini', status: 'WORKING', duration: Date.now() - geminiStart })
    } catch (e: any) {
        results.push({ service: 'Gemini', status: 'FAILED', error: e.message })
    }

    return results
}
