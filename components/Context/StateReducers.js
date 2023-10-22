import { reducerCases } from "./constants";
// 初始状态
export const initialState = {
  // userInfo: undefined,
  // newUser: false,
  contactsPage: false, // 是否显示联系人列表
  createNewChat: undefined, // 新建聊天
  messages: undefined // 全局保存于好友的聊天信息
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
        messages: action.messages
      }
    default:
      return state;
  }
}

export default reducer;