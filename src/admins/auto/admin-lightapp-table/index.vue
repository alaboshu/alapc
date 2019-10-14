<template>
  <x-border ref="xBorder" v-if="async">
    <x-table ref="xTable" @afterTableLoad="afterTableLoad" :toConfig="tableConfig"></x-table>
  </x-border>
</template>


<script>
  import './var.scss'
  import './styles'
  import dataJs from './data.js'
  export default {
    name: 'admin-lightapp-table',
    data () {
      return {
        async: false,
        widgetModel: {},
        dataJson: null,
        tableConfig: null,
        widgetData: {},
        borderTitle: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.$nextTick(() => {
        this.$bus.$on('changeConfig', () => {
          this.init().then(() => {
            this.$refs.xTable.$emit('table_change_widget_data', this.tableConfig)
          })
        })
      })
    },
    methods: {
      async init () {
        var response = await this.$api.httpGet('https://diyservice.5ug.com/Api/LightAppServer/Get?TableName=' + this.$route.query.TableName)
        if (response.status === 1) {
          this.dataJson = JSON.parse(response.result.autoForm)
          this.$nextTick(() => {
            this.$refs.xBorder.init(response.result.border)
          })
        }
        let par = {
          TableName: this.$route.query.TableName,
          userId: this.$user.id()
        }
        var listResponse = await this.$api.httpGet('Api/LightApp/GetList', par)
        if (listResponse.status === 1) {
          this.widgetModel = listResponse.result
        }
        this.widgetModel.forEach(item => {
          if (item._id !== undefined) {
            item.id = item._id
          }
        })
        this.tableConfig = dataJs.toConfig(this.dataJson, this.widget, this.widgetModel)

        this.tableConfig.tableActions = [
          {
            actionType: 1,
            formType: null,
            icon: 'flaticon-edit',
            name: '编辑',
            type: 1,
            url: '/Admin/LightApp/Edit',
            para: {
              TableName: this.$route.query.TableName
            }
          },
          {
            actionType: 1,
            formType: null,
            icon: 'flaticon-delete',
            name: '删除',
            type: 2,
            url: '/Api/LightApp/Delete'
          }
        ]
        this.async = this.tableConfig !== undefined
      },
      // 表格加载完成事件
      afterTableLoad (dataResult) {
      },
      watchWidget (val) {
        this.init()
        this.$nextTick(() => {
          this.$refs.xTable.init('Article')
        })
      }
    },
    watch: {
      $route: 'watchWidget'
    }
  }
</script>
