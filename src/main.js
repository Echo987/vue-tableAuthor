// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// import {Button, Table, TableColumn, Select, Message, Row, Col, Container, Main, Input} from 'element-ui'
// Vue.use(Button).use(Table).use(TableColumn).use(Select).use(Input).use(Row).use(Col).use(Container).use(Main)
// Vue.prototype.$message = Message
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
