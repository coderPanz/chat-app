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
        {messages?.map((item) => {
          const isRecieve = item.sender === createNewChat._id;
          return (
              isRecieve ?
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
                <AiFillCaretLeft className=" text-green-700"/>
                <span className="bg-green-700 rounded p-2 ml-[-17px] text-gray-200">
                  {item.message}
                </span>
                
              </div> :

              <div
                key={item._id}
                className="flex items-center gap-3 justify-end p-4"
              >
                <span className="bg-green-700 rounded p-2 text-gray-200">
                  {item.message}
                </span>
                <AiFillCaretRight className="ml-[-17px] text-green-700" />
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
