import Vue from 'vue'
import App from './App'
import store from './store'
import 'common/stylus/index.styl'
import _ from 'lodash'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype._ = _
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [ 'pages/index/index', 'pages/test/test', '^pages/news/news',
      'pages/site/site', 'pages/appoint/appoint', 'pages/me/me', 'pages/counter/counter'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#222',
      navigationBarTitleText: '校园足球服务平台',
      navigationBarTextStyle: 'white'
    }
    // tabBar: {
    //   color: 'rgba(255, 255, 255, 0.5)',
    //   selectedColor: '#ffcd32',
    //   backgroundColor: '#222',
    //   borderStyle: '',
    //   list: [{
    //     pagePath: 'pages/news/news',
    //     text: '资讯',
    //     iconPath: '',
    //     selectedIconPath: ''
    //   }, {
    //     pagePath: 'pages/site/site',
    //     text: '场馆',
    //     iconPath: '',
    //     selectedIconPath: ''
    //   }, {
    //     pagePath: 'pages/appoint/appoint',
    //     text: '约球',
    //     iconPath: '',
    //     selectedIconPath: ''
    //   }, {
    //     pagePath: 'pages/me/me',
    //     text: '我的',
    //     iconPath: '',
    //     selectedIconPath: ''
    //   }],
    //   position: 'bottom'
    // }
  }
}
