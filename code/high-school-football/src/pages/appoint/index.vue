<template>
  <div id="appoint">
    约球
    <m-bottom-bar active="appoint"></m-bottom-bar>
  </div>
</template>

<script>
  import MBottomBar from 'components/m-bottom-bar/m-bottom-bar'
  import API from 'api/index'
  export default {
    components: {
      MBottomBar
    },

    data () {
      return {
      }
    },
    created () {

    },
    methods: {
      _login () {
        this._getSessionKey().then(res => {
          if (res.data) { // 缓存中有sessionKey,此处的sessionKey是我们自己服务器生成的session不是微信服务器提供的sessionKey
            this._loginWithSession(res.data)
          } else {
            this._loginWithCode()
          }
        })
      },
      _loginWithSession (sessionKey) {
        API.service.loginWithSession(sessionKey).then(res => {
          if (res.code !== 0) {
            this._loginWithCode()
          }
        })
      },
      _loginWithCode () {
        API.login().then(res => {
          console.log('login code', res.code)
          if (res.code) {
            API.service.loginWithCode(res.code).then(res => {
              if (res && res.data) {
                this._saveSessionKey(res.data)
              }
            })
          }
        }).catch(err => {
          console.log('login err', err)
        })
      },
      _saveSessionKey (sessionKey) {
        API.setStorage({
          key: 'sessionKey',
          data: sessionKey
        })
      },
      _getSessionKey () {
        return API.getStorage({
          key: 'sessionKey'
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
