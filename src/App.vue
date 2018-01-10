<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// css reset
// import './assets/scss/reset.sass'

// Action Modal
import ActionModal from './components/common/ActionModal'
// Loading
import Loading from './components/common/Loading'
// Message Modal
import MsgModal from './components/common/MsgModal'

export default {
  name: 'app',
  components: {ActionModal, Loading, MsgModal},
}
</script>

<style>

</style>
