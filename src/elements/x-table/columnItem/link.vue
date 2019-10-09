<template>
  <router-link class="column-link" :to="toUrl" v-html="title"></router-link>
</template>
<script>
  export default {
    data () {
      return {
        toUrl: ''
      }
    },
    props: {
      url: {
        default: null
      },
      value: {
        default: null
      },
      title: {
        default: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        console.info('x-link', this.value, this.url)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-table td {
    padding: 10px 0 !important;
    .column-link,
    .column-link:visited,
    a:visited {
      text-decoration: none;
      color: #7b7e8a;
    }

    .column-link:hover,
    a:hover {
      color: #ad5beb;
    }
  }
</style>
