export const markBase = {
  iconPath: '/static/mark1.png',
  width: 50,
  height: 50
}
export const selectedMarkBase = {
  iconPath: '/static/mark.png',
  width: 55,
  height: 55
}
export const turfType = [
  {
    index: 0,
    label: '人工草皮'
  },
  {
    index: 1,
    label: '天然草皮'
  },
  {
    index: 2,
    label: '室内球场'
  },
  {
    index: 3,
    label: '沙土球场'
  }
]
export const siteQuality = [
  {
    index: 0,
    label: '完美'
  },
  {
    index: 1,
    label: '较好'
  },
  {
    index: 2,
    label: '一般'
  },
  {
    index: 3,
    label: '菜地'
  }
]

export const markers = [
  Object.assign({}, markBase, {
    id: 0,
    iconPath: '/static/mark.png',
    latitude: 30.7616777222,
    longitude: 103.9929342270,
    title: '西南交通大学犀浦校区南区小足球场',
    address: '成都市郫都区犀安路999号西南交通大学犀浦校区',
    siteType: 5,
    turfType: turfType[0],
    siteQuality: siteQuality[0],
    openTime: '9:00-22:00',
    cost: '350元/场，球队300元',
    pics: ['/static/site1.jpg'],
    hasLight: true
  }),
  Object.assign({}, markBase, {
    id: 1,
    latitude: 30.7571232742,
    longitude: 103.9866685867,
    title: '西南交通大学犀浦校区南区体育场',
    address: '成都市郫都区犀安路999号西南交通大学犀浦校区',
    siteType: 11,
    turfType: turfType[1],
    siteQuality: siteQuality[1],
    openTime: '9:00-22:00',
    cost: '单人25元/小时',
    pics: ['/static/site2.jpg'],
    hasLight: true
  })
]
