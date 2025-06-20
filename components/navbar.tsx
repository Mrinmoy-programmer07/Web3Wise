"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  Zap,
  Home,
  Award,
  Users,
  Shield,
  Bot,
  ArrowUpDown,
  FileText,
  CreditCard,
  Wallet,
  Check,
  AlertCircle,
} from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "NFT Sessions", href: "/nft-sessions", icon: Award },
  { name: "Consultants", href: "/consultants", icon: Users },
  { name: "Validators", href: "/validators", icon: Shield },
  { name: "Bot Support", href: "/bot-support", icon: Bot },
  { name: "Swap Finder", href: "/swap-finder", icon: ArrowUpDown },
  { name: "Research Hub", href: "/research-hub", icon: FileText },
  { name: "Cross-Chain Payments", href: "/cross-chain-payments", icon: CreditCard },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState("")
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Safe mounting check
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const connectWallet = async () => {
    // Only attempt connection when user explicitly clicks
    if (!mounted || typeof window === "undefined") return

    setIsConnecting(true)
    setConnectionError("")

    try {
      // Safe check for Petra wallet
      const aptos = (window as any).aptos

      if (!aptos) {
        setConnectionError("Petra Wallet is not installed. Please install Petra to continue.")
        setIsConnecting(false)
        return
      }

      // Request account access only when user clicks
      const response = await aptos.connect()
      if (response && response.address) {
        setIsConnected(true)
        setWalletAddress(response.address)
        setConnectionError("")
      }
    } catch (error: any) {
      console.warn("Wallet connection error:", error)
      if (error.code === 4001) {
        setConnectionError("Connection rejected by user")
      } else if (error.code === -32002) {
        setConnectionError("Connection request already pending")
      } else {
        setConnectionError("Failed to connect wallet. Please try again.")
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    setIsConnected(false)
    setWalletAddress("")
    setConnectionError("")
    try {
      const aptos = (window as any).aptos
      if (aptos) {
        await aptos.disconnect()
      }
    } catch (error) {
      // Ignore errors on disconnect
    }
  }

  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Show loading state until mounted
  if (!mounted) {
    return (
      <nav className="fixed top-6 left-6 right-6 z-50">
        <div className="flex items-center justify-between glass rounded-2xl px-4 py-3 border border-bright-purple/40 purple-glow">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-800/50 rounded-lg animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-800/50 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-800/50 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-32 h-10 bg-gray-800/50 rounded-xl animate-pulse"></div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Top fixed navbar */}
      <nav className="fixed top-6 left-6 right-6 z-50">
        <div
          className="flex items-center justify-between glass rounded-2xl px-4 py-3 border border-bright-purple/40 purple-glow"
          style={{
            background: "rgba(31, 27, 36, 0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Left side - Logo and Menu */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer transition-transform duration-300 ease-out hover:scale-105">
                <div className="w-8 h-8 bg-gradient-to-r from-bright-purple to-light-purple rounded-lg flex items-center justify-center shadow-lg shadow-bright-purple/30 purple-glow">
                  <Zap className="w-5 h-5 text-pure-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent brand-title web3wise-title">
                  Web3Wise
                </span>
              </div>
            </Link>

            {/* Menu Button */}
            <button
              onClick={toggleSidebar}
              className="text-pure-white p-2 rounded-lg hover:bg-dark-purple/50 transition-all duration-200 hover:scale-110"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Right side - Connect Wallet */}
          <div className="flex items-center space-x-4">
            {/* Connection Error */}
            {connectionError && (
              <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
                <AlertCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{connectionError}</span>
              </div>
            )}

            {/* Connect Wallet Button */}
            {!isConnected ? (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="flex items-center space-x-2 bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-bright-purple/30 hover:shadow-2xl hover:shadow-bright-purple/40 transition-all duration-300 purple-glow hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Wallet className="w-5 h-5" />
                <span className="hidden sm:inline">{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
                <span className="sm:hidden">{isConnecting ? "..." : "Connect"}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Connected Status */}
                <div className="flex items-center space-x-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-lg border border-green-500/20">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium font-mono">{formatAddress(walletAddress)}</span>
                </div>

                {/* Disconnect Button */}
                <button
                  onClick={disconnectWallet}
                  className="text-gray-light hover:text-pure-white p-2 rounded-lg hover:bg-dark-purple/50 transition-all duration-200 hover:scale-110"
                  title="Disconnect Wallet"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-pure-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Left Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 z-50 flex flex-col transform transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "rgba(31, 27, 36, 0.98)",
          backdropFilter: "blur(30px)",
          borderRight: "1px solid rgba(45, 27, 61, 0.5)",
        }}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 p-8 pb-6">
          <div className="flex items-center space-x-3 pb-6 border-b border-dark-purple">
            <div className="w-12 h-12 bg-gradient-to-r from-bright-purple to-light-purple rounded-xl flex items-center justify-center shadow-lg shadow-bright-purple/30 purple-glow">
              <Zap className="w-7 h-7 text-pure-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-bright-purple to-light-purple bg-clip-text text-transparent brand-title web3wise-title">
                Web3Wise
              </h2>
              <p className="text-gray-light text-sm">Next-Gen Platform</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 sidebar-scroll">
          {/* Navigation Items */}
          <div className="space-y-2 mb-8">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={`nav-item flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 cursor-pointer group hover:scale-105 ${
                      isActive
                        ? "bg-gradient-to-r from-bright-purple/20 to-light-purple/20 border border-bright-purple/30 purple-glow"
                        : "hover:bg-dark-purple/50 hover:border hover:border-bright-purple/20"
                    }`}
                    onClick={toggleSidebar}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-bright-purple to-light-purple text-pure-white"
                          : "bg-dark-purple text-bright-purple group-hover:bg-bright-purple/20"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          isActive ? "text-pure-white" : "text-gray-light group-hover:text-pure-white"
                        }`}
                      >
                        {item.name}
                      </span>
                      {isActive && (
                        <div className="w-2 h-2 bg-gradient-to-r from-bright-purple to-light-purple rounded-full mt-1" />
                      )}
                    </div>
                    <div className="text-xs text-gray-light opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-8 pt-0">
          {/* Wallet Status in Sidebar */}
          {isConnected && (
            <div className="mb-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium text-sm">Wallet Connected</span>
              </div>
              <p className="text-gray-light text-xs font-mono break-all">{walletAddress}</p>
            </div>
          )}

          {/* Mobile Connect Button */}
          {!isConnected && (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-bright-purple to-light-purple text-pure-white px-6 py-4 rounded-xl font-bold text-lg shadow-xl shadow-bright-purple/30 hover:shadow-2xl hover:shadow-bright-purple/40 transition-all duration-300 mb-4 purple-glow purple-pulse hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Wallet className="w-5 h-5" />
              <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            </button>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-dark-purple">
            <p className="text-gray-light text-sm text-center">© 2024 Web3Wise Platform</p>
          </div>
        </div>
      </div>
    </>
  )
}
