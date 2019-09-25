import Vue from 'vue'
import App from './App'
import router from '@/service/router'
import store from '@/service/store/index'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import GlobalUtils from '@/service/prototypes/prototype'
import VueLazyload from 'vue-lazyload'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/element-variables.scss'
import '@/assets/style/pc/index.scss'
import '@/assets/style/iconfont.css'
import '@/assets/style/flaticon/css/flaticon.css'
import '@/assets/style/iconall/css/iconfount.css'

/* 5ug auto-import */

Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(GlobalUtils)
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error:
    'http://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-27/5cebe282b41815014cb56700.png',
  loading:
    'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-11/5cff0b3c57d1ff20248691ba.gif',
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
