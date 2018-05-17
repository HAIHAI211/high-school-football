<template>
  <div id="appoint">
    <scroll-view class="scroll-view" scroll-y @bindscrolltoupper="_upper" @bindscrolltolower="_lower" @bindscroll="scroll">
      <div class="appoint-list">
        <div class="item" v-for="(item,index) in appoints" :key="item.id">
          <div class="creator-info">
            <image class="avatar" lazy-load :src="item.creator.avatar"/>
            <span class="title">{{item.creator.name}}</span>
          </div>
          <div class="appoint-info">
            <p class="appoint-info-item">{{item.formatTime}}</p>
            <p class="appoint-info-item">{{item.siteInfo}}</p>
            <p class="appoint-info-item">{{item.appoint.perCost}}元</p>
          </div>
          <div class="bottom">
            <p class="text">正在寻找球友({{item.appoint.hasCount}}/{{item.appoint.allCount}})</p>
            <div class="btn-wrap">
              <!--<button class="btn" :class="{'btn-join': item.hasJoin}" type="item.hasJoin ? 'primary': 'default'" size="mini" :loading="item.loading"-->
                      <!--:disabled="item.disabled" @tap="_tap(index)" hover-class="other-button-hover"> {{item.hasJoin? '我要退出' : '我要报名'}} </button>-->
              <button class="btn btn-join" type="primary" size="mini" :loading="item.loading"
                      :disabled="item.disabled" @tap="_tap(index)" hover-class="other-button-hover">我要退出</button>
            </div>
          </div>
        </div>
      </div>
      <div class="loading-wrap" v-if="!appoints.length && loading">
        <m-loading></m-loading>
      </div>
      <div class="empty" v-if="!appoints.length && !loading">
        暂无数据
      </div>
    </scroll-view>
    <m-bottom-bar active="me"></m-bottom-bar>
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
        appoints: [],
        loading: true
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
      _showAppointSiteInfo (siteId) {
        let site = this._.find(this.sites, ['id', siteId])
        let result = site.title + '  ' + site.siteType + '人制'
        console.log('_showAppointSiteInfo', result)
        return result
      },
      _toLoginPage () {
        API.navigateTo({
          url: '/pages/login/login'
        })
      },
      async _getAppoints () {
        this.loading = true
        let res = await API.service.getMyJoinAppoints()
        this.loading = false
        this.appoints = this._.reduce(res.data, (appoints, data) => {
          let site = this._.find(this.sites, ['id', data.appoint.siteId])
          let siteInfo = site.title + '  ' + site.siteType + '人制'
          let formatTime = this.$moment(data.appoint.appointTime).format('YYYY-MM-DD hh:ss')
          let loading = false
          let disabled = false
          let newAppoint = this._.assign(data, {siteInfo, formatTime, loading, disabled})
          appoints.push(newAppoint)
          return appoints
        }, [])
        console.log('getAppoints', res)
      },
      async _tapLogic (item, index) {
        let res = await API.showModal({
          title: '提示',
          content: '确认退出该约球活动？'
        })
        if (res.confirm) { // 点击了确认
          item.loading = true
          item.disabled = true
          let res1 = await API.service.leaveAppoint(item.appoint.id)
          console.log('res1', res1)
          const code = res1.data.code
          const msg = res1.data.msg
          if (code !== 0) { // 退出出了问题
            API.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            })
          } else {
            API.showToast({
              title: '退出成功',
              icon: 'success',
              duration: 2000
            })
            this.appoints.splice(index, 1)
          }
          item.loading = false
          item.disabled = false
        }
      },
      _tap (index) {
        if (!this.isLogin) {
          API.navigateTo({
            url: '/pages/login/login'
          })
          return
        }
        let item = this.appoints[index]
        this._tapLogic(item, index)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
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
      .empty
        height 100%
        center()
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
