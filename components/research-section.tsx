"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { FileText, Shield, TrendingUp, Zap } from "lucide-react"

const researchPapers = [
  {
    title: "DeFi Security Analysis 2024",
    category: "Security",
    tags: ["Smart Contracts", "Auditing", "Risk Assessment"],
    icon: Shield,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Cross-Chain Bridge Protocols",
    category: "Infrastructure",
    tags: ["Interoperability", "Bridges", "Layer 2"],
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "NFT Market Trends & Analysis",
    category: "Market Research",
    tags: ["NFTs", "Market Data", "Trends"],
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Tokenomics Design Patterns",
    category: "Economics",
    tags: ["Tokenomics", "Game Theory", "Incentives"],
    icon: FileText,
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Web3 UX/UI Best Practices",
    category: "Design",
    tags: ["UX", "Interface", "Usability"],
    icon: FileText,
    color: "from-orange-500 to-red-500",
  },
]

export default function ResearchSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-[#928DAB] bg-clip-text text-transparent">
              Research & Validation
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Access cutting-edge Web3 research and get your projects validated by industry experts
          </p>
        </motion.div>

        {/* Horizontal Scrolling Research Papers */}
        <div className="relative mb-16">
          <motion.div style={{ x }} className="flex space-x-8 pb-8">
            {researchPapers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="flex-shrink-0 w-80"
              >
                <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-6 h-full hover:bg-white/10 transition-all duration-300 group">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${paper.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <paper.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="mb-4">
                    <span className="inline-block bg-[#928DAB]/20 text-[#928DAB] px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {paper.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#928DAB] transition-colors duration-300">
                      {paper.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {paper.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-white/10 text-gray-300 px-2 py-1 rounded-lg text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-[#928DAB]/25 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-white/10 border border-[#928DAB]/30 text-white py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Validation Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Smart Contract Validation</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Get your smart contracts reviewed and validated by our team of security experts. Comprehensive auditing
              with detailed reports and recommendations.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center space-x-2 text-gray-300">
                <div className="w-2 h-2 bg-[#928DAB] rounded-full"></div>
                <span>Security vulnerability assessment</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <div className="w-2 h-2 bg-[#928DAB] rounded-full"></div>
                <span>Gas optimization analysis</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <div className="w-2 h-2 bg-[#928DAB] rounded-full"></div>
                <span>Best practices compliance</span>
              </li>
            </ul>
            <motion.button
              className="w-full bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-[#928DAB]/25 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit for Validation
            </motion.button>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Project Research</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Access our extensive library of Web3 research papers, market analysis, and technical documentation to stay
              ahead of the curve.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center space-x-2 text-gray-300">
                <div className="w-2 h-2 bg-[#928DAB] rounded-full"></div>
                <span>Market trend analysis</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <div className="w-2 h-2 bg-[#928DAB] rounded-full"></div>
                <span>Technical whitepapers</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <div className="w-2 h-2 bg-[#928DAB] rounded-full"></div>
                <span>Competitive analysis</span>
              </li>
            </ul>
            <motion.button
              className="w-full bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-[#928DAB]/25 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Access Research Library
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
