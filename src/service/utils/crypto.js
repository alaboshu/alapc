import md5 from 'crypto-js/md5'
import CryptoJS from 'crypto-js'
import ace from 'crypto-js/aes'
import globalConfig from '@/service/config'
import api from '@/service/prototypes/api'

var { projectId, key } = globalConfig
export default {
  // md5加密
  md5 (str) {
    return md5(str).toString()
  },
  // ace 加密
  encrypt (text, aceKey) {
    var encryptText = ace.encrypt(text, this.getKey(aceKey)).toString()
    return encryptText
  },
  // ace 解密
  decrypt (text, aceKey) {
    // Decrypt
    var bytes = ace.decrypt(text, this.getKey(aceKey))
    var originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  },
  // 本地用户缓存信息key,反正被他人负责恶意修改，每个用户不一样
  userKey () {
    var token = api.localGet('user_token')
    if (api.isEmpty(token)) {
      return null
    }
    var tokenKey = token + token.substring(3, 10) + projectId.substring(1, 4)
    var userKey = md5(tokenKey)
    userKey = 'user_' + userKey.toString().substring(4, 24)
    return userKey
  },
  getKey (aceKey) {
    if (aceKey === null || aceKey === undefined) {
      aceKey = ''
    }
    aceKey = aceKey + projectId.substring(1, 4) + key.substring(2, 10)
    return aceKey
  },
  base64 (text) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
  },
  utf8 (text) {
    return CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8)
  }
}
