const ChatPageContainer = () => {
  return (
    <div className="h-[83vh] w-full overflow-auto custom-scrollbar">
      <div className="bg-chat-background bg-fixed opacity-5 w-full h-full">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto"></div>
        </div>
      </div>
    </div>
  )
}
export default ChatPageContainer