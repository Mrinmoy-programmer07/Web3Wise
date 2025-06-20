"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowRight, Sparkles, Shield, Bot, Coins, FileText, Users } from "lucide-react"

const SplineViewer = dynamic(() => import("@/components/spline-viewer"), { ssr: false })

const features = [
  {
    icon: Sparkles,
    title: "NFT Sessions",
    description: "Exclusive consultation sessions minted as unique NFTs",
    href: "/nft-sessions",
    color: "from-bright-purple to-medium-purple",
  },
  {
    icon: Users,
    title: "Expert Consultants",
    description: "Connect with industry-leading Web3 professionals",
    href: "/consultants",
    color: "from-light-purple to-bright-purple",
  },
  {
    icon: Shield,
    title: "Smart Contract Validator",
    description: "AI-powered contract auditing and security analysis",
    href: "/validators",
    color: "from-bright-purple to-light-purple",
  },
  {
    icon: Bot,
    title: "AI Bot Support",
    description: "24/7 intelligent assistance via Telegram integration",
    href: "/bot-support",
    color: "from-light-purple to-medium-purple",
  },
  {
    icon: Coins,
    title: "Swap Finder",
    description: "Advanced crypto conversion and arbitrage tools",
    href: "/swap-finder",
    color: "from-medium-purple to-bright-purple",
  },
  {
    icon: FileText,
    title: "Research Hub",
    description: "Cutting-edge Web3 research and market analysis",
    href: "/research-hub",
    color: "from-bright-purple to-light-purple",
  },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleExploreClick = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!mounted) {
    return (
      <div className="relative min-h-screen bg-pure-black">
        {/* Placeholder for loading state */}
      </div>
    )
  }

  return (
    <div className="bg-pure-black">
      {/* Hero Section */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-6 lg:px-12">
        {/* Left Content */}
        <div className="text-left animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 mb-8 transition-all duration-300 ease-out purple-glow">
              <Sparkles className="w-5 h-5 text-bright-purple" />
              <span className="text-bright-purple font-content font-medium">Next-Gen Web3 Platform</span>
            </div>
          </div>

          <h1 className="web3wise-title text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-pure-white via-bright-purple to-light-purple bg-clip-text text-transparent">
              Web3Wise
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-light mb-12 max-w-2xl leading-relaxed font-content">
            Premium Web3 consultancy platform with AI-powered tools, expert guidance, and sophisticated design
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              className="group bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-12 py-4 rounded-full font-bold text-xl flex items-center space-x-3 shadow-xl shadow-bright-purple/25 purple-glow hover:scale-105 hover:shadow-2xl hover:shadow-bright-purple/40 transition-all duration-300 font-content"
              onClick={handleExploreClick}
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <button
              className="glass glass-hover text-pure-white px-12 py-4 rounded-full font-bold text-xl purple-glow-hover hover:scale-105 transition-all duration-300 font-content"
              onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
            >
              Watch Demo
            </button>
          </div>
        </div>
        
        {/* Right 3D Model */}
        <div className="relative w-full h-[500px] lg:h-full">
           <SplineViewer scene="https://prod.spline.design/FQAMj9-0GcD4gd8R/scene.splinecode" background="#000000" />
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
              <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
                Platform Features
              </span>
            </h2>
            <p className="text-xl text-gray-light max-w-3xl mx-auto font-content">
              Discover our comprehensive suite of Web3 tools and sophisticated experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                <Link href={feature.href}>
                  <div className="glass glass-hover rounded-3xl p-8 h-full transition-all duration-500 purple-glow-hover">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 purple-glow`}
                    >
                      <feature.icon className="w-8 h-8 text-pure-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-pure-white mb-4 group-hover:text-bright-purple transition-colors duration-300 font-heading">
                      {feature.title}
                    </h3>

                    <p className="text-gray-light leading-relaxed mb-6 font-content">{feature.description}</p>

                    <div className="flex items-center space-x-2 text-light-purple font-medium group-hover:text-pure-white transition-colors duration-300 font-content">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl p-12 purple-glow">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent mb-2 font-heading">
                  500+
                </div>
                <p className="text-gray-light font-content">Projects Delivered</p>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-light-purple to-bright-purple bg-clip-text text-transparent mb-2 font-heading">
                  50+
                </div>
                <p className="text-gray-light font-content">Expert Consultants</p>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-bright-purple to-medium-purple bg-clip-text text-transparent mb-2 font-heading">
                  24/7
                </div>
                <p className="text-gray-light font-content">AI Support</p>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-medium-purple to-light-purple bg-clip-text text-transparent mb-2 font-heading">
                  98%
                </div>
                <p className="text-gray-light font-content">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
