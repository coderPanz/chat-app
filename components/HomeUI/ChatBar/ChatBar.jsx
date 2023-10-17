"use client"
import { useState } from "react";
import { ChatBarHeader, ChatBarSearch, ChatBarContainer } from "../../index";
const ChatBar = () => {
  // 是否切换到用户列表
  const [ isShowUserList, setIsShowUserList ] = useState(false)
  console.log(isShowUserList)
  return (
    <div className="bg-dropdown-background h-[100vh] border-r-[1px] border-r-gray-600">
      {/* 头部 */}
      <ChatBarHeader 
      setIsShowUserList={setIsShowUserList}
      />
      {/* 搜索框 */}
      <ChatBarSearch />
      {/* 内容列表 */}
      <ChatBarContainer
      isShowUserList={isShowUserList}
      />
    </div>
  );
};
export default ChatBar;
