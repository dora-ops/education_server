import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

import '@/icons' // icon
import '@/permission' // permission control

import moment from "vue-moment"
Vue.use(moment);
Vue.prototype.$Moment = moment;

Vue.use(ElementUI, { locale })
axios.defaults.baseURL="http://localhost:3000";
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
