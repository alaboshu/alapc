import axios from 'axios'
import api from '@/service/prototypes/api'
import user from '@/service/prototypes/user'
import base from '@/service/prototypes/base'
import token from '@/service/core/token'
import globalConfig from '@/service/config'
export default {
  async get (apiUrl, data) {
    if (apiUrl[0] !== '/') {
      apiUrl = '/' + apiUrl
    }
    var headObj = this.getHead(apiUrl)
    var service = globalConfig.apiBaseUrl + apiUrl
    var response = await axios.get(service, {
      headers: headObj,
      params: data
    }).then((res) => {
      return res.data
    })
    return this.infoResPonse(response)
  },
  async post (apiUrl, data) {
    var headObj = this.getHead(apiUrl)
    if (apiUrl[0] !== '/') {
      apiUrl = '/' + apiUrl
    }
    var service = globalConfig.apiBaseUrl + apiUrl
    var response = await axios({
      method: 'post',
      url: service,
      data: data,
      headers: headObj
    }).then((res) => {
      return res
    })
    // var response = await axios.post(service, data).then((res) => {
    //   return res.data
    // })
    return this.infoResPonse(response)
  },
  async delete (apiUrl, data) {
    var service = globalConfig.apiBaseUrl + apiUrl
    var list = this.parseParams(data)
    var response = await axios.delete(service + '?' + list).then(res => {
      return res.data
    })
    return this.infoResPonse(response)
  },
  getHead (apiUrl) {
    var headObj = {
      'zk-token': token.getToken(apiUrl),
      'zk-user-id': user.id(),
      'zk-filter': base.filter(),
      'zk-user-token': token.getUserToken(apiUrl),
      'zk-tenant': api.tenant(),
      'zk-timestamp': token.timestamp()
    }
    return headObj
  },
  parseParams (data) {
    try {
      var temp = []
      for (let i in data) {
        var key = encodeURIComponent(i)
        var value = encodeURIComponent(data[i])
        temp.push(key + '=' + value)
      }
      var urlParamsStr = temp.join('&')
      return urlParamsStr
    } catch (err) {

    }
  },
  infoResPonse (response) {
    if (response === undefined) {
      return
    }
    return response
  }
}
