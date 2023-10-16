"use client"
import { useSession } from "next-auth/react";
import Image from "next/image"
import { useEffect, useState } from "react";
import { AiFillMessage, AiOutlineBars } from "react-icons/ai";

const ListHeader = () => {

  const { data: session } = useSession()
  // 头像
  const [ avatar, setAvatar ] = useState('/default_avatar.png')
  
  useEffect(() => {
    setAvatar(session?.user.image)
  }, [session])

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
        <AiFillMessage className="mr-2 text-gray-400 cursor-pointer"/>
        <AiOutlineBars className="text-gray-400 cursor-pointer" />
      </div>
      
    </div>
  )
}
export default ListHeader