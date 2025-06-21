import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Initialize Gemini AI with the provided API key
const API_KEY = 'AIzaSyANH2lz8URi3OqdnEZaEQlvpmQ3Ub2bvL8'
const genAI = new GoogleGenerativeAI(API_KEY)

// Database file path
const DB_PATH = path.join(process.cwd(), 'data', 'consultants.json')

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(DB_PATH)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Load consultants from database
async function loadConsultants() {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, return empty array
    return []
  }
}

// Save consultants to database
async function saveConsultants(consultants: any[]) {
  await ensureDataDirectory()
  await fs.writeFile(DB_PATH, JSON.stringify(consultants, null, 2))
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export async function POST(request: NextRequest) {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      expertise, 
      experience, 
      hourlyRate, 
      location, 
      languages, 
      specialties, 
      description, 
      linkedinUrl, 
      githubUrl,
      portfolioUrl 
    } = await request.json()

    // Validate required fields
    if (!fullName || !email || !expertise || !experience || !hourlyRate || !location) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 })
    }

    // Load existing consultants
    const consultants = await loadConsultants()

    // Check if email already exists
    const existingConsultant = consultants.find(c => c.email === email)
    if (existingConsultant) {
      return NextResponse.json({ 
        error: 'A consultant with this email already exists' 
      }, { status: 400 })
    }

    // Use Gemini API to validate and enhance the consultant profile
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const validationPrompt = `
You are a Web3 consultant validation expert. Please analyze the following consultant application and provide validation results.

Consultant Details:
- Name: ${fullName}
- Email: ${email}
- Expertise: ${expertise}
- Experience: ${experience}
- Hourly Rate: ${hourlyRate}
- Location: ${location}
- Languages: ${languages?.join(', ') || 'Not specified'}
- Specialties: ${specialties?.join(', ') || 'Not specified'}
- Description: ${description || 'Not provided'}
- LinkedIn: ${linkedinUrl || 'Not provided'}
- GitHub: ${githubUrl || 'Not provided'}
- Portfolio: ${portfolioUrl || 'Not provided'}

Please provide your analysis in the following JSON format:
{
  "isApproved": boolean,
  "confidence": "HIGH|MEDIUM|LOW",
  "rating": number (1-5),
  "verificationStatus": "VERIFIED|PENDING|REJECTED",
  "expertiseLevel": "BEGINNER|INTERMEDIATE|EXPERT",
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "validationNotes": "Detailed validation notes",
  "suggestedSpecialties": ["Specialty 1", "Specialty 2"],
  "profileEnhancement": "Suggestions for profile improvement"
}

Focus on:
1. Web3 expertise validation
2. Experience level assessment
3. Profile completeness
4. Professional credibility
5. Rate appropriateness
6. Specialization relevance

Be thorough in your analysis and provide specific feedback for improvement.
`

    const result = await model.generateContent(validationPrompt)
    const response = await result.response
    const text = response.text()

    let validationResult
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        validationResult = JSON.parse(jsonMatch[0])
      } else {
        validationResult = {
          isApproved: true,
          confidence: "MEDIUM",
          rating: 4.0,
          verificationStatus: "PENDING",
          expertiseLevel: "INTERMEDIATE",
          recommendations: ["Complete your profile with more details"],
          validationNotes: "Profile submitted successfully",
          suggestedSpecialties: specialties || [],
          profileEnhancement: "Add more details about your Web3 experience"
        }
      }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError)
      validationResult = {
        isApproved: true,
        confidence: "MEDIUM",
        rating: 4.0,
        verificationStatus: "PENDING",
        expertiseLevel: "INTERMEDIATE",
        recommendations: ["Complete your profile with more details"],
        validationNotes: "Profile submitted successfully",
        suggestedSpecialties: specialties || [],
        profileEnhancement: "Add more details about your Web3 experience"
      }
    }

    // Create consultant profile
    const consultantId = generateId()
    const consultant = {
      id: consultantId,
      fullName,
      email,
      phone,
      expertise,
      experience,
      hourlyRate,
      location,
      languages: languages || [],
      specialties: specialties || [],
      description,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      rating: validationResult.rating,
      sessions: 0,
      verified: validationResult.verificationStatus === "VERIFIED",
      expertiseLevel: validationResult.expertiseLevel,
      confidence: validationResult.confidence,
      isApproved: validationResult.isApproved,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatar: `/placeholder.svg?height=200&width=200`,
      color: consultants.length % 2 === 0 ? "#A855F7" : "#8B5CF6",
      status: "ACTIVE"
    }

    // Add to consultants array
    consultants.push(consultant)

    // Save to database
    await saveConsultants(consultants)

    return NextResponse.json({
      success: true,
      consultant,
      validation: validationResult,
      message: validationResult.isApproved 
        ? "Consultant profile created successfully!" 
        : "Profile submitted for review"
    })

  } catch (error) {
    console.error('Error in consultant registration:', error)
    return NextResponse.json(
      { error: 'Failed to register consultant' }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const consultants = await loadConsultants()
    return NextResponse.json({
      consultants: consultants.filter(c => c.isApproved && c.status === "ACTIVE")
    })
  } catch (error) {
    console.error('Error fetching consultants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consultants' }, 
      { status: 500 }
    )
  }
}

// Update consultant profile
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'Consultant ID is required' }, { status: 400 })
    }

    const consultants = await loadConsultants()
    const consultantIndex = consultants.findIndex(c => c.id === id)
    
    if (consultantIndex === -1) {
      return NextResponse.json({ error: 'Consultant not found' }, { status: 404 })
    }

    // Update consultant data
    consultants[consultantIndex] = {
      ...consultants[consultantIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    }

    await saveConsultants(consultants)

    return NextResponse.json({
      success: true,
      consultant: consultants[consultantIndex],
      message: "Consultant profile updated successfully!"
    })

  } catch (error) {
    console.error('Error updating consultant:', error)
    return NextResponse.json(
      { error: 'Failed to update consultant' }, 
      { status: 500 }
    )
  }
}

// Delete consultant (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Consultant ID is required' }, { status: 400 })
    }

    const consultants = await loadConsultants()
    const consultantIndex = consultants.findIndex(c => c.id === id)
    
    if (consultantIndex === -1) {
      return NextResponse.json({ error: 'Consultant not found' }, { status: 404 })
    }

    // Soft delete - mark as inactive
    consultants[consultantIndex].status = "INACTIVE"
    consultants[consultantIndex].updatedAt = new Date().toISOString()

    await saveConsultants(consultants)

    return NextResponse.json({
      success: true,
      message: "Consultant profile deactivated successfully!"
    })

  } catch (error) {
    console.error('Error deleting consultant:', error)
    return NextResponse.json(
      { error: 'Failed to delete consultant' }, 
      { status: 500 }
    )
  }
} 