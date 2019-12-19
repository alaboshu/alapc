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
    <delete-theme name="模板" ref="zkRootDelete" rootType="5"></delete-theme>
  </div>
</template>

<script>
  import service from './service'
  import deleteTheme from './delete'
  export default {
    components: {
      deleteTheme
    },
    props: {
      theme: {},
      defautTheme: {}
    },
    methods: {
      async diy (theme) {
        await service.diy(this, theme)
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
        console.info('删除')
        this.$refs.zkRootDelete.dialogFormVisible = true
        this.$refs.zkRootDelete.paraForm.themeId = theme.id
      },
      async make (theme) {
        await service.make(this, theme)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
