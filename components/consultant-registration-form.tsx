"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X, User, Mail, Phone, Briefcase, DollarSign, MapPin, Globe, Linkedin, Github, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"

interface ConsultantFormData {
  fullName: string
  email: string
  phone: string
  expertise: string
  experience: string
  hourlyRate: string
  location: string
  languages: string[]
  specialties: string[]
  description: string
  linkedinUrl: string
  githubUrl: string
  portfolioUrl: string
}

interface ConsultantRegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (consultant: any) => void
}

const expertiseOptions = [
  "DeFi Architecture",
  "Smart Contracts",
  "NFT Strategy",
  "Tokenomics",
  "Layer 2 Solutions",
  "Web3 Security",
  "Cross-chain Development",
  "DAO Governance",
  "GameFi",
  "DeFi Trading",
  "Blockchain Infrastructure",
  "Web3 Marketing",
  "Legal & Compliance",
  "Data Analytics"
]

const languageOptions = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
  "Portuguese",
  "Russian",
  "Arabic",
  "Hindi"
]

export default function ConsultantRegistrationForm({ isOpen, onClose, onSuccess }: ConsultantRegistrationFormProps) {
  const [formData, setFormData] = useState<ConsultantFormData>({
    fullName: "",
    email: "",
    phone: "",
    expertise: "",
    experience: "",
    hourlyRate: "",
    location: "",
    languages: [],
    specialties: [],
    description: "",
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleInputChange = (field: keyof ConsultantFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const handleSpecialtyAdd = (specialty: string) => {
    if (specialty.trim() && !formData.specialties.includes(specialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty.trim()]
      }))
    }
  }

  const handleSpecialtyRemove = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch('/api/consultant-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
      }

      setSuccess(result.message)
      setTimeout(() => {
        onSuccess(result.consultant)
        onClose()
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          expertise: "",
          experience: "",
          hourlyRate: "",
          location: "",
          languages: [],
          specialties: [],
          description: "",
          linkedinUrl: "",
          githubUrl: "",
          portfolioUrl: ""
        })
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto purple-glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-bright-purple to-light-purple rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-pure-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
                    Become a Consultant
                  </h2>
                  <p className="text-gray-light">Join our expert Web3 consultant network</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-gray-light hover:text-pure-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-400/10 border border-green-400/20 rounded-xl flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-400">{success}</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-400/10 border border-red-400/20 rounded-xl flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-pure-white mb-4 flex items-center space-x-2">
                  <User className="w-5 h-5 text-bright-purple" />
                  <span>Personal Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-light text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full glass rounded-xl px-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-light text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full glass rounded-xl px-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-light text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full glass rounded-xl px-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-light text-sm font-medium mb-2">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full glass rounded-xl px-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      placeholder="City, Country"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-pure-white mb-4 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-bright-purple" />
                  <span>Professional Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-light text-sm font-medium mb-2">Primary Expertise *</label>
                    <select
                      value={formData.expertise}
                      onChange={(e) => handleInputChange('expertise', e.target.value)}
                      className="w-full glass rounded-xl px-4 py-3 text-pure-white focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      required
                    >
                      <option value="" className="bg-pure-black">Select your expertise</option>
                      {expertiseOptions.map((expertise) => (
                        <option key={expertise} value={expertise} className="bg-pure-black">
                          {expertise}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-light text-sm font-medium mb-2">Years of Experience *</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full glass rounded-xl px-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      placeholder="e.g., 3+ years in DeFi"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-light text-sm font-medium mb-2">Hourly Rate (USD) *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-light" />
                      <input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                        className="w-full glass rounded-xl pl-10 pr-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                        placeholder="150"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mt-6">
                  <label className="block text-gray-light text-sm font-medium mb-3">Languages Spoken</label>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((language) => (
                      <motion.button
                        key={language}
                        type="button"
                        onClick={() => handleLanguageToggle(language)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          formData.languages.includes(language)
                            ? "bg-gradient-to-r from-bright-purple to-light-purple text-pure-white"
                            : "glass text-gray-light hover:text-pure-white"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {language}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div className="mt-6">
                  <label className="block text-gray-light text-sm font-medium mb-3">Specialties</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Add a specialty (e.g., Yield Farming)"
                      className="flex-1 glass rounded-xl px-4 py-2 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleSpecialtyAdd(e.currentTarget.value)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                        handleSpecialtyAdd(input.value)
                        input.value = ''
                      }}
                      className="bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-4 py-2 rounded-xl font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add
                    </motion.button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.specialties.map((specialty, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-dark-purple text-gray-light px-3 py-2 rounded-lg text-sm flex items-center space-x-2"
                      >
                        <span>{specialty}</span>
                        <button
                          type="button"
                          onClick={() => handleSpecialtyRemove(specialty)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-pure-white mb-4">About You</h3>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full glass rounded-xl px-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                  placeholder="Tell us about your Web3 experience, achievements, and what makes you unique as a consultant..."
                  rows={4}
                />
              </div>

              {/* Social Links */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-pure-white mb-4 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-bright-purple" />
                  <span>Professional Links</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-light text-sm font-medium mb-2 flex items-center space-x-2">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </label>
                    <input
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                      className="w-full glass rounded-xl px-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-light text-sm font-medium mb-2 flex items-center space-x-2">
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                      className="w-full glass rounded-xl px-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-light text-sm font-medium mb-2 flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Portfolio</span>
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                      className="w-full glass rounded-xl px-4 py-3 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="glass glass-hover text-pure-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-8 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-pure-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 