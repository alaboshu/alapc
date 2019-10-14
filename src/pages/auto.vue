<template>
  <div v-if="async">
    <component :is="item.componentPath" :widget="item.data" :widgetData="item.data" v-for="(item,index) in widget" :key="index" />
  </div>
</template>
<script>

  export default {

    data () {
      return {
        widgetModel: {},
        tableName: '',
        widget: [],
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var type = this.$crud.getType()
        if (type === undefined) {
          this.$alert('类型不能为空', '提示', {
            confirmButtonText: '确定'
          })
        }
        var res = await this.$api.httpGet('/Api/Type/GetComponentPath?type=' + type)
        if (res.status === 1) {
          this.widgetModel = res
        }
        if (this.widgetModel.result) {
          var data = {
            componentPath: res.result[0],
            data: {
              type: type,
              value: null
            }
          }
          this.widget.push(data)
        }
        this.async = true
      }
    }
  }
</script>
<style lang="scss">
</style>
