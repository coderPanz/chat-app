import { reducerCases } from "./constants";
// 初始状态
export const initialState = {
  userInfo: undefined,
  newUser: false,
}

// reducer函数: 返回的是更新后的 state
// React 会将状态设置为你从 reducer 返回的状态。
// state是当前的状态
const reducer = (state, action) => {
  switch(action.type) {
    // 设置全局用户消息
    case reducerCases.SET_USER_INFO: 
      return {
        ...state,
        userInfo: action.userInfo
      }
    case reducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser
      }
    default:
      return state;
  }
}

export default reducer;