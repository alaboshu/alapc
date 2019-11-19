<template>
  <div>
    <count-report></count-report>
    <total-count-report></total-count-report>
    <sum-report></sum-report>
  </div>
</template>


<script>
  import countReport from './styles/count-report'
  import totalCountReport from './styles/total-count-report'
  import sumReport from './styles/sum-report'
  export default {
    components: {
      countReport,
      totalCountReport,
      sumReport
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        console.info('aaaaaaaaaaa', this.widget)
      }
    }
  }
</script>
