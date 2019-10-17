import Vue from 'vue'
import api from '@/service/prototypes/api'

export default {
  // 获取子类目
  async getChildCategories (parentId) {
    var para = {
      parentId: parentId
    }
    var response = await api.httpGet('/Api/Category/GetChildCategories', para)
    if (response.status === 1) {
      if (response.result.length > 0) {
        return response.result
      }
    } else {
      Vue.prototype.$notify({
        title: '提示',
        message: '获取类目列表失败',
        type: 'error'
      })
    }
  }
}
