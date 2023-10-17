"use client"
import { ChatPage, ChatBar, Empty } from '@/components'
const Main = () => {
  return (
    <div className='h-[100vh] w-[100vw] text-white grid grid-cols-12'>
      <div className='col-span-3'>
        <ChatBar />
      </div>
      {/* 当没有进入聊天界面时显示的一个空界面 */}
      {/* <Empty /> */}
      <div className='col-span-9'>
        <ChatPage />
      </div>
    </div>
  )
}
export default Main