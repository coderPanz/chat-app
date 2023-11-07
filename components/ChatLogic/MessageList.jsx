"use client";
import { useEffect, useState } from "react";
import { useStateProvider } from "../../utils/Context/StateContext";
import { reducerCases } from "../../utils/Context/constants";
import { useSession } from "next-auth/react";
import { GET_INITAL_CONTACTS } from "@/utils/API-Route";
import Image from "next/image";
import dateFormat from "@/utils/dateFormat";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";

const MessageList = () => {
  const { data: session } = useSession();
  const [{ userMessageList, messages }, dispatch] = useStateProvider();
  // console.log(userMessageList);
  // 获取消息列表
  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await fetch(`${GET_INITAL_CONTACTS}/${session?.user.id}`);
        const userMessageList = await res.json();
        dispatch({
          type: reducerCases.SET_USER_MESSAGE_LIST,
          userMessageList,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, [messages]);

  // 点击选择指定的联系人创建一个聊天
  const handleCreateNewChat = (item) => {
    // 全局保存对应点击的联系人对象数据
    dispatch({
      type: reducerCases.CREATE_NEW_CHAT,
      user: { ...item },
    });
  };

  // 搜索消息
  // 搜索框数据
  const [searchTerm, setSearchTerm] = useState("");
  // 查询的结果列表
  const [searchedMessages, setSearchedMessages] = useState([]);
  useEffect(() => {
    if (searchTerm) {
      setSearchedMessages(
        userMessageList.filter(
          (message) =>
            message.message.includes(searchTerm) ||
            message.sender.username.includes(searchTerm) ||
            message.receiver.username.includes(searchTerm) ||
            dateFormat(message.createdAt, "MM-DD HH:mm").includes(searchTerm)
        )
      );
    } else {
      setSearchedMessages([]);
    }
  }, [searchTerm]);

  // 渲染列表时, 把消息对应的用户id存起来, 每次渲染消息先判断是否已经渲染过同一个用户的消息, 防止重复渲染
  let renderMessages = [];
  return (
    <div>
      {/* 消息搜索框 */}
      <div className="flex justify-center items-center pl-3 pr-4 my-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="w-full bg-dropdown-background-hover rounded-l-md h-[32px] px-3 py-1 focus:outline-none"
        />
        <AiOutlineSearch className="bg-dropdown-background-hover h-[32px] rounded-r-md w-[32px] px-1 text-gray-600 cursor-pointer" />
        <AiFillCaretDown className="text-gray-600 w-6 h-6 ml-2 cursor-pointer" />
      </div>

      {/* 遍历消息 */}
      {/* 从第一个开始遍历: 每条消息可能是两种类型消息其中之一, 发送信息和接收消息。所以需要进行判断 */}
      {userMessageList.map((item, index) => {
        // 先判断是发送消息还是接收消息
        const isSentMessage = item.sender._id === session?.user.id;
        const isReceiveMessage = item.receiver._id === session?.user.id;
        // 在判断是否已经渲染过该用户的消息, 防止重复渲染
        // 判断一个对象是否已经存在于一个对象数组中
        let isRender = renderMessages.find((msg) => msg._id === item._id);
        // 当没有渲染时保存到renderMessages
        if (!isRender) renderMessages.push(item);
        return (
          <>
            {/* 当搜索框没有输入的时候正常显示消息列表， 一旦开始输入时就显示搜索结果 */}
            {!searchTerm.length && (
              <div>
                {isSentMessage && !isRender && (
                  <div
                    key={index}
                    onClick={() => handleCreateNewChat(item.receiver)}
                    className="flex justify-between mb-5 hover:bg-panel-header-background p-2 border-b-[1px] border-b-gray-700"
                  >
                    <div className="flex gap-3">
                      <Image
                        src={item.receiver.image}
                        alt="avatars"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-[18px] text-gray-200">
                          {item.receiver.username}
                        </span>
                        {item.type === "image" && (
                          <span className="text-[12px] text-gray-400">
                            [图片]
                          </span>
                        )}
                        {item.type === "audio" && (
                          <span className="text-[12px] text-gray-400">
                            [语音]
                          </span>
                        )}
                        {item.type === "text" && (
                          <span className="text-[12px] w-[150px] truncate text-gray-400">
                            {item.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-[14px] text-gray-400 mt-1 mr-[6px]">
                      {dateFormat(item.createdAt, "MM-DD HH:mm")}
                    </div>
                  </div>
                )}
              </div>
            )}
            {!searchTerm.length && (
              <div>
                {isReceiveMessage && isRender && (
                  <div
                    key={index}
                    onClick={() => handleCreateNewChat(item.sender)}
                    className="flex justify-between mb-5 hover:bg-panel-header-background p-2 border-b-[1px] border-b-gray-700"
                  >
                    <div className="flex gap-3">
                      <Image
                        src={item.sender.image}
                        alt="avatars"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-[18px] text-gray-200">
                          {item.sender.username}
                        </span>
                        {item.type === "image" && (
                          <span className="text-[12px] text-gray-400">
                            [图片]
                          </span>
                        )}
                        {item.type === "audio" && (
                          <span className="text-[12px] text-gray-400">
                            [语音]
                          </span>
                        )}
                        {item.type === "text" && (
                          <span className="text-[12px] w-[150px] truncate text-gray-400">
                            {item.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-[14px] text-gray-400 mt-1 mr-[6px]">
                      {dateFormat(item.createdAt, "MM-DD HH:mm")}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        );
      })}

      {/* 搜索无结果提示 */}
      {searchTerm.length > 0 && !searchedMessages.length && (
        <div className="text-gray-600 text-center">没有找到对应消息！</div>
      )}

      {/* 有结果 */}
      {searchTerm.length > 0 && searchedMessages.length && (
        <div>
          {searchedMessages.map((item, index) => {
            // 先判断是发送还是接收
            const isSentMessage = item.sender._id === session?.user.id;
            return (
              <div>
                {isSentMessage ? (
                  <div
                    key={index}
                    onClick={() => handleCreateNewChat(item.receiver)}
                    className="flex justify-between mb-5 hover:bg-panel-header-background p-2 border-b-[1px] border-b-gray-700"
                  >
                    <div className="flex gap-3">
                      <Image
                        src={item.receiver.image}
                        alt="avatars"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-[18px] text-gray-200">
                          {item.receiver.username}
                        </span>
                        {item.type === "image" && (
                          <span className="text-[12px] text-gray-400">
                            [图片]
                          </span>
                        )}
                        {item.type === "audio" && (
                          <span className="text-[12px] text-gray-400">
                            [语音]
                          </span>
                        )}
                        {item.type === "text" && (
                          <span className="text-[12px] w-[150px] truncate text-gray-400">
                            {item.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-[14px] text-gray-400 mt-1 mr-[6px]">
                      {dateFormat(item.createdAt, "MM-DD HH:mm")}
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    onClick={() => handleCreateNewChat(item.sender)}
                  >
                    <span>{item.sender.username}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default MessageList;
