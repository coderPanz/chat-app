"use client"
import { useStateProvider } from "@/utils/Context/StateContext"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"
const Container = dynamic(() => import("./Container"), { ssr: false })

const VideoCall = () => {
  const { data: session } = useSession()
  const userInfos = session?.user
  const [{ videoCall, socket }] = useStateProvider()
  return (
    <Container data={videoCall}/>
  )
}
export default VideoCall