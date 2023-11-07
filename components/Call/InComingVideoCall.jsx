import { useStateProvider } from "@/utils/Context/StateContext";
import { reducerCases } from "@/utils/Context/constants";
import Image from "next/image";

const InComingVideoCall = () => {
  const [{ inComingVideoCall, socket }, dispatch] = useStateProvider();

  // 接通电话
  const acceptCall = () => {
    // 作为接收来电方, 一开始voiceCall并没有设置。若接听电话, 则设置voiceCall来渲染通话时的组件<VoiceCall />
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      voiceCall: { ...inComingVideoCall, tyep: 'in-coming' }
    })
    // 接收通话后发出socket让邀请方的状态改变: 显示对方已经接听电话
    socket.current.emit('accept-incoming-call', {
      id: inComingVideoCall._id
    }),
    // 因为已经接听了本次来电, 所以需要清除来电提醒, 设置inComingVideoCall为空关闭<InComingVideoCall />组件
    dispatch({
      type: reducerCases.SET_INCOMING_VIDEO_CALL,
      inComingVideoCall: undefined
    })
  };

  // 挂断电话
  const rejectCall = () => {
    socket.current.emit('reject-video-call', {
      from: inComingVideoCall._id
    })
    // 挂断电话清空所有通话相关的全局变量, 使得所有相关的通话组件卸载!
    dispatch({
      type: reducerCases.END_CALL
    })
  };
  return (
    <div className="h-24 w-80 fixed bottom-8 z-50 rounded-sm flex">
      <div>
        <Image
          src={inComingVideoCall.image}
          alt="avatar"
          width={70}
          height={70}
          className="rounded-full"
        />
      </div>
      <div>
        <div>{inComingVideoCall.username}</div>
        <div className="text-xs">通话邀请</div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={rejectCall}
            className="bg-red-500 py-1 px-3 text-sm rounded-full "
          ></button>
          <button
            onClick={acceptCall}
            className="bg-green-500 py-1 px-3 text-sm rounded-full "
          ></button>
        </div>
      </div>
    </div>
  );
}
export default InComingVideoCall