/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    SECRET: process.env.SECRET
  },
  // 允许你的应用可以加载来自指定域名的图片
  images: {
    domains: ['avatars.githubusercontent.com', 'localhost'],
  },
}

module.exports = nextConfig
