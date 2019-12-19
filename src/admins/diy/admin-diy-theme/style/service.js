import diyHttp from '@/service/core/diy.http'

export default {
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
        jsThis.$message({
          type: 'success',
          message: '制作成功!'
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
