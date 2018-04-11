<template>
  <div id="site">
    <div class="site-map-wrap" v-if="!showSiteList">
      <map class="map" :longitude="lng" :latitude="lat"
           :markers="markers" :show-location="showLocation"
           @markertap="_markertap" @updated="_updated"></map>
      <div class="show-all-site" @click="showSiteList=true"><span class="text">查看所有球场</span><image class="icon" src="/static/arrow-up.png"></image></div>
      <div class="selected-site">
        <m-site-item :marker="selectedMarker" :location-lat="locationLat" :location-lng="locationLng"></m-site-item>
      </div>
    </div>
    <div class="site-list-wrap" v-if="showSiteList">
      <div class="hide-all-site" @click="showSiteList=false"><span class="text">返回查看地图</span><image class="icon" src="/static/arrow-up.png"></image></div>
      <scroll-view class="site-scroll-view">
        <div class="site-list">
          <m-site-item :marker="mark" :location-lat="locationLat"
                       :location-lng="locationLng" v-for="mark in markers" :key="mark.id"></m-site-item>
        </div>
      </scroll-view>
    </div>
    <m-bottom-bar active="site"></m-bottom-bar>
  </div>
</template>

<script>
  import MBottomBar from 'components/m-bottom-bar/m-bottom-bar'
  import MSiteItem from 'components/m-site-item/m-site-item'
  import {markers} from './config.js'
  import {getDistance} from 'common/js/map.js'
  import API from 'api/index'
  export default {
    components: {
      MBottomBar,
      MSiteItem
    },
    data () {
      return {
        locationLng: 0,
        locationLat: 0,
        lng: 103.9929342270,
        lat: 30.7616777222,
        markers: markers,
        showLocation: true,
        selectedId: 0,
        showSiteList: false
      }
    },
    computed: {
      selectedMarker () {
        return this.markers[this.selectedId]
      },
      getDistance () {
        let result = getDistance(this.locationLng, this.locationLat, this.selectedMarker.longitude, this.selectedMarker.latitude)
        result = (result / 1000).toFixed(2)
        console.log('xxx', result)
        return result
      }
    },
    created () {
      this._getLocation()
    },
    methods: {
      _getLocation () {
        API.getLocation().then(res => {
          this.locationLng = res.longitude
          this.locationLat = res.latitude
          console.log('locationLng', this.locationLng)
        })
      },
      _markertap (e) {
        console.log(e.mp.markerId)
        if (this.selectedId !== e.mp.markerId) {
          this.$set(this.markers, e.mp.markerId, Object.assign(this.markers[e.mp.markerId], {iconPath: '/static/mark.png'}))
          this.$set(this.markers, this.selectedId, Object.assign(this.markers[this.selectedId], {iconPath: '/static/mark1.png'}))
          this.selectedId = e.mp.markerId
          console.log('markers', this.markers)
        }
      },
      _updated () {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  #site
    position fixed
    top 0
    bottom 78rpx
    left 0
    right 0
    .site-map-wrap
      height 100%
      display flex
      flex-direction column
      .map
        width 100%
        flex 0 0 70%
      .show-all-site
        flex 0 0 auto
        display flex
        justify-content center
        align-items center
        padding 8rpx 0
        border-bottom 1px solid $color-text-d
        .text
          color $color-text
          font-size $font-size-medium
        .icon
          width 40rpx
          height 40rpx
      .selected-site
        flex 0 0 auto
    .site-list-wrap
      position absolute
      z-index 2
      width 100%
      height 100%
      background $color-background
      .hide-all-site
        display flex
        justify-content center
        align-items center
        padding 8rpx 0
        border-bottom 1px solid $color-text-d
        .text
          color $color-text
          font-size $font-size-medium
        .icon
          width 40rpx
          height 40rpx
          transform rotate(180deg)
</style>
