import base from '@/service/prototypes/base'
import admin from '@/service/prototypes/admin'
import api from '@/service/prototypes/api'
import Vue from 'vue'

export default {
  // 根据Url中的参数Id，获取视图
  // 使用动态 动态网址 Api/{{表名}}/ViewById
  async getView (apiUrl) {
    var para = {
      id: this.getId()
    }
    var response = await api.httpGet(apiUrl, para)
    if (response.status === 1) {
      return response.result
    }
  },

  // 保存
  // 动态保存接口： Api/{{表名}}/QuerySave
  async save (apiUrl, viewModel) {
    var para = {
      ...viewModel
    }
    var response = await Vue.prototype.$api.httpPost(apiUrl, para)
    // 继续或返回上一页
    if (response.status === 1) {
      Vue.prototype
        .$confirm('保存成功 是否继续?', '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '返回上一页',
          type: 'success'
        })
        .then(() => {
          console.info('')
        })
        .catch(() => {
          window.history.back(-1)
        })
    } else {
      Vue.prototype.$notify({
        title: '保存失败',
        message: response.message,
        position: 'bottom-right',
        type: 'error'
      })
    }
  },
  // 将url参数解析为一个对象
  routeToObject () {
    var route = base.router()
    var str = route.fullPath
    var index = str.indexOf('?', 0)
    str = str.substring(index + 1, str.length)
    var result = {}
    var temp = str.split('&')
    for (var i = 0; i < temp.length; i++) {
      var temp2 = temp[i].split('=')
      if (
        !(temp2[0].indexOf('/') >= 0 || temp2 === undefined || temp2 === null)
      ) {
        result[temp2[0]] = temp2[1]
      }
    }
    return result
  },
  // 根据路由获取类型
  getType () {
    var route = base.router()
    if (route.query !== undefined && route.query.Type !== undefined) {
      return route.query.Type
    }
    if (route.query !== undefined && route.query.type !== undefined) {
      return route.query.type
    }
    if (route.query !== undefined && route.query.key !== undefined) {
      return route.query.key
    }
    if (route.query !== undefined && route.query.Key !== undefined) {
      return route.query.Key
    }
    if (route.meta !== undefined && route.meta.type !== undefined) {
      return route.meta.type
    }
  },
  // 获取边框
  getBorder (typeBorder, widgetValue) {
    console.info('typeBorder typeBorder ', typeBorder, widgetValue)
    var borderModel = {
      title: '',
      icon: '',
      description: '',
      type: ''
    }
    if (typeBorder) {
      borderModel = typeBorder // 使用服务返回的数据
    }
    if (widgetValue) {
      borderModel = widgetValue
    }
    if (!borderModel.title) {
      borderModel.title = api.vuexLocalGet('admin_current_menu').name
    }
    console.info('borderModel', borderModel)
    return borderModel
  },
  // 获取URL中的ID
  getId () {
    var route = base.router()
    if (route.query !== undefined && route.query.id !== undefined) {
      return route.query.id
    }
    return 0
  },
  // 提示，成功提示正确信息，获取显示错误信息
  message (response) {
    if (response.status === 1) {
      admin.message('操作成功')
    } else {
      Vue.prototype.$notify({
        title: '操作失败',
        type: 'error',
        message: response.message,
        position: 'bottom-right'
      })
    }
  }
}
