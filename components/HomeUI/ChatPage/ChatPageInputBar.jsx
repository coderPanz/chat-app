"use client";
import { BsEmojiSunglasses } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useStateProvider } from "@/components/Context/StateContext";
import { SENT_MESSAGE } from "@/utils/API-Route";

const ChatPageInputBar = () => {
  // 获取当前用户登录的数据
  const { data: session } = useSession();
  // 获取当前要联系的联系人数据
  const [{ createNewChat, socket }] = useStateProvider();
  // 输入的消息
  const [message, setMessage] = useState("");

  // 1. 点击发送, 聊天双方用户的id
  // 2. 调用socket实时响应
  const handleSentMessage = async () => {
    try {
      const res = await fetch(SENT_MESSAGE, {
        method: "POST",
        body: JSON.stringify({
          // 用户id
          fromId: session?.user?.id,
          // 聊天好友id
          toId: createNewChat?._id,
          message: message,
        }),
      });
      const data = await res.json();
      socket.current.emit('send-msg', {
        fromId: session?.user?.id,
        toId: createNewChat?._id,
        // 保存到数据库后在拿到返回后的数据发送socket确保该消息已经被数据库保存
        // data.message还不确定是这个写法
        message: data.message // 暂定
      })
    } catch (error) {
      console.log(`发送消息出现了错误:${error}`);
    }

  };

  return (
    <div className="h-[70px] bg-panel-header-background px-3 py-2 flex items-center">
      {/* 左侧图标 */}
      <div className="flex justify-center items-center">
        <BsEmojiSunglasses className="text-xl text-gray-400 mx-4 cursor-pointer" />
        <BsLink45Deg className="text-2xl text-gray-400 cursor-pointer" />
      </div>
      {/* 中间输入框 */}
      <div className="grow mx-5">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="w-full h-[38px] rounded-md bg-input-background focus:outline-none px-3 py-1"
        />
      </div>
      {/* 右侧发送按钮 */}
      <div onClick={handleSentMessage} className="mx-2 cursor-pointer">
        <BiSolidSend className="text-gray-400  text-xl" />
      </div>
    </div>
  );
};
export default ChatPageInputBar;
