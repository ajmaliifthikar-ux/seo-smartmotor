import { GoogleGenerativeAI } from '@google/generative-ai'
import { adminDb } from '@/lib/firebase-admin'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Helper for admin notifications
async function sendAdminNotification(subject: string, message: string) {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/notifications/send`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-notification-key': process.env.NOTIFICATION_SECRET || ''
            },
            body: JSON.stringify({ event: 'custom', subject, message })
        })
    } catch (e) {
        console.error('Failed to send admin notification:', e)
    }
}

/**
 * Drafts a professional response to a customer review.
 */
export async function draftReviewResponse(review: string, rating: number): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  
  const prompt = `
    You are Leyla, the Customer Concierge for Smart Motor, Abu Dhabi.
    Task: Draft a warm, professional response to the following customer review.
    
    Review: "${review}"
    Rating: ${rating} Stars
    
    Tone: Warm, enthusiastic, and empathetic. 
    Context: We are an elite car repair center. 
    Incentive: If the rating is low, offer a direct contact line. If high, express genuine gratitude.
    Use car emojis sparingly.
  `

  try {
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error('Review drafting error:', error)
    return "Thank you for your feedback. We value your business."
  }
}

/**
 * Real-time monitoring of Google Business Profile and reviews.
 * This function is designed to be called by a webhook or cron.
 */
export async function monitorLocalReviews() {
  // In a real implementation, we would call the Google Business Profile API here.
  // For this track, we simulate the detection of a new low-rating review.
  
  const newReview = {
    reviewer: 'John Doe',
    rating: 2,
    comment: 'The service was slow today.',
    source: 'Google Business Profile',
    timestamp: new Date().toISOString()
  }

  if (newReview.rating <= 3) {
    // 1. Log to Firestore
    if (adminDb) {
      await adminDb.collection('localSeoAlerts').add({
        type: 'LOW_RATING_REVIEW',
        data: newReview,
        status: 'pending_action',
        createdAt: new Date()
      })
    }

    // 2. Trigger Admin Notification
    await sendAdminNotification(
      '⚠️ Urgent: New Low Rating Review Detected',
      `Reviewer: ${newReview.reviewer}\nRating: ${newReview.rating} Stars\nComment: ${newReview.comment}\nSource: ${newReview.source}`
    )

    return { alerted: true, review: newReview }
  }

  return { alerted: false }
}
