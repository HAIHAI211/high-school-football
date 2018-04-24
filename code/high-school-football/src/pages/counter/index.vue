<template>
<div id="page">
  <div class="img-container">
    <div class="img-wrap" v-for="img in imgs">
      <img :src="img" alt="" class="img">
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      imgs: []
    }
  },
  created () {
    let date = this.$moment().toDate()
    console.log('date', date)

    let formateDate = this.$moment().format('YYYY-MM-DD')
    console.log('formateDate', formateDate)

    let DaysAfterDate = this.$moment().add(+15, 'day').format('YYYY-MM-DD')
    console.log('15天后', DaysAfterDate)
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #page
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background white
    .img-container
      display flex
      flex-wrap wrap
      .img-wrap
        flex 0 0 auto
        width 33.33%
        background lightblue
        display flex
        .img
          flex 1 0 0
          height 120px
          margin 10px

</style>
