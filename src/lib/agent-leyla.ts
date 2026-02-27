/**
 * Leyla Agent Personality Engine (Optimized with Swarm Orchestration)
 * Handles conversation and tool execution via Gemini API
 */

import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import { ConversationState } from './leyla-conversation-state'
import { calendarTools } from './tools/calendar-tools'
import { createBooking } from './db/bookings'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

/**
 * Interface for Leyla's structured response.
 */
export interface LeylaResponse {
  /** The text message to display/speak to the user. */
  message: string
  /** The intended next action for the UI. */
  action?: 'continue' | 'verify' | 'book' | 'complete'
  /** Optional hint for the next step. */
  suggestedNext?: string
  /** Optional phonetic representation for verification. */
  phonetics?: string
}

/**
 * Generates a response from Leyla using Gemini AI.
 * Handles function calling for availability checks and bookings.
 * 
 * @param userMessage - The message from the user.
 * @param conversationState - The current state of the conversation.
 * @param messageHistory - The chat history for context.
 * @returns A structured response object.
 */
export async function generateLeylaResponse(
  userMessage: string,
  conversationState: ConversationState,
  messageHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<LeylaResponse> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash', // Standardizing on flash for speed in voice mode
      tools: [
        {
          functionDeclarations: [
            {
              name: "checkAvailability",
              description: "Check available appointment slots for a specific date (YYYY-MM-DD).",
              parameters: {
                type: SchemaType.OBJECT,
                properties: { date: { type: SchemaType.STRING } },
                required: ["date"]
              }
            },
            {
              name: "bookAppointment",
              description: "Creates a new car service booking in the database.",
              parameters: {
                type: SchemaType.OBJECT,
                properties: {
                  serviceId: { type: SchemaType.STRING },
                  date: { type: SchemaType.STRING, description: "YYYY-MM-DD" },
                  slot: { type: SchemaType.STRING, description: "HH:00" },
                  notes: { type: SchemaType.STRING }
                },
                required: ["serviceId", "date", "slot"]
              }
            }
          ]
        }
      ]
    })

    const chat = model.startChat({
      history: messageHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      generationConfig: { maxOutputTokens: 200, temperature: 0.7 }
    })

    const result = await chat.sendMessage(userMessage)
    let response = result.response
    const calls = response.functionCalls()

    if (calls && calls.length > 0) {
      const call = calls[0]
      let toolResult: Record<string, unknown>

      if (call.name === 'checkAvailability') {
        const { date } = call.args as { date: string }
        const availability = await calendarTools.checkAvailability(date)
        toolResult = { slots: availability }
      } else if (call.name === 'bookAppointment') {
        const args = call.args as { serviceId: string, date: string, slot: string, notes?: string }
        try {
          const booking = await createBooking({
            serviceId: args.serviceId,
            date: new Date(args.date),
            slot: args.slot,
            notes: args.notes,
            userId: conversationState.collectedData.userId || undefined,
            guestName: conversationState.collectedData.name,
            guestEmail: conversationState.collectedData.email,
            guestPhone: conversationState.collectedData.phone,
            vehicleBrand: conversationState.collectedData.carBrand,
            vehicleModel: conversationState.collectedData.carModel,
            status: 'PENDING'
          })
          toolResult = { success: true, bookingId: (booking as { id: string }).id }
        } catch (e: unknown) {
          const error = e as Error
          toolResult = { success: false, error: error.message }
        }
      } else {
        toolResult = { error: 'Unknown function' }
      }

      const nextResult = await chat.sendMessage([{ functionResponse: { name: call.name, response: toolResult } }])
      response = nextResult.response
    }

    return {
      message: response.text(),
      action: conversationState.phase === 'complete' ? 'complete' : 'continue',
    }
  } catch (error) {
    console.error('Leyla Error:', error)
    return { message: "I'm having a slight engine trouble! Can you try again, habibi? 🚗" }
  }
}

