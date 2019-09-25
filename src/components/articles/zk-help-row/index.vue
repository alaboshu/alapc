<template>
  <div class="zk-help-row" :style="styles" component-path="pc/zk-help-row" v-if="asyncflag">
    <p-help-row :elementData="viewModel"></p-help-row>
  </div>
</template>

<script>
  import { THEME_GETVALUE_GET } from '@/service/core/apiUrl'

  import './var.scss'
  import './styles'


  export default {
    data () {
      return {
        widgetModel: {},
        viewModel: '',
        asyncflag: false,
        styles: {}
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    async onShow () {
      this.init()
    },
    methods: {
      async  init () {
        if (this.widget !== undefined && this.widget.value !== undefined) {
          this.viewModel = this.widget.value
        } else {
          const parameter = {
            dataId: this.widget && this.widget.dataId,
            defaultId: '5b406cddfef00000a0000001'
          }
          this.viewModel = await this.$api.httpGet(THEME_GETVALUE_GET, parameter)
        }
        this.asyncflag = true
      }
    }
  }
</script>
<style>
  @import "./styles/a.scss";
</style>

