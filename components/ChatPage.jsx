import { MessageBar, ChatPageHeader, ChatPageContainer } from "./index"
const ChatPage = () => {
  return (
    <div className="bg-conversation-panel-background w-full h-[100vh]">
      <ChatPageHeader />
      <ChatPageContainer />
      <MessageBar />
    </div>
  )
}
export default ChatPage