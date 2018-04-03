<template>
<div id="index">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <m-bottom-bar></m-bottom-bar>
</div>
</template>

<script>
import { formatTime } from '@/utils/index'
import MBottomBar from 'components/m-bottom-bar/m-bottom-bar'
export default {
  components: {
    MBottomBar
  },

  data () {
    return {
      logs: []
    }
  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
