"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { FileText, Shield, TrendingUp, Zap, Download, Eye, Filter, Search, ExternalLink, Calendar, User, BookOpen, ArrowLeft, Loader2, Globe, Brain, Target, AlertCircle } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float, Box, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import SplineViewer from "@/components/spline-viewer"

// Types for Gemini search results
interface GeminiSearchResult {
  title: string
  summary: string
  keyPoints: string[]
  currentTrends: string
  technicalDetails: string
  useCases: string[]
  challenges: string
  futureOutlook: string
  resources: string[]
  relatedTopics: string[]
  lastUpdated: string
  confidence: string
  rawResponse?: string
}

interface ResearchPaper {
  id: string
  title: string
  authors: string
  abstract: string
  pdfUrl: string
  abstractUrl: string
  publishedDate: string
  source: string
  sourceUrl: string
}

interface SearchFilters {
  category: string
  dateRange: string
  sortBy: string
}

export default function ResearchHubPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<GeminiSearchResult | null>(null)
  const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<SearchFilters>({
    category: "All",
    dateRange: "All",
    sortBy: "relevance"
  })
  const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0.6, 0.9], ["0%", "-50%"])

  // Categories for Web3/Blockchain research
  const categories = [
    "All", "DeFi", "NFTs", "Blockchain", "Smart Contracts", 
    "Cryptocurrency", "Web3", "Security", "Layer 2", "Cross-Chain"
  ]

  // Search using Gemini API
  const searchWithGemini = async (query: string) => {
    if (!query.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/gemini-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          category: filters.category
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to search')
      }

      if (data.success) {
        setSearchResults(data.data)
        setResearchPapers(data.papers || [])
      } else {
        throw new Error('Search failed')
      }
    } catch (err) {
      console.error('Search error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred during search')
    } finally {
      setLoading(false)
    }
  }

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchWithGemini(searchQuery)
      } else {
        setSearchResults(null)
        setResearchPapers([])
        setError(null)
      }
    }, 1000) // Increased debounce time for API calls

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Handle scroll direction detection
  const handleWheel = (e: React.WheelEvent) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
    
    if (isHorizontal) {
      setIsHorizontalScrolling(true)
      e.preventDefault()
      
      setTimeout(() => {
        setIsHorizontalScrolling(false)
      }, 100)
    }
  }

  // Prevent vertical scroll when horizontal scrolling is active
  useEffect(() => {
    const preventVerticalScroll = (e: WheelEvent) => {
      if (isHorizontalScrolling) {
        e.preventDefault()
      }
    }

    if (isHorizontalScrolling) {
      document.addEventListener('wheel', preventVerticalScroll, { passive: false })
    }

    return () => {
      document.removeEventListener('wheel', preventVerticalScroll)
    }
  }, [isHorizontalScrolling])

  return (
    <div ref={containerRef} className="relative min-h-screen pt-24 bg-pure-black">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left Content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 purple-glow">
                <Brain className="w-5 h-5 text-bright-purple" />
                <span className="text-bright-purple font-medium">AI-Powered Research</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="research-hub-title gradient-title text-5xl md:text-7xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
                Research Hub
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-light max-w-xl mb-12"
            >
              Search any Web3 topic and get comprehensive, AI-powered insights with real-time information from across the internet.
            </motion.p>
          </div>

          {/* Right 3D Model */}
          <div className="relative w-full h-[400px] lg:h-[500px]">
            <SplineViewer scene="https://prod.spline.design/GepEd1nFpM7xdDOa/scene.splinecode" background="#000000" />
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="relative py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8 mb-12">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-light" />
              <input
                type="text"
                placeholder="Search any Web3 topic (e.g., 'DeFi protocols', 'NFT market trends', 'Layer 2 scaling')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass rounded-full pl-12 pr-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
              />
              {loading && (
                <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-bright-purple animate-spin" />
              )}
            </div>

            {/* Category Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-light" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setFilters(prev => ({ ...prev, category }))}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      filters.category === category
                        ? "bg-gradient-to-r from-bright-purple to-light-purple text-pure-white"
                        : "glass text-gray-light hover:text-pure-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && (
        <section className="relative py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-pure-white to-bright-purple bg-clip-text text-transparent">
                AI Research Results for "{searchQuery}"
              </span>
              {loading && <Loader2 className="inline ml-2 w-6 h-6 text-bright-purple animate-spin" />}
            </motion.h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6 mb-8 border border-red-500/20"
              >
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <div>
                    <h3 className="text-red-400 font-semibold">Search Error</h3>
                    <p className="text-gray-light">{error}</p>
                    <p className="text-sm text-gray-light mt-2">
                      Make sure you have set up your GEMINI_API_KEY in the environment variables.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {!loading && !error && !searchResults && (
              <div className="text-center py-20">
                <Globe className="w-16 h-16 text-gray-light mx-auto mb-4" />
                <p className="text-gray-light text-xl">No results found. Try a different search term.</p>
              </div>
            )}

            {searchResults && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Main Result Card */}
                <div className="glass rounded-3xl p-8 purple-glow">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-pure-white">{searchResults.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="bg-bright-purple/20 text-bright-purple px-3 py-1 rounded-full text-sm font-medium">
                        {searchResults.confidence} Confidence
                      </span>
                      <span className="text-gray-light text-sm">
                        {new Date(searchResults.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-light text-lg leading-relaxed mb-6">
                    {searchResults.summary}
                  </p>

                  {/* Key Points */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-pure-white mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-bright-purple" />
                      Key Points
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {searchResults.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-bright-purple rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-light">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Trends */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-pure-white mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-bright-purple" />
                      Current Trends
                    </h4>
                    <p className="text-gray-light leading-relaxed">{searchResults.currentTrends}</p>
                  </div>

                  {/* Technical Details */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-pure-white mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-bright-purple" />
                      Technical Details
                    </h4>
                    <p className="text-gray-light leading-relaxed">{searchResults.technicalDetails}</p>
                  </div>

                  {/* Use Cases */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-pure-white mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-bright-purple" />
                      Use Cases
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {searchResults.useCases.map((useCase, index) => (
                        <div key={index} className="glass rounded-lg p-3">
                          <p className="text-gray-light">{useCase}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges & Future Outlook */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-xl font-semibold text-pure-white mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-bright-purple" />
                        Challenges
                      </h4>
                      <p className="text-gray-light leading-relaxed">{searchResults.challenges}</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-pure-white mb-4 flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-bright-purple" />
                        Future Outlook
                      </h4>
                      <p className="text-gray-light leading-relaxed">{searchResults.futureOutlook}</p>
                    </div>
                  </div>

                  {/* Resources & Related Topics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-pure-white mb-4 flex items-center">
                        <ExternalLink className="w-5 h-5 mr-2 text-bright-purple" />
                        Resources
                      </h4>
                      <div className="space-y-2">
                        {searchResults.resources.map((resource, index) => (
                          <div key={index} className="text-gray-light text-sm">
                            • {resource}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-pure-white mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-bright-purple" />
                        Related Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {searchResults.relatedTopics.map((topic, index) => (
                          <span
                            key={index}
                            className="bg-dark-purple text-gray-light px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-bright-purple/20 hover:text-bright-purple transition-colors"
                            onClick={() => setSearchQuery(topic)}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Research Papers Section */}
                {researchPapers.length > 0 && (
                  <div className="mt-12">
                    <motion.h3
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-bold mb-8"
                    >
                      <span className="bg-gradient-to-r from-pure-white to-bright-purple bg-clip-text text-transparent">
                        📄 Related Research Papers
                      </span>
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {researchPapers.map((paper, index) => (
                        <motion.div
                          key={paper.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="glass glass-hover rounded-2xl p-6 cursor-pointer transform-3d transition-all duration-500 purple-glow-hover"
                          onClick={() => window.open(paper.sourceUrl, '_blank')}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span className="inline-block bg-bright-purple/20 text-bright-purple px-3 py-1 rounded-full text-sm font-medium">
                              {paper.source}
                            </span>
                            <ExternalLink className="w-4 h-4 text-gray-light" />
                          </div>

                          <h4 className="text-lg font-bold text-pure-white mb-3 line-clamp-2">
                            {paper.title}
                          </h4>
                          
                          <p className="text-gray-light text-sm mb-4 line-clamp-3">
                            {paper.abstract}
                          </p>

                          <div className="flex items-center text-sm text-gray-light mb-4">
                            <User className="w-4 h-4 mr-1" />
                            <span className="line-clamp-1">
                              {paper.authors}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-light mb-4">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{paper.publishedDate}</span>
                          </div>

                          <div className="flex space-x-3">
                            <motion.a
                              href={paper.abstractUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-gradient-to-r from-bright-purple to-light-purple text-pure-white py-2 rounded-lg font-medium text-center hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <BookOpen className="w-4 h-4 inline mr-1" />
                              Read Abstract
                            </motion.a>
                            <motion.a
                              href={paper.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 glass glass-hover text-pure-white py-2 rounded-lg font-medium text-center transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Download className="w-4 h-4 inline mr-1" />
                              PDF
                            </motion.a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 purple-glow"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent mb-2"
                >
                  AI-Powered
                </motion.div>
                <p className="text-gray-light">Real-time Search</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-light-purple to-bright-purple bg-clip-text text-transparent mb-2"
                >
                  Comprehensive
                </motion.div>
                <p className="text-gray-light">Research Results</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent mb-2"
                >
                  Web3 Focused
                </motion.div>
                <p className="text-gray-light">Expert Insights</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-light-purple to-bright-purple bg-clip-text text-transparent mb-2"
                >
                  Instant
                </motion.div>
                <p className="text-gray-light">Information Access</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
