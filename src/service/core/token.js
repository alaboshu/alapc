import globalConfig from '@/service/config'
import crypto from '@/service/utils/crypto'
import user from '../prototypes/user'
var { projectId, key, privateKey } = globalConfig
export default {
  // 头部传入token机制,算法和后台匹配，管理员可以在后台随时修改
  getToken (apiUrl) {
    if (apiUrl) {
      var index = apiUrl.indexOf('?')
      if (index > 0) {
        apiUrl = apiUrl.substring(0, index)
      }
      apiUrl = apiUrl
        .toLowerCase()
        .replace('///', '/')
        .replace('//', '/')
        .replace('/api/', 'api/')
        .replace('//', '/')
      var token = apiUrl + this.timestamp() + projectId + key + privateKey
      token = crypto.md5(token.toLowerCase())
      return token
    }
  },
  // 时间戳
  timestamp () {
    return Math.round(new Date().getTime() / 1000)
  },
  // 用户登录头部Token
  getUserToken (apiUrl) {
    var loginUser = user.loginUser()
    if (loginUser !== null && apiUrl !== null && apiUrl !== undefined) {
      var token = this.getToken(apiUrl).substring(2, 10) + loginUser.token
      token = crypto.md5(token.toLowerCase())
      return token
    }
    return ''
  }
}
