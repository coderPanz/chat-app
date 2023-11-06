"use client";
import {
  ChatPage,
  ChatBar,
  Empty,
  SearchMessages,
  VoiceCall,
  VideoCall,
  InComingVideoCall,
  InComingVoiceCall
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
      // 当进入与某个好友的聊天界面后发出事件让socket创建一个房间实现私聊
      socket.current.emit("joinRoom", createNewChat?._id);
    }
  }, [createNewChat]);

  // 当用户登录连接socket服务器并设置全局socket状态以便其他地方访问
  useEffect(() => {
    if (session?.user) {
      socket.current = io(SOCKETURL);
      // 派发一个add-user增加用户的事件
      socket.current.emit("add-user", session?.user.id);
      // 全局保存socket
      dispatch({ type: reducerCases.SET_SOCKET, socket });
    }
  }, [session?.user]);

  // 接收实时消息
  // 只有当不断改变socketEvent, useEffect才能不断进行sockent的消息接收
  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-recieve", (data) => {
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
      socket.current.on('incoming-voice-call', ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VOICE_CALL,
          inComingVoiceCall: { ...from, roomId, callType }
        })
      })

      socket.current.on('incoming-video-call', ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VIDEO_CALL,
          inComingVideoCall: { ...from, roomId, callType }
        })
      })

      socket.current.on('voice-call-rejected', () => {
        dispatch({
          type: reducerCases.END_CALL
        })
      })

      socket.current.on('video-call-rejected', () => {
        dispatch({
          type: reducerCases.END_CALL
        })
      })

      socket.current.on('accept-incoming-call', ({id}) => {

      })
      setSocketEvent(true);
      // setSocketEvent(preState => !preState)
    }
    // return () => setSocketEvent(preState => !preState) // 添加一个清理函数否则重复渲染两次消息(只是重复渲染并不会存入)
  }, [socket.current]);

  return (
    <>
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
    </>
  );
};

export default Main;
