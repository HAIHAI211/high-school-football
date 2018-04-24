<template>
  <div id="appoint-add">
    <form @submit="_formSubmit" @reset="_formReset">
      <div class="section">
        <div class="section-key">
          <span>需要人数</span>
        </div>
        <div class="section-value">
          <slider class="slider" name="slider" show-value min="1" max="11" activeColor="#ffcd32" :value="allCount" @change="_allCountSliderChange"></slider>
        </div>
      </div>
      <div class="section">
        <div class="section-key">
          <span>约定场馆</span>
        </div>
        <div class="section-value">
          <picker class="picker" @change="_SitePickerChange" :value="siteIndex" :range="sites" v-if="sites.length" range-key="title">
            <view class="picker-view">
              {{sites[siteIndex].title}}
            </view>
          </picker>
        </div>
      </div>
      <div class="section">
        <div class="section-key">
          <span>人均费用</span>
        </div>
        <div class="section-value">
          <picker class="picker" @change="_costPickerChange" :value="costIndex" :range="costs">
            <view class="picker-view">
              {{costs[costIndex]}}元
            </view>
          </picker>
        </div>
      </div>
      <div class="section">
        <div class="section-key">
          <span>约定时间</span>
        </div>
        <div class="section-value">
          <picker class="picker date-picker" mode="date" :value="date" :start="startDate" :end="endDate" @change="_DatePickerChange">
            <view class="picker-view">
              {{date}}
            </view>
          </picker>
          <picker class="picker" mode="time" :value="time" :start="startTime" :end="endTime" @change="_timePickerChange">
            <view class="picker-view">
              {{time}}
            </view>
          </picker>
        </div>
      </div>
      <div class="btn-wrap"  v-if="!isLogin">
        <button class="submit-btn" type="primary" size="default" :loading="submitLoading"
                :disabled="submitDisabled" @tap="_submit"> 提交 </button>
      </div>

    </form>
  </div>
</template>
<script>
  import API from 'api/index'
  import {mapState, mapActions} from 'vuex'
  import {GET_SESSION} from 'utils'
  // import {UPDATE_SITES} from 'store/mutation-types'
  export default {
    components: {
    },

    data () {
      return {
        array: ['美国', '中国', '巴西', '日本'],
        siteIndex: 0,
        costIndex: 0,
        date: this._addDay(1),
        startDate: this._addDay(1),
        endDate: this._addDay(15),
        time: '09:00',
        startTime: '09:00',
        endTime: '21:00',
        costs: this._initCosts(),
        allCount: 1,
        submitLoading: false,
        submitDisabled: false
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
      _allCountSliderChange (e) {
        console.log('allCountSlider发送选择改变，携带值为', e.mp.detail.value)
        this.allCount = e.mp.detail.value
      },
      _initCosts () {
        let result = []
        for (let i = 0; i < 51; i++) {
          result.push(i)
        }
        return result
      },
      _addDay (days) {
        return this.$moment().add(days, 'day').format('YYYY-MM-DD')
      },
      async _submit () {
        this.submitDisabled = true
        this.submitLoading = true
        console.log('sessionId', GET_SESSION())
        let appointTime = this.$moment(this.date + ' ' + this.time).format('X') * 1000
        let allCount = this.allCount
        let siteId = this.sites[this.siteIndex].id
        let perCost = this.costs[this.costIndex]
        console.log('appointTime', appointTime)
        console.log('allCount', allCount)
        console.log('siteId', siteId)
        console.log('perCost', perCost)
        let res = await API.service.addAppoint(GET_SESSION(), appointTime, allCount, siteId, perCost)
        console.log('addAppoint res', res)
        this.submitDisabled = false
        this.submitLoading = false
        wx.navigateBack()
        // wx.navigateBack()
      },
      _formReset () {},
      _formSubmit (e) {
        console.log(e.detail.value)
      },
      _SitePickerChange (e) {
        console.log('sitePicker发送选择改变，携带值为', e.mp.detail.value)
        this.siteIndex = e.mp.detail.value
      },
      _costPickerChange (e) {
        console.log('costPicker发送选择改变，携带值为', e.mp.detail.value)
        this.costIndex = e.mp.detail.value
      },
      _DatePickerChange (e) {
        console.log('datePicker发送选择改变，携带值为', e.mp.detail.value)
        this.date = e.mp.detail.value
      },
      _timePickerChange (e) {
        console.log('timePicker发送选择改变，携带值为', e.mp.detail.value)
        this.time = e.mp.detail.value
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  #appoint-add
    .btn-wrap
      padding 40rpx 40rpx
      .submit-btn
        height 90rpx
        line-height 90rpx
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
          &.date-picker
            margin-right 20rpx

</style>
