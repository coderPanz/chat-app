import { BsEmojiSunglasses } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";

const MessageBar = () => {
  return (
    <div className="h-[70px] bg-panel-header-background px-3 py-2 flex items-center">
      {/* 左侧图标 */}
      <div className="flex justify-center items-center">
        <BsEmojiSunglasses className="text-xl text-gray-400 mx-4 cursor-pointer"/>
        <BsLink45Deg className="text-2xl text-gray-400 cursor-pointer"/>
      </div>
      {/* 中间输入框 */}
      <div className="grow mx-5">
        <input type="text" className="w-full h-[38px] rounded-md bg-input-background focus:outline-none px-3 py-1"/>
      </div>
      {/* 右侧发送按钮 */}
      <div className="mx-2">
        <BiSolidSend className="text-gray-400 cursor-pointer text-xl"/>
      </div>
    </div>
  )
}
export default MessageBar