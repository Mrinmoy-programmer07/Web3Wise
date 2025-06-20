"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Coins, Shield, MessageSquare, Zap } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "NFT Sessions",
    description:
      "Book exclusive consultation sessions with Web3 experts, minted as unique NFTs for proof of engagement.",
  },
  {
    icon: Coins,
    title: "Cross-chain Payments",
    description: "Seamless payment processing across multiple blockchains with real-time conversion and minimal fees.",
  },
  {
    icon: Shield,
    title: "Smart Contract Validator",
    description: "AI-powered smart contract auditing and validation to ensure security and optimal gas efficiency.",
  },
  {
    icon: Zap,
    title: "Telegram Bot Support",
    description: "24/7 AI assistant integrated with Telegram for instant Web3 guidance and portfolio management.",
  },
]

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

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
            <span className="bg-gradient-to-r from-white to-[#928DAB] bg-clip-text text-transparent">How It Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of Web3 consultancy through our innovative platform
          </p>
        </motion.div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative">
          <motion.div style={{ x }} className="flex space-x-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-80 h-96"
              >
                <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-8 h-full hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#928DAB] transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">{step.description}</p>

                  <div className="mt-8">
                    <motion.button
                      className="text-[#928DAB] font-medium flex items-center space-x-2 group-hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span>Learn More</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        →
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
