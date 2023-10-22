"use client"
import { useSession } from "next-auth/react";
import Image from "next/image"
import { useEffect, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useStateProvider } from "@/components/Context/StateContext";
import { reducerCases } from "@/components/Context/constants";

const ChatBarHeader = () => {

  const { data: session } = useSession()
  // 控制点击切换联系人列表和消息列表
  const [{}, dispatch] = useStateProvider()

  const [ avatar, setAvatar ] = useState('/default_avatar.png')

  useEffect(() => {
    setAvatar(session?.user.image)
  }, [session])

  // 点击切换联系人列表和消息列表
  const handleShowList = () => {
    dispatch({
      type: reducerCases.SET_ALL_CONTACTS_PAGE
    })
  }

  return (
    <div className="bg-panel-header-background flex justify-between items-center p-3">
      <Image 
      src={avatar}
      alt="ddd"
      height={40}
      width={40}
      className="rounded-full cursor-pointer"
      />
      <div className="grow ml-3 text-gray-300">
        <span>{session?.user.name}</span>
      </div>
      <div className="flex justify-center items-center">
        <BsFillPersonFill onClick={handleShowList} className="mr-2 text-gray-400 cursor-pointer text-xl"/>
        <AiOutlineBars className="text-gray-400 cursor-pointer text-xl" />
      </div>
      
    </div>
  )
}
export default ChatBarHeader