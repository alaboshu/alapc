<template>
  <div class="v-background" :style="css"></div>
</template>

<script>
  export default {
    data () {
      return {
        widgetModel: {},
        css: {}
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
          this.widgetModel = this.widget.value
        }
        if (this.widgetModel.image) {
          this.css = `background-image:url(${this.widgetModel.image}); center top;    background-size: 100% 100%;`
          if (this.widgetModel.repeat === true) {
            this.css = this.css + 'background-repeat: repeat;'
          } else {
            this.css = this.css + 'background-repeat:  no-repeat;'
          }
          if (this.widgetModel.transparent) {
            var opacity = this.widgetModel.transparent / 100
            this.css = this.css + `opacity: ${opacity};`
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
