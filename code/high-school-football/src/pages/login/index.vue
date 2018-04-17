<template>
  <div id="login">
    <div class="userinfo-wrap" v-if="!isLogin">
      <m-user-info></m-user-info>
    </div>
    <div class="btn-wrap"  v-if="!isLogin">
      <button class="login-btn" type="primary" size="default" :loading="loading"
              :disabled="disabled" @tap="_login"> {{btnText}} </button>
    </div>
    <div class="icon-wrap" v-if="isLogin">
      <icon type="success" :size="size"/>
      <span class="login-success">登录成功</span>
    </div>
  </div>
</template>
<script>
  import API from 'api'
  import {mapState, mapMutations} from 'vuex'
  import {LOGIN_IN, UPDATE_USER} from 'store/mutation-types'
  import MUserInfo from 'components/m-user-info/m-user-info'

  export default {
    components: {
      MUserInfo
    },
    data () {
      return {
        loading: true,
        disabled: true,
        size: 50,
        btnText: '正在加载'
      }
    },
    computed: {
      ...mapState(['isLogin', 'userInfo'])
    },
    methods: {
      ...mapMutations([LOGIN_IN, UPDATE_USER]),
      _getUserInfo () {
        // 调用登录接口
        API.getUserInfo().then(res => {
          this.loading = false
          this.disabled = false
          this.btnText = '使用微信账号登录'
          console.log('userInfo', res.userInfo)
          this[UPDATE_USER](res.userInfo)
          this.disabled = false
        })
      },
      _login () { // 此时还没有登录
        this.loading = true
        this.disabled = true

        // 判断本地sessionKey是否存在
        // 标准 但是复杂
        const sessionId = wx.getStorageSync('sessionId')
        if (sessionId) {
          console.log('sessionId有效')
          API.service.loginWithSession(sessionId).then(res => {
            console.log('session login res', res)
          })
        } else {
          console.log('sessionId无效')
          API.login().then(res => {
            if (res.code) {
              API.service.loginWithCode(res.code, this.userInfo.avatarUrl, this.userInfo.nickName).then(res => {
                this.loading = false
                this.disabled = false
                console.log('code login res.data', res.data)
                if (res.data && res.data.code === 0) {
                  wx.setStorageSync('sessionId', res.data.data)
                  this[LOGIN_IN]()
                }
              })
            }
          })
        }
      }
    },
    mounted () {
      this._getUserInfo()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  #login
    .btn-wrap
      padding 0 40rpx
      .login-btn
        height 90rpx
        line-height 90rpx
    .icon-wrap
      height 400rpx
      display flex
      align-items center
      justify-content center
      flex-direction column
      .login-success
        padding 15rpx
        font-size $font-size-large
        color $color-text

</style>
