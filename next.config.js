/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URI:process.env.URI,
  },
}

module.exports = nextConfig
