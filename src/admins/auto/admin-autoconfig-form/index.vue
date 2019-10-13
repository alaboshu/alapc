<template>
  <x-border v-if="widgetModel" icon="icon-5333-xiufifen" ref="xBorder" :border="widgetModel.border">
    <zk-auto-form :serviceConfig="widgetModel" ref="zkAutoForm" @saveForm="saveForm"></zk-auto-form>
  </x-border>
</template>

<script>
  import './var.scss'
  import './styles'

  export default {
    data () {
      return {
        widgetModel: null
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
        if (response.status === 1) {
          this.widgetModel = response.result
          this.$nextTick(() => {
            this.$refs.xBorder.changeStyle(this.widgetModel.name, this.widgetModel.icon)
          })
          this.$base.setTitle(this.widgetModel.name)
        }
        console.info('auto Form 表格结构', this.widgetModel)
      },
      async saveForm (models) {
        let parameter = {
          type: this.$route.query.key,
          userId: this.$user.id(),
          model: JSON.stringify(models)
        }
        if (parameter.type === undefined) {
          if (this.$route.query.type !== undefined) {
            parameter.type = this.$route.query.type
          } else if (this.$route.query.Type !== undefined) {
            parameter.type = this.$route.query.Type
          }
        }
        var response = await this.$api.httpPost('/api/auto/save', parameter)
        this.$crud.message(response)
      },
      async wathcRoute () {
        this.widgetModel = null
        await this.init()
      }
    },
    watch: {
      $route: 'wathcRoute'
    }
  }
</script>
