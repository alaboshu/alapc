import user from '@/service/prototypes/user'
import local from '@/service/utils/local'
import api from '@/service/prototypes/api'
import base from '@/service/prototypes/base'
import Vue from 'vue'
export default {
  // 根据token自动登录
  async loginByToken () {
    var route = base.router()
    var token = route.query.token
    if (token === undefined) {
      return false
    }
    var timestamp = route.query.timestamp
    if (timestamp === undefined) {
      return false
    }
    var adminUrl = route.query.adminUrl
    if (adminUrl === undefined) {
      return false
    }
    var ip = route.query.ip
    if (ip === undefined) {
      return false
    }
    var siteId = route.query.siteId
    if (siteId === undefined) {
      return false
    }
    var userId = route.query.userId
    if (userId === undefined) {
      return false
    }
    local.clear(true)
    var tenant = route.query.tenant
    if (tenant !== undefined && tenant !== null) {
      api.vuexLocalSet('tenant', tenant)
    } else {
      return false
    }
    if (user.isLogin() && token && timestamp && adminUrl) {
      window.location.href = '/admin/index'
      return false
    }
    if (api.isTenant()) {
      if (
        tenant === undefined ||
        tenant === 'null' ||
        tenant === null ||
        tenant === 'undefined'
      ) {
        return false
      }
    }

    var para = {
      token,
      userId,
      siteId,
      adminUrl,
      timestamp,
      ip,
      tenant
    }
    const loading = Vue.prototype.$loading({
      lock: true,
      text: '正在登陆中....',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    var response = await api.httpPost('/api/Employee/LoginByToken', para)
    loading.close()
    if (response.status === 1) {
      user.setUser(response.result)
    } else {
      Vue.prototype.$alert(response.message, '自动登录失败：', {
        confirmButtonText: '确定',
        callback: action => {
          window.location.href = '/admin/login'
        }
      })
    }
  },

  // 所有的菜单
  allMenus (menus) {
    var childMenus = []
    menus.forEach(t => {
      var itemMenu = t
      if (itemMenu.menus) {
        itemMenu.menus.forEach(element => {
          if (element.isEnable === true) {
            element.value = `${element.name}`
            childMenus.push(element)
            if (element.menus) {
              element.menus.forEach(r => {
                if (r.isEnable === true) {
                  r.value = `${r.name}`
                  childMenus.push(r)
                }
              })
            }
          }
        })
      }
    })
    return childMenus
  },

  // 头部菜单，快捷操作
  async topQuickMenus () {
    var topMenus = [
      { name: '清空缓存', icon: 'flaticon-stopwatch ', method: 'clearCache' },
      { name: '数据初始', icon: 'flaticon-lifebuoy', method: 'init' }
    ]
    return topMenus
  },
  async quickAction (quickItem) {
    if (quickItem.method === 'clearCache') {
      this.clearCache()
    }
    if (quickItem.method === 'init') {
      this.init()
    }
  },
  // 初始化
  async init () {
    this.clearCache() // 初始前先清理缓存
    api.progressOpen(
      '正在进行数据初始,预计<span style="color: red;">1分钟</span>时间，请勿离开或刷新页面...'
    )
    var res = await api.httpGet('Api/Admin/Init')
    setTimeout(() => {
      api.progressClose()
      if (res.status === 1) {
        Vue.prototype.$message({
          message: '恭喜您，数据初始成功',
          type: 'success'
        })
      }
    }, 2000)
  },
  // 清空缓存
  async clearCache () {
    api.progressOpen(
      '正在清空系统缓存,预计<span style="color: red;">1分钟</span>时间，请勿离开或刷新页面...'
    )
    var res = await api.httpGet('Api/Admin/ClearCache')
    await this.$base.localData()
    setTimeout(async () => {
      api.progressClose()
      if (res.status === 1) {
        local.clear()
        Vue.prototype.$message({
          message: '恭喜您，缓存清空成功',
          type: 'success'
        })
        window.location.href = base.router().path
      }
    }, 500)
  }
}
