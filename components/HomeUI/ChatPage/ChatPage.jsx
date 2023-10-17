import { ChatPageInputBar, ChatPageHeader, ChatPageContainer } from "../../index";
const ChatPage = () => {
  return (
    <div className="bg-conversation-panel-background w-full h-[100vh]">
      <ChatPageHeader />
      <ChatPageContainer />
      <ChatPageInputBar />
    </div>
  );
};
export default ChatPage;
