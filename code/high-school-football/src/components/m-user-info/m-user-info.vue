<template>
  <div class="userinfo">
    <img class="userinfo-avatar" :src="userInfo.avatarUrl == '' ? 'http://img-1255752606.piccd.myqcloud.com/hint-avatar.png': userInfo.avatarUrl" background-size="cover" :class="{'large-avatar': size === 'large'}"/>
    <div class="userinfo-nickname"  :class="{'large-nickname': size === 'large'}">
      {{userInfo.nickName}}
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    props: {
      size: {
        type: String,
        default: 'default'
      }
    },
    computed: {
      ...mapState(['userInfo'])
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .userinfo
    display flex
    flex-direction column
    align-items center
  .userinfo-avatar
    width 128rpx
    height 128rpx
    margin 20rpx
    border-radius 50%
    &.large-avatar
      width 188rpx
      height 188rpx
  .userinfo-nickname
    font-size $font-size-large
    color $color-text
    padding 15rpx
    &.large-nickname
      font-size $font-size-large-x
      padding 25rpx
</style>
