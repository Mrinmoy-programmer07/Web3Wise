"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, Zap, Shield, Clock, DollarSign } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float, Cylinder, Sphere, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"

function BridgeAnimation() {
  return (
    <group>
      {/* Bridge Structure */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Cylinder args={[0.1, 0.1, 8]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.2} />
        </Cylinder>
      </Float>

      {/* Source Token */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[0.5]} position={[-4, 0, 0]}>
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.3} />
        </Sphere>
      </Float>

      {/* Destination Token */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[0.5]} position={[4, 0, 0]}>
          <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={0.3} />
        </Sphere>
      </Float>

      {/* Moving Particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Float key={i} speed={3 + i} rotationIntensity={0.5} floatIntensity={0.3}>
          <Sphere args={[0.1]} position={[-3 + i * 1.5, Math.sin(i) * 0.3, 0]}>
            <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={0.5} />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

const crossChainRoutes = [
  {
    from: { token: "ETH", network: "Ethereum", color: "#8B5CF6" },
    to: { token: "USDC", network: "Polygon", color: "#A855F7" },
    route: "Polygon Bridge → QuickSwap",
    fee: "0.1%",
    time: "2-5 min",
    savings: "15%",
    useCase: "Lower fees for DeFi transactions",
  },
  {
    from: { token: "USDC", network: "Ethereum", color: "#8B5CF6" },
    to: { token: "SOL", network: "Solana", color: "#A855F7" },
    route: "Wormhole → Jupiter",
    fee: "0.05%",
    time: "1-3 min",
    savings: "25%",
    useCase: "Fast payments to Solana ecosystem",
  },
  {
    from: { token: "MATIC", network: "Polygon", color: "#A855F7" },
    to: { token: "APT", network: "Aptos", color: "#8B5CF6" },
    route: "LayerZero → PancakeSwap",
    fee: "0.08%",
    time: "3-7 min",
    savings: "20%",
    useCase: "Cross-chain consulting payments",
  },
]

const paymentSteps = [
  {
    step: 1,
    title: "Select Source",
    description: "Choose your token and network",
    icon: DollarSign,
  },
  {
    step: 2,
    title: "Bridge & Convert",
    description: "Automated cross-chain routing",
    icon: Zap,
  },
  {
    step: 3,
    title: "Secure Transfer",
    description: "Consultant receives payment",
    icon: Shield,
  },
]

export default function CrossChainPaymentsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedRoute, setSelectedRoute] = useState(0)
  const [paymentAmount, setPaymentAmount] = useState("100")
  const [isProcessing, setIsProcessing] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "-66%"])

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
    }, 4000)
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
              <Zap className="w-5 h-5 text-bright-purple" />
              <span className="text-bright-purple font-medium">Seamless Cross-Chain Payments</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="cross-chain-title gradient-title text-5xl md:text-7xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
              Cross-Chain Payments
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-light max-w-3xl mx-auto mb-12"
          >
            Pay consultants in any token while they receive in their preferred currency across multiple blockchains
          </motion.p>
        </div>
      </section>

      {/* 3D Bridge Animation */}
      {/* Removed Canvas and 3D models */}

      {/* Payment Flow */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-pure-white to-bright-purple bg-clip-text text-transparent">
              How It Works
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {paymentSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-bright-purple to-light-purple rounded-full flex items-center justify-center mx-auto purple-glow">
                    <step.icon className="w-10 h-10 text-pure-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-light-purple to-bright-purple rounded-full flex items-center justify-center text-pure-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-pure-white mb-3">{step.title}</h3>
                <p className="text-gray-light">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Payment Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 purple-glow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* You Pay */}
              <div>
                <h3 className="text-2xl font-bold text-pure-white mb-6">You Pay</h3>
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-gray-light text-sm font-medium">Amount</label>
                    <div className="text-gray-light text-sm">Balance: 2.45 ETH</div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <select className="flex-1 bg-transparent border border-bright-purple/30 rounded-xl px-4 py-3 text-pure-white focus:outline-none focus:border-bright-purple transition-colors duration-200">
                      <option value="ETH" className="bg-pure-black">
                        ETH - Ethereum
                      </option>
                      <option value="USDC" className="bg-pure-black">
                        USDC - USD Coin
                      </option>
                      <option value="MATIC" className="bg-pure-black">
                        MATIC - Polygon
                      </option>
                    </select>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-32 bg-transparent border border-bright-purple/30 rounded-xl px-4 py-3 text-pure-white text-right focus:outline-none focus:border-bright-purple transition-colors duration-200"
                      placeholder="0.0"
                    />
                  </div>
                  <div className="text-gray-light text-sm">
                    ≈ ${(Number.parseFloat(paymentAmount) * 3200).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Consultant Receives */}
              <div>
                <h3 className="text-2xl font-bold text-pure-white mb-6">Consultant Receives</h3>
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-gray-light text-sm font-medium">Converted Amount</label>
                    <div className="text-green-400 text-sm">Auto-converted</div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <select className="flex-1 bg-transparent border border-light-purple/30 rounded-xl px-4 py-3 text-pure-white focus:outline-none focus:border-light-purple transition-colors duration-200">
                      <option value="APT" className="bg-pure-black">
                        APT - Aptos
                      </option>
                      <option value="SOL" className="bg-pure-black">
                        SOL - Solana
                      </option>
                      <option value="USDC" className="bg-pure-black">
                        USDC - USD Coin
                      </option>
                    </select>
                    <div className="w-32 bg-transparent border border-light-purple/30 rounded-xl px-4 py-3 text-light-purple text-right font-medium">
                      {(Number.parseFloat(paymentAmount) * 320).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-gray-light text-sm">
                    ≈ ${(Number.parseFloat(paymentAmount) * 3200).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div className="mt-8 glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-bright-purple" />
                  <span className="text-pure-white font-medium">Optimal Route</span>
                </div>
                <div className="text-green-400 text-sm font-medium">Save 20%</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-light">Route</span>
                  <span className="text-pure-white">LayerZero → PancakeSwap</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-light">Fee</span>
                  <span className="text-pure-white">0.08%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-light">Est. Time</span>
                  <span className="text-pure-white">3-7 minutes</span>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <motion.button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full mt-8 bg-gradient-to-r from-bright-purple to-light-purple text-pure-white py-4 rounded-2xl font-bold text-xl disabled:opacity-50 hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300 purple-pulse"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-pure-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Payment...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Send Cross-Chain Payment</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Scrolling Use Cases */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-light-purple to-bright-purple bg-clip-text text-transparent">
              Real-World Use Cases
            </span>
          </motion.h2>

          <motion.div style={{ x }} className="flex space-x-8">
            {crossChainRoutes.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="flex-shrink-0 w-96"
              >
                <div className="glass glass-hover rounded-3xl p-6 purple-glow-hover">
                  {/* Route Visualization */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-pure-white font-bold"
                        style={{ backgroundColor: route.from.color }}
                      >
                        {route.from.token}
                      </div>
                      <div className="flex flex-col items-center">
                        <ArrowRight className="w-6 h-6 text-gray-light mb-1" />
                        <div className="text-xs text-gray-light">{route.time}</div>
                      </div>
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-pure-white font-bold"
                        style={{ backgroundColor: route.to.color }}
                      >
                        {route.to.token}
                      </div>
                    </div>
                    <div className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                      Save {route.savings}
                    </div>
                  </div>

                  {/* Network Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-light">From Network</span>
                      <span className="text-pure-white font-medium">{route.from.network}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-light">To Network</span>
                      <span className="text-pure-white font-medium">{route.to.network}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-light">Route</span>
                      <span className="text-bright-purple">{route.route}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-light">Fee</span>
                      <span className="text-light-purple">{route.fee}</span>
                    </div>
                  </div>

                  {/* Use Case */}
                  <div className="bg-dark-purple/50 rounded-xl p-4 mb-6">
                    <h4 className="text-pure-white font-semibold mb-2">Use Case</h4>
                    <p className="text-gray-light text-sm">{route.useCase}</p>
                  </div>

                  <motion.button
                    className="w-full bg-gradient-to-r from-bright-purple to-light-purple text-pure-white py-3 rounded-full font-medium hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Use This Route
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 purple-glow"
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
                Why Cross-Chain Payments?
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-bright-purple to-medium-purple rounded-2xl flex items-center justify-center mx-auto mb-4 purple-glow">
                  <DollarSign className="w-8 h-8 text-pure-white" />
                </div>
                <h4 className="text-xl font-bold text-pure-white mb-2">Lower Costs</h4>
                <p className="text-gray-light">Save up to 25% on transaction fees with optimal routing</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-light-purple to-bright-purple rounded-2xl flex items-center justify-center mx-auto mb-4 purple-glow">
                  <Clock className="w-8 h-8 text-pure-white" />
                </div>
                <h4 className="text-xl font-bold text-pure-white mb-2">Faster Settlements</h4>
                <p className="text-gray-light">Complete payments in minutes instead of hours or days</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-bright-purple to-light-purple rounded-2xl flex items-center justify-center mx-auto mb-4 purple-glow">
                  <Shield className="w-8 h-8 text-pure-white" />
                </div>
                <h4 className="text-xl font-bold text-pure-white mb-2">Secure & Trustless</h4>
                <p className="text-gray-light">Powered by battle-tested bridge protocols and smart contracts</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
