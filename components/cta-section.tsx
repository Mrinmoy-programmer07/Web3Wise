"use client"

import { motion } from "framer-motion"
import { ArrowRight, MessageSquare, Wallet, Zap } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#928DAB]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#B8B3CC]/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#928DAB]/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-[#928DAB] to-white bg-clip-text text-transparent">
              Start Building with
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] bg-clip-text text-transparent">
              Web3Wise Today
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join thousands of Web3 builders who trust Web3Wise for expert guidance, cutting-edge tools, and unparalleled
            support in their blockchain journey.
          </p>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-12 mb-12 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Access</h3>
              <p className="text-gray-400">Get started immediately with our AI-powered tools and expert consultants</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-400">Round-the-clock assistance through our Telegram bot and expert network</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure & Trusted</h3>
              <p className="text-gray-400">Enterprise-grade security with proven track record of successful projects</p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              className="group bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white px-12 py-5 rounded-full font-bold text-xl flex items-center space-x-3 hover:shadow-2xl hover:shadow-[#928DAB]/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wallet className="w-6 h-6" />
              <span>Connect Wallet</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-200" />
            </motion.button>

            <motion.button
              className="group backdrop-blur-xl bg-white/10 border-2 border-[#928DAB]/40 text-white px-12 py-5 rounded-full font-bold text-xl flex items-center space-x-3 hover:bg-white/20 hover:border-[#928DAB] transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-6 h-6" />
              <span>Join Telegram</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-8">
            Trusted by 500+ Web3 projects worldwide • Join the future of decentralized innovation
          </p>

          <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
            <div className="text-gray-500 font-semibold">Ethereum</div>
            <div className="text-gray-500 font-semibold">Polygon</div>
            <div className="text-gray-500 font-semibold">Solana</div>
            <div className="text-gray-500 font-semibold">Arbitrum</div>
            <div className="text-gray-500 font-semibold">Optimism</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
