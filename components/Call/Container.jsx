"use client"
import { useStateProvider } from "@/utils/Context/StateContext"
import Image from "next/image"
import { MdOutlineCallEnd } from "react-icons/md";
import { reducerCases } from "@/utils/Context/constants"
import { useEffect, useState } from "react";
import { GET_TOKEN_CALL } from "@/utils/API-Route";
import { useSession } from "next-auth/react";

const Container = ({ data }) => {
  const { data: session } = useSession()
  const [{ socket, isConnect }, dispatch] = useStateProvider()
  // const [ callAccepted, setCallAccepted ] = useState(false)
  const [ token, setToken ] = useState(undefined)
  const [ zgVar, setZgVar ] = useState(undefined)
  const [localStream, setLocalStream] = useState(undefined)
  const [publishStream, setPublishStream] = useState(undefined)


  // 通话实现
  // useEffect(() => {
  //   if(data.type === 'out-going') {
  //     socket.current.on('accept-call', () => setCallAccepted(true))
  //   } else {
  //     setTimeout(() => {
  //       setCallAccepted(true)
  //     }, 1000)
  //   }
  // }, [data])

  // 获取token用于开启通话的令牌
  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch(`${GET_TOKEN_CALL}/${session?.user.id}`)
        const token = await res.json()
        setToken(token)
      } catch (error) {
        console.log(error)
      }
    }
    getToken()
  }, [isConnect])

  useEffect(() => {
    const startCall = async () => {
      import("zego-express-engine-webrtc").then(async({ZegoExpressEngine}) => {
        const zg = new ZegoExpressEngine(
          process.env.ZEGO_APP_ID,
          process.env.ZEGO_SERVER
        )
        setZgVar(zg)
        zg.on('roomStreamUpdate', async(
          roomID, updateType, streamList, extendedData) => {
            if(updateType==='ADD') {
              const rmVideo = document.getElementById('remote-video')
              const vd = document.createElement(
                data.callType === 'video'? 'video': 'audio'
              )
              vd.id = streamList[0].streamID
              vd.autoplay = true
              vd.playsInline = true
              vd.muted = false
              if(rmVideo) {
                rmVideo.appendChild(vd)
              }
              zg.startPlayingStream(streamList[0].streamID, {
                audio: true, 
                video: true
              }).then((stream) => (vd.srcObject = stream))

            } else if(
              updateType==='DELETE' && 
              zg && 
              localStream 
              && 
              streamList[0].streamID
            ) {
              zg.destroyStream(localStream)
              zg.stopPublishingStream(streamList[0].streamID)
              zg.logoutRoom(data.roomId.toString())
              dispatch({type: reducerCases.END_CALL})
            }
          }
        )
        
        await zg.loginRoom(
          data.roomId.toString(),
          token,
          { userId: session?.user.id.toString(), userName: session?.user.name },
          { userUpdate: true }
        )

        const localStream = await zg.createStream({
          camera: {
            audio: true,
            video: data.callType === 'video'? true: false
          }
        })

        const localVideo = document.getElementById('local-audio')
        const videoElement = document.createElement(
          data.callType === 'video'? 'video': 'audio'
        )
        videoElement.id = 'video-local-zego'
        videoElement.className = 'h-28 w-32'
        videoElement.autoplay = true
        videoElement.muted = false
        videoElement.playsInline = true

        localVideo.appendChild(videoElement)
        const td = document.getElementById('video-local-zego')
        td.srcObject = localStream
        const streamID = '123' + Date.now()
        setPublishStream(streamID)
        setLocalStream(localStream)
        zg.startPublishingStream(streamID , localStream)
      })
    }

    if(token) {
      startCall()
    }
  }, [token])
  // 挂断电话
  // 挂断电话需要设置!isConnect
  const endCall = () => {
    if(zgVar && localStream && publishStream) {
      zgVar.destroyStream(localStream)
      zgVar.stopPublishingStream(publishStream)
      zgVar.logoutRoom(data.roomId.toString())
    }
    if(data.callType === 'voice') {
      socket.current.emit('reject-voice-call', {
        fromId: data._id,
        isEnd: true // 表示类型为--挂断电话
      })
      dispatch({
        type: reducerCases.IS_CONNECT
      })
    } else {
      socket.current.emit('reject-video-call', {
        fromId: data._id,
        isEnd: true
      })
      dispatch({
        type: reducerCases.IS_CONNECT
      })
    }
    // 挂断电话所有通话相关状态重置
    dispatch({
      type: reducerCases.END_CALL
    })
  }

  return (
    <div className="bg-search-input-container-background w-full h-full flex justify-center items-center text-gray-300">
      <div className="flex flex-col gap-5 w-[400px] justify-center items-center">
        <span className="text-7xl">{data.username}</span>
        <span className="text-lg">{isConnect? '通话中': '正在呼叫...'}</span>
        <Image 
        src={data.image}
        alt="avatars"
        width={250}
        height={250}
        className="rounded-full mt-[35px]"
        />
        {/* 视频通话的元素 */}
        <div className="my-5 relative" id="remote-video">
          <div className="absolute bottom-5 right-5" id="local-audio"></div>
        </div>
        <MdOutlineCallEnd onClick={endCall} className="mt-[20px] text-[70px] bg-red-600 rounded-full p-3"/>
      </div>
    </div>
  )
}
export default Container