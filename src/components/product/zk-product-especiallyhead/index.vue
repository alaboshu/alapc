<template>
  <div class="zk-product-especiallyhead">
    <div class="especiallyhead_box">
      <div class="especiallyhead_box-title">{{widget.value.leftName}}<span><i class="el-icon-close"></i></span>{{widget.value.rightName}}</div>
      <div class="especiallyhead_box-intro">{{widget.value.intro}}</div>
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
      }
    }
  }
</script>
