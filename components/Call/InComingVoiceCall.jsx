import { useStateProvider } from "@/utils/Context/StateContext";
import { reducerCases } from "@/utils/Context/constants";
import Image from "next/image";

const InComingVoiceCall = () => {
  const [{ inComingVoiceCall, socket }, dispatch] = useStateProvider();

  // 接通电话
  const acceptCall = () => {
    // 由于是通话接收方所以初始的inComingVoiceCall和voiceCall都为undefined, 
    dispatch({
      type: reducerCases.SET_VOICE_CALL,
      voiceCall: { ...inComingVoiceCall, tyep: 'in-coming' }
    })
    socket.current.emit('accept-incoming-call', {
      id: inComingVoiceCall._id
    }),
    dispatch({
      type: reducerCases.SET_INCOMING_VOICE_CALL,
      inComingVoiceCall: undefined
    })
  };

  // 挂断电话
  const rejectCall = () => {
    socket.current.emit('reject-voice-call', {
      from: inComingVoiceCall._id
    })
    dispatch({
      type: reducerCases.END_CALL
    })
  };

  return (
    <div className="h-24 w-80 fixed bottom-8 z-50 rounded-sm flex">
      <div>
        <Image
          src={inComingVoiceCall.image}
          alt="avatar"
          width={70}
          height={70}
          className="rounded-full"
        />
      </div>
      <div>
        <div>{inComingVoiceCall.username}</div>
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
};
export default InComingVoiceCall;
