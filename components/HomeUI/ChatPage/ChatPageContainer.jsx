import { useStateProvider } from "@/components/Context/StateContext"
import Image from "next/image"


const ChatPageContainer = () => {
  const [{createNewChat, messages}] = useStateProvider()
  console.log(messages)
  console.log(createNewChat)

  return (
    <div className="h-[83vh] w-full overflow-auto custom-scrollbar relative">
      {/* 背景 */}
      <div className="bg-chat-background bg-fixed opacity-5 w-full h-full z-[0]"></div>
      <div className="text-white absolute top-0 h-full w-full flex justify-between">
        {/* 好友发给自己的信息 */}
        <div>
        </div>
        {/* 发给好友的信息 */}
        <div className="flex flex-col gap-8 mr-5">
          {
            messages?.sentMessages?.map(item => {
              // 当sent消息列表中的信息接收者===聊天页面中对应的好友这渲染该消息
              const isCurrentChat = item.receiver._id === createNewChat._id
              return (
                <div
                key={item._id}
                >
                  {
                    isCurrentChat && <div className="flex items-center gap-3 justify-end">
                      <span>{item.message}</span>
                      <Image 
                      src={item.sender.image}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                      />
                    </div>
                  } 
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default ChatPageContainer