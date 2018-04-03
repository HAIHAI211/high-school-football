<template>
<div id="bottom-bar">
  <navigator open-type="redirect"  class="item" url="/pages/news/news" :class="{active: active === 'news'}">
    <i class="iconfont"></i>
    <span class="text">资讯</span>
  </navigator>
  <navigator open-type="redirect"  class="item" url="/pages/site/site" :class="{active: active === 'site'}">
    <i class="iconfont"></i>
    <span class="text">场馆</span>
  </navigator>
  <navigator open-type="redirect"  class="item" url="/pages/appoint/appoint" :class="{active: active === 'appoint'}">
    <i class="iconfont"></i>
    <span class="text">约球</span>
  </navigator>
  <navigator open-type="redirect"  class="item" url="/pages/me/me" :class="{active: active === 'me'}">
    <i class="iconfont"></i>
    <span class="text">我的</span>
  </navigator>
</div>
</template>
<script>
export default {
  props: {
    active: {
      type: String,
      default: 'news'
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  #bottom-bar
    position fixed
    bottom 0
    right 0
    left 0
    display flex
    height 78rpx
    .item
      flex 1
      display flex
      flex-direction column
      justify-content center
      align-items center
      .text
        font-size $font-size-medium
        color $color-text-l
      &.active
        .text
          color $color-theme
</style>
