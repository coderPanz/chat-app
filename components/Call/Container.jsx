"use client"
import { useSession } from "next-auth/react"
import { useStateProvider } from "@/utils/Context/StateContext"
import { useState } from "react"
import Image from "next/image"
import { MdOutlineCallEnd } from "react-icons/md";
import { reducerCases } from "@/utils/Context/constants"

const Container = ({ data }) => {
  const { data: session } = useSession()
  const [{ socket }, dispatch] = useStateProvider()
  const userInfos = session?.user
  const [callAccepted, setCallAccepted ] = useState(false)

  // 挂断电话
  const endCall = () => {
    dispatch({
      type: reducerCases.END_CALL
    })
  }

  return (
    <div className="bg-search-input-container-background w-full h-full flex justify-center items-center text-gray-300">
      <div className="flex flex-col gap-5 w-[400px] justify-center items-center">
        <span className="text-7xl">{data.username}</span>
        <span className="text-lg">{callAccepted? '通话中': '正在呼叫...'}</span>
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