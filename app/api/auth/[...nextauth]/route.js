import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import { connectToDB } from "@/utils/connect-database/connect-database";
import User from "@/models/user";
const authOptions = NextAuth({
   // 在 providers 中配置更多授权服务
   providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
    // ...add more providers here
  ]
})

// 因为点击登录登出需要匹配这个路由中的GET或者POST请求
export { authOptions as GET, authOptions as POST };