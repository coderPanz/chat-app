import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/utils/Context/StateContext";
import { reducerCases } from "@/utils/Context/constants";

import Image from "next/image";
const ChatPageHeader = () => {
  // 获取全局状态来回显选择聊天的联系人
  const [{ createNewChat }, dispatch] = useStateProvider();
  
  // 消息搜索
  const handleSearch = () => {
    dispatch({
      type: reducerCases.SET_MESSAGE_SEARCH,
    });
  };

  // 发起语音通话
  const handleVoiceCall = () => {
    dispatch({
      type: reducerCases.SET_VOICE_CALL,
      voiceCall: {
        ...createNewChat,
        type: 'out-going',
        callType: 'voice',
        roomId: Date.now()
      }
    })
  }

  // 发起视频通话
  const handleVideoCall = () => {
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: {
        ...createNewChat,
        type: 'out-going',
        callType: 'video',
        roomId: Date.now()
      }
    })
  }

  return (
    <div className="bg-panel-header-background flex justify-between items-center p-3">
      {/* left */}
      <div className="flex justify-center items-center">
        <Image
          src={createNewChat?.image}
          alt="avatar"
          height={40}
          width={40}
          className="rounded-full cursor-pointer"
        />
        <div className="flex flex-col ml-5 text-gray-300">
          <span className="text-base">{createNewChat?.username}</span>
          <span className="text-xs">在线/离线</span>
        </div>
      </div>
      {/* right */}
      <div className="flex justify-center items-center text-xl gap-3">
        <MdCall onClick={handleVoiceCall} className="text-gray-400 cursor-pointer" />
        <IoVideocam onClick={handleVideoCall} className="text-gray-400 cursor-pointer" />
        <BiSearchAlt2
          className="text-gray-400 cursor-pointer"
          onClick={handleSearch}
        />
        <BsThreeDotsVertical className="text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
};
export default ChatPageHeader;
