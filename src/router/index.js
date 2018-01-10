import Vue from 'vue'
import Router from 'vue-router'

// user
import Login from '../components/user/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/login',
      component: Login,
    }
  ]
})
