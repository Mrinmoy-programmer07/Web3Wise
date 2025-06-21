"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { FileText, Shield, TrendingUp, Zap, Download, Eye, Filter, Search } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float, Box, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import SplineViewer from "@/components/spline-viewer"

function ResearchCard3D({ color, position }: { color: string; position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Box args={[1.5, 2, 0.1]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} metalness={0.3} roughness={0.7} />
      </Box>
    </Float>
  )
}

const researchPapers = [
  {
    id: 1,
    title: "DeFi Security Analysis 2024",
    category: "Security",
    tags: ["Smart Contracts", "Auditing", "Risk Assessment"],
    icon: Shield,
    color: "from-bright-purple to-light-purple",
    author: "Dr. Sarah Chen",
    date: "Dec 2024",
    views: "12.5K",
    downloads: "3.2K",
    description:
      "Comprehensive analysis of DeFi security vulnerabilities and mitigation strategies based on 500+ protocol audits.",
    abstract:
      "This paper presents a systematic analysis of security vulnerabilities in decentralized finance protocols...",
  },
  {
    id: 2,
    title: "Cross-Chain Bridge Protocols",
    category: "Infrastructure",
    tags: ["Interoperability", "Bridges", "Layer 2"],
    icon: Zap,
    color: "from-light-purple to-bright-purple",
    author: "Prof. Michael Zhang",
    date: "Nov 2024",
    views: "8.7K",
    downloads: "2.1K",
    description: "Technical deep-dive into cross-chain bridge architectures and their security implications.",
    abstract: "Cross-chain bridges have become critical infrastructure for the multi-chain ecosystem...",
  },
  {
    id: 3,
    title: "NFT Market Trends & Analysis",
    category: "Market Research",
    tags: ["NFTs", "Market Data", "Trends"],
    icon: TrendingUp,
    color: "from-bright-purple to-medium-purple",
    author: "Emma Rodriguez",
    date: "Oct 2024",
    views: "15.3K",
    downloads: "4.8K",
    description: "Comprehensive market analysis of NFT trends, pricing patterns, and future projections.",
    abstract: "The NFT market has experienced significant evolution throughout 2024...",
  },
  {
    id: 4,
    title: "Tokenomics Design Patterns",
    category: "Economics",
    tags: ["Tokenomics", "Game Theory", "Incentives"],
    icon: FileText,
    color: "from-light-purple to-medium-purple",
    author: "Dr. Alex Thompson",
    date: "Sep 2024",
    views: "9.2K",
    downloads: "2.7K",
    description: "Analysis of successful tokenomics models and design patterns for sustainable Web3 economies.",
    abstract: "Effective tokenomics design is crucial for the long-term success of Web3 projects...",
  },
  {
    id: 5,
    title: "Web3 UX/UI Best Practices",
    category: "Design",
    tags: ["UX", "Interface", "Usability"],
    icon: FileText,
    color: "from-bright-purple to-light-purple",
    author: "Lisa Park",
    date: "Aug 2024",
    views: "11.1K",
    downloads: "3.5K",
    description: "User experience guidelines and best practices for Web3 applications and interfaces.",
    abstract: "Web3 applications face unique UX challenges that require specialized design approaches...",
  },
  {
    id: 6,
    title: "Layer 2 Scaling Solutions",
    category: "Technology",
    tags: ["Scaling", "Layer 2", "Performance"],
    icon: Zap,
    color: "from-medium-purple to-light-purple",
    author: "Dr. James Wilson",
    date: "Jul 2024",
    views: "13.8K",
    downloads: "4.1K",
    description: "Comparative analysis of Layer 2 scaling solutions and their performance characteristics.",
    abstract: "Layer 2 solutions have emerged as the primary scaling approach for Ethereum...",
  },
]

const categories = ["All", "Security", "Infrastructure", "Market Research", "Economics", "Design", "Technology"]

export default function ResearchHubPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null)
  const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0.6, 0.9], ["0%", "-50%"])

  // Handle scroll direction detection
  const handleWheel = (e: React.WheelEvent) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
    
    if (isHorizontal) {
      setIsHorizontalScrolling(true)
      e.preventDefault()
      
      // Reset after a short delay
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

  const filteredPapers = researchPapers.filter((paper) => {
    const matchesCategory = selectedCategory === "All" || paper.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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
                <FileText className="w-5 h-5 text-bright-purple" />
                <span className="text-bright-purple font-medium">Cutting-Edge Web3 Research</span>
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
              Access cutting-edge Web3 research papers, market analysis, and technical documentation from industry experts
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
                placeholder="Search research papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass rounded-full pl-12 pr-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-light" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category
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

      {/* Horizontal Scrolling Research Papers */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-pure-white to-bright-purple bg-clip-text text-transparent">
              Latest Research
            </span>
          </motion.h2>

          <motion.div 
            style={{ x }} 
            className="flex space-x-8"
            onWheel={handleWheel}
          >
            {filteredPapers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -15,
                  rotateY: 5,
                  scale: 1.02,
                }}
                className="flex-shrink-0 w-96 perspective-1000 cursor-pointer"
                onClick={() => setSelectedPaper(paper.id)}
              >
                <div className="glass glass-hover rounded-3xl p-6 h-full transform-3d transition-all duration-500 purple-glow-hover">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${paper.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 purple-glow`}
                  >
                    <paper.icon className="w-8 h-8 text-pure-white" />
                  </div>

                  <div className="mb-4">
                    <span className="inline-block bg-bright-purple/20 text-bright-purple px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {paper.category}
                    </span>
                    <h3 className="text-xl font-bold text-pure-white mb-3 group-hover:text-bright-purple transition-colors duration-300">
                      {paper.title}
                    </h3>
                    <p className="text-gray-light text-sm mb-4 line-clamp-3">{paper.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="text-gray-light">
                      <div>{paper.author}</div>
                      <div>{paper.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-bright-purple">
                        <Eye className="w-4 h-4" />
                        <span>{paper.views}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-light-purple">
                        <Download className="w-4 h-4" />
                        <span>{paper.downloads}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-6">
                    {paper.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="bg-dark-purple text-gray-light px-2 py-1 rounded-lg text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 bg-gradient-to-r from-bright-purple to-light-purple text-pure-white py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-4 h-4 inline mr-1" />
                      Read
                    </motion.button>
                    <motion.button
                      className="flex-1 glass glass-hover text-pure-white py-2 rounded-lg font-medium transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-4 h-4 inline mr-1" />
                      Download
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
                  150+
                </motion.div>
                <p className="text-gray-light">Research Papers</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-light-purple to-bright-purple bg-clip-text text-transparent mb-2"
                >
                  50+
                </motion.div>
                <p className="text-gray-light">Expert Authors</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent mb-2"
                >
                  100K+
                </motion.div>
                <p className="text-gray-light">Total Downloads</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-light-purple to-bright-purple bg-clip-text text-transparent mb-2"
                >
                  Weekly
                </motion.div>
                <p className="text-gray-light">New Publications</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
