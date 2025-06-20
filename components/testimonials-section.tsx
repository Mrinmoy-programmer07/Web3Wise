"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Michael Chen",
    role: "DeFi Protocol Founder",
    company: "YieldMax",
    rating: 5,
    text: "Web3Wise helped us navigate the complex DeFi landscape and launch our protocol successfully. Their expertise is unmatched.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Sarah Johnson",
    role: "NFT Artist",
    company: "CryptoArt Studio",
    rating: 5,
    text: "The NFT strategy session was incredible. I learned so much about tokenomics and community building. Highly recommended!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "David Rodriguez",
    role: "Blockchain Developer",
    company: "ChainTech Solutions",
    rating: 5,
    text: "Their smart contract auditing service saved us from potential vulnerabilities. Professional, thorough, and reliable.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Emily Zhang",
    role: "Crypto Investor",
    company: "Digital Assets Fund",
    rating: 5,
    text: "The AI-powered insights and market analysis have been game-changing for our investment strategy. Exceptional service!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Alex Thompson",
    role: "Web3 Startup CEO",
    company: "DecentralizedTech",
    rating: 5,
    text: "From tokenomics to technical implementation, Web3Wise provided end-to-end guidance that accelerated our growth.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"])

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
              Client Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Hear from the Web3 builders and innovators who've accelerated their journey with Web3Wise
          </p>
        </motion.div>

        {/* Horizontal Scrolling Testimonials */}
        <div className="relative">
          <motion.div style={{ x }} className="flex space-x-8 pb-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="flex-shrink-0 w-96"
              >
                <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-8 h-full hover:bg-white/10 transition-all duration-300 group relative">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <Quote className="w-12 h-12 text-[#928DAB]" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#928DAB]/30 group-hover:border-[#928DAB] transition-colors duration-300">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg group-hover:text-[#928DAB] transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      <p className="text-[#928DAB] text-sm font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-[#928DAB] mb-2"
                >
                  4.9/5
                </motion.div>
                <p className="text-gray-400">Average Rating</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-[#928DAB] mb-2"
                >
                  500+
                </motion.div>
                <p className="text-gray-400">Happy Clients</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-[#928DAB] mb-2"
                >
                  1000+
                </motion.div>
                <p className="text-gray-400">Sessions Completed</p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-[#928DAB] mb-2"
                >
                  98%
                </motion.div>
                <p className="text-gray-400">Success Rate</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
