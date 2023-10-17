"use client"
import { useEffect, useState } from "react"
import { MessageList, UserList } from "../../index"
// bg-search-input-container-background
const ChatBarContainer = ({ isShowUserList }) => {
  // 保存用户列表
  const [ userList, setUserList ] = useState()
  useEffect(() => {
    if(isShowUserList) {
      // 获取用户列表
      const getUserList = async () => {
        try {
          const res = await fetch('api/get-user-list')
          const userList = await res.json()
          setUserList(userList)
        } catch (error) {
          console.log(error)
        }
      }
      getUserList()
    } else {
      // 获取消息列表
      console.log('获取消息列表!')
    }
  }, [isShowUserList])

  return (
    // 聊天栏容器, 用于显示用户列表和消息列表的切换!
    <div className="flex-auto overflow-auto custom-scrollbar p-3">
      {
        isShowUserList ? 
        <UserList userList={userList}/> :
        <MessageList />
      }
    </div>
  )
}
export default ChatBarContainer