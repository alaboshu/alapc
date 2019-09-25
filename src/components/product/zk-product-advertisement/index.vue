<template>
  <div class="zk-product-advertisement" v-if="widget">
    <div class="advertisement-box">
      <img :src="widget.value.login" />
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
        this.widgetModel = await this.$api.isApiReqGet(this.widget)
      }
    }
  }
</script>
