export function hasClass(dom, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(dom.className)
}

export function addClass(dom, className) {
  if (hasClass(dom, className)) return
  let classArr = dom.className.split(' ')
  classArr.push(className)
  dom.className = classArr.join(' ')
}




