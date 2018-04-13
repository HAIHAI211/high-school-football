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
        // userInfo: {
        //   avatarUrl: '/static/hint-avatar.png',
        //   nickName: ''
        // },
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
      _login () {
        this.loading = true
        this.disabled = true
        API.login().then(res => {
          this.loading = false
          this.disabled = false
          if (res.code) {
            // API.service.loginWithCode(res.code).then(res => {
            //   if (res.code === 0) { // 服务器返回成功
            //     wx.setStorageSync('sessionKey', res.data.sessionKey)
            //     this[LOGIN_IN]()
            //   }
            // })
            this[LOGIN_IN]()
          }
        })
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
