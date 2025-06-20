"use client"

import { motion } from "framer-motion"
import { Star, Calendar } from "lucide-react"

const consultants = [
  {
    name: "Alex Chen",
    expertise: "DeFi Architecture",
    rating: 4.9,
    sessions: 150,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Sarah Williams",
    expertise: "NFT Strategy",
    rating: 4.8,
    sessions: 120,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Marcus Rodriguez",
    expertise: "Smart Contracts",
    rating: 5.0,
    sessions: 200,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Emily Zhang",
    expertise: "Tokenomics",
    rating: 4.9,
    sessions: 180,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "David Kim",
    expertise: "Layer 2 Solutions",
    rating: 4.7,
    sessions: 95,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Lisa Thompson",
    expertise: "Web3 Security",
    rating: 4.9,
    sessions: 160,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function ConsultantProfiles() {
  return (
    <section className="py-20">
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
              Expert Consultants
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect with industry-leading Web3 experts for personalized guidance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultants.map((consultant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="group"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#928DAB]/30 group-hover:border-[#928DAB] transition-colors duration-300">
                    <img
                      src={consultant.image || "/placeholder.svg"}
                      alt={consultant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white text-xs px-3 py-1 rounded-full">
                    Available
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#928DAB] transition-colors duration-300">
                    {consultant.name}
                  </h3>
                  <p className="text-[#928DAB] font-medium mb-4">{consultant.expertise}</p>

                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{consultant.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{consultant.sessions} sessions</span>
                    </div>
                  </div>

                  <motion.button
                    className="w-full bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white py-3 rounded-full font-medium hover:shadow-lg hover:shadow-[#928DAB]/25 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
