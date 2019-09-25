<template>
  <div class="admin-tenant-progress">
    <el-dialog title="提示" top="15%" :visible.sync="dialogVisible" width="30%" :lock-scroll="false" :close-on-press-escape="false" :close-on-click-modal="false" :modal="true" :show-close="false" :before-close="handleClose">
      <div class="progressAl">
        <div class="progress">
          <div class="progress-bar progress-bar-success progress-bar-striped active" style="width: 100%;">
          </div>
        </div>
        <div class="progress_test" v-html="text"></div>
      </div>
      <div class="progress_foot" v-if="false">
        <div @click="dialogVisible= false">取消</div>
        <div class="progress_button" @click="dialogVisible= false">确定</div>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        dialogVisible: false,
        // test: '当前进度1/4：创建数据：预计<span style="color: red;">2分钟</span>时间，请勿离开或刷新页面...'
        text: '当前进度1/1：正在执行操作,预计<span style="color: red;">1分钟</span>时间，请勿离开或刷新页面...'
      }
    },

    methods: {
      init (message, visible) {
        this.text = message
        this.dialogVisible = visible
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => { })
      }
    }
  }
</script>



<style lang="scss" scoped>
  @import "./var.scss";
  @import "./fonts/var.scss";
</style>

