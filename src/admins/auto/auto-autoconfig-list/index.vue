<template>
  <x-border :title="widget.title" v-if="async">
    <x-table ref="xTable" :widgetData="widgetData"></x-table>
  </x-border>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {
    data () {
      return {
        async: false,
        widgetModel: {},
        viewModel: null
      }
    },
    props: {
      widgetData: {},
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.async = true
      }
    }
  }
</script>
