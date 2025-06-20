"use client"

import { motion } from "framer-motion"
import { ArrowUpDown, TrendingUp, Zap } from "lucide-react"
import { useState } from "react"

const cryptos = [
  { symbol: "BTC", name: "Bitcoin", price: 45000, change: 2.5 },
  { symbol: "ETH", name: "Ethereum", price: 3200, change: 1.8 },
  { symbol: "SOL", name: "Solana", price: 120, change: -0.5 },
  { symbol: "MATIC", name: "Polygon", price: 0.85, change: 3.2 },
]

export default function CryptoConverterSection() {
  const [fromCrypto, setFromCrypto] = useState("BTC")
  const [toCrypto, setToCrypto] = useState("ETH")
  const [amount, setAmount] = useState("1")

  const swapCryptos = () => {
    setFromCrypto(toCrypto)
    setToCrypto(fromCrypto)
  }

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
            <span className="bg-gradient-to-r from-white to-[#928DAB] bg-clip-text text-transparent">Crypto Tools</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced crypto conversion and deal finding tools powered by real-time market data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Crypto Converter */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] rounded-xl flex items-center justify-center">
                  <ArrowUpDown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Crypto Converter</h3>
              </div>

              <div className="space-y-6">
                {/* From */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">From</label>
                  <div className="flex space-x-4">
                    <select
                      value={fromCrypto}
                      onChange={(e) => setFromCrypto(e.target.value)}
                      className="flex-1 bg-white/10 border border-[#928DAB]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#928DAB] transition-colors duration-200"
                    >
                      {cryptos.map((crypto) => (
                        <option key={crypto.symbol} value={crypto.symbol} className="bg-[#1F1C2C]">
                          {crypto.symbol} - {crypto.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-32 bg-white/10 border border-[#928DAB]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#928DAB] transition-colors duration-200"
                      placeholder="Amount"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <motion.button
                    onClick={swapCryptos}
                    className="w-12 h-12 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-[#928DAB]/25 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowUpDown className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* To */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">To</label>
                  <div className="flex space-x-4">
                    <select
                      value={toCrypto}
                      onChange={(e) => setToCrypto(e.target.value)}
                      className="flex-1 bg-white/10 border border-[#928DAB]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#928DAB] transition-colors duration-200"
                    >
                      {cryptos.map((crypto) => (
                        <option key={crypto.symbol} value={crypto.symbol} className="bg-[#1F1C2C]">
                          {crypto.symbol} - {crypto.name}
                        </option>
                      ))}
                    </select>
                    <div className="w-32 bg-white/5 border border-[#928DAB]/20 rounded-xl px-4 py-3 text-[#928DAB] font-medium flex items-center justify-center">
                      {(Number.parseFloat(amount) * 14.06).toFixed(4)}
                    </div>
                  </div>
                </div>

                <motion.button
                  className="w-full bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#928DAB]/25 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Convert Now
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Deal Finder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="backdrop-blur-xl bg-white/5 border border-[#928DAB]/20 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Best Deals</h3>
              </div>

              <div className="space-y-4">
                {cryptos.map((crypto, index) => (
                  <motion.div
                    key={crypto.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-[#928DAB]/20 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{crypto.symbol[0]}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{crypto.symbol}</div>
                          <div className="text-gray-400 text-sm">{crypto.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">${crypto.price.toLocaleString()}</div>
                        <div className={`text-sm ${crypto.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {crypto.change >= 0 ? "+" : ""}
                          {crypto.change}%
                        </div>
                      </div>
                    </div>

                    <motion.button
                      className="w-full mt-3 bg-gradient-to-r from-[#928DAB] to-[#B8B3CC] text-white py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Find Best Rate
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#928DAB]/20 to-[#B8B3CC]/20 rounded-xl border border-[#928DAB]/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-[#928DAB]" />
                  <span className="text-white font-semibold">Smart Arbitrage</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Our AI scans 50+ exchanges to find the best rates and arbitrage opportunities in real-time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
