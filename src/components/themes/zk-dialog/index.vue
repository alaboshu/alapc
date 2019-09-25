<template>
  <div x-class="zk-dialog">
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" ref="ref_zkdialog" v-el-drag-dialog :before-close="handleClose" class="zk-dialog">
      <div class="body-content">
        <slot name="body"></slot>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <slot name="footer" v-if="$slots.footer"></slot>
        <el-button type="primary" v-if="!$slots.footer" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import elDragDialog from '@/service/directives/el-dragDialog'
  export default {

    directives: { elDragDialog },
    data () {
      return {
        widgetModel: '',
        dialogVisible: false
      }
    },
    props: {
      widget: {},
      dialogModel: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '60%'
      },
      title: {
        type: String,
        default: 'zkweb'
      }
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
      this.$nextTick(function () {
        this.$on('child', function (dialogCloseVisible) {
          this.dialogVisible = true
        })
      })
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      handleClose () {
        this.dialogVisible = false
      }
    }
  }
</script>

