<template>
  <div>
    <x-table :config="config" v-if="config" :showPagination="false" :data="dataList" @edit="editRow" @delete="deleteRow" @copy="copyRow"></x-table>
  </div>
</template>

<script>
  import action from './action.json'
  export default {
    data () {
      return {
        config: null
      }
    },
    props: {
      tableConfig: {},
      model: {},
      dataList: {}
    },
    mounted () {
      this.init()
    },
    watch: {
      model (val) {
      }
    },
    methods: {
      async init () {
        this.config = {}
        this.config.searchOptions = null
        this.config.apiUrl = null
        var para = {
          id: this.tableConfig.options.autoFormId
        }
        var response = await this.$api.httpGet('Api/AutoForm/QueryById', para)
        if (response.status === 1) {
          var formValue = JSON.parse(response.result.value)
          this.config.columns = []
          formValue.list.forEach(element => {
            if (element.options && element.options.showList) {
              var column = {
                prop: element.model,
                label: element.name,
                width: '240'
              }
              this.config.columns.push(column)
            }
          })
        }
        this.config.columns.push(action)
        return null
      },
      editRow (rowSocpe) {
        const tableEditForm = {
          id: rowSocpe.id,
          value: rowSocpe,
          autoFormId: this.tableConfig.options.autoFormId,
          type: 'edit',
          title: '编辑数据',
          model: this.model
        }
        this.$emit('crudRow', tableEditForm, tableEditForm.type)
      },
      deleteRow (rowSocpe) {
        const tableEditForm = {
          id: rowSocpe.id,
          value: rowSocpe,
          autoFormId: this.tableConfig.options.autoFormId,
          type: 'delete',
          title: '删除数据',
          model: this.model
        }
        this.$emit('crudRow', tableEditForm, tableEditForm.type)
      },
      copyRow (rowSocpe) {
        const tableEditForm = {
          id: '',
          value: rowSocpe,
          autoFormId: this.tableConfig.options.autoFormId,
          type: 'copy',
          title: '复制数据',
          model: this.model
        }
        this.$emit('crudRow', tableEditForm, tableEditForm.type)
      }
    }
  }
</script>

