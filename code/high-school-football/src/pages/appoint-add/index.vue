<template>
  <div id="appoint-add">
    <form @submit="_formSubmit" @reset="_formReset">
      <div class="section">
        <div class="section-key">
          <span>需要人数</span>
        </div>
        <div class="section-value">
          <slider class="slider" name="slider" show-value min="1" max="11" activeColor="#ffcd32"></slider>
        </div>
      </div>
      <div class="section">
        <div class="section-key">
          <span>自己参加</span>
        </div>
        <div class="section-value">
          <switch name="switch" color="#ffcd32"/>
        </div>
      </div>
      <div class="section">
        <div class="section-key">
          <span>约定场馆</span>
        </div>
        <div class="section-value">
          <picker class="picker" @change="_SitePickerChange" :value="index" :range="sites" v-if="sites.length" range-key="title">
            <view class="picker-view">
              {{sites[index].title}}
            </view>
          </picker>
        </div>
      </div>
      <div class="section">
        <div class="section-key">
          <span>约定时间</span>
        </div>
        <div class="section-value">
          <picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate" @change="_DatePickerChange">
            <view class="picker-view">
              日期: {{date}}
            </view>
          </picker>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  // import API from 'api/index'
  import {mapState, mapActions} from 'vuex'
  // import {UPDATE_SITES} from 'store/mutation-types'
  export default {
    components: {
    },

    data () {
      return {
        array: ['美国', '中国', '巴西', '日本'],
        index: 0,
        date: this._addDay(1),
        startDate: this._addDay(1),
        endDate: this._addDay(15)
        // now: this._.now(),
        // date: ''
      }
    },
    computed: {
      ...mapState(['sites'])
    },
    mounted () {
      if (this._.isEmpty(this.sites)) {
        this.updateSites()
      }
    },
    methods: {
      ...mapActions(['updateSites']),
      _addDay (days) {
        return this.$moment().add(days, 'day').format('YYYY-MM-DD')
      },
      _formReset () {},
      _formSubmit (e) {
        console.log(e.detail.value)
      },
      _SitePickerChange (e) {
        console.log('sitePicker发送选择改变，携带值为', e.mp.detail.value)
        this.index = e.mp.detail.value
      },
      _DatePickerChange (e) {
        console.log('datePicker发送选择改变，携带值为', e.mp.detail.value)
        this.date = e.mp.detail.value
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  #appoint-add
    .section
      border-bottom 1px solid $color-text-d
      display flex
      padding 20rpx 10rpx
      .section-key
        flex 0 0 180rpx
        center()
      .section-value
        flex 1 0 0
        display flex
        justify-content flex-end
        .slider
          width 100%
        .picker
          center()
          .picker-view
            font-size $font-size-small
            color $color-text-d
            no-wrap()

</style>
