/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Disable the CSS optimization that requires 'critters'
    experimental: {
      optimizeCss: false,
    },
    eslint: {
      // Disable ESLint during builds
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;