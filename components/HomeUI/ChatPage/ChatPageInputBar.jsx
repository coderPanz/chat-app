"use client";
import { BsEmojiSunglasses } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useStateProvider } from "@/components/Context/StateContext";
import { SENT_MESSAGE } from "@/utils/API-Route";
import EmojiPicker from "emoji-picker-react";

const ChatPageInputBar = () => {
  // 获取当前用户登录的数据
  const { data: session } = useSession();
  // 获取当前要联系的联系人数据
  const [{ createNewChat, socket }] = useStateProvider();
  // 输入的消息
  const [message, setMessage] = useState("");
  // 1. 点击发送, 聊天双方用户的id
  // 2. 调用socket实时响应

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiPickerRef = useRef();

  const handleShowEmoji = () => {
    setShowEmojiPicker((preState) => !preState);
  };

  const handleEmojiMessages = (emoji) => {
    setMessage((preState) => (preState += emoji.emoji));
  };

  const handleSentMessage = async () => {
    try {
      // 点击前先检查是否输入内容
      if (message.length > 0) {
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
        console.log(data);
        socket.current.emit("send-msg", data);
        setMessage("");
      }
    } catch (error) {
      console.log(`发送消息出现了错误:${error}`);
    }
  };

  // 当点击emoji图标栏外的地方, 图标栏关闭
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="h-[70px] bg-panel-header-background px-3 py-2 flex items-center">
      {/* 左侧图标 */}
      <div className="flex justify-center items-center">
        <BsEmojiSunglasses
          id="emoji-open"
          onClick={handleShowEmoji}
          className="text-xl text-gray-400 mx-4 cursor-pointer"
        />

        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="bottom-[70px] left-[382px] z-40 absolute"
          >
            <EmojiPicker onEmojiClick={handleEmojiMessages} theme="dark" />
          </div>
        )}

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
      <div
        onClick={handleSentMessage}
        className="mx-2 bg-green-600 hover:bg-green-700 shadow-lg transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer rounded px-3 py-1"
      >
        <BiSolidSend className="text-gray-200 text-xl" />
      </div>
    </div>
  );
};
export default ChatPageInputBar;
