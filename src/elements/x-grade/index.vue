<template>
  <div class="x-grade" v-if="gradData">
    <div class="x-grade-list">
      <img :src="$api.baseUrl() +gradData.Icon" class="grade-image" alt="">
      <div class="grade-name">{{gradData.Name}}</div>
    </div>
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
        viewModel: null,
        gradData: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var gradData = this.$api.vuexLocalGet('grade_data_model')
        if (!gradData) {
          var response = await this.$api.httpGet('/Api/AutoConfig/GetAutoConfigList?type=UserGradeConfig')
          this.viewModel = response.result
          this.$api.vuexLocalSet('grade_data_model', this.viewModel)
        } else {
          this.viewModel = gradData
        }

        for (let i of this.viewModel) {
          if (this.dataModel && this.dataModel === i.Id) {
            this.gradData = i
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./var.scss";
</style>
