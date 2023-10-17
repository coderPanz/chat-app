"use client"
import { useSession } from "next-auth/react";
import Image from "next/image"
import { useEffect, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
const ChatBarHeader = ({ setIsShowUserList }) => {

  const { data: session } = useSession()
  // 头像
  const [ avatar, setAvatar ] = useState('/default_avatar.png')

  useEffect(() => {
    setAvatar(session?.user.image)
  }, [session])

  // 点击切换userlist和messagelist
  const handleShowList = () => {
    setIsShowUserList(preState => !preState)
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
      <div className="flex justify-center items-center">
        <BsFillPersonFill onClick={handleShowList} className="mr-2 text-gray-400 cursor-pointer text-xl"/>
        <AiOutlineBars className="text-gray-400 cursor-pointer text-xl" />
      </div>
      
    </div>
  )
}
export default ChatBarHeader