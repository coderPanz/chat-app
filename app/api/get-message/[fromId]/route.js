import { connectToDB } from "@/utils/connect-database/connect-database"
import { User } from "@/models"

// 获取该用户的所有消息, 包括接收和发送的信息
export const GET = async (req, { params }) => {
  try {
    const messages = await User.findById(params.fromId).select('sentMessages recievedMessages').populate({
      path: 'sentMessages',
      populate: {
        path: 'sender receiver'
      }
    })
    .populate({
      path: 'recievedMessages',
      populate: {
        path: 'sender receiver'
      }
    });
    return new Response(JSON.stringify(messages), { status: 200 })
  } catch (error) {
    return new Response('获取消息失败!', { status: 500 })
  }
}