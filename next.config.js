/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: false, // Disable to prevent critters issues
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;