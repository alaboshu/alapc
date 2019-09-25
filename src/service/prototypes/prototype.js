import api from '@/service/prototypes/api.js'
import user from '@/service/prototypes/user.js'
import base from '@/service/prototypes/base.js'
import crud from '@/service/prototypes/crud.js'
import random from '@/service/prototypes/random.js'
import admin from '@/service/prototypes/admin.js'
import config from '@/service/config'

window.apiBaseUrl = config.apiBaseUrl // 百度编辑器

export default {
  install (Vue, options) {
    Vue.prototype.$api = api
    Vue.prototype.$admin = admin
    Vue.prototype.$user = user
    Vue.prototype.$crud = crud
    Vue.prototype.$random = random
    Vue.prototype.$bus = new Vue()
    Vue.prototype.$base = base
  }
}
