import { useStateProvider } from "@/components/Context/StateContext";
import Image from "next/image";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";

const ChatPageContainer = () => {
  const [{ createNewChat, messages }] = useStateProvider();

  return (
    <div className="h-[83vh] w-full overflow-auto custom-scrollbar relative">
      {/* 背景 */}
      <div className="bg-chat-background overflow-auto opacity-5 w-full h-full z-[0]"></div>
      {/* 内容 */}
      <div className="text-white absolute top-0 h-full w-full">
        {/* 好友发给自己的信息 */}
        <div></div>
        {/* 发给好友的信息 */}
        {messages?.sentMessages?.map((item) => {
          // 1.当sentMessages列表中的信息接收者id=聊天页面中对应好友的id, 则渲染该发出的消息
          const isSentMessage = item.receiver._id === createNewChat._id;
          return (
            <>
              {isSentMessage ? (
                <div
                  key={item._id}
                  className="flex items-center gap-3 justify-end p-4"
                >
                  <span className="bg-input-background rounded p-2">
                    {item.message}
                  </span>
                  <AiFillCaretRight className="ml-[-17px] text-input-background" />
                  <Image
                    src={item.sender.image}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              ) : null}
            </>
          );
        })}
        {messages?.recievedMessages?.map((item) => {
          // 2.当recieveMessages列表中的消息发生者id=聊天界面中对应好友的id, 则渲染该收到的消息
          const isRecieveMessage = item.sender._id === createNewChat._id;
          return (
            isRecieveMessage && (
              <div
                className="flex items-center gap-3 justify-start p-4"
                key={item._id}
              >
                <Image
                  src={item.sender.image}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <AiFillCaretLeft className=" text-input-background" />
                <span className="bg-input-background rounded p-2 ml-[-17px]">
                  {item.message}
                </span>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
export default ChatPageContainer;
