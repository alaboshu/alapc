import api from '@/service/prototypes/api'

import { USER_LOGIN_POST, USER_REG_POST } from '@/service/core/apiUrl'
import crypto from '@/service/utils/crypto'
import Vue from 'vue'
import base from './base'

export default {
  // 是否登录
  isLogin () {
    var user = this.loginUser()
    if (api.isEmpty(user)) {
      return false
    } else {
      return true
    }
  },
  // 自定商城URL，租户Url
  clientUrl () {
    var user = this.loginUser()
    if (user.tenant !== null) {
      return user.tenant.clientUrl
    } else {
      return null
    }
  },
  // 用户Id
  id () {
    var loginUser = this.loginUser()
    if (loginUser === undefined || loginUser === null) {
      return 0
    }
    return loginUser.id
  },
  // 是否是管理员
  isAdmin () {
    if (this.loginUser() === null) {
      return false
    }
    return this.loginUser().isAdmin
  },
  // 用户名
  userName () {
    var loginUser = this.loginUser()
    if (loginUser === undefined) {
      return null
    }
    return loginUser.username
  },
  // 当前登录用户
  loginUser () {
    var user
    if (!api.isEmpty(api.vuexGet('loginUser'))) {
      return api.vuexGet('loginUser')
    } else {
      user = api.localGet(this.userKey())
      if (!api.isEmpty(user)) {
        var loginUser = JSON.parse(
          crypto.decrypt(
            crypto.utf8(crypto.base64(user)),
            api.localGet('user_token')
          )
        )
        api.vuexSet('loginUser', loginUser)
      }
    }
    if (!api.isEmpty(user)) {
      // 对加密数据进行base64处理,
      // 将数据先base64还原，再转为utf8数据,再解密数据
      return JSON.parse(
        crypto.decrypt(
          crypto.utf8(crypto.base64(user)),
          api.localGet('user_token')
        )
      )
    }
    if (api.isEmpty(user)) {
      return null
    }
    return user
  },
  // 跳转到登录页面
  toLogin () {
    Vue.prototype.$message.warning('请先登录')
    api.localSet('browse_historys', window.location.href)
    base.push('/login')
  },
  loginTo (befterTo) {
    if (befterTo !== undefined) {
      window.location.href = befterTo
      return
    }
    if (this.isLogin()) {
      // 跳转到上一级页面
      var previousPage = api.localGet('browse_historys')
      if (api.isEmpty(previousPage)) {
        window.location.href = '/'
      } else {
        api.localRemove('browse_historys')
        window.location.href = previousPage
      }
      Vue.prototype.$message.warning('已成功登录')
    }
  },
  // 检查是否需要登录，如果需要登录则跳转到登录页面，登录成功以后，返回到上一级页面
  checkLogin (option) {
    if (!this.isLogin()) {
      if (option.indexOf('user') !== -1) {
        window.location.href = '/login'
      }
      if (option.indexOf('admin') !== -1) {
        window.location.href = '/admin/login'
      }
      api.localSet('browse_historys', window.location.href)
    }
  },
  // 登录
  async login (model, befterTo) {
    if (model.username.length < 3) {
      Vue.prototype.$message.warning('账号最短为 3 个字符')
      return
    }
    if (model.password.length < 6) {
      Vue.prototype.$message.warning('密码最短为六位数')
    }
    api.localRemove(this.userKey())
    var response = await api.httpPost(USER_LOGIN_POST, model)
    if (response !== undefined) {
      Vue.prototype.$crud.message(response)
      if (response.status === 1) {
        var userInfo = crypto.encrypt(
          JSON.stringify({
            userName: model.username,
            password: model.password
          })
        )
        api.localSet('user_info', userInfo)
        this.setUser(response.result)
        this.loginTo(befterTo)
      }
    }
  },
  // 将用户信息写入缓存
  setUser (user) {
    if (api.isEmpty(user)) {
      api.toastWarn('用户登录失败')
      return null
    }
    if (api.isEmpty(user.token)) {
      api.toastWarn('用户登录失败')
      return null
    }
    if (user.token < 12) {
      api.toastWarn('用户登录失败')
      return null
    }
    var userToken = user.token
    api.localSet('user_token', user.token)
    api.vuexSet('loginUser', user)
    var userText = crypto.encrypt(JSON.stringify(user), userToken)
    api.localSet(this.userKey(), userText)
  },
  // 注册
  async reg (model) {
    if (!api.isEmpty(model.password) && model.password.length < 6) {
      Vue.prototype.$notify.warning('密码最短为六位数')
    }
    var response = await api.httpPost(USER_REG_POST, model)
    if (response.status === 1) {
      this.login(model)
    } else {
      Vue.prototype.$notify.warning(response.message)
    }
  },
  userKey () {
    return crypto.userKey()
  },
  loginOut () {
    var userkey = this.userKey()
    api.localRemove(userkey)
    api.vuexSet('loginUser', null)
    api.localRemove('admin_menus')
    api.localRemove('user_token')
    api.vuexSet('loginUserTenant', null)
  }
}
