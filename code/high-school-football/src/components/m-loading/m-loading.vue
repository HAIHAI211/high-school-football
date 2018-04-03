<template>
  <div class="loading">
    <image :src="loadingImg" class="img"></image>
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
  import loadingImg from 'components/m-loading/loading.gif'
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    },
    data () {
      return {
        loadingImg
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .loading
    width: 100%
    text-align: center
    .img
      width 35rpx
      height 35rpx
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
