<template>
  <div class="zk-buy-address">
    <div class="pc-x-buy-address">
      <zk-dialog ref="ref_buyaddress" title="收货地址" width="70%">
        <div slot="body" class="content-body">收货地址</div>
        <el-button type="primary " slot="footer " @click="click ">保存</el-button>
      </zk-dialog>
    </div>
  </div>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: ''
      }
    },
    props: {
      widget: {}
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
      this.$nextTick(function () {
        this.$on('child', function (dialogCloseVisible) {
          this.$refs.ref_buyaddress.$emit('child', true)
        })
      })
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      async click () {
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import "~_style/theme.scss";
  .pc-x-buy-address {
    font-size: $gl-size-base;
  }
</style>
