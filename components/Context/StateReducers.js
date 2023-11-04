import { reducerCases } from "./constants";
// 初始状态
export const initialState = {
  contactsPage: false, // 是否显示联系人列表
  createNewChat: undefined, // 新建聊天
  messages: undefined, // 全局保存于好友的聊天信息
  socket: undefined,
  messagesSearch: false,
}

// reducer函数: 返回的是更新后的 state
// React 会将状态设置为你从 reducer 返回的状态。
// state是当前的状态
const reducer = (state, action) => {
  switch(action.type) {
    // 是否显示联系人页面
    case reducerCases.SET_ALL_CONTACTS_PAGE:
      return {
        ...state,
        contactsPage: !state.contactsPage,
      }
    // 新建聊天
    case reducerCases.CREATE_NEW_CHAT:
      return {
        ...state,
        createNewChat: action.user
      }
    // 存储消息列表
    case reducerCases.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      }
    // 设置socket
    case reducerCases.SET_SOCKET:
      return {
        ...state,
        socket: action.socket
      }
    // 当监听到socket发送过来的数据, 把最新的数据设置到全局messages中
    // 更新接收到的消息
    case reducerCases.ADD_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.newMessage]
      }
    // 查找消息
    case reducerCases.SET_MESSAGE_SEARCH: 
      return {
        ...state,
        messagesSearch: !state.messagesSearch
      }
    default:
      return state;
  }
}

export default reducer;