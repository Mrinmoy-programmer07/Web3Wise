"use client"

import type React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Text3D, Environment } from "@react-three/drei"
import { Suspense, useEffect, useState } from "react"

function FloatingLogo() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        W3W
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.3} />
      </Text3D>
    </Float>
  )
}

function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => (
    <Float key={i} speed={1 + Math.random()} rotationIntensity={1} floatIntensity={1}>
      <mesh position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color={Math.random() > 0.5 ? "#8B5CF6" : "#A855F7"}
          emissive={Math.random() > 0.5 ? "#8B5CF6" : "#A855F7"}
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  ))

  return <>{particles}</>
}

function SafeCanvas({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check for potential conflicts
    const checkForConflicts = () => {
      try {
        // Avoid MetaMask detection
        if (typeof window !== "undefined") {
          // Don't access window.ethereum or other Web3 properties
          return true
        }
      } catch (error) {
        console.warn("Browser compatibility check failed:", error)
        setHasError(true)
        return false
      }
      return true
    }

    if (!checkForConflicts()) {
      setHasError(true)
    }
  }, [])

  if (!isClient || hasError) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pure-black via-dark-purple/20 to-pure-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
      </div>
    )
  }

  try {
    return (
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        onError={(error) => {
          console.warn("Canvas error:", error)
          setHasError(true)
        }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    )
  } catch (error) {
    console.warn("Canvas render error:", error)
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pure-black via-dark-purple/20 to-pure-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
      </div>
    )
  }
}

export default function ThreeScene({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed inset-0 -z-10">
      <SafeCanvas>
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />
        <pointLight position={[0, 10, -10]} intensity={0.3} color="#4C1D95" />

        <ParticleField />
        {children}

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </SafeCanvas>
    </div>
  )
}
