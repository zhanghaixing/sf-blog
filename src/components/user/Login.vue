<template>
  <div class="login">
    <div class="username">
      账号:
      <input type="text" v-model="info.username">
    </div>
    <div class="password">
      密码:
      <input type="text" v-model="info.password">
    </div>
    <div class="code">
      <input type="text" v-model="info.code">
      <img v-bind:src="info.codeUrl">
    </div>
    <div class="actions">
      <input type="button" value="登录" @click="login">
      <input type="button" value="重置">

    </div>
    结果: {{res}}
  </div>
</template>

<script>

export default {
  data () {
    return {
      info: {
        username: '',
        password: '',
        code: '',
        codeUrl: '',
      },
      res: {},
    }
  },
  mounted () {
    this.info.codeUrl = 'http://47.94.74.150:9060/user/v2/getCode?time='+ Date.now()
  },
  methods: {
    login () {
      this.$http.get('/webapi/user/v2/checkAccount', {
        params: {
          account: this.info.username
        }
      })
      .then( res => {
        console.log(res)
        this.res = res
      } )
    }
  }
}
</script>

<style lang="scss" scope>
$highlight-color: #F90;

.login {

}

</style>
