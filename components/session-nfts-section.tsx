"use client"

import { motion } from "framer-motion"
import { Award, Clock, Users } from "lucide-react"

const nftSessions = [
  {
    title: "DeFi Mastery Session",
    consultant: "Alex Chen",
    duration: "60 min",
    participants: "1-on-1",
    price: "0.5 ETH",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "NFT Strategy Workshop",
    consultant: "Sarah Williams",
    duration: "90 min",
    participants: "Group",
    price: "0.3 ETH",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Smart Contract Audit",
    consultant: "Marcus Rodriguez",
    duration: "120 min",
    participants: "1-on-1",
    price: "1.2 ETH",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function SessionNFTsSection() {
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
            <span className="bg-gradient-to-r from-white to-[#928DAB] bg-clip-text text-transparent">Session NFTs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Exclusive consultation sessions minted as NFTs - proof of your Web3 learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nftSessions.map((session, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                rotateY: 10,
                scale: 1.02,
              }}
              className="group perspective-1000"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform-gpu">
                {/* NFT Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={session.image || "/placeholder.svg"}
                    alt={session.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1C2C]/80 to-transparent" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white px-3 py-1 rounded-full text-sm font-medium">
                    NFT
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#928DAB] transition-colors duration-300">
                    {session.title}
                  </h3>
                  <p className="text-[#928DAB] font-medium mb-4">with {session.consultant}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{session.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{session.participants}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Certificate NFT included</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#928DAB]">{session.price}</div>
                    <motion.button
                      className="bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-[#928DAB]/25 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book & Mint
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Why Session NFTs?</h3>
            <p className="text-gray-400 mb-6">
              Each consultation session is minted as a unique NFT, providing proof of your learning journey, access to
              exclusive communities, and potential future benefits as our ecosystem grows.
            </p>
            <motion.button
              className="bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-[#928DAB]/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Sessions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
