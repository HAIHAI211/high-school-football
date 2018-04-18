import {LOGIN_IN} from './mutation-types'
import API from 'api'
import _ from 'lodash'
import {SET_SESSION} from 'utils'

export default {
  async loginByCode ({commit, state}) {
    let wxLoginRes = await API.login()
    console.log('xx wxLoginRes:', wxLoginRes)
    if (wxLoginRes.code) {
      let res = await API.service.loginWithCode(wxLoginRes.code, state.userInfo.avatarUrl, state.userInfo.nickName)
      console.log('xx res', res)
      let result = res.data
      if (!_.isEmpty(result.data)) {
        SET_SESSION(result.data)
        commit(LOGIN_IN)
      }
      return result
    }
  }
}
