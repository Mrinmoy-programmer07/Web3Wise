import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Debug: Log environment variable status
console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY)
console.log('GEMINI_API_KEY length:', process.env.GEMINI_API_KEY?.length || 0)

// Initialize Gemini AI with hardcoded key for testing
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyANH2lz8URi3OqdnEZaEQlvpmQ3Ub2bvL8'
const genAI = new GoogleGenerativeAI(API_KEY)

// Search arXiv for real papers
const searchArxiv = async (query: string) => {
  try {
    // Clean and format the search query for arXiv
    const cleanQuery = query.replace(/[^\w\s]/g, '').trim()
    const searchTerms = cleanQuery.split(' ').filter(term => term.length > 2).join('+AND+')
    
    // Use different search strategies for better results
    const searchQueries = [
      `all:${searchTerms}`,
      `ti:${searchTerms}`,
      `abs:${searchTerms}`,
      `cat:cs.CR+AND+all:${searchTerms}`, // Computer Science Cryptography
      `cat:cs.DC+AND+all:${searchTerms}`, // Distributed Computing
      `cat:cs.AI+AND+all:${searchTerms}`  // Artificial Intelligence
    ]
    
    let allPapers = []
    
    for (const searchQuery of searchQueries) {
      const url = `https://export.arxiv.org/api/query?search_query=${searchQuery}&start=0&max_results=10&sortBy=relevance&sortOrder=descending`
      
      console.log('Searching arXiv with query:', searchQuery)
      
      const response = await fetch(url)
      const xmlText = await response.text()
      
      // Parse XML response
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlText, "text/xml")
      const entries = xmlDoc.getElementsByTagName("entry")
      
      console.log(`Found ${entries.length} entries for query: ${searchQuery}`)
      
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        const id = entry.getElementsByTagName("id")[0]?.textContent || ""
        const title = entry.getElementsByTagName("title")[0]?.textContent?.replace(/\s+/g, ' ').trim() || ""
        const summary = entry.getElementsByTagName("summary")[0]?.textContent?.replace(/\s+/g, ' ').trim() || ""
        const published = entry.getElementsByTagName("published")[0]?.textContent || ""
        const authors = Array.from(entry.getElementsByTagName("author")).map(author => 
          author.getElementsByTagName("name")[0]?.textContent || ""
        ).filter(name => name.length > 0)
        
        // Extract arXiv ID from URL
        const arxivId = id.split('/').pop() || ""
        
        // Skip if no valid ID or if paper already exists
        if (!arxivId || allPapers.some(p => p.id === arxivId)) continue
        
        const pdfUrl = `https://arxiv.org/pdf/${arxivId}.pdf`
        const abstractUrl = `https://arxiv.org/abs/${arxivId}`
        
        allPapers.push({
          id: arxivId,
          title,
          authors: authors.join(', '),
          abstract: summary.substring(0, 200) + (summary.length > 200 ? "..." : ""),
          pdfUrl,
          abstractUrl,
          publishedDate: new Date(published).toLocaleDateString(),
          source: 'arXiv',
          sourceUrl: abstractUrl
        })
      }
      
      // If we have enough papers, break
      if (allPapers.length >= 8) break
    }
    
    // Sort by relevance (newer papers first) and take top 6
    allPapers.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    allPapers = allPapers.slice(0, 6)
    
    console.log(`Total unique papers found: ${allPapers.length}`)
    return allPapers
    
  } catch (error) {
    console.error('Error searching arXiv:', error)
    return []
  }
}

// Search Semantic Scholar for additional papers
const searchSemanticScholar = async (query: string) => {
  try {
    const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=5&fields=title,authors,abstract,url,year,publicationDate,paperId`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (!data.data) return []
    
    return data.data.map((paper: any) => ({
      id: paper.paperId,
      title: paper.title,
      authors: paper.authors?.map((author: any) => author.name).join(', ') || 'Unknown',
      abstract: paper.abstract?.substring(0, 200) + (paper.abstract?.length > 200 ? "..." : "") || 'No abstract available',
      pdfUrl: paper.url || '#',
      abstractUrl: paper.url || '#',
      publishedDate: paper.year ? paper.year.toString() : 'Unknown',
      source: 'Semantic Scholar',
      sourceUrl: paper.url || '#'
    }))
  } catch (error) {
    console.error('Error searching Semantic Scholar:', error)
    return []
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, category } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    if (!API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables')
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 })
    }

    console.log('Searching for query:', query)

    // Search for real papers from multiple sources
    const [arxivPapers, semanticPapers] = await Promise.all([
      searchArxiv(query),
      searchSemanticScholar(query)
    ])
    
    // Combine and deduplicate papers
    const allPapers = [...arxivPapers, ...semanticPapers]
    const uniquePapers = allPapers.filter((paper, index, self) => 
      index === self.findIndex(p => p.title === paper.title)
    )
    
    console.log(`Total papers found: ${uniquePapers.length} (arXiv: ${arxivPapers.length}, Semantic Scholar: ${semanticPapers.length})`)

    // Create a model instance
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Create a comprehensive prompt for web search
    const prompt = `
You are a Web3 research assistant. Please provide comprehensive, up-to-date information about: "${query}"

Please structure your response as a JSON object with the following format:
{
  "title": "A clear, descriptive title",
  "summary": "A 2-3 sentence summary of the topic",
  "keyPoints": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
  "currentTrends": "Current trends and developments in this area",
  "technicalDetails": "Technical aspects and implementation details",
  "useCases": ["Use case 1", "Use case 2", "Use case 3"],
  "challenges": "Current challenges and limitations",
  "futureOutlook": "Future developments and predictions",
  "resources": ["Resource 1", "Resource 2", "Resource 3"],
  "relatedTopics": ["Related topic 1", "Related topic 2", "Related topic 3"],
  "lastUpdated": "Current date",
  "confidence": "High/Medium/Low based on available information"
}

Focus on:
- Web3, blockchain, DeFi, NFTs, and related technologies
- Current market trends and developments
- Practical applications and use cases
- Technical implementation details
- Recent news and updates
- Expert insights and analysis

Make sure the information is accurate, up-to-date, and relevant to the Web3 ecosystem. If the topic is not directly related to Web3, explain how it connects to or impacts the Web3 space.
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
          title: query,
          summary: text.substring(0, 200) + "...",
          keyPoints: [text.substring(0, 100) + "...", "More information available"],
          currentTrends: "Current trends information",
          technicalDetails: "Technical details available",
          useCases: ["Various use cases"],
          challenges: "Current challenges",
          futureOutlook: "Future outlook",
          resources: ["Additional resources"],
          relatedTopics: ["Related topics"],
          lastUpdated: new Date().toISOString(),
          confidence: "Medium"
        }
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      parsedResponse = {
        title: query,
        summary: text.substring(0, 300) + "...",
        keyPoints: ["Information retrieved successfully"],
        currentTrends: "Current trends available",
        technicalDetails: "Technical details provided",
        useCases: ["Multiple use cases"],
        challenges: "Challenges identified",
        futureOutlook: "Future outlook provided",
        resources: ["Additional resources"],
        relatedTopics: ["Related topics"],
        lastUpdated: new Date().toISOString(),
        confidence: "Medium",
        rawResponse: text
      }
    }

    return NextResponse.json({
      success: true,
      data: parsedResponse,
      papers: uniquePapers, // Return dynamically found papers
      query,
      category
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to search',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST method with query parameter to search',
    example: {
      method: 'POST',
      body: {
        query: 'DeFi protocols',
        category: 'Finance'
      }
    }
  })
} 