import {LOGIN_IN, LOGIN_OUT, INCREMENT, DECREMENT} from './mutation-types'

export default {
  [LOGIN_IN] (state, v) {
    state.isLogin = true
  },
  [LOGIN_OUT] (state, v) {
    state.isLogin = false
  },
  [DECREMENT] (state, v) {
    state.count -= 1
  },
  [INCREMENT] (state, v) {
    state.count += 1
  }
}
