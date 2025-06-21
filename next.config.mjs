/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', 'lucide-react'],
  },
  webpack: (config, { isServer }) => {
    // Add externals for problematic packages
    if (!isServer) {
      config.externals = config.externals || []
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
    }
    
    // Fix for webpack hashing issues
    config.optimization = config.optimization || {}
    config.optimization.moduleIds = 'deterministic'
    
    return config
  },
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
