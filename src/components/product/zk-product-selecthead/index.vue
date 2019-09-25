<template>
  <div class="zk-product-selecthead">
    <div class="product-selecthead_box">
      <div class="selecthead_box-img">{{widget.value.name}}</div>
    </div>
  </div>
</template>

<script>
  
  import './var.scss'
  import './styles'


  export default {
    
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
        // this.widgetModel = await this.$api.themeWidget(this.widget, editSetting.config)
      }
    }
  }
</script>
