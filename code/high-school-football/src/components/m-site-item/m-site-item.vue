<template>
  <div class="site-item">
    <div class="img-wrap">
      <image class="img" :src="marker.pics[0]"></image>
    </div>
    <div class="text-wrap">
      <div class="top-wrap">
        <div class="left-wrap">
          <h2 class="title">{{marker.title}}</h2>
          <span class="address">{{marker.address}}</span>
        </div>
        <div class="right-wrap">
          <span class="detail">球场详情>></span>
          <span class="distance" v-if="locationLng!== 0">{{distance}}公里</span>
        </div>
      </div>
      <scroll-view class="tag-scroll-view" scroll-x>
        <div class="tag-wrap">
          <div class="tag" v-if="marker.hasLight">有灯光</div>
          <div class="tag">{{marker.turfType.label}}</div>
          <div class="tag">场地质量{{marker.siteQuality.label}}</div>
          <div class="tag">{{marker.siteType}}人场</div>
          <div class="tag">环境清净</div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
  import {getDistance} from 'common/js/map.js'
  export default {
    props: {
      marker: {
        type: Object,
        default: null
      },
      locationLat: {
        type: Number,
        default: 0
      },
      locationLng: {
        type: Number,
        default: 0
      }
    },
    computed: {
      distance () {
        let result = getDistance(this.locationLng, this.locationLat, this.marker.longitude, this.marker.latitude)
        result = (result / 1000).toFixed(2)
        console.log('xxx', result)
        return result
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'

  .site-item
    display flex
    padding-top 15rpx
    height 160rpx
    .img-wrap
      flex 0 0 160rpx
      padding 0 20rpx 40rpx 5rpx
      .img
        width 160rpx
        height 160rpx
        border-radius 5rpx
        overflow hidden
    .text-wrap
      flex 1
      display flex
      flex-direction column
      justify-content space-between
      .top-wrap
        display flex
        .left-wrap
          flex 0 0 350rpx
          display flex
          flex-direction column
          overflow hidden
          .title
            font-size $font-size-medium-x
            color $color-text
            padding-bottom 15rpx
            no-wrap()
          .address
            font-size $font-size-medium
            color $color-text-d
            wrap(2)
        .right-wrap
          flex 1 0 0
          display flex
          flex-direction column
          align-items center
          justify-content space-around
          .detail
            color $color-text
            font-size $font-size-medium
          .distance
            color $color-text-l
            font-size $font-size-small
      .tag-scroll-view
        .tag-wrap
          display flex
        .tag
          flex 0 0 auto
          display flex
          justify-content center
          align-items center
          font-size $font-size-small
          padding 10rpx
          margin-right 15rpx
          border-radius 20rpx
          background $color-theme
          color $color-background
</style>
