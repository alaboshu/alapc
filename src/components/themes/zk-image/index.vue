<template>
  <view class="zk-image" :widget="widgetModel" v-if="widgetModel">
    <x-image :elementData="widgetModel.value"></x-image>
  </view>
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
      }
    }
  }
</script>
