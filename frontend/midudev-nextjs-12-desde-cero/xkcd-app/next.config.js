/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imgs.xkcd.com"],
  },
}

module.exports = nextConfig
