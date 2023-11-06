"use client"
import { useStateProvider } from "@/utils/Context/StateContext"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"
import { useEffect } from "react"
const Container = dynamic(() => import("./Container"), { ssr: false })

const VoiceCall = () => {
  const { data: session } = useSession()
  const userInfos = session?.user
  const [{ voiceCall, socket }] = useStateProvider()

  // 发起通话
  useEffect(() => {
    if(voiceCall.type === 'out-going') {
      socket.current.emit('outgoing-out-call', {
        to: voiceCall._id,
        from: {
          id: session?.user.id,
          image: session?.user.image,
          username: session?.user.username
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId
      })
    }
  }, [voiceCall])
  return (
    <Container data={voiceCall}/>
  )
}
export default VoiceCall