import _ from 'lodash'

export function SET_SESSION (sessionId) {
  console.log('SET_SESSION')
  wx.setStorageSync('sessionId', sessionId)
}

export function GET_SESSION () {
  return wx.getStorageSync('sessionId')
}

export function param (data) {
  let url = ''
  _.forIn(data, (value, key) => {
    let v = value === undefined ? '' : value
    url += `&${key}=${v}`
  })
  return url ? url.slice(1) : ''
}

