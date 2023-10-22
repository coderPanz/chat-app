"use client"
import { ChatPage, ChatBar, Empty } from '@/components'
import { useStateProvider } from '../Context/StateContext'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { reducerCases } from '../Context/constants'
const Main = () => {
  // 使用useRef保持socket的持久连接
  const socket = useRef()

  const [socketEvent, setSocketEvent] = useState(false)
  const {data: session} = useSession()
  // 若没有创建聊天的话就显示背景图片
  const [{ createNewChat }, dispatch] = useStateProvider()
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

  // 当用户登录连接socket服务器并设置全局socket状态以便其他地方访问
  useEffect(() => {
    if(session.user) {
      socket.current = io('http://localhost:5000')
      // 派发一个add-user增加用户的事件
      socket.current.emit('add-user', session?.user.id)
      // 全局保存socket
      dispatch({type: reducerCases.SET_SOCKET, socket})
    }
  }, [session.user])

  // 接收实时消息
  // 只有当不断改变socketEvent, useEffect才能不断进行sockent的消息接收
  useEffect(() => {
    if(socket.current && !socketEvent) {
      socket.current.on('msg-recieve', (data) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message
          }
        })
      })
      setSocketEvent(true)
    }
  }, [socket.current])
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