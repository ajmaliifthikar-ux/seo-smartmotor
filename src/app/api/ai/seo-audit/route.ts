import { NextResponse } from 'next/server'
import { performTechnicalAudit } from '@/lib/ai/seo-agent'

export async function POST(req: Request) {
  try {
    const { url = 'https://smartmotor.ae' } = await req.json()
    const audit = await performTechnicalAudit(url)

    return NextResponse.json({
      ...audit,
      metadata: {
        agent: 'Technical SEO Auditor (Gemini 2.0)',
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Audit failed' }, { status: 500 })
  }
}
