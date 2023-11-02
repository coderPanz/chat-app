"use client";
import { useStateProvider } from "@/components/Context/StateContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";

const ChatPageContainer = () => {
  const { data: session } = useSession();

  const [{ createNewChat, messages }] = useStateProvider();
 
  const containerRef = useRef(null);

  // 当切换聊天好友和发送/接收消息时回滚到底部
  useEffect(() => {
    // 加上if确保获取dom在操作dom
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [createNewChat, messages]);

  return (
    <div className="h-[83vh] w-full">
      <div ref={containerRef} className="h-full overflow-auto custom-scrollbar">
        {/* 文本消息 */}
        {/* 若是发送者的消息者显示在左边, 若是发送者收到的消息则显示在右边 */}
        {messages?.map((item) => {
          const isRecieve = item.sender === createNewChat._id;
          return isRecieve ? (
            <div
              key={item._id}
              className="flex items-center gap-3 justify-start p-4"
            >
              <Image
                src={createNewChat?.image}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              {/* 文本消息 */}
              {item.type === "text" && (
                <>
                  <AiFillCaretLeft className=" text-green-700" />
                  <span className="bg-green-700 rounded p-2 ml-[-17px] text-gray-200">
                    {item.message}
                  </span>
                </>
              )}
              {/* 图片消息 */}
              {item.type === "image" && (
                <img
                  src={`/uploads/images/${item.message}`}
                  alt=""
                  className="w-auto h-[200px] rounded-lg"
                />
              )}
            </div>
          ) : (
            <div
              key={item._id}
              className="flex items-center gap-3 justify-end p-4"
            >
              {/* 文本消息 */}
              {item.type === "text" && (
                <>
                  <span className="bg-green-700 rounded p-2 text-gray-200">
                    {item.message}
                  </span>
                  <AiFillCaretRight className="ml-[-17px] text-green-700" />
                </>
              )}

              {/* 图片消息 */}
              {item.type === "image" && (
                <img
                  src={`/uploads/images/${item.message}`}
                  alt=""
                  className="w-auto h-[200px] rounded-lg mr-1"
                />
              )}
              <Image
                src={session?.user.image}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ChatPageContainer;
