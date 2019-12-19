import token from '@/service/core/token'
import api from '@/service/prototypes/api'
import axios from 'axios'
// const apiBaseUrl = 'http://diyapi.5ug.com'
const apiBaseUrl = 'http://localhost:6800'

export default {
  async get (apiUrl, data) {
    var axiosApi = this.axiosCore()
    this.getAxios(apiUrl)
    var para = {
      params: data
    }
    if (api.client() === 'WeChatLite') {
      para = data
    }
    var response = await axiosApi.get(apiBaseUrl + apiUrl, para)
    return response.data
  },
  async post (apiUrl, data) {
    var axiosApi = this.axiosCore()
    this.getAxios(apiUrl)
    var response = await axiosApi.post(apiBaseUrl + apiUrl, data)
    return response.data
  },
  //  Put方法：改
  async put (apiUrl, data) {
    var response = await this.getRequest(apiUrl).put(apiUrl, data)
    return response
  },
  async delete (apiUrl, data) {
    var axiosApi = this.axiosCore()
    var para = this.parseParams(data)
    var response = await axiosApi.delete(apiBaseUrl + apiUrl + '?' + para)
    return response.data
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
  axiosCore () {
    return axios
  },
  getAxios (apiUrl) {
    axios.interceptors.request.use((config) => {
      config.headers = {
        ...config.headers,
        ...this.getHead(apiUrl)
      }
      return config
    })
  },
  getHead (apiUrl) {
    var site = api.localGet('site_default').site
    var headObj = {
      'zk-site-token': token.getDiyToken(apiUrl),
      'zk-site-id': site.id,
      'zk-site-user-id': site.userId,
      'zk-timestamp': token.timestamp()
    }
    return headObj
  }
}
