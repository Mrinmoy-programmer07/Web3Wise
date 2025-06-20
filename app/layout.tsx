import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora, Barlow_Condensed } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import Navbar from "@/components/navbar"
import PageTransition from "@/components/page-transition"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
})

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Web3Wise - Premium Web3 Consultancy Platform",
  description: "Cinematic Web3 consultancy with AI-powered tools and expert guidance",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${sora.variable} ${barlowCondensed.variable} bg-pure-black text-pure-white overflow-x-hidden font-barlow`}
      >
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.13/build/spline-viewer.js" />
      </body>
    </html>
  )
}
