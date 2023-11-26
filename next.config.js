const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '**'
      }
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
  }
}

module.exports = nextConfig
