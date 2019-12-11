<template>
  <div class="zk-quick-action" style="background: #fff !important;" v-if="quickForm">
    <tab-item v-if="widget.value.quickType==1" :widget="quickForm"></tab-item>
    <common-item v-if="widget.value.quickType==2" :widget="quickForm"></common-item>
    <recommend-item v-if="widget.value.quickType==3" :widget="quickForm"></recommend-item>
    <more-item v-if="widget.value.quickType==4" :widget="quickForm"></more-item>
  </div>
</template>

<script>

  import tabItem from './items/01-tab-item'
  import commonItem from './items/02-common-item'
  import recommendItem from './items/03-recommend-item'
  import moreItem from './items/04-more-item'
  import './var.scss'

  export default {

    components: {
      tabItem,
      commonItem,
      recommendItem,
      moreItem
    },
    data () {
      return {
        widgetModel: {},
        quickForm: null
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
        if (this.widget && this.widget.value) {
          var data = []
          this.widget.value.quickForm.forEach(element => {
            if (element.isEnable) {
              data.push(element)
            }
          })
          this.quickForm = data
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .zk-quick-action {
    background: #ffffff;
  }
</style>
