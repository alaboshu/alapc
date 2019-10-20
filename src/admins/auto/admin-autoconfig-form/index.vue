<template>
  <x-border v-if="widgetModel" icon="flaticon-settings" ref="xBorder" :border="widgetModel.border">
    <zk-auto-form :serviceConfig="widgetModel" ref="zkAutoForm" @saveForm="saveForm"></zk-auto-form>
  </x-border>
</template>

<script>
  import './var.scss'
  import './styles'

  export default {
    data () {
      return {
        widgetModel: null,
        firstLoad: true // 首次加载
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
        let par = {
          id: this.$crud.getId(),
          type: this.$crud.getType()
        }
        var response = await this.$api.httpGet('/Api/Auto/Form', par)
        console.info('标签预算', response.result)
        if (response.status === 1) {
          this.widgetModel = response.result
          this.$base.setTitle(this.widgetModel.name)
        }
        this.firstLoad = false
      },
      async saveForm (models) {
        let parameter = {
          type: this.$crud.getType(),
          userId: this.$user.id(),
          model: JSON.stringify(models)
        }
        var response = await this.$api.httpPost('/api/auto/save', parameter)
        this.$crud.message(response)
      },
      async wathcRoute () {
        if (this.firstLoad === true) {
          return // 第一次加载，不监听路由，防止二次触发
        }
        if (this.$base.router().path !== '/Admin/AutoConfig/Edit') {
          return // 调转到其他页面时，不执行
        }
        this.widgetModel = null
        await this.init()
      }
    },
    watch: {
      $route: 'wathcRoute'
    }
  }
</script>
