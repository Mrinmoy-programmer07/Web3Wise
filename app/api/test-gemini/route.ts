import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const API_KEY = 'AIzaSyANH2lz8URi3OqdnEZaEQlvpmQ3Ub2bvL8'
    
    if (!API_KEY) {
      return NextResponse.json({ error: 'No API key provided' }, { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Simple test prompt
    const result = await model.generateContent('Say "Hello, Gemini API is working!"')
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      success: true,
      message: text,
      apiKeyLength: API_KEY.length
    })

  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json({
      error: 'API test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 