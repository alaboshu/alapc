<template>
  <div class="admin-app-publish">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label" class="border-card_span">微信小程序<i class="el-icon-success"></i></span>
        <apple-edit></apple-edit>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="border-card_span">支付宝小程序</span>
        <alipay-edit></alipay-edit>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="border-card_span">百度智能小程序</span>
        <brainpower-edit></brainpower-edit>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="border-card_span">字节跳动小程序</span>
        <beat-edit></beat-edit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import './var.scss'
  import appleEdit from './item/apple-edit.vue'
  import alipayEdit from './item/alipay-edit.vue'
  import brainpowerEdit from './item/brainpower-edit.vue'
  import beatEdit from './item/beat-edit.vue'
  export default {
    components: {
      appleEdit,
      alipayEdit,
      brainpowerEdit,
      beatEdit
    },
    data () {
      return {
        widgetModel: {}
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      }
    }
  }
</script>
