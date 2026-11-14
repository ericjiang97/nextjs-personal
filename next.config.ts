import path from 'node:path'
import type { NextConfig } from 'next'
import './scripts/node27-http-headers-compat.cjs'

const compatPath = path.resolve(
  process.cwd(),
  'scripts/node27-http-headers-compat.cjs'
)
if (
  !compatPath.includes(' ') &&
  !process.env.NODE_OPTIONS?.includes('node27-http-headers-compat.cjs')
) {
  const flag = `--require=${compatPath}`
  process.env.NODE_OPTIONS = process.env.NODE_OPTIONS
    ? `${process.env.NODE_OPTIONS} ${flag}`
    : flag
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
