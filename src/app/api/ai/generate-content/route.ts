import { NextResponse } from 'next/server'
import { generateSocialPost } from '@/lib/ai/synthesis'

export async function POST(req: Request) {
  try {
    const { type, prompt, platform, tone } = await req.json()
    
    if (type === 'social') {
      const result = await generateSocialPost({ prompt, platform, tone })
      return NextResponse.json(result)
    }

    return NextResponse.json({ error: 'Invalid generation type' }, { status: 400 })
  } catch (error) {
    console.error('Generation Error:', error)
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 })
  }
}
