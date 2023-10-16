import { ListHeader, Search, UserList } from "./index"
const ChatList = () => {
  return (
    <div className="bg-dropdown-background h-[100vh] border-r-[1px] border-r-gray-600">
      <ListHeader />
      <Search />
      <UserList />
    </div>
  )
}
export default ChatList