import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Gemini AI
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyANH2lz8URi3OqdnEZaEQlvpmQ3Ub2bvL8'
const genAI = new GoogleGenerativeAI(API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { moveCode } = await request.json()

    if (!moveCode) {
      return NextResponse.json({ error: 'Move contract code is required' }, { status: 400 })
    }

    if (!API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables')
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 })
    }

    // Create a model instance
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Create a comprehensive prompt for Move contract validation
    const prompt = `
You are an expert Move language smart contract validator. Analyze this Move contract:

\`\`\`move
${moveCode}
\`\`\`

Provide analysis in this JSON format:
{
  "overallStatus": "PASSED|WARNING|FAILED",
  "summary": "Brief summary",
  "lineCount": number,
  "issues": [
    {
      "type": "ERROR|WARNING|INFO",
      "severity": "CRITICAL|HIGH|MEDIUM|LOW",
      "line": number,
      "title": "Issue title",
      "description": "Description",
      "suggestion": "How to fix"
    }
  ],
  "securityChecks": [
    {
      "check": "Check name",
      "status": "PASSED|FAILED|WARNING",
      "description": "Description"
    }
  ],
  "bestPractices": [
    {
      "practice": "Practice name",
      "status": "FOLLOWED|NOT_FOLLOWED",
      "description": "Description"
    }
  ],
  "gasOptimization": {
    "status": "OPTIMIZED|NEEDS_IMPROVEMENT",
    "suggestions": ["Suggestion 1", "Suggestion 2"]
  },
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}

Check for: syntax errors, security vulnerabilities, best practices, gas optimization.
`

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Try to parse the JSON response
    let parsedResponse
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        // If no JSON found, create a structured response
        parsedResponse = {
          overallStatus: "ERROR",
          summary: "Failed to parse validation results",
          lineCount: moveCode.split('\n').length,
          issues: [{
            type: "ERROR",
            severity: "CRITICAL",
            line: 1,
            title: "Validation Error",
            description: "Unable to parse validation results",
            suggestion: "Please try again"
          }],
          securityChecks: [],
          bestPractices: [],
          gasOptimization: { status: "UNKNOWN", suggestions: [] },
          recommendations: ["Try again or check code format"]
        }
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError)
      parsedResponse = {
        overallStatus: "ERROR",
        summary: "Failed to parse validation results",
        lineCount: moveCode.split('\n').length,
        issues: [{
          type: "ERROR",
          severity: "CRITICAL",
          line: 1,
          title: "Parsing Error",
          description: "Failed to parse AI response",
          suggestion: "Please try again"
        }],
        securityChecks: [],
        bestPractices: [],
        gasOptimization: { status: "UNKNOWN", suggestions: [] },
        recommendations: ["Try again", "Contact support if issue persists"]
      }
    }

    return NextResponse.json(parsedResponse)

  } catch (error) {
    console.error('Error in Move validation:', error)
    return NextResponse.json(
      { 
        error: 'Failed to validate Move contract',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
} 