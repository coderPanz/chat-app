import { connectToDB } from "@/utils/connect-database/connect-database"
import User from "@/models/user"
export const POST =  async (req) => {
  const { username, bio, email, image } = await req.json()
  console.log(username)
  try {
    // 连接数据库
    await connectToDB()
    const data = await User.findOneAndUpdate(
      {email: email}, 
      {$set: {username: username, bio: bio, image: image}}, 
      {new: true}
      )
    return new Response(JSON.stringify(data), {status: 201})
  } catch (error) {
    return new Response('创建失败!', {status: 500})
  }
}