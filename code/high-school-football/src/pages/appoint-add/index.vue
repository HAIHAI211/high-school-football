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
          <span>选择场馆</span>
        </div>
        <div class="section-value">
          <switch name="switch" color="#ffcd32"/>
        </div>
      </div>
      <!--<div class="section section_gap">-->
        <!--<div class="section__title">switch</div>-->
        <!--<switch name="switch"/>-->
      <!--</div>-->
      <!--<div class="section section_gap">-->
        <!--<div class="section__title">slider</div>-->
        <!--<slider name="slider" show-value ></slider>-->
      <!--</div>-->

      <!--<div class="section">-->
        <!--<div class="section__title">input</div>-->
        <!--<input name="input" placeholder="please input here" />-->
      <!--</div>-->
      <!--<div class="section section_gap">-->
        <!--<div class="section__title">radio</div>-->
        <!--<radio-group name="radio-group">-->
          <!--<label><radio value="radio1"/>radio1</label>-->
          <!--<label><radio value="radio2"/>radio2</label>-->
        <!--</radio-group>-->
      <!--</div>-->
      <!--<div class="section section_gap">-->
        <!--<div class="section__title">checkbox</div>-->
        <!--<checkbox-group name="checkbox">-->
          <!--<label><checkbox value="checkbox1"/>checkbox1</label>-->
          <!--<label><checkbox value="checkbox2"/>checkbox2</label>-->
        <!--</checkbox-group>-->
      <!--</div>-->
      <!--<div class="btn-area">-->
        <!--<button formType="submit">Submit</button>-->
        <!--<button formType="reset">Reset</button>-->
      <!--</div>-->
    </form>
  </div>
</template>
<script>
  // import API from 'api/index'
  export default {
    components: {
    },

    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      _formReset () {},
      _formSubmit (e) {
        console.log(e.detail.value)
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

</style>
