<template>
  <div id="site" v-if="markers.length">
    <div class="site-map-wrap" v-if="!showSiteList">
      <map class="map" :longitude="selectedMarker.longitude" :latitude="selectedMarker.latitude"
           :markers="markers" :show-location="showLocation"
           @markertap="_markertap" @updated="_updated"></map>
      <div class="show-all-site" @click="showSiteList=true"><span class="text">查看所有球场</span><image class="icon" src="http://img-1255752606.piccd.myqcloud.com/arrow-up.png"></image></div>
      <div class="selected-site" v-if="selectedMarker">
        <m-site-item :marker="selectedMarker" :location-lat="locationLat" :location-lng="locationLng"/>
      </div>
    </div>
    <div class="site-list-wrap" v-if="showSiteList">
      <div class="hide-all-site" @click="showSiteList=false"><span class="text">返回查看地图</span><image class="icon" src="http://img-1255752606.piccd.myqcloud.com/arrow-up.png"></image></div>
      <scroll-view class="site-scroll-view" scroll-y>
        <div class="site-list">
          <m-site-item :marker="mark" :location-lat="locationLat"
                       :location-lng="locationLng" v-for="mark in markers" :key="mark.id"/>
        </div>
      </scroll-view>
    </div>
    <m-bottom-bar active="site"></m-bottom-bar>
  </div>
</template>

<script>
  import MBottomBar from 'components/m-bottom-bar/m-bottom-bar'
  import MSiteItem from 'components/m-site-item/m-site-item'
  import API from 'api'
  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
  import {UPDATE_SELECTED_SITE_ID} from 'store/mutation-types'
  import isEmpty from 'lodash/isEmpty'
  export default {
    components: {
      MBottomBar,
      MSiteItem
    },
    data () {
      return {
        locationLng: 0,
        locationLat: 0,
        showLocation: true,
        showSiteList: false
      }
    },
    computed: {
      ...mapState(['sites']),
      ...mapGetters(['markers', 'selectedMarker'])
    },
    mounted () {
      this._getLocation()
      if (isEmpty(this.sites)) {
        this.updateSites()
      }
    },
    watch: {
    },
    methods: {
      ...mapMutations([UPDATE_SELECTED_SITE_ID]),
      ...mapActions(['updateSites']),
      _getLocation () {
        API.getLocation().then(res => {
          this.locationLng = res.longitude
          this.locationLat = res.latitude
        })
      },
      _markertap (e) {
        this[UPDATE_SELECTED_SITE_ID](e.mp.markerId)
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
      top 0
      bottom 78rpx
      left 0
      right 0
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
      .site-scroll-view
        height 100%
</style>
