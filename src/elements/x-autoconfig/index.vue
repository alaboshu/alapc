<template>
  <div class="x-autoconfig">
    {{viewModel.value}}
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      dataModel: {}
    },
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var respone = await this.$api.httpGet('/api/Type/GetKeyValue?type=MoneyTypeConfig')
        if (respone.status === 1) {
          for (let i of respone.result) {
            if (i.key === this.dataModel) {
              this.viewModel = i
            }
          }
        }
      }
    }
  }
</script>
