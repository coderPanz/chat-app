"use client"
import { ChatPage, ChatBar, Empty } from '@/components'
import { useStateProvider } from '../Context/StateContext'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { reducerCases } from '../Context/constants'
const Main = () => {
  const {data: session} = useSession()
  // 若没有创建聊天的话就显示背景图片
  const [{ createNewChat, messages }, dispatch] = useStateProvider()
  // 获取该用户的所有聊天记录(发送和接收)
  useEffect(() => {
    const getMessage = async () => {
      const messageList = await fetch(`api/get-message/${session?.user.id}`)
      const messages = await messageList.json()
      dispatch({
        type: reducerCases.SET_MESSAGES,
        messages
      })
    };
    getMessage()
  }, [])
  return (
    <div className='h-[100vh] w-[100vw] text-white grid grid-cols-12'>
      <div className='col-span-3'>
        <ChatBar />
      </div>
      {/* 当没有进入聊天界面时显示的一个背景 */}
      {
        createNewChat ?
        <div className='col-span-9'>
          <ChatPage /> 
        </div>
        :
        <div className='col-span-9'>
          <Empty />
        </div> 
      }
    </div>
  )
}
export default Main