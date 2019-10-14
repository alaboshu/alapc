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

          this.$base.setTitle(this.widgetModel.name)
        }
      },
      async saveForm (models) {
        let parameter = {
          type: this.$crud.getType(),
          userId: this.$user.id(),
          model: JSON.stringify(models)
        }
        var response = await this.$api.httpPost('/api/auto/save', parameter)
        console.info('response', response)
        this.$crud.message(response)
      },
      async wathcRouteAutoConfigForm () {
        console.info('this.widget', this.widget)
        this.widgetModel = null
        await this.init()
      }
    },
    watch: {
      $route: 'wathcRouteAutoConfigForm'
    }
  }
</script>
