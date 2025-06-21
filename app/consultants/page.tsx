"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Star, Calendar, Filter, Search, MapPin, Award, X, BookOpen } from "lucide-react"

// TypeScript declaration for Petra wallet
declare global {
  interface Window {
    aptos?: {
      connect: () => Promise<any>
      disconnect: () => Promise<void>
      account: () => Promise<any>
      isConnected: () => Promise<boolean>
      network: () => Promise<string>
      signAndSubmitTransaction: (payload: any) => Promise<any>
      waitForTransaction: (hash: string) => Promise<any>
    }
  }
}

const consultants = [
  {
    id: 1,
    name: "Alex Chen",
    expertise: "DeFi Architecture",
    rating: 4.9,
    sessions: 150,
    hourlyRate: "$200",
    location: "San Francisco, CA",
    languages: ["English", "Mandarin"],
    specialties: ["Yield Farming", "Liquidity Mining", "Protocol Design"],
    avatar: "/placeholder.svg?height=200&width=200",
    color: "#8B5CF6",
    verified: true,
    description:
      "Leading DeFi architect with 5+ years experience building protocols that have secured over $1B in TVL.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    expertise: "NFT Strategy",
    rating: 4.8,
    sessions: 120,
    hourlyRate: "$180",
    location: "London, UK",
    languages: ["English", "French"],
    specialties: ["Collection Strategy", "Market Analysis", "Community Building"],
    avatar: "/placeholder.svg?height=200&width=200",
    color: "#A855F7",
    verified: true,
    description: "NFT strategist who has helped launch 50+ successful collections with combined volume of 10K+ ETH.",
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    expertise: "Smart Contracts",
    rating: 5.0,
    sessions: 200,
    hourlyRate: "$250",
    location: "Austin, TX",
    languages: ["English", "Spanish"],
    specialties: ["Security Audits", "Gas Optimization", "Solidity"],
    avatar: "/placeholder.svg?height=200&width=200",
    color: "#8B5CF6",
    verified: true,
    description: "Senior smart contract auditor with expertise in finding critical vulnerabilities and optimizations.",
  },
  {
    id: 4,
    name: "Emily Zhang",
    expertise: "Tokenomics",
    rating: 4.9,
    sessions: 180,
    hourlyRate: "$220",
    location: "Singapore",
    languages: ["English", "Mandarin", "Japanese"],
    specialties: ["Token Design", "Economic Models", "Game Theory"],
    avatar: "/placeholder.svg?height=200&width=200",
    color: "#A855F7",
    verified: true,
    description: "Tokenomics expert who has designed sustainable economic models for 30+ successful Web3 projects.",
  },
  {
    id: 5,
    name: "David Kim",
    expertise: "Layer 2 Solutions",
    rating: 4.7,
    sessions: 95,
    hourlyRate: "$190",
    location: "Seoul, South Korea",
    languages: ["English", "Korean"],
    specialties: ["Scaling Solutions", "Rollups", "Cross-chain"],
    avatar: "/placeholder.svg?height=200&width=200",
    color: "#8B5CF6",
    verified: true,
    description: "Layer 2 specialist focused on scaling solutions and cross-chain interoperability protocols.",
  },
  {
    id: 6,
    name: "Lisa Thompson",
    expertise: "Web3 Security",
    rating: 4.9,
    sessions: 160,
    hourlyRate: "$240",
    location: "Toronto, Canada",
    languages: ["English"],
    specialties: ["Security Audits", "Penetration Testing", "Risk Assessment"],
    avatar: "/placeholder.svg?height=200&width=200",
    color: "#A855F7",
    verified: true,
    description: "Cybersecurity expert specializing in Web3 security audits and vulnerability assessments.",
  },
]

const filters = [
  { name: "All", value: "all" },
  { name: "DeFi", value: "defi" },
  { name: "NFTs", value: "nft" },
  { name: "Security", value: "security" },
  { name: "Tokenomics", value: "tokenomics" },
]

export default function ConsultantsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(null)
  const [showRules, setShowRules] = useState(false)

  const handleBooking = async (consultantId: number) => {
    // Find the consultant
    const consultant = consultants.find(c => c.id === consultantId)
    if (consultant) {
      try {
        // Check if Petra wallet is available
        if (typeof window !== 'undefined' && window.aptos) {
          // Connect to Petra wallet
          const response = await window.aptos.connect()
          console.log('Connected to Petra wallet:', response)
          
          // Get account information
          const account = await window.aptos.account()
          console.log('Account:', account)
          
          // Check if connected to testnet
          const network = await window.aptos.network()
          console.log('Network:', network)
          
          // Prepare payment transaction for Aptos testnet
          const paymentAmount = parseFloat(consultant.hourlyRate.replace('$', '')) // Extract amount from hourly rate
          const aptosAmount = paymentAmount * 0.01 // Convert to APT (assuming 1 APT = $100 for demo)
          
          // Create transaction payload for payment
          const transactionPayload = {
            function: "0x1::coin::transfer",
            type_arguments: ["0x1::aptos_coin::AptosCoin"],
            arguments: [
              "0x0a79213b572ec40e821dede49a03df03cfe13d905937a149049b4e4f374ce6bc", // Proper 64-char Aptos address
              (aptosAmount * 100000000).toString() // Convert to octas (8 decimal places)
            ]
          }
          
          // Show payment confirmation
          const confirmPayment = confirm(
            `Booking Payment Details:\n\n` +
            `Consultant: ${consultant.name}\n` +
            `Expertise: ${consultant.expertise}\n` +
            `Amount: ${consultant.hourlyRate} (${aptosAmount.toFixed(4)} APT)\n` +
            `Network: Aptos Testnet\n\n` +
            `Do you want to proceed with the payment?`
          )
          
          if (confirmPayment) {
            try {
              // Submit transaction to testnet
              const pendingTransaction = await window.aptos.signAndSubmitTransaction(transactionPayload)
              console.log('Transaction submitted:', pendingTransaction)
              
              // Wait for transaction confirmation
              const result = await window.aptos.waitForTransaction(pendingTransaction.hash)
              console.log('Transaction confirmed:', result)
              
              alert(`Payment successful! Transaction hash: ${pendingTransaction.hash}\n\nYour booking with ${consultant.name} has been confirmed.`)
            } catch (txError) {
              console.error('Transaction failed:', txError)
              alert('Payment failed. Please try again or check your wallet balance.')
            }
          } else {
            alert('Payment cancelled.')
          }
          
        } else {
          // If Petra wallet is not available, prompt user to install it
          alert('Petra wallet is not installed. Please install Petra wallet to book sessions.')
          window.open('https://petra.app/', '_blank')
        }
      } catch (error) {
        console.error('Error connecting to Petra wallet:', error)
        alert('Failed to connect to Petra wallet. Please try again.')
      }
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen pt-24 bg-pure-black">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 mb-8 purple-glow">
              <Award className="w-5 h-5 text-bright-purple" />
              <span className="text-bright-purple font-medium">Expert Web3 Consultants</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="consultants-title gradient-title text-5xl md:text-7xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
              Meet Our Consultants
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-light max-w-3xl mx-auto mb-12"
          >
            Connect with industry-leading Web3 experts for personalized guidance and strategic insights
          </motion.p>

          {/* Read Rules Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <motion.button
              onClick={() => setShowRules(true)}
              className="inline-flex items-center space-x-2 glass glass-hover rounded-full px-8 py-4 purple-glow-hover transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-5 h-5 text-bright-purple" />
              <span className="text-bright-purple font-medium">Read Rules Before Booking</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="relative py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 mb-12">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-light" />
              <input
                type="text"
                placeholder="Search consultants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass rounded-full pl-12 pr-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-light" />
              <div className="flex space-x-2">
                {filters.map((filter) => (
                  <motion.button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      selectedFilter === filter.value
                        ? "bg-gradient-to-r from-bright-purple to-light-purple text-pure-white"
                        : "glass text-gray-light hover:text-pure-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filter.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultants Grid */}
      <section className="relative py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultants.map((consultant, index) => (
              <motion.div
                key={consultant.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group perspective-1000 cursor-pointer"
                onClick={() => setSelectedConsultant(consultant.id)}
              >
                <div className="glass glass-hover rounded-3xl p-6 transform-3d group-hover:rotateY-5 transition-all duration-500 purple-glow-hover">
                  {/* Avatar and Status */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-transparent group-hover:border-bright-purple transition-colors duration-300">
                      <div
                        className="w-full h-full flex items-center justify-center text-2xl font-bold text-pure-white"
                        style={{ background: `linear-gradient(45deg, ${consultant.color}, ${consultant.color}80)` }}
                      >
                        {consultant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>
                    {consultant.verified && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-bright-purple to-light-purple text-pure-white text-xs px-2 py-1 rounded-full font-medium">
                        Verified
                      </div>
                    )}
                    <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-pure-black"></div>
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-pure-white mb-1 group-hover:text-bright-purple transition-colors duration-300">
                      {consultant.name}
                    </h3>
                    <p className="text-light-purple font-medium mb-2">{consultant.expertise}</p>
                    <p className="text-gray-light text-sm mb-4 line-clamp-2">{consultant.description}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-pure-white font-medium">{consultant.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-light">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{consultant.sessions} sessions</span>
                      </div>
                    </div>

                    {/* Location and Rate */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center space-x-1 text-gray-light">
                        <MapPin className="w-4 h-4" />
                        <span>{consultant.location}</span>
                      </div>
                      <div className="text-bright-purple font-bold">{consultant.hourlyRate}/hr</div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {consultant.specialties.slice(0, 2).map((specialty, i) => (
                        <span key={i} className="bg-dark-purple text-gray-light px-2 py-1 rounded-lg text-xs">
                          {specialty}
                        </span>
                      ))}
                      {consultant.specialties.length > 2 && (
                        <span className="bg-dark-purple text-gray-light px-2 py-1 rounded-lg text-xs">
                          +{consultant.specialties.length - 2}
                        </span>
                      )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.button
                        className="flex-1 bg-gradient-to-r from-bright-purple to-light-purple text-pure-white py-3 rounded-full font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Schedule Meet
                      </motion.button>
                      <motion.button
                        onClick={() => handleBooking(consultant.id)}
                        className="flex-1 bg-transparent border-2 border-bright-purple text-bright-purple py-3 rounded-full font-medium hover:bg-bright-purple hover:text-pure-white transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                  50+
                </motion.div>
                <p className="text-gray-light">Expert Consultants</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-light-purple to-bright-purple bg-clip-text text-transparent mb-2"
                >
                  4.9/5
                </motion.div>
                <p className="text-gray-light">Average Rating</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent mb-2"
                >
                  1000+
                </motion.div>
                <p className="text-gray-light">Sessions Completed</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold bg-gradient-to-r from-light-purple to-bright-purple bg-clip-text text-transparent mb-2"
                >
                  24/7
                </motion.div>
                <p className="text-gray-light">Availability</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rules Modal */}
      <AnimatePresence>
        {showRules && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            onClick={() => setShowRules(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto purple-glow"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-bright-purple to-light-purple rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-pure-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
                    Booking Rules & Guidelines
                  </h2>
                </div>
                <motion.button
                  onClick={() => setShowRules(false)}
                  className="w-8 h-8 rounded-full glass glass-hover flex items-center justify-center text-gray-light hover:text-pure-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-bright-purple mb-4">Important Guidelines</h3>
                  <div className="text-gray-light leading-relaxed space-y-4">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                      mollit anim id est laborum.
                    </p>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                      dicta sunt explicabo.
                    </p>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-light-purple mb-4">Booking Terms</h3>
                  <div className="text-gray-light leading-relaxed space-y-4">
                    <p>
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                      magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                      ipsum quia dolor sit amet.
                    </p>
                    <p>
                      Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
                      magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
                      corporis suscipit laboriosam.
                    </p>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-bright-purple mb-4">Payment & Cancellation</h3>
                  <div className="text-gray-light leading-relaxed space-y-4">
                    <p>
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                      deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                      provident.
                    </p>
                    <p>
                      Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
                      harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis est
                      eligendi optio cumque.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end mt-8 pt-6 border-t border-gray-800">
                <motion.button
                  onClick={() => setShowRules(false)}
                  className="bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-8 py-3 rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  I Understand
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
