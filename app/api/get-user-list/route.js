import { connectToDB } from "@/utils/connect-database/connect-database";
import { User } from "@/models/index";
import MatchSort from "@/utils/match-sort";
export const GET = async () => {
  try {
    await connectToDB();
    const data = await User.find();

    // 中英文用户名混合匹配排序
    const res = await MatchSort(data)

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response("获取失败!", { status: 500 });
  }
};
