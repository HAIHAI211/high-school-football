<template>
  <div id="me">
    <!--<div class="top" v-if="!isLogin">-->
      <!--未登录-->
    <!--</div>-->
    <div class="userinfo-wrap" :class="{'user-out': !isLogin}">
      <m-user-info size="large"></m-user-info>
      <div class="login-in-out"  @click="_loginInOut">
        {{isLogin? '登出': '登录'}}
      </div>
    </div>
    <div class="item-wrap" v-if="isLogin">
      <div class="item top-item">
        <span class="title">修改账户信息</span>
      </div>
      <div class="item">
        <span class="title">我的消息</span>
      </div>
      <div class="item" @click="_tapCreated">
        <span class="title">我创建的约球</span>
      </div>
      <div class="item">
        <span class="title">我参与的约球</span>
      </div>
    </div>
    <m-bottom-bar active="me"></m-bottom-bar>
  </div>
</template>
<script>
  import MBottomBar from 'components/m-bottom-bar/m-bottom-bar'
  import MUserInfo from 'components/m-user-info/m-user-info'
  import {mapState, mapMutations} from 'vuex'
  import {LOGIN_IN, LOGIN_OUT} from 'store/mutation-types'
  import API from 'api'
  export default {
    components: {
      MBottomBar,
      MUserInfo
    },

    data () {
      return {
      }
    },
    methods: {
      ...mapMutations([LOGIN_IN, LOGIN_OUT]),
      _toLoginPage () {
        API.navigateTo({
          url: '/pages/login/login'
        })
      },
      _loginInOut () {
        this.isLogin ? this[LOGIN_OUT]() : this._toLoginPage()
      },
      _tapCreated () {
        console.log('_tapCreated')
        let url = {
          url: '/pages/my-creat-appoints/my-creat-appoints'
        }
        API.navigateTo(url)
      }
    },
    computed: {
      ...mapState(['isLogin'])
    },
    mounted () {
      if (!this.isLogin) {
        console.log('未登录哦')
        this._toLoginPage()
      }
    },
    onShow () {
      if (!this.isLogin) {
        console.log('onshow login out')
        this[LOGIN_OUT]()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  #me
    position fixed
    top 0
    bottom 78rpx
    left 0
    right 0
    .top
      height 200rpx
      background $color-highlight-background
      display flex
      justify-content center
      align-items center
      font-size $font-size-large
      color $color-text-d
      letter-spacing 1px
    .userinfo-wrap
      position relative
      background linear-gradient(to right, #06beb6, #48b1bf)
      &.user-out
        background $color-highlight-background
      .login-in-out
        background transparent
        width 100rpx
        height 55rpx
        border-radius 10rpx
        border: 1px solid #fbfbfb
        position absolute
        top 25rpx
        right 25rpx
        color $color-text
        font-size $font-size-medium
        display flex
        align-items center
        justify-content center
    .item-wrap
      .item
        background $color-highlight-background
        display flex
        align-items center
        height 120rpx
        margin-bottom 10rpx
        padding-left 25rpx
        &.top-item
          margin-bottom 70rpx
        .title
          color $color-text
          font-size $font-size-large
          letter-spacing 1px




</style>
