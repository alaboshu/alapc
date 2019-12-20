import diyHttp from '@/service/core/diy.http'

export default {
  async diy (jsThis, theme) {
    var para = {
      themeId: theme.id
    }
    jsThis.$api.progressOpen('正在登录中,预计时间<span style="color: red;">1分钟</span>，请勿离开或刷新页面...')
    var response = await diyHttp.get('/api/DiyClient/GetLoginUrl', para)
    jsThis.$api.progressClose()
    if (response.status === 1) {
      window.open(response.message, '_blank')
    }
  }
}
