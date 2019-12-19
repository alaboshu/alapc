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
  },
  // 制作模板
  async make (jsThis, theme) {
    jsThis.$confirm('是否制作该模板' + theme.name, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      var site = await jsThis.$base.site()
      jsThis.$api.progressOpen('模板正在制作中,预计时间<span style="color: red;">1分钟</span>，请勿离开或刷新页面...')
      var makeInput = {
        SiteId: site.id,
        themeId: theme.id,
        userId: site.userId,
        name: theme.name,
        intro: theme.intro
      }
      var response = await diyHttp.post('/Api/DiyClient/Make', makeInput)
      jsThis.$api.progressClose()
      if (response.status === 1) {
        jsThis.$alert('恭喜,模板复制成功,点击确定开始制作模板', '复制成功', {
          confirmButtonText: '确定',
          callback: async action => {
            await this.diy(jsThis, response.result)
          }
        })
      } else {
        jsThis.$message({
          type: 'info',
          message: response.message
        })
      }
    })
  }
}
