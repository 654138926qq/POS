// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$axios = axios

// css样式
import 'element-ui/lib/theme-default/index.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
