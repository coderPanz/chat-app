import { User } from "@/models";
import { connectToDB } from "@/utils/connect-database/connect-database";

export const GET = async (req, { params }) => {
  try {
    const userId = params.fromId;
    connectToDB();
    // 获取用户发出的消息和收到的消息并填充收发件人
    // 填充前500条数据
    const messageObj = await User.findById(userId)
      .select("sentMessages recievedMessages")
      .populate({
        path: "sentMessages",
        options: { limit: 500, sort: { createdAt: 'desc' }, }, // 指定返回 sentMessages 数组中的最大数量并进行根据创建日期降序排序
        populate: {
          path: "sender receiver",
        },
      })
      .populate({
        path: "recievedMessages",
        options: { limit: 500, sort: { createdAt: 'desc' },}, // 指定返回 recievedMessages 数组中的最大数量并进行根据创建日期降序排序
        populate: {
          path: "sender receiver",
        },
      });
    // 分别保存到对应的数组中
    const sentMessages = [...messageObj.sentMessages];
    const recievedMessages = [...messageObj.recievedMessages]
  
    // 两个消息处理共用一个UniqueId数组可以避免发送消息的接收者等于接收消息的发送者, 避免数组重复
    const UniqueId = []

    // 1. 处理用户发送消息时不同的接收者!
    const sentMessagesHandle = []
    for (const obj of sentMessages) {
      const receiverId = obj.receiver._id
      if(!UniqueId.includes(receiverId)) {
        UniqueId.push(receiverId)
        sentMessagesHandle.push(obj)
      }
    }

    // 2. 处理用户接收消息时不同的发送者!
    const recievedMessagesHandle = []
    for (const obj of recievedMessages) {
      const senderId = obj.sender._id
      if(!UniqueId.includes(senderId)) {
        UniqueId.push(senderId)
        recievedMessagesHandle.push(obj)
      }
    }

    // 合并
    const userMessageList = [
      ...recievedMessagesHandle,
      ...sentMessagesHandle
    ]

    // 最后进行降序排序
    userMessageList.sort((a,b) => b.createdAt.getTime()-a.createdAt.getTime())

    return new Response(JSON.stringify(userMessageList), { status: 200 });
  } catch (error) {
    return new Response("获取消息失败!", { status: 500 });
  }
};
