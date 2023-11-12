"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useStateProvider } from "@/utils/Context/StateContext";
import { reducerCases } from "@/utils/Context/constants";
import Link from "next/link";

const ChatBarHeader = () => {
  const { data: session } = useSession();
  // 控制点击切换联系人列表和消息列表
  const [{ socket }, dispatch] = useStateProvider();

  const [avatar, setAvatar] = useState("/default_avatar.png");

  // 是否显示退出登录框
  const [isShow, setIsShow] = useState(false);

  // 是否显示更多
  const [isShowMore, setIsShowMore] = useState(false);

  useEffect(() => {
    setAvatar(session?.user.image);
  }, [session]);

  // 点击切换联系人列表和消息列表
  const handleShowList = () => {
    dispatch({
      type: reducerCases.SET_ALL_CONTACTS_PAGE,
    });
  };

  // 是否显示退出登录框
  const handleExit = () => {
    setIsShow((preState) => !preState);
  };

  // 退出登录
  const handleLoginOut = () => {
    socket.current.emit("login-out", session?.user.id);
    signOut();
  };

  // 是否显示更多
  const handleShowMore = () => {
    setIsShowMore((preState) => !preState);
  };
  // 处理更多
  const hanldeMore = () => {};

  return (
    <div className="bg-panel-header-background flex justify-between items-center p-3">
      <Image
        src={avatar}
        alt="ddd"
        height={40}
        width={40}
        className="rounded-full cursor-pointer"
        onClick={handleExit}
      />
      {isShow && (
        <div
          className="bg-green-700 absolute ml-[50px] w-[80px] h-[40px] rounded-lg flex justify-center items-center cursor-pointer text-gray-300"
          onClick={handleLoginOut}
        >
          <span>退出登录</span>
        </div>
      )}
      <div className="grow ml-3 text-gray-300">
        <span>{session?.user.name}</span>
      </div>
      <div className="flex justify-center items-center">
        <BsFillPersonFill
          onClick={handleShowList}
          className="mr-2 text-gray-400 cursor-pointer text-xl"
        />
        <AiOutlineBars
          onClick={handleShowMore}
          className="text-gray-400 cursor-pointer text-xl"
        />
        {isShowMore && (
          <Link href={'https://github.com/coderPanz'}>
            <div className="bg-green-700 flex gap-1 items-center justify-center absolute ml-[-158px] mt-[-20px] rounded pl-2 pr-3 cursor-pointer text-gray-300">
              <Image src="/github.svg" alt="" height={40} width={40} />
              <span>关于作者</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default ChatBarHeader;
