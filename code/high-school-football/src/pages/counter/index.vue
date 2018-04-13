<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="INCREMENT">+</button>
      <button @click="DECREMENT">-</button>
    </p>

    <a href="/pages/index/index" class="home">去往首页</a>
  </div>
</template>

<script>
// Use Vuex
// import store from '../../store/store'
import {mapState, mapMutations} from 'vuex'
import {INCREMENT, DECREMENT} from 'store/mutation-types'
export default {
  computed: {
    // count () {
    //   return this.$store.state.count
    // }
    ...mapState(['count'])
  },
  methods: {
    // increment () {
    //   this.$store.commit('increment')
    // },
    // decrement () {
    //   this.$store.commit('decrement')
    // }
    ...mapMutations([INCREMENT, DECREMENT])
  }
}

</script>
<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

</style>
