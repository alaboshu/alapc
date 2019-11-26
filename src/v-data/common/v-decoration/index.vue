<template>
  <div class="v-decoration">
    测试组件的作用
    <v-decoration-1></v-decoration-1>
    <!-- <v-decoration-2></v-decoration-2>
    <v-decoration-3></v-decoration-3>
    <v-decoration-4></v-decoration-4>
    <v-decoration-5></v-decoration-5>
    <v-decoration-6></v-decoration-6>
    <v-decoration-7></v-decoration-7>
    <v-decoration-8></v-decoration-8>
    <v-decoration-9></v-decoration-9>
    <v-decoration-10></v-decoration-10> -->
  </div>
</template>

<script>
  import stylesWedget from './styles-wedget'
  export default {
    mixins: [stylesWedget],
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
        console.log('测试组件的作用')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
  .v-decoration {
    position: fixed;
    height: 100%;
    width: 100%;
    background: #2c2355;
  }
</style>
