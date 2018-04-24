<template>
  <div id="appoint">
    <scroll-view class="scroll-view" scroll-y @bindscrolltoupper="_upper" @bindscrolltolower="_lower" @bindscroll="scroll">
      <div class="appoint-list">
        <div class="item" v-for="(item,index) in appoints" :key="item.id">
          <div class="creator-info">
            <image class="avatar" lazy-load :src="item.avatar"/>
            <span class="title">{{item.nickName}}</span>
          </div>
          <div class="appoint-info">
            <p class="appoint-info-item">{{item.appointTime}}</p>
            <p class="appoint-info-item">{{item.siteTitle + '  ' + item.siteType + '人制'}}</p>
            <p class="appoint-info-item">{{item.cost}}</p>
          </div>
          <div class="bottom">
            <p class="text">正在寻找球友({{item.hasCount}}/{{item.allCount}})</p>
            <div class="btn-wrap">
              <button class="btn" :class="{'btn-join': item.isJoin}" type="item.isJoin ? 'primary': 'default'" size="mini" :loading="item.loading"
                      :disabled="item.disabled" @tap="_tap(index)" hover-class="other-button-hover"> {{item.isJoin? '我要退出' : '我要报名'}} </button>
            </div>
          </div>
        </div>
      </div>
      <div class="loading-wrap" v-if="!appoints.length">
        <m-loading></m-loading>
      </div>
    </scroll-view>
    <div class="add-btn" @click="_tapAdd">+</div>
    <m-bottom-bar active="appoint"></m-bottom-bar>
  </div>
</template>

<script>
  import MBottomBar from 'components/m-bottom-bar/m-bottom-bar'
  import MLoading from 'components/m-loading/m-loading'
  import API from 'api/index'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {LOGIN_IN, LOGIN_OUT} from 'store/mutation-types'
  export default {
    components: {
      MBottomBar,
      MLoading
    },

    data () {
      return {
        appoints: [{
          appointId: '',
          avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKtqOJw7icrJiaED1y6rVMTLNQFJwY9oFo5V0lnyqicnEicZSdZzoE07p7p7zANQPkDu5tiaP3u31iaVj7w/0',
          nickName: 'harrison',
          appointTime: '2018/04/16 15:00',
          siteId: 0,
          siteTitle: '西南交大南区足球场',
          siteType: '11',
          latitude: '',
          longitude: '',
          hasCount: 5,
          allCount: 11,
          cost: '30元/人',
          disabled: false,
          loading: false,
          isJoin: false
        }]
      }
    },
    computed: {
      ...mapState(['isLogin', 'sites'])
    },
    created () {
    },
    onShow () {
      console.log('show')
      if (!this.isLogin) {
        console.log('未登录哦')
        this._toLoginPage()
      } else {
        if (this._.isEmpty(this.sites)) {
          console.log('sites为空 现在去请求sites')
          this.updateSites().then(res => {
            this._getAppoints()
          })
        } else {
          this._getAppoints()
        }
      }
    },
    methods: {
      ...mapActions(['updateSites']),
      ...mapMutations([LOGIN_IN, LOGIN_OUT]),
      _toLoginPage () {
        API.navigateTo({
          url: '/pages/login/login'
        })
      },
      async _getAppoints () {
        let res = await API.service.getAppoints()
        console.log('getAppoints', res)
      },
      _tapLogic (item) {
        API.showModal({
          title: '提示',
          content: item.isJoin ? '确认退出该约球活动？' : '确认报名？'
        }).then(res => {
          if (res.confirm) { // 点击了确认
            item.loading = true
            item.disabled = true
            setTimeout(function () {
              API.showToast({
                title: item.isJoin ? '退出成功' : '加入成功',
                icon: 'success',
                duration: 2000
              })
              item.loading = false
              item.disabled = false
              item.isJoin = !item.isJoin
            }, 1500)
          }
        })
      },
      _tap (index) {
        if (!this.isLogin) {
          API.navigateTo({
            url: '/pages/login/login'
          })
          return
        }
        let item = this.appoints[index]
        this._tapLogic(item)
      },
      _tapAdd () {
        console.log('_tapAdd isLogin', this.isLogin)
        let url = {
          url: this.isLogin ? '/pages/appoint-add/appoint-add' : '/pages/login/login'
        }
        API.navigateTo(url)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  #appoint
    position fixed
    top 0
    bottom 78rpx
    left 0
    right 0
    .add-btn
      position fixed
      bottom 90rpx
      right 20rpx
      width 100rpx
      height 100rpx
      border-radius 50%
      background $color-theme
      color #000
      display flex
      align-items center
      justify-content center
      font-size $font-size-large-x
    .scroll-view
      height: 100%
      .loading-wrap
        position absolute
        width 100%
        top 50%
        transform: translateY(-50%)
      .appoint-list
        .item
          margin 0  auto
          margin-bottom 20rpx
          display flex
          flex-direction column
          width 706rpx
          min-height 300rpx
          background $color-highlight-background
          .creator-info
            flex 0 0 auto
            display flex
            align-items center
            padding 15rpx
            .avatar
              background-size cover
              width 88rpx
              height 88rpx
              border-radius 50%
              margin-right 6rpx
            .title
              color $color-text
              font-size $font-size-large-x

          .appoint-info
            flex 0 0 auto
            .appoint-info-item
              color $color-text-d
              font-size $font-size-medium
              padding 10rpx
          .bottom
            flex 0 0 auto
            display flex
            justify-content space-between
            align-items center
            padding 10rpx
            .text
              color $color-theme
              font-size $font-size-medium
            .btn-wrap
              .btn
                background transparent
                border 1px solid $color-text-l
                border-radius 5px
                font-size $font-size-medium
                color $color-text
                overflow hidden
                font-weight 300
                letter-spacing .5px
                &.btn-join
                  border none
                  background $color-theme
                  color #000

</style>
