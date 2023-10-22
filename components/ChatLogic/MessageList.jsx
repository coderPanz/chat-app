import Image from "next/image"
import dateFormat from "@/utils/dateFormat"
import { useStateProvider } from "../Context/StateContext"
import { reducerCases } from "../Context/constants"

const MessageList = ({ messages }) => {

  const [ {}, dispatch ] = useStateProvider()

  const handleCreateNewChat = (item, isSender) => {
    dispatch({
      type: reducerCases.CREATE_NEW_CHAT,
      user: isSender ? {...item.receiver}: {...item.sender}
    })
  }
  const names = []
  return (
    <div>
      {/* 渲染用户发送给指定好友的信息列表 */}
      {
        messages?.sentMessages?.map(item => {
          // 避免重复渲染相同的好友
          const isSameUsername = names.includes(item.receiver.username)
          if(!isSameUsername) names.push(item.receiver.username)
          return (
            !isSameUsername && (
              <div 
                key={item?._id}
                className="flex gap-4 items-center cursor-pointer py-3 hover:bg-panel-header-background"
                onClick={() => handleCreateNewChat(item, true)}
              >
                <Image 
                  src={item.receiver.image}
                  alt="好友头像"
                  height={50}
                  width={50}
                  className="rounded-full h-[50px]"
                />
                <div className="flex flex-col grow mb-2">
                  <span className="text-[20px] text-gray-300">{item.receiver.username}</span>
                  <span className="text-xs text-gray-400">{item.message}</span>
                </div>
    
                <div >
                  <span className="text-xs text-gray-400">{dateFormat(item.createdAt, 'MM-DD HH:mm')}</span>
                </div>
              </div>
            )
          );
        })
      }
      {/* 渲染好友给用户发送的信息列表 */}
      {
        messages?.recievedMessages?.map(item => {
          // 避免重复渲染相同的好友
          const isSameUsername = names.includes(item.sender.username)
          if(!isSameUsername) names.push(item.sender.username)
          return (
            !isSameUsername && (
              <div 
                key={item?._id}
                className="flex gap-4 items-center cursor-pointer py-3 hover:bg-panel-header-background"
                onClick={() => handleCreateNewChat(item, false)}
              >
                <Image 
                  src={item.sender.image}
                  alt="好友头像"
                  height={50}
                  width={50}
                  className="rounded-full h-[50px]"
                />
                <div className="flex flex-col grow mb-2">
                  <span className="text-[20px] text-gray-300">{item.sender.username}</span>
                  <span className="text-xs text-gray-400">{item.message}</span>
                </div>
    
                <div >
                  <span className="text-xs text-gray-400">{dateFormat(item.createdAt, 'MM-DD HH:mm')}</span>
                </div>
              </div>
            )
          );
        })
      }
    </div>
  )
}
export default MessageList