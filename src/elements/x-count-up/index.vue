<template>
  <div class="x-count-up">{{viewModel}}</div>
</template>
<script>
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      dataModel: {
        default: 0
      }
    },
    data () {
      return {
        viewModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.viewModel = this.dataModel + 50
        var timer = setInterval(() => {
          this.viewModel--
          if (Number(this.viewModel) === Number(this.dataModel)) {
            clearInterval(timer)
          }
        }, 30)
      }
    },
    watch: {
      dataModel: {
        deep: true,
        handler (val) {
          this.viewModel = this.dataModel
        }
      }
    }
  }
</script>
