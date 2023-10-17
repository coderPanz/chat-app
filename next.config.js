/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // true时导致应用程序运行两次
  env: {
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    SECRET: process.env.SECRET
  },
  // 允许你的应用可以加载来自指定域名的图片
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
