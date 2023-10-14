import { connectToDB } from "@/utils/connect-database/connect-database"

export const POST =  async (req) => {
  const { username, password } = await req.json()
  
  try {
    // 连接数据库
    // await connectToDB()
    return new Response('注册异常!', { status: 500 })
    
  } catch (error) {
    return new Response('注册异常!', { status: 500 })
  }
}