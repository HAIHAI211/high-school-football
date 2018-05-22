<template>
  <div id="login">
    <div class="userinfo-wrap" v-if="!isLogin">
      <m-user-info></m-user-info>
    </div>
    <div class="btn-wrap"  v-if="!isLogin">
      <button class="login-btn" type="primary" size="default" :loading="loading"
              :disabled="disabled" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo"> {{btnText}} </button>
    </div>
    <div class="icon-wrap" v-if="isLogin">
      <icon type="success" :size="size"/>
      <span class="login-success">登录成功</span>
    </div>
  </div>
</template>
<script>
  import API from 'api'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {LOGIN_IN, UPDATE_USER} from 'store/mutation-types'
  import MUserInfo from 'components/m-user-info/m-user-info'
  import {SET_SESSION, GET_SESSION} from 'utils'

  export default {
    components: {
      MUserInfo
    },
    data () {
      return {
        loading: false,
        disabled: false,
        size: 50,
        btnText: '获取用户信息'
      }
    },
    computed: {
      ...mapState(['isLogin', 'userInfo'])
    },
    methods: {
      ...mapMutations([LOGIN_IN, UPDATE_USER]),
      ...mapActions(['loginByCode']),
      onGotUserInfo (e) {
        console.log('用户信息', e.mp.detail.userInfo)
        this[UPDATE_USER](e.mp.detail.userInfo)
        this.btnText = '正在登录...'
        this._login()
      },
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
      async _login () { // 此时还没有登录
        this.loading = true
        this.disabled = true

        // 判断本地sessionKey是否存在
        // 标准 但是复杂
        const sessionId = GET_SESSION()
        console.log('本地取出的sessionId:', sessionId)
        if (sessionId) {
          let res = await API.service.loginWithSession(sessionId)
          let result = res.data
          if (result.code === 0) { // sessionId有效
            console.log('sessionId有效')
            SET_SESSION(result.data)
            this.loading = false
            this.disabled = false
            this[LOGIN_IN]()
          } else { // session失效
            console.log('sessionId失效')
            // this._loginActionsWhenSessionIdUseless()
            this.loginByCode()
          }
        } else {
          console.log('sessionId无效')
          this.loginByCode()
        }
      }
    },
    mounted () {
      // this._getUserInfo()
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
