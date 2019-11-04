import Fly from 'flyio'
import api from '@/service/prototypes/api'
import user from '@/service/prototypes/user'
import base from '@/service/prototypes/base'
import token from '@/service/core/token'
import globalConfig from '@/service/config'
var {
  apiBaseUrl
} = globalConfig
export default {
  //  Get方法：查
  async get (apiUrl, data) {
    const response = await this.getRequest(apiUrl, data).get(apiUrl, data)
    return response
  },
  //  Post方法 :增
  async post (apiUrl, data) {
    var response = await this.getRequest(apiUrl, data).post(apiUrl, data)
    return response
  },
  //  Put方法：改
  async put (apiUrl, data) {
    var response = await this.getRequest(apiUrl).put(apiUrl, data)
    return response
  },
  //  delete方法：删
  async delete (apiUrl, data) {
    var response = await this.getRequest(apiUrl).delete(apiUrl, data)
    return response
  },
  parseParams (data) {
    try {
      var tempArr = []
      for (var i in data) {
        var key = encodeURIComponent(i)
        var value = encodeURIComponent(data[i])
        tempArr.push(key + '=' + value)
      }
      var urlParamsStr = tempArr.join('&')
      return urlParamsStr
    } catch (err) {
      return ''
    }
  },
  getRequest (apiUrl) {
    const request = new Fly()
    request.interceptors.request.use((config, promise) => {
      config.headers['zk-token'] = token.getToken(apiUrl)
      config.headers['zk-user-id'] = user.id()
      config.headers['zk-filter'] = base.filter()
      config.headers['zk-user-token'] = token.getUserToken(apiUrl)
      config.headers['zk-tenant'] = api.tenant()
      config.headers['zk-timestamp'] = token.timestamp()
      return config
    })
    request.config.baseURL = apiBaseUrl
    request.interceptors.response.use(
      (response, promise) => {
        return promise.resolve(response.data)
      },
      (err, promise) => {
        if (err) {
          if (!base.isBuild()) {
            console.error(`网络请求错误:${apiUrl},`, err.response)
          }
        }
        return promise.resolve(err.response.data)
      }
    )
    return request
  }
}
