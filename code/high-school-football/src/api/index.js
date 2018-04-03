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
export default API
