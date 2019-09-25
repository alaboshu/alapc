<template>
  <!-- <admin-lightapp-table></admin-lightapp-table> -->
  <div class="admin-lightapp-form" v-if="async">
    <x-border :title="borderTitle" ref="xBorder">
      <zk-auto-form @formLoad="formLoad" :serviceConfig="viewModel" ref="zkAutoForm" :notConvert="true" @saveForm="saveForm"></zk-auto-form>
    </x-border>
  </div>
</template>

<script>
  import './var.scss'
  import './styles'
  // import dataJson from './data.json'

  export default {
    name: 'admin-lightapp-form',
    data () {
      return {
        async: false,
        widgetModel: {},
        data: null,
        viewModel: {},
        borderTitle: ''
      }
    },
    props: {
      widgetData: {},
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var response = await this.$api.httpGet('https://diyservice.5ug.com/Api/LightAppServer/Get?TableName=' + this.$route.query.TableName)
        if (response.status === 1) {
          this.viewModel = JSON.parse(response.result.autoForm)

          if (this.$route.query.id !== undefined) {
            var getSingList = await this.$api.httpGet('/Api/LightApp/GetSingle', { TableName: this.$route.query.TableName, id: this.$route.query.id })
            if (getSingList.status === 1) {
              this.viewModel.list.forEach(model => {
                for (var i in getSingList.result) {
                  if (model.model === i) {
                    model.value = getSingList.result[i]
                  }
                }
              })
            }
          }
          this.borderTitle = response.result.name
          document.title = response.result.name
          this.async = this.viewModel !== null
        }
      },
      async saveForm (models) {
        models.userId = this.$user.id()
        let par = {
          TableName: this.$route.query.TableName,
          DataJson: JSON.stringify(models)
        }
        var apiUrl = 'Api/LightApp/add'
        if (this.$route.query.id !== undefined) {
          apiUrl = 'Api/LightApp/Update'
          par.id = this.$route.query.id
        }
        var add = await this.$api.httpPost(apiUrl, par)
        if (add.status === 1) {
          this.$notify({
            title: '成功',
            message: add.message,
            type: 'success'
          })
          this.$bus.$emit('changeConfig')
        } else {
          this.$notify.error({
            title: '错误',
            message: add.message
          })
        }
      },
      getPath () {
        this.init().then(() => {
          this.$refs.zkAutoForm.$emit('form_change_widget_data', this.viewModel)
          this.$refs.xBorder.$emit('changeTitle', this.viewModel.config.name)
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
