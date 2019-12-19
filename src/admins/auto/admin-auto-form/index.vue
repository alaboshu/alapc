<template>
  <x-border v-if="async" v-loading="loading" ref="xBorder" :title="widgetModel.title" :type="widgetModel.themeColor" :icon="widgetModel.icon.name">
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
        loading: true,
        firstLoad: true, // 首次加载
        widgetModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        var type = this.$crud.getType()
        if (this.widgetData.value !== undefined && this.widgetData.value !== null && this.widgetData.value.form.type !== undefined) {
          type = this.widgetData.value.form.type
          this.widgetModel = this.widgetData.value.form.border
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
          this.async = true
        }
        this.$nextTick(() => {
          var border = this.$crud.getBorder(this.viewModel.border, this.widgetData.value)
          this.$refs.xBorder.init(border)
        })
        this.firstLoad = false
      },
      async saveForm (models) {
        if (this.$route.query.id) {
          models.id = this.$crud.getId()
        }
        let parameter = {
          type: this.viewModel.key,
          model: JSON.stringify(models)
        }
        var response = await this.$api.httpPost('/api/auto/save', parameter)
        this.$crud.message(response)
      },
      formLoad (val) {
        if (val) {
          this.loading = false
        }
      },
      // 监听 x-widget值得变化,不能直接监听路由，直接监听路由可能会导致数据延迟
      watchWidget (val) {
        if (this.firstLoad === true) {
          return // 第一次加载，不监听路由，防止二次触发
        }
        // if (this.$base.router().path !== '/Admin/AutoConfig/Edit') {
        //   return // 调转到其他页面时，不执行
        // }
        this.init().then(() => {
          this.$refs.zkAutoForm.$emit('form_change_widget_data', this.viewModel)
          this.$refs.xBorder.$emit('changeTitle', this.viewModel.name)
        })
      }
    }
  }
</script>

