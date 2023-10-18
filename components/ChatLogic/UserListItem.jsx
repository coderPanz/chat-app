"use client"
import NumToLetters from "@/utils/NumToLetters"
import Image from "next/image"
 
const UserListItem = ({ item, index }) => {
  const handleSetChatUser = () => {
    const a = useContext(SetChatUserContext)
    console.log (a)
  }
  return (
    <div>
      {
        (item.length !== 0) ? 
        <p className="px-[16px] mb-5 rounded-md text-xl text-blue-500">
        {NumToLetters(index)}
      </p> :
      null
      }
      {
        item.map((item, index) => (
          <div
          onClick={handleSetChatUser}
          className="my-2 flex items-center gap-5 mb-5 rounded-md cursor-pointer hover:bg-panel-header-background" 
          key= {index}>
            <Image 
            src={item?.image}
            alt="avatar"
            height={50}
            width={50}
            className="rounded-full"
            />
            {/* name and bio */}
            {/* 文字溢出显示省略号并禁止换行 */}
            <div className="flex flex-col gap-1 grow overflow-hidden whitespace-nowrap border-b-gray-700 border-b">
              <span className="overflow-ellipsis text-lg">
                {item?.username}
              </span>
              <span className="overflow-ellipsis text-gray-400 italic text-[13px] mb-2">
                {item?.bio}
              </span>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default UserListItem