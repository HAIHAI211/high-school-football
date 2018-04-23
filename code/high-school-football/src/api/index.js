/**
 * @author HARRISON
 * @describe 对小程序异步方法进行promise封装
 * @date 2018.04.03
 */
const API = {}
// 遍历wx进行封装
Object.keys(wx).forEach((key) => {
  if (key.substr(0, 2) !== 'on' && !/[\s\S]+Sync$/.test(key)) {
    Object.defineProperty(API, key, {
      // 获取api
      get () {
        // 返回api对应函数
        // obj 传入的参数
        return obj => {
          // 创建promise对象
          return new Promise((resolve, reject) => {
            obj = obj || {}
            obj.success = (...args) => {
              resolve(...args)
            }
            obj.fail = (...args) => {
              reject(...args)
            }
            obj.complete = (...args) => {
              // 空函数
            }
            // 对wx对象的api进行调用，并且传播promise状态
            wx[key](obj)
          })
        }
      }
    })
  } else {
    Object.defineProperty(API, key, {
      get () {
        return (...args) => {
          wx[key].apply(wx, args)
        }
      }
    })
  }
})
const TEST_ORIGIN = 'http://localhost:8081/'
// const TRUE_ORIGIN = 'https://blogharrison.com/hsfthree/'
const USE_ORIGIN = TEST_ORIGIN
API.service = {
  async getNews () {
    return API.request({
      url: 'https://api.dongqiudi.com/app/tabs/iphone/1.json?mark=gif&version=576&from=msite_com',
      header: {
        'content-type': 'application/json' // 默认值
      }
    })
  },
  async getSites () {
    return API.request({
      url: USE_ORIGIN + 'site/find',
      header: {
        'content-type': 'application/json'
      }
    })
  },
  async loginWithCode (code, avatar, nickName) {
    return API.request({
      url: USE_ORIGIN + 'login/c/' + code + '?avatar=' + avatar + '&nickName=' + nickName,
      header: {
        'content-type': 'application/json'
      }
    })
  },
  async loginWithSession (sessionKey) {
    return API.request({
      url: USE_ORIGIN + 'login/s/' + sessionKey,
      header: {
        'content-type': 'application/json'
      }
    })
  },
  async addAppoint (sessionId, appointTime, allCount, siteId, perCost) {
    return API.request({
      url: USE_ORIGIN + 'appoint/add',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: 'sessionId=' + sessionId + '&appointTime=' +
      appointTime + '&allCount=' + allCount + '&siteId=' + siteId + '&perCost=' + perCost
    })
  }
}
export default API
