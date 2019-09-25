<template>
  <div class="zk-product-headline">
    <div class="box-head">
      <div class="box-head_title">{{widget.value.name}}</div>
      <div class="box-head_intro">{{widget.value.explain}}</div>
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
