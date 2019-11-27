import api from '@/service/prototypes/api'
import Vue from 'vue'
export default {
  // 跳转到diy页面
  async redirectTo (themeId, pageId) {
    api.progressOpen(
      '正在进行数据初始,预计<span style="color: red;">1分钟</span>时间，请勿离开或刷新页面...'
    )
    var res = await api.httpGet('Api/Admin/Init')
    setTimeout(() => {
      api.progressClose()
      if (res.status === 1) {
        Vue.prototype.$message({
          message: '恭喜您，数据初始成功',
          type: 'success'
        })
      }
    }, 2000)
  }
}
