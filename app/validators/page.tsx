"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Upload, Shield, CheckCircle, AlertTriangle, XCircle, Code, Zap, FileText } from "lucide-react"

const validationResults = [
  {
    type: "security",
    status: "passed",
    title: "Reentrancy Protection",
    description: "Contract properly implements reentrancy guards",
  },
  {
    type: "security",
    status: "warning",
    title: "Access Control",
    description: "Consider implementing role-based access control",
  },
  {
    type: "gas",
    status: "passed",
    title: "Gas Optimization",
    description: "Efficient gas usage patterns detected",
  },
  {
    type: "security",
    status: "failed",
    title: "Integer Overflow",
    description: "Potential overflow vulnerability in line 42",
  },
]

export default function ValidatorsPage() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [contractAddress, setContractAddress] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
    }
  }

  const handleValidation = () => {
    setIsValidating(true)
    setTimeout(() => {
      setIsValidating(false)
      setShowResults(true)
    }, 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Shield className="w-5 h-5 text-gray-light" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "border-green-400/20 bg-green-400/5"
      case "warning":
        return "border-yellow-400/20 bg-yellow-400/5"
      case "failed":
        return "border-red-400/20 bg-red-400/5"
      default:
        return "border-gray-light/20 bg-gray-light/5"
    }
  }

  return (
    <div className="relative min-h-screen pt-24 bg-pure-black">
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
              <Shield className="w-5 h-5 text-bright-purple" />
              <span className="text-bright-purple font-medium">AI-Powered Smart Contract Validation</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="validator-title gradient-title text-5xl md:text-7xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
              Contract Validator
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-light max-w-3xl mx-auto mb-12"
          >
            Advanced AI-powered smart contract auditing and validation to ensure security and optimal gas efficiency
          </motion.p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 purple-glow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* File Upload */}
              <div>
                <h3 className="text-2xl font-bold text-pure-white mb-6 flex items-center space-x-2">
                  <Upload className="w-6 h-6 text-bright-purple" />
                  <span>Upload Contract</span>
                </h3>

                <div className="border-2 border-dashed border-bright-purple/30 rounded-2xl p-8 text-center hover:border-bright-purple/50 transition-colors duration-300">
                  <input
                    type="file"
                    accept=".sol,.vy"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="contract-upload"
                  />
                  <label htmlFor="contract-upload" className="cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-r from-bright-purple to-light-purple rounded-2xl flex items-center justify-center mx-auto mb-4 purple-glow">
                      <Code className="w-8 h-8 text-pure-white" />
                    </div>
                    <p className="text-pure-white font-medium mb-2">
                      {uploadedFile ? uploadedFile : "Drop your .sol or .vy file here"}
                    </p>
                    <p className="text-gray-light text-sm">or click to browse</p>
                  </label>
                </div>
              </div>

              {/* Contract Address */}
              <div>
                <h3 className="text-2xl font-bold text-pure-white mb-6 flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-light-purple" />
                  <span>Or Enter Address</span>
                </h3>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className="w-full glass rounded-xl px-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                  />

                  <select className="w-full glass rounded-xl px-4 py-3 text-pure-white focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200">
                    <option value="ethereum" className="bg-pure-black">
                      Ethereum Mainnet
                    </option>
                    <option value="polygon" className="bg-pure-black">
                      Polygon
                    </option>
                    <option value="bsc" className="bg-pure-black">
                      BSC
                    </option>
                    <option value="arbitrum" className="bg-pure-black">
                      Arbitrum
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Validation Button */}
            <div className="text-center mt-8">
              <motion.button
                onClick={handleValidation}
                disabled={!uploadedFile && !contractAddress}
                className="bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-12 py-4 rounded-full font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300 purple-pulse"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isValidating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-pure-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Validating...</span>
                  </div>
                ) : (
                  "Start Validation"
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-20 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
                Validation Results
              </span>
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="glass rounded-2xl p-6 text-center purple-glow"
              >
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-400 mb-2">2</div>
                <div className="text-gray-light">Passed</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass rounded-2xl p-6 text-center purple-glow"
              >
                <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-400 mb-2">1</div>
                <div className="text-gray-light">Warnings</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass rounded-2xl p-6 text-center purple-glow"
              >
                <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <div className="text-2xl font-bold text-red-400 mb-2">1</div>
                <div className="text-gray-light">Critical</div>
              </motion.div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4">
              {validationResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass rounded-2xl p-6 border ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">{getStatusIcon(result.status)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-pure-white">{result.title}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            result.status === "passed"
                              ? "bg-green-400/20 text-green-400"
                              : result.status === "warning"
                                ? "bg-yellow-400/20 text-yellow-400"
                                : "bg-red-400/20 text-red-400"
                          }`}
                        >
                          {result.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-light">{result.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12">
              <motion.button
                className="bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/sample-report.pdf', '_blank')}
              >
                <FileText className="w-5 h-5 inline mr-2" />
                Download Report
              </motion.button>

              <motion.button
                className="glass glass-hover text-pure-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('mailto:consult@web3wise.com?subject=Book%20Expert%20Review')}
              >
                Book Expert Review
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-pure-white to-bright-purple bg-clip-text text-transparent">
              Validation Features
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Security Analysis",
                description:
                  "Comprehensive security vulnerability detection including reentrancy, overflow, and access control issues",
              },
              {
                icon: Zap,
                title: "Gas Optimization",
                description: "Identify gas-inefficient patterns and suggest optimizations to reduce transaction costs",
              },
              {
                icon: Code,
                title: "Code Quality",
                description: "Best practices compliance checking and code quality assessment for maintainability",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-6 text-center purple-glow-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-bright-purple to-light-purple rounded-2xl flex items-center justify-center mx-auto mb-6 purple-glow">
                  <feature.icon className="w-8 h-8 text-pure-white" />
                </div>
                <h3 className="text-xl font-bold text-pure-white mb-4">{feature.title}</h3>
                <p className="text-gray-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
