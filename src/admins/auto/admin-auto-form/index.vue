<template>
  <x-border :title="bordetTitle" icon="flaticon-settings" v-if="async" v-loading="loading" ref="xBorder">
    <zk-auto-form @formLoad="formLoad" :serviceConfig="viewModel" @saveForm="saveForm" ref="zkAutoForm"></zk-auto-form>
  </x-border>
</template>


<script>
  export default {
    props: {
      widgetData: {},
      title: {}
    },
    data () {
      return {
        async: false,
        viewModel: null,
        loginUser: '',
        loading: true,
        bordetTitle: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.bordetTitle = this.title
        var type = this.$crud.getType()
        if (this.widgetData.value !== undefined && this.widgetData.value !== null && this.widgetData.value.type !== undefined) {
          type = this.widgetData.value.type
        }
        var para = {
          type: type,
          userId: this.$user.id(),
          id: this.$user.id(),
          ...this.$crud.routeToObject()
        }
        var response = await this.$api.httpGet('/Api/Auto/Form', para)
        if (response.status !== 1) {
          this.$notify({
            title: '操作失败',
            type: 'error',
            message: response.message,
            position: 'bottom-right'
          })
        } else {
          this.viewModel = response.result
          this.bordetTitle = this.viewModel.name
          this.viewModel.tenant = this.widgetData.tenant
          this.async = true
        }
      },
      async saveForm (models) {
        models.userId = this.$user.id()
        if (this.$api.isEmpty(this.viewModel.service.postApi)) {
          var type = this.$crud.getType()
          if (this.widgetData.value && this.widgetData.value.type !== undefined) {
            type = this.widgetData.value.type
          } else if (this.widgetData.type) {
            type = this.widgetData.type
          }
          if (this.$route.query.id) {
            models.id = this.$route.query.id
          }
          let parameter = {
            type: type,
            userId: this.$user.id(),
            model: JSON.stringify(models)
          }
          var response = await this.$api.httpPost('/api/auto/save', parameter)
          this.$crud.message(response)
        } else {
          // 使用专用API接口保存
          var para = {
            userId: this.$user.id(),
            ...models
          }
          response = await this.$api.httpPost(this.viewModel.service.postApi, para)
          this.$crud.message(response)
        }
      },
      getPath () {
        this.init().then(() => {
          this.$refs.zkAutoForm.$emit('form_change_widget_data', this.viewModel)
          this.$refs.xBorder.$emit('changeTitle', this.viewModel.name)
        })
      },
      formLoad (val) {
        if (val) {
          this.loading = false
        }
      }
    },
    watch: {
      widgetData: 'getPath'
    }
  }
</script>

