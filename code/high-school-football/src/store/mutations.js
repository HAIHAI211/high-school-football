import {UPDATE_USER, LOGIN_IN, LOGIN_OUT, INCREMENT, DECREMENT} from './mutation-types'

export default {
  [UPDATE_USER] (state, v) {
    console.log('更新了用户信息呵呵')
    state.userInfo.avatarUrl = v.avatarUrl
    state.userInfo.nickName = v.nickName
  },
  [LOGIN_IN] (state, v) {
    console.log('登录了呵呵')
    state.isLogin = true
  },
  [LOGIN_OUT] (state, v) {
    console.log('登出了呵呵')
    state.isLogin = false
    state.userInfo.avatarUrl = '/static/hint-avatar.png'
    state.userInfo.nickName = ''
  },
  [DECREMENT] (state, v) {
    state.count -= 1
  },
  [INCREMENT] (state, v) {
    console.log('增加了呵呵')
    state.count += 1
  }
}
