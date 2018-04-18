import {UPDATE_USER, LOGIN_IN, LOGIN_OUT, INCREMENT, DECREMENT, UPDATE_SITES, UPDATE_SELECTED_SITE_ID} from './mutation-types'
import _ from 'lodash'
// import Vue from 'vue'
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
    state.userInfo.avatarUrl = ''
    state.userInfo.nickName = ''
  },
  [DECREMENT] (state, v) {
    state.count -= 1
  },
  [INCREMENT] (state, v) {
    console.log('增加了呵呵')
    state.count += 1
  },
  [UPDATE_SITES] (state, v) {
    state.sites = v
  },
  [UPDATE_SELECTED_SITE_ID] (state, v) {
    if (_.isNumber(v) && v !== -1 && state.selectedSiteId !== v) {
      console.log('mutation selected_site_id:', v)
      state.selectedSiteId = v
    }
  }
}
