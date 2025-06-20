"use client"

import { useRef, useEffect } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const badge = badgeRef.current
    const buttons = buttonsRef.current
    const scrollIndicator = scrollIndicatorRef.current
    const particles = particlesRef.current

    if (!section || !title || !subtitle || !badge || !buttons || !scrollIndicator || !particles) return

    // Create timeline for hero entrance
    const tl = gsap.timeline({ delay: 0.5 })

    // Badge animation
    tl.fromTo(
      badge,
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
    )

    // Title animation with split text effect
    tl.fromTo(
      title.children,
      {
        y: 100,
        opacity: 0,
        rotationX: 90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      },
      "-=0.4",
    )

    // Subtitle animation
    tl.fromTo(
      subtitle,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6",
    )

    // Buttons animation
    tl.fromTo(
      buttons.children,
      {
        y: 30,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.2,
      },
      "-=0.4",
    )

    // Scroll indicator animation
    tl.fromTo(
      scrollIndicator,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.2",
    )

    // Floating particles animation
    gsap.set(particles.children, {
      x: () => Math.random() * window.innerWidth,
      y: () => Math.random() * window.innerHeight,
      opacity: 0,
    })

    gsap.to(particles.children, {
      y: "-=100",
      opacity: 1,
      duration: () => Math.random() * 3 + 2,
      ease: "none",
      repeat: -1,
      stagger: {
        amount: 2,
        repeat: -1,
      },
      delay: () => Math.random() * 2,
    })

    // Parallax scroll effect
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.to(section, {
          y: progress * 200,
          opacity: 1 - progress * 0.8,
          duration: 0.1,
          ease: "none",
        })
      },
    })

    // Continuous scroll indicator animation
    gsap.to(scrollIndicator.querySelector(".scroll-dot"), {
      y: 12,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    })

    // Cleanup
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="text-center max-w-6xl mx-auto">
        {/* Floating particles */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00BFFF] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div ref={badgeRef} className="mb-6">
          <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-[#00BFFF]" />
            <span className="text-[#00BFFF] text-sm font-medium">Next-Gen Web3 Consultancy</span>
          </div>
        </div>

        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          <span className="block bg-gradient-to-r from-white via-[#00BFFF] to-white bg-clip-text text-transparent">
            Build the Future
          </span>
          <span className="block bg-gradient-to-r from-[#00BFFF] to-[#FFD700] bg-clip-text text-transparent">
            with Web3Wise
          </span>
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Premium Web3 consultancy, AI-powered tools, and expert guidance to accelerate your blockchain journey with
          confidence.
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <button
            className="group bg-gradient-to-r from-[#00BFFF] to-[#FFD700] text-black px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 shadow-xl shadow-[#00BFFF]/25"
            onMouseEnter={(e) => {
              gsap.to(e.target, {
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px rgba(0, 191, 255, 0.4)",
                duration: 0.3,
                ease: "power2.out",
              })
              gsap.to(e.target.querySelector(".arrow"), {
                x: 5,
                duration: 0.3,
                ease: "power2.out",
              })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, {
                scale: 1,
                y: 0,
                boxShadow: "0 8px 32px rgba(0, 191, 255, 0.25)",
                duration: 0.3,
                ease: "power2.out",
              })
              gsap.to(e.target.querySelector(".arrow"), {
                x: 0,
                duration: 0.3,
                ease: "power2.out",
              })
            }}
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 arrow" />
          </button>

          <button
            className="glass glass-hover text-white px-8 py-4 rounded-full font-semibold text-lg"
            onMouseEnter={(e) => {
              gsap.to(e.target, {
                scale: 1.05,
                y: -2,
                duration: 0.3,
                ease: "power2.out",
              })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              })
            }}
          >
            Watch Demo
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-[#00BFFF]/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-[#00BFFF] to-[#FFD700] rounded-full mt-2 scroll-dot" />
        </div>
      </div>
    </section>
  )
}
