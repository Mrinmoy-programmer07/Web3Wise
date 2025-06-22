"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { MessageSquare, Bot, Terminal, Send, Zap, Users, Clock } from "lucide-react"
import SplineViewer from "@/components/spline-viewer"
import { Suspense } from "react"

const terminalCommands = [
  { command: "$ web3wise --help", output: "Web3Wise AI Assistant v2.0.1" },
  { command: "$ analyze --contract 0x742d35...", output: "✓ Contract analysis complete" },
  { command: "$ defi --strategy yield-farming", output: "📊 Generating DeFi strategy..." },
  { command: "$ nft --market-analysis", output: "🎨 NFT market trends loaded" },
]

const chatMessages = [
  { type: "user", message: "What are the best DeFi protocols for yield farming?", time: "2:34 PM" },
  {
    type: "bot",
    message:
      "Based on current market conditions, I recommend Aave, Compound, and Uniswap V3. Here's a detailed analysis with APY comparisons...",
    time: "2:34 PM",
  },
  { type: "user", message: "Can you help me audit this smart contract?", time: "2:35 PM" },
  {
    type: "bot",
    message:
      "I'll analyze your contract for security vulnerabilities and gas optimization. Please share the contract code or address.",
    time: "2:35 PM",
  },
  { type: "user", message: "How do I bridge tokens from Ethereum to Polygon?", time: "2:36 PM" },
  {
    type: "bot",
    message:
      "I'll guide you through the cross-chain bridge process. First, connect your wallet and select the tokens...",
    time: "2:36 PM",
  },
]

export default function BotSupportPage() {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [terminalText, setTerminalText] = useState("")
  const [currentMessage, setCurrentMessage] = useState(0)
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: "Hello! I am Web3Wise AI. How can I assist you today?", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ])
  const [conversationHistory, setConversationHistory] = useState([
    { role: "assistant", content: "Hello! I am Web3Wise AI. How can I assist you today?" }
  ])

  // Terminal animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommand((prev) => (prev + 1) % terminalCommands.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const command = terminalCommands[currentCommand]
    let index = 0
    setTerminalText("")

    const typeInterval = setInterval(() => {
      if (index < command.command.length) {
        setTerminalText(command.command.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setTerminalText(command.command + "\n" + command.output)
        }, 500)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [currentCommand])

  // Chat animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % chatMessages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (chatInput.trim() === "") return
    
    const userMessage = chatInput.trim()
    setChatInput("")
    
    // Add user message to chat
    const newMessages = [...messages, { from: "user", text: userMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
    setMessages(newMessages)
    
    // Add to conversation history
    const updatedHistory = [...conversationHistory, { role: "user", content: userMessage }]
    setConversationHistory(updatedHistory)
    
    // Show typing indicator
    setIsTyping(true)
    
    try {
      // Call the bot support API
      const response = await fetch('/api/bot-support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: updatedHistory
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to get response')
      }

      // Add bot response to chat
      const botResponse = result.response
      setMessages([...newMessages, { 
        from: "bot", 
        text: botResponse, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      
      // Add bot response to conversation history
      setConversationHistory([...updatedHistory, { role: "assistant", content: botResponse }])

    } catch (error) {
      console.error('Error getting bot response:', error)
      // Add error message to chat
      setMessages([...newMessages, { 
        from: "bot", 
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="relative min-h-screen pt-24 bg-pure-black text-pure-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 mb-8 purple-glow">
                <Bot className="w-5 h-5 text-bright-purple" />
                <span className="text-bright-purple font-medium">AI-Powered Bot Support</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
                Instant Support
              </span>
            </h1>

            <p className="text-xl text-gray-light max-w-xl mb-12">
              Our AI assistant, powered by the latest models, provides instant, intelligent support for all your Web3
              questions.
            </p>
          </motion.div>

          {/* Right 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="relative w-full h-[400px] lg:h-[500px]"
          >
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D Model...</div>}>
              <SplineViewer scene="https://prod.spline.design/xzU3XjMvmV2t5Xy0/scene.splinecode" />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Terminal and Chat Interface */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Animated Terminal */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass rounded-3xl overflow-hidden purple-glow">
                {/* Terminal Header */}
                <div className="bg-gradient-to-r from-bright-purple/20 to-light-purple/20 px-6 py-4 border-b border-bright-purple/20">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-5 h-5 text-bright-purple" />
                      <span className="text-pure-white font-medium">Web3Wise Terminal</span>
                    </div>
                  </div>
                </div>

                {/* Terminal Content */}
                <div ref={terminalRef} className="p-6 h-96 bg-pure-black/50 font-mono text-sm overflow-hidden">
                  <div className="text-green-400 mb-4">
                    Welcome to Web3Wise AI Terminal
                    <br />
                    Type 'help' for available commands
                    <br />
                    ================================
                  </div>

                  <div className="space-y-4">
                    {terminalCommands.slice(0, currentCommand + 1).map((cmd, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-bright-purple">
                          {index === currentCommand ? terminalText : cmd.command}
                          {index === currentCommand && terminalText === cmd.command && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                              className="ml-1"
                            >
                              |
                            </motion.span>
                          )}
                        </div>
                        {index < currentCommand && <div className="text-gray-light mt-1">{cmd.output}</div>}
                        {index === currentCommand && terminalText.includes("\n") && (
                          <div className="text-gray-light mt-1">{cmd.output}</div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 text-bright-purple">
                    $ <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Telegram Chat Interface */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass rounded-3xl overflow-hidden purple-glow">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-light-purple/20 to-bright-purple/20 px-6 py-4 border-b border-bright-purple/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-bright-purple to-light-purple rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-pure-white" />
                    </div>
                    <div>
                      <h3 className="text-pure-white font-semibold">Web3Wise Bot</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <p className="text-green-400 text-sm">Online • Instant replies</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div ref={chatContainerRef} className="p-6 h-80 overflow-y-auto space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="max-w-xs">
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            msg.from === "user"
                              ? "bg-gradient-to-r from-bright-purple to-light-purple text-pure-white ml-4"
                              : "glass text-gray-light mr-4"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <p className="text-xs text-gray-light mt-1 px-2">{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="glass px-4 py-3 rounded-2xl mr-4">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                            className="w-2 h-2 bg-bright-purple rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                            className="w-2 h-2 bg-bright-purple rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                            className="w-2 h-2 bg-bright-purple rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-bright-purple/20">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask me anything about Web3..."
                      className="flex-1 glass rounded-full px-4 py-2 text-pure-white placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-bright-purple transition-all duration-200"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      className="w-10 h-10 bg-gradient-to-r from-bright-purple to-light-purple rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Send className="w-5 h-5 text-pure-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
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
              AI Assistant Features
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Instant Responses",
                description: "Get immediate answers to your Web3 questions with lightning-fast AI processing",
                color: "from-bright-purple to-medium-purple",
              },
              {
                icon: Users,
                title: "Multi-Platform Support",
                description: "Available on Telegram, Discord, and web interface for seamless accessibility",
                color: "from-light-purple to-bright-purple",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Round-the-clock assistance with no downtime or waiting periods",
                color: "from-bright-purple to-light-purple",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass glass-hover rounded-3xl p-8 text-center purple-glow-hover"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 purple-glow`}
                >
                  <feature.icon className="w-8 h-8 text-pure-white" />
                </div>
                <h3 className="text-xl font-bold text-pure-white mb-4">{feature.title}</h3>
                <p className="text-gray-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 purple-glow"
          >
            <h3 className="text-3xl font-bold text-pure-white mb-6">
              Start Chatting with{" "}
              <span className="bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent">
                Web3Wise AI
              </span>
            </h3>
            <p className="text-gray-light mb-8 max-w-2xl mx-auto">
              Join thousands of Web3 builders who rely on our AI assistant for instant guidance, market insights, and
              technical support.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                className="bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-bright-purple/25 transition-all duration-300 purple-pulse"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://t.me/web3wise_bot', '_blank')}
              >
                <MessageSquare className="w-5 h-5 inline mr-2" />
                Start on Telegram
              </motion.button>

              <motion.button
                className="glass glass-hover text-pure-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Web chat coming soon!')}
              >
                Try Web Interface
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
