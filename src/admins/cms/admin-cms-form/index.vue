<template>
  <!-- <div class="admin-cms-form">{{widgetModel}}</div> -->
  <x-border :title="bordetTitle" icon="flaticon-settings" v-if="async" v-loading="loading" ref="xBorder">
    <zk-auto-form @formLoad="formLoad" :serviceConfig="viewModel" @saveForm="saveForm" ref="zkAutoForm"></zk-auto-form>
  </x-border>
</template>

<script>
  import './var.scss'

  export default {
    data () {
      return {
        widgetModel: {},
        viewModel: null,
        async: false,
        bordetTitle: '',
        loading: true
      }
    },
    props: {
      widget: {},
      widgetData: {},
      title: {
        default: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.$route.query.ChannelId !== undefined) {
          var channelResponse = await this.$api.httpGet('api/Channel/ViewById', { Id: this.$route.query.ChannelId })
          if (channelResponse.status === 1) {
            this.borderTitle = channelResponse.result.name
          }
        }
        // this.widgetModel = await this.$api.themeWidget(this.widget)
        this.bordetTitle = this.title
        // var type = 'ViewArticle'
        // if (this.widgetData.value !== undefined && this.widgetData.value !== null && this.widgetData.value.type !== undefined) {
        //   type = this.widgetData.value.type
        // }
        // if (this.$route.query.ChannelId !== undefined) {
        //   type = this.$route.query.ChannelId
        // }
        var para = {
          type: 'ArticleAutoForm',
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
          this.viewModel.isCms = true
          this.async = true
        }
      },
      async saveForm (models) {
        models.userId = this.$user.id()
        models.ChannelId = this.$route.query.ChannelId
        // var type
        // if (this.$route.query.ChannelId !== undefined) {
        //   type = this.$route.query.ChannelId
        // }
        let parameter = {
          type: 'ArticleAutoForm',
          userId: this.$user.id(),
          model: JSON.stringify(models)
        }
        var response = await this.$api.httpPost('/api/auto/save', parameter)
        this.$crud.message(response)
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
