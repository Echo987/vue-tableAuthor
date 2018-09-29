import Vue from 'vue'
import Router from 'vue-router'
import author from '@/views/author/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: author
    }
  ]
})
