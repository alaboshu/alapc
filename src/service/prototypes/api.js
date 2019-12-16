import theme from '@/service/core/theme'
import http from '@/service/core/http'
import local from '../utils/local'
import store from '@/service/store/index'
import help from '@/service/utils/helper'
import config from '@/service/config'
import Vue from 'vue'

// 方法名格式：文件名+方法名

export default {
  // 当前租户
  tenant () {
    if (config.isTenant === true) {
      var tenant = this.vuexLocalGet('tenant')
      return tenant
    } else {
      return ''
    }
  },
  // 是否为租户模式
  isTenant () {
    return config.isTenant
  },
  alert (message) {
    Vue.prototype.$alert(message, '提示', {
      confirmButtonText: '确定'
    })
  },

  // 模块信息
  async themeWidget (widget, config, appendPara) {
    return theme.widget(widget, config, appendPara)
  },
  /** http请求   */
  // http请求,api接口get方法
  async httpGet (apiUrl, data) {
    // debugger
    return http.get(apiUrl, data)
  },
  //   http请求,Post方法 :增
  async httpPost (apiUrl, data) {
    return http.post(apiUrl, data)
  },
  //   http请求,Put方法：改
  async httpPut (apiUrl, data) {
    return http.put(apiUrl, data)
  },
  //  http请求,delete方法：删
  async httpDelete (apiUrl, data) {
    return http.delete(apiUrl, data)
  },
  //  延时加载数据到缓存
  async httpLazy (apiUrl, para, cacheKey) {
    return http.delete(apiUrl, cacheKey, para)
  },
  /** local 缓存   */
  // 获取缓存
  localGet (name, isEncrypt) {
    return local.get(name, isEncrypt)
  },
  // 设置缓存
  localSet (name, data, isEncrypt) {
    return local.set(name, data, isEncrypt)
  },
  // 删除缓存
  localRemove (name) {
    return local.remove(name)
  },

  isNullOrEmpty (str) {
    return help.isNullOrEmpty(str)
  },
  // 判断字符串是否为空，或在null 或者undefined
  isEmpty (str) {
    return help.isEmpty(str)
  },
  baseUrl () {
    return config.apiBaseUrl
  },
  // 终端类型
  client () {
    return 'PcWeb'
  },
  // 弹出窗口
  dialog (name, para, width) {
    Vue.prototype.$bus.$emit('autoDialogEvent', name, para, width)
  },
  // 打开进度条
  progressOpen (message) {
    var data = {
      name: 'zk-progress',
      message: message,
      visible: true
    }
    Vue.prototype.$bus.$emit('autoDialogEvent', data)
  },
  // 关闭进度条
  progressClose () {
    var data = {
      name: 'zk-progress',
      message: '',
      visible: false
    }
    Vue.prototype.$bus.$emit('autoDialogEvent', data)
  },
  vuexSet (name, value) {
    store.state[name] = value
  },
  vuexGet (name) {
    return store.state[name]
  },
  vuexLocalSet (name, value) {
    store.state[name] = value
    this.localSet(name, value)
  },
  vuexLocalGet (name, isEncrypt) {
    if (store.state[name] !== undefined) {
      return store.state[name]
    } else {
      var data = this.localGet(name, isEncrypt)
      if (!this.isEmpty(data)) {
        this.vuexSet(name, data)
        return data
      } else {
        return null
      }
    }
  },
  // 判断是否使用diy接口请求数据，并返回请求结果
  async isApiReqGet (widget, url, data) {
    var response
    if (widget.isApiRequest) {
      response = await this.themeWidget(widget)
      return response.value.result.productItems
    }
    response = await this.httpGet(url, data)
    return response
  },
  async isApiReqGet2 (widget, url, data) {
    var response
    if (widget.isApiRequest) {
      response = await this.themeWidget(widget)
      return response.value.result
    }
    response = await this.httpGet(url, data)
    return response
  }
}
