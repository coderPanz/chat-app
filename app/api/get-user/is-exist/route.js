import { connectToDB } from "@/utils/connect-database/connect-database";
import { User } from "@/models/index";
export const POST = async (req) => {
  try {
    const { fromId } = await req.json()
    await connectToDB()
    const data = await User.findById(fromId)
    if(data) {
      return new Response(true, { status: 200 });
    } else {
      return new Response(false, { status: 500 });
    }
  } catch (error) {
    return new Response("获取失败!", { status: 500 });
  }
}