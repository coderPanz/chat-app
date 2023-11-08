"use client"
import { useStateProvider } from "@/utils/Context/StateContext"
import Image from "next/image"
import { MdOutlineCallEnd } from "react-icons/md";
import { reducerCases } from "@/utils/Context/constants"

const Container = ({ data }) => {
  const [{ socket, isConnect }, dispatch] = useStateProvider()

  // 挂断电话
  // 挂断电话需要设置!isConnect
  const endCall = () => {
    if(data.callType === 'voice') {
      socket.current.emit('reject-voice-call', {
        fromId: data._id,
        isEnd: true // 表示类型为--挂断电话
      })
      dispatch({
        type: reducerCases.IS_CONNECT
      })
    } else {
      socket.current.emit('reject-video-call', {
        fromId: data._id,
        isEnd: true
      })
      dispatch({
        type: reducerCases.IS_CONNECT
      })
    }
    // 挂断电话所有通话相关状态重置
    dispatch({
      type: reducerCases.END_CALL
    })
  }

  return (
    <div className="bg-search-input-container-background w-full h-full flex justify-center items-center text-gray-300">
      <div className="flex flex-col gap-5 w-[400px] justify-center items-center">
        <span className="text-7xl">{data.username}</span>
        <span className="text-lg">{isConnect? '通话中': '正在呼叫...'}</span>
        <Image 
        src={data.image}
        alt="avatars"
        width={250}
        height={250}
        className="rounded-full mt-[35px]"
        />
        <MdOutlineCallEnd onClick={endCall} className="mt-[20px] text-[70px] bg-red-600 rounded-full p-3"/>
      </div>
    </div>
  )
}
export default Container