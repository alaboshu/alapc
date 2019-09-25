import crypto from '@/service/utils/crypto'
import globalConfig from '@/service/config'
const allKeys = 'localStorage_allKeys'
const { projectId } = globalConfig
export default {
  //  存储localStorage
  set (name, data, isEncrypt) {
    data = JSON.stringify(data)
    if (isEncrypt === true) {
      data = crypto.encrypt(data, projectId)
    }
    window.localStorage.setItem(name, data)
    this.setKeys(name)
  },
  //  获取localStorage
  get (name, isEncrypt) {
    if (!name) return
    var data = window.localStorage.getItem(name)
    if (data !== undefined && data !== 'undefined') {
      // 解密
      if (isEncrypt === true) {
        var temp = crypto.utf8(crypto.base64(data))
        var value = crypto.decrypt(temp, projectId)
        return value
      } else {
        value = JSON.parse(data)
        return value
      }
    }
  },

  // 保存所有的Keys
  setKeys (name) {
    var keys = this.get(allKeys)
    if (keys === undefined || keys === null) {
      keys = []
    }
    if (keys.indexOf(name) < 0) {
      keys.push(name)
      var data = JSON.stringify(keys)
      window.localStorage.setItem(allKeys, data)
    }
  },
  //  删除localStorage
  remove (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  },
  // 本地缓存所有键
  clear (clearAll = false) {
    var keys = this.get(allKeys)
    if (keys !== undefined && keys !== null) {
      keys.forEach(element => {
        if (clearAll) {
          this.remove(element)
        } else {
          if (
            !(
              element === 'tenant' ||
              element.toLowerCase().indexOf('user_') === 0
            )
          ) {
            this.remove(element) // 租户标识不能删除
          }
        }
      })
    }
    this.remove(allKeys)
  }
}
