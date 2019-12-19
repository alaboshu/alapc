<template>
  <div class="theme-item_outset theme-item-list">
    <div class="outset-img">
      <img v-lazy="theme.image" />
      <div class="outset-show" v-if="theme.id===defautTheme.id">
        <div class="outset-test">默认模板</div>
      </div>
      <div class="outset-layer">
        <div class="them_text">{{ theme.id }}</div>
        <div class="outset-layer_but">
          <span class="layer_but" @click="diy(theme)" v-if="theme.isPublic===false">编 辑</span>
          <span class="layer_but1" @click="make(theme)">制 作</span>
          <br /><br />
          <span class="layer_but3" @click="setDefault(theme)" v-if="theme.isPublic===false">设置默认</span>
          <span class="layer_but2" @click="del(theme)" v-if="theme.isPublic===false">删 除</span>
        </div>
      </div>
    </div>
    <div class="item_outset-text">
      <div class="outset-text_left">
        <p class="text_p1">
          <x-code>{{theme.sign}}</x-code>{{ theme.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      theme: {},
      defautTheme: {}
    },
    methods: {
      async diy (theme) {
        var para = {
          themeId: theme.id
        }
        this.$api.progressOpen('正在登录中,预计时间<span style="color: red;">1分钟</span>，请勿离开或刷新页面...')
        var response = await this.$api.httpGet('/api/theme/GetLoginUrl', para)
        this.$api.progressClose()
        if (response.status === 1) {
          window.open(response.message, '_blank')
        }
      },
      async setDefault (theme) {
        this.$confirm('是否设置模板：' + theme.name + ' 为默认模板?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var para = {
            id: theme.id
          }
          var response = await this.$api.httpGet('/api/theme/SetDefaultTheme', para)
          if (response.status === 1) {
            this.$message({
              type: 'success',
              message: '设置成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: response.message
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消设置默认模板'
          })
        })
      },
      async del (theme) {
        this.$confirm('是否删除模板：' + theme.name, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var para = {
            id: theme.id
          }
          var response = await this.$api.httpGet('/api/theme/SetDefaultTheme', para)
          if (response.status === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: response.message
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      async make (theme) {
        this.$confirm('是否制作该模板' + theme.name, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var site = await this.$base.site()
          this.$api.progressOpen('模板正在制作中,预计时间<span style="color: red;">1分钟</span>，请勿离开或刷新页面...')
          var makeInput = {
            siteId: site.id,
            themeId: theme.id,
            userId: site.userId,
            name: theme.name,
            intro: theme.intro
          }
          console.info('保存参数', makeInput)
          var response = await this.$api.httpPost('/Api/DiyClient/Make', makeInput)
          this.$api.progressClose()
          if (response.status === 1) {
            this.$message({
              type: 'success',
              message: '制作成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: response.message
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消制作'
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
