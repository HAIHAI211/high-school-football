import {UPDATE_USER, LOGIN_IN, LOGIN_OUT, INCREMENT, DECREMENT, UPDATE_SITES, UPDATE_SELECTED_SITE_ID} from './mutation-types'
import isNumber from 'lodash/isNumber'
export default {
  [UPDATE_USER] (state, v) {
    state.userInfo.avatarUrl = v.avatarUrl
    state.userInfo.nickName = v.nickName
  },
  [LOGIN_IN] (state, v) {
    state.isLogin = true
  },
  [LOGIN_OUT] (state, v) {
    state.isLogin = false
    state.userInfo.avatarUrl = ''
    state.userInfo.nickName = ''
  },
  [DECREMENT] (state, v) {
    state.count -= 1
  },
  [INCREMENT] (state, v) {
    state.count += 1
  },
  [UPDATE_SITES] (state, v) {
    state.sites = v
  },
  [UPDATE_SELECTED_SITE_ID] (state, v) {
    if (isNumber(v) && v !== -1 && state.selectedSiteId !== v) {
      state.selectedSiteId = v
    }
  }
}
