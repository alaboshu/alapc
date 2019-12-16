import api from '@/service/prototypes/api'
import Vue from 'vue'
export default {
  // 跳转到diy页面
  async redirectTo (themeId, pageId) {
    api.progressOpen(
      '正在授权登录中,请稍后...'
    )
    var para = {
      themeId: themeId,
      pageId: pageId
    }
    var res = await api.httpGet('Api/Theme/GetLoginUrl', para)
    setTimeout(() => {
      api.progressClose()
      if (res.status === 1) {
        Vue.prototype.$message({
          message: '恭喜您，数据初始成功',
          type: 'success'
        })
      }
    }, 500)
  }
}
