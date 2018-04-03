<template>
  <div id="news">
    <scroll-view class="scroll-view" scroll-y @bindscrolltoupper="_upper" @bindscrolltolower="_lower" @bindscroll="scroll">
      <div class="news-list">
        <div class="item" v-for="article in articles" :key="article.id">
          <div class="img-wrap">
            <image class="img" :src="article.thumb"></image>
          </div>
          <div class="text-wrap">
            <h2 class="title">{{article.title}}</h2>
            <span class="sub-title">{{article.author ? article.author.name : ''}}</span>
          </div>
        </div>
      </div>
      <div class="loading-wrap" v-if="!articles.length">
        <m-loading></m-loading>
      </div>
    </scroll-view>
    <m-bottom-bar active="news"></m-bottom-bar>
  </div>
</template>

<script>
import MBottomBar from 'components/m-bottom-bar/m-bottom-bar'
import MLoading from 'components/m-loading/m-loading'
import API from 'api/index'
export default {
  components: {
    MBottomBar,
    MLoading
  },
  data () {
    return {
      next: '',
      articles: []
    }
  },
  created () {
    this._getNews()
  },
  methods: {
    _upper () {
      console.log('upper')
    },
    _lower () {
      console.log('lower')
    },
    _getNews () {
      API.request({
        url: 'https://api.dongqiudi.com/app/tabs/iphone/1.json?mark=gif&version=576&from=msite_com',
        header: {
          'content-type': 'application/json' // 默认值
        }
      }).then(res => {
        this.next = res.data.next
        this.articles = res.data.articles
        console.log('next', this.next)
        console.log('articles', this.articles)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  #news
    position fixed
    top 0
    bottom 78rpx
    left 0
    right 0
    .scroll-view
      height: 100%
      .news-list
        .item
          display: flex
          .img-wrap
            flex: 0 0 160rpx
            padding 0 20rpx 40rpx 20rpx
            .img
              width 160rpx
              height 160rpx
              border-radius 12rpx
              overflow hidden
          .text-wrap
            flex: 1
            display: flex
            flex-direction column
            .title
              font-size: $font-size-large
              letter-spacing 1px
              color: $color-text
              padding-bottom 25rpx
            .sub-title
              font-size $font-size-small
              color $color-text-l
      .loading-wrap
        position absolute
        width 100%
        top 50%
        transform: translateY(-50%)
</style>
