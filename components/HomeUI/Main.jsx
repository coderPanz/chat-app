"use client";
import {
  ChatPage,
  ChatBar,
  Empty,
  SearchMessages,
  VoiceCall,
  VideoCall,
  InComingVideoCall,
  InComingVoiceCall,
} from "@/components";
import { useStateProvider } from "../../utils/Context/StateContext";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { reducerCases } from "../../utils/Context/constants";
import { io } from "socket.io-client";
import { SOCKETURL } from "@/utils/API-Route";
const Main = () => {
  // 使用useRef保持socket的持久连接
  const socket = useRef();

  const [socketEvent, setSocketEvent] = useState(false);

  const { data: session } = useSession();
  // 若没有创建聊天的话就显示背景图片
  const [
    {
      createNewChat,
      messagesSearch,
      videoCall,
      voiceCall,
      inComingVideoCall,
      inComingVoiceCall,
    },
    dispatch,
  ] = useStateProvider();
  const [messageTemp, setMessageTemp] = useState("");

  // 获取该用户与对应好友的聊天记录(发送和接收)
  useEffect(() => {
    const getMessage = async () => {
      const messageList = await fetch(
        `api/get-message/${session?.user.id}/${createNewChat?._id}`
      );
      const messages = await messageList.json();
      dispatch({
        type: reducerCases.SET_MESSAGES,
        messages,
      });
    };

    if (createNewChat?._id) {
      getMessage();
    }
  }, [createNewChat]);
  // 当用户登录连接socket服务器并设置全局socket状态以便其他地方访问

  useEffect(() => {
    socket.current = io(SOCKETURL);
    // 全局保存socket
    dispatch({ type: reducerCases.SET_SOCKET, socket });
    socket.current.emit("add-user", session?.user.id.toString());
    // socket.current.emit("add-user", session?.user.id.toString());
    // socket.current.emit("add-user", session?.user.id.toString());
    // 因为socket通信时基于socket.id和用户的映射关系来进行的, 当用户登录有并在客户端切换不同程序界面有回到该应用时, useEffect会重新渲染导致同一个用户重复发送add-user事件导致后端的socket.id发送变化, 最终导致socket.id与同一个用户的映射关系发送变化会导致私聊的即时通讯发生问题.所以需要浏览器缓存这个用户数据, 若其没有变化则不会重复发出"add-user"事件
    // 派发一个add-user增加用户的事件
    // if(!localStorage.getItem(session?.user.id.toString())) {
    //   console.log('first')
    //   localStorage.setItem(session?.user.id.toString(), session?.user.id.toString())
    //   socket.current.emit("add-user", session?.user.id.toString());
    // }
  }, [session?.user]);

  // 接收实时消息
  // 只有当不断改变socketEvent, useEffect才能不断进行sockent的消息接收
  useEffect(() => {
    if (socket.current && !socketEvent) {
      console.log(socket.current);
      console.log(socketEvent);
      socket.current.on("msg-recieve", (data) => {
        console.log(data);
        console.log("first");
        // 显示实时发出去的消息
        if (messageTemp !== data._id) {
          setMessageTemp(data._id);
          dispatch({
            type: reducerCases.ADD_MESSAGES,
            newMessage: data,
          });
        }
      });

      // 处理通话的socket
      socket.current.on("incoming-voice-call", ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VOICE_CALL,
          inComingVoiceCall: { ...from, roomId, callType },
        });
      });

      socket.current.on("incoming-video-call", ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VIDEO_CALL,
          inComingVideoCall: { ...from, roomId, callType },
        });
      });

      socket.current.on("voice-call-rejected", (data) => {
        dispatch({
          type: reducerCases.END_CALL,
        });
        // 若类型为挂断电话才需要改变通话状态
        if (data.isEnd) {
          dispatch({
            type: reducerCases.IS_CONNECT,
          });
        }
      });

      socket.current.on("video-call-rejected", (data) => {
        dispatch({
          type: reducerCases.END_CALL,
        });

        if (data.isEnd) {
          dispatch({
            type: reducerCases.IS_CONNECT,
          });
        }
      });

      socket.current.on("voice-call-accepted", () => {
        dispatch({
          type: reducerCases.IS_CONNECT,
        });
      });

      socket.current.on("video-call-accepted", () => {
        dispatch({
          type: reducerCases.IS_CONNECT,
        });
      });
      setSocketEvent(true);
    }
  }, [socket.current]);

  return (
    <div>
      {/* 由于是通话的接收方, 当socket监听到来电时设置inComingVideoCall然后渲染来电组件, 之后进入组件可以决定是否接听或者挂断*/}
      {/* 收到的通话组件 */}
      {inComingVideoCall && <InComingVideoCall />}
      {inComingVoiceCall && <InComingVoiceCall />}

      {/* 发起通话组件 */}
      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}
      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall />
        </div>
      )}
      {!videoCall && !voiceCall && (
        <div className="h-[100vh] w-[100vw] text-white grid grid-cols-12">
          <div className="col-span-3">
            <ChatBar />
          </div>
          {/* 当没有进入聊天界面时显示的一个背景 */}
          {createNewChat ? (
            <div
              className={`col-span-9 ${
                messagesSearch ? "grid grid-cols-2" : ""
              }`}
            >
              <ChatPage />
              {messagesSearch && <SearchMessages />}
            </div>
          ) : (
            <div className="col-span-9">
              <Empty />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
