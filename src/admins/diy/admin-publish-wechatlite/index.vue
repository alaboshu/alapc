<template>
  <admin-app-publish></admin-app-publish>
</template>

<script>
  import './var.scss'

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
