/** @type {import('next').NextConfig} */
const { version } = require('./package.json');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  publicRuntimeConfig: {
    version,
  },
};

module.exports = nextConfig;
