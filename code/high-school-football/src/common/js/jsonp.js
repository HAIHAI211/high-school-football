import originP from 'jsonp'

export default function jsonP(url, data, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originP(url, options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] === undefined ? '' : data[k]
    url += '&' + k + '=' + value
  }
  return url ? url.slice(1) : ''
}
