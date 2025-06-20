"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Award, Clock, Users, Zap, Star } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { Float, Text3D, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"

function NFTBadge3D({ title, color }: { title: string; color: string }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group>
        <mesh>
          <boxGeometry args={[2, 2, 0.2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <Text3D font="/fonts/Inter_Bold.json" size={0.2} height={0.05} position={[-0.8, -0.1, 0.11]}>
          {title}
          <meshStandardMaterial color="#FFFFFF" />
        </Text3D>
      </group>
    </Float>
  )
}

const nftSessions = [
  {
    id: 1,
    title: "DeFi Mastery Session",
    consultant: "Alex Chen",
    duration: "60 min",
    participants: "1-on-1",
    price: "0.5 ETH",
    rating: 4.9,
    sessions: 150,
    description: "Deep dive into DeFi protocols, yield farming strategies, and risk management",
    color: "#8B5CF6",
  },
  {
    id: 2,
    title: "NFT Strategy Workshop",
    consultant: "Sarah Williams",
    duration: "90 min",
    participants: "Group",
    price: "0.3 ETH",
    rating: 4.8,
    sessions: 120,
    description: "Comprehensive NFT market analysis and collection strategy development",
    color: "#A855F7",
  },
  {
    id: 3,
    title: "Smart Contract Audit",
    consultant: "Marcus Rodriguez",
    duration: "120 min",
    participants: "1-on-1",
    price: "1.2 ETH",
    rating: 5.0,
    sessions: 200,
    description: "Professional smart contract security audit and optimization recommendations",
    color: "#8B5CF6",
  },
]

export default function NFTSessionsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedSession, setSelectedSession] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "-66%"])

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
              <span className="text-bright-purple font-medium">ERC-721 Consultation Sessions</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="nft-sessions-title gradient-title text-5xl md:text-7xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
              NFT Sessions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-light max-w-3xl mx-auto mb-12"
          >
            Exclusive consultation sessions minted as unique NFTs - proof of your Web3 learning journey with
            transferable value
          </motion.p>
        </div>
      </section>

      {/* 3D NFT Showcase */}
      <section className="relative h-96 mb-20">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />

            <group position={[-4, 0, 0]}>
              <NFTBadge3D title="DeFi" color="#8B5CF6" />
            </group>
            <group position={[0, 0, 0]}>
              <NFTBadge3D title="NFT" color="#A855F7" />
            </group>
            <group position={[4, 0, 0]}>
              <NFTBadge3D title="Audit" color="#8B5CF6" />
            </group>

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Suspense>
        </Canvas>
      </section>

      {/* Horizontal Scrolling Sessions */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-pure-white to-bright-purple bg-clip-text text-transparent">
              Available Sessions
            </span>
          </motion.h2>

          <motion.div style={{ x }} className="flex space-x-8">
            {nftSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 50, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -20,
                  rotateY: 10,
                  scale: 1.05,
                }}
                className="flex-shrink-0 w-96 perspective-1000 cursor-pointer"
                onClick={() => setSelectedSession(session.id)}
              >
                <div className="glass glass-hover rounded-3xl overflow-hidden transform-3d transition-all duration-500 purple-glow-hover">
                  {/* NFT Badge */}
                  <div className="relative h-48 bg-gradient-to-br from-pure-black to-dark-purple flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-pure-black/80 to-transparent" />
                    <div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold text-pure-white purple-glow"
                      style={{ background: `linear-gradient(45deg, ${session.color}, ${session.color}80)` }}
                    >
                      NFT
                    </div>
                    <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-sm font-medium text-bright-purple">
                      #{session.id.toString().padStart(3, "0")}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-pure-white mb-2 group-hover:text-bright-purple transition-colors duration-300">
                      {session.title}
                    </h3>
                    <p className="text-light-purple font-medium mb-4">with {session.consultant}</p>
                    <p className="text-gray-light text-sm mb-6">{session.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-gray-light">
                          <Clock className="w-4 h-4" />
                          <span>{session.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-light">
                          <Users className="w-4 h-4" />
                          <span>{session.participants}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-pure-white font-medium">{session.rating}</span>
                        </div>
                        <div className="text-gray-light">{session.sessions} sessions</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
                        {session.price}
                      </div>
                      <motion.button
                        className="bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300"
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
          </motion.div>
        </div>
      </section>

      {/* NFT Benefits */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 purple-glow"
          >
            <h3 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
                Why Session NFTs?
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-bright-purple to-light-purple rounded-2xl flex items-center justify-center mx-auto mb-4 purple-glow">
                  <Award className="w-8 h-8 text-pure-white" />
                </div>
                <h4 className="text-xl font-bold text-pure-white mb-2">Proof of Learning</h4>
                <p className="text-gray-light">Verifiable credentials of your Web3 education journey</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-light-purple to-bright-purple rounded-2xl flex items-center justify-center mx-auto mb-4 purple-glow">
                  <Users className="w-8 h-8 text-pure-white" />
                </div>
                <h4 className="text-xl font-bold text-pure-white mb-2">Exclusive Access</h4>
                <p className="text-gray-light">Join exclusive communities and future session discounts</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-bright-purple to-light-purple rounded-2xl flex items-center justify-center mx-auto mb-4 purple-glow">
                  <Zap className="w-8 h-8 text-pure-white" />
                </div>
                <h4 className="text-xl font-bold text-pure-white mb-2">Transferable Value</h4>
                <p className="text-gray-light">Trade or gift your session NFTs with embedded knowledge value</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
