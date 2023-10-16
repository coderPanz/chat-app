import { MdCall } from "react-icons/md"
import { IoVideocam } from 'react-icons/io5'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'

import Image from "next/image";
const ChatPageHeader = () => {
  return (
    <div className="bg-panel-header-background flex justify-between items-center p-3">
      {/* left */}
      <div className="flex justify-center items-center ml-3">
        <Image
          src={"/avatars/1.png"}
          alt="avatar"
          height={40}
          width={40}
          className="rounded-full cursor-pointer"
        />
        <div className="flex flex-col ml-5 text-gray-300">
          <span className="text-base">CoderPanz</span>
          <span className="text-xs">在线/离线</span>
        </div>
      </div>
      {/* right */}
      <div className="flex justify-center items-center text-xl">
        <MdCall className="text-gray-400 cursor-pointer"/>
        <IoVideocam className="mx-3 text-gray-400 cursor-pointer"/>
        <BiSearchAlt2 className="text-gray-400 cursor-pointer"/>
        <BsThreeDotsVertical className="mx-3 text-gray-400 cursor-pointer"/>
      </div>
    </div>
  );
};
export default ChatPageHeader;
