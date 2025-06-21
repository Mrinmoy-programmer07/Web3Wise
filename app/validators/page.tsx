"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Upload, Shield, CheckCircle, AlertTriangle, XCircle, Code, Zap, FileText } from "lucide-react"

interface ValidationIssue {
  type: "ERROR" | "WARNING" | "INFO"
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
  line: number
  title: string
  description: string
  suggestion: string
}

interface SecurityCheck {
  check: string
  status: "PASSED" | "FAILED" | "WARNING"
  description: string
}

interface BestPractice {
  practice: string
  status: "FOLLOWED" | "NOT_FOLLOWED"
  description: string
}

interface GasOptimization {
  status: "OPTIMIZED" | "NEEDS_IMPROVEMENT"
  suggestions: string[]
}

interface ValidationResult {
  overallStatus: "PASSED" | "WARNING" | "FAILED" | "ERROR"
  summary: string
  lineCount: number
  issues: ValidationIssue[]
  securityChecks: SecurityCheck[]
  bestPractices: BestPractice[]
  gasOptimization: GasOptimization
  recommendations: string[]
}

export default function ValidatorsPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>("")
  const [contractAddress, setContractAddress] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [error, setError] = useState<string>("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check if it's a .move file
      if (!file.name.endsWith('.move')) {
        setError("Please upload a .move file")
        return
      }
      
      setError("")
      setUploadedFile(file)
      
      // Read file content
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setFileContent(content)
      }
      reader.readAsText(file)
    }
  }

  const handleValidation = async () => {
    if (!fileContent && !contractAddress) {
      setError("Please upload a Move file or enter a contract address")
      return
    }

    setIsValidating(true)
    setError("")
    setShowResults(false)

    try {
      if (fileContent) {
        // Validate Move file using Gemini API
        const response = await fetch('/api/move-validator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ moveCode: fileContent }),
        })

        if (!response.ok) {
          throw new Error('Failed to validate contract')
        }

        const result = await response.json()
        setValidationResult(result)
      } else {
        // For contract address validation (placeholder for now)
        setTimeout(() => {
          setValidationResult({
            overallStatus: "WARNING",
            summary: "Contract address validation is not yet implemented for Move contracts",
            lineCount: 0,
            issues: [{
              type: "WARNING",
              severity: "MEDIUM",
              line: 1,
              title: "Address Validation",
              description: "Contract address validation is not yet implemented for Move contracts",
              suggestion: "Please upload a .move file for validation"
            }],
            securityChecks: [],
            bestPractices: [],
            gasOptimization: { status: "UNKNOWN", suggestions: [] },
            recommendations: ["Upload a .move file for full validation"]
          })
        }, 2000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Validation failed')
    } finally {
      setIsValidating(false)
      setShowResults(true)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PASSED":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "WARNING":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case "FAILED":
      case "ERROR":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Shield className="w-5 h-5 text-gray-light" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PASSED":
        return "border-green-400/20 bg-green-400/5"
      case "WARNING":
        return "border-yellow-400/20 bg-yellow-400/5"
      case "FAILED":
      case "ERROR":
        return "border-red-400/20 bg-red-400/5"
      default:
        return "border-gray-light/20 bg-gray-light/5"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-400/20 text-red-400"
      case "HIGH":
        return "bg-orange-400/20 text-orange-400"
      case "MEDIUM":
        return "bg-yellow-400/20 text-yellow-400"
      case "LOW":
        return "bg-blue-400/20 text-blue-400"
      default:
        return "bg-gray-400/20 text-gray-400"
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
              <span className="text-bright-purple font-medium">AI-Powered Move Contract Validation</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="validator-title gradient-title text-5xl md:text-7xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
              Move Contract Validator
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-light max-w-3xl mx-auto mb-12"
          >
            Advanced AI-powered Move smart contract auditing and validation to ensure security and optimal performance
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
            {error && (
              <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 rounded-xl">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* File Upload */}
              <div>
                <h3 className="text-2xl font-bold text-pure-white mb-6 flex items-center space-x-2">
                  <Upload className="w-6 h-6 text-bright-purple" />
                  <span>Upload Move Contract</span>
                </h3>

                <div className="border-2 border-dashed border-bright-purple/30 rounded-2xl p-8 text-center hover:border-bright-purple/50 transition-colors duration-300">
                  <input
                    type="file"
                    accept=".move"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="contract-upload"
                  />
                  <label htmlFor="contract-upload" className="cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-r from-bright-purple to-light-purple rounded-2xl flex items-center justify-center mx-auto mb-4 purple-glow">
                      <Code className="w-8 h-8 text-pure-white" />
                    </div>
                    <p className="text-pure-white font-medium mb-2">
                      {uploadedFile ? uploadedFile.name : "Drop your .move file here"}
                    </p>
                    <p className="text-gray-light text-sm">or click to browse</p>
                  </label>
                </div>

                {uploadedFile && (
                  <div className="mt-4 p-4 glass rounded-xl">
                    <p className="text-pure-white text-sm">
                      <strong>File:</strong> {uploadedFile.name}
                    </p>
                    <p className="text-gray-light text-sm">
                      <strong>Size:</strong> {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                    <p className="text-gray-light text-sm">
                      <strong>Lines:</strong> {fileContent.split('\n').length}
                    </p>
                  </div>
                )}
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
                    <option value="sui" className="bg-pure-black">
                      Sui Network
                    </option>
                    <option value="aptos" className="bg-pure-black">
                      Aptos Network
                    </option>
                    <option value="starcoin" className="bg-pure-black">
                      Starcoin
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
                    <span>Validating Move Contract...</span>
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
      {showResults && validationResult && (
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

            {/* Summary */}
            <div className="glass rounded-2xl p-6 mb-8 purple-glow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-pure-white">Summary</h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(validationResult.overallStatus)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    validationResult.overallStatus === "PASSED" ? "bg-green-400/20 text-green-400" :
                    validationResult.overallStatus === "WARNING" ? "bg-yellow-400/20 text-yellow-400" :
                    "bg-red-400/20 text-red-400"
                  }`}>
                    {validationResult.overallStatus}
                  </span>
                </div>
              </div>
              <p className="text-gray-light">{validationResult.summary}</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-bright-purple">{validationResult.lineCount}</div>
                  <div className="text-gray-light text-sm">Lines of Code</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-bright-purple">{validationResult.issues.length}</div>
                  <div className="text-gray-light text-sm">Issues Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-bright-purple">{validationResult.securityChecks.length}</div>
                  <div className="text-gray-light text-sm">Security Checks</div>
                </div>
              </div>
            </div>

            {/* Issues */}
            {validationResult.issues.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-pure-white mb-6">Issues Found</h3>
                <div className="space-y-4">
                  {validationResult.issues.map((issue, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`glass rounded-2xl p-6 border ${getStatusColor(issue.type)}`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">{getStatusIcon(issue.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-pure-white">{issue.title}</h4>
                            <div className="flex items-center space-x-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                                {issue.severity}
                              </span>
                              <span className="text-gray-light text-sm">Line {issue.line}</span>
                            </div>
                          </div>
                          <p className="text-gray-light mb-2">{issue.description}</p>
                          <p className="text-bright-purple text-sm">
                            <strong>Suggestion:</strong> {issue.suggestion}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Checks */}
            {validationResult.securityChecks.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-pure-white mb-6">Security Checks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {validationResult.securityChecks.map((check, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`glass rounded-2xl p-6 border ${getStatusColor(check.status)}`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        {getStatusIcon(check.status)}
                        <h4 className="text-lg font-semibold text-pure-white">{check.check}</h4>
                      </div>
                      <p className="text-gray-light text-sm">{check.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Best Practices */}
            {validationResult.bestPractices.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-pure-white mb-6">Best Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {validationResult.bestPractices.map((practice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`glass rounded-2xl p-6 border ${
                        practice.status === "FOLLOWED" ? "border-green-400/20 bg-green-400/5" : "border-yellow-400/20 bg-yellow-400/5"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        {practice.status === "FOLLOWED" ? 
                          <CheckCircle className="w-5 h-5 text-green-400" /> : 
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        }
                        <h4 className="text-lg font-semibold text-pure-white">{practice.practice}</h4>
                      </div>
                      <p className="text-gray-light text-sm">{practice.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Gas Optimization */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-pure-white mb-6">Gas Optimization</h3>
              <div className="glass rounded-2xl p-6 purple-glow">
                <div className="flex items-center space-x-3 mb-4">
                  {validationResult.gasOptimization.status === "OPTIMIZED" ? 
                    <CheckCircle className="w-6 h-6 text-green-400" /> : 
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  }
                  <h4 className="text-xl font-semibold text-pure-white">
                    Status: {validationResult.gasOptimization.status}
                  </h4>
                </div>
                {validationResult.gasOptimization.suggestions.length > 0 && (
                  <div>
                    <h5 className="text-lg font-semibold text-pure-white mb-3">Suggestions:</h5>
                    <ul className="space-y-2">
                      {validationResult.gasOptimization.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-gray-light text-sm flex items-start space-x-2">
                          <span className="text-bright-purple mt-1">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations */}
            {validationResult.recommendations.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-pure-white mb-6">Recommendations</h3>
                <div className="glass rounded-2xl p-6 purple-glow">
                  <ul className="space-y-3">
                    {validationResult.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-gray-light flex items-start space-x-3">
                        <span className="text-bright-purple mt-1">•</span>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12">
              <motion.button
                className="bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const report = JSON.stringify(validationResult, null, 2)
                  const blob = new Blob([report], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'move-validation-report.json'
                  a.click()
                }}
              >
                <FileText className="w-5 h-5 inline mr-2" />
                Download Report
              </motion.button>

              <motion.button
                className="glass glass-hover text-pure-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('mailto:consult@web3wise.com?subject=Book%20Expert%20Move%20Review')}
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
              Move Validation Features
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Security Analysis",
                description:
                  "Comprehensive security vulnerability detection for Move contracts including resource safety and access control",
              },
              {
                icon: Zap,
                title: "Gas Optimization",
                description: "Identify gas-inefficient patterns and suggest optimizations specific to Move language",
              },
              {
                icon: Code,
                title: "Move Best Practices",
                description: "Move language best practices compliance checking and code quality assessment",
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
