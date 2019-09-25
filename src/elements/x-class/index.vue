<template>
  <div v-if="async" class="x-class">
    <el-tree ref="tree" :data='viewModel' :props="props" show-checkbox @check="checkChange" :default-checked-keys="defaultKey" node-key="value"></el-tree>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        async: false,
        list: [],
        viewModel: [],
        props: {
          label: 'className',
          children: 'children'
        },
        defaultKey: []
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async      init () {
        if (this.widget.value !== null) {
          this.defaultKey = this.widget.value
        }
        var response
        if (this.widget.isCms !== undefined && this.widget.isCms === true) {
          response = await this.$api.httpGet('/Api/Channel/GetChannelClassType', { channelId: this.$route.query.ChannelId })
          if (response.status === 1) {
            var getTypeList = await this.$api.httpGet(this.widget.dataSource.substring(0, this.widget.dataSource.indexOf('=')) + '=' + response.message)
            if (getTypeList.status === 1) {
              this.viewModel = getTypeList.result
              this.props.label = 'name'
              this.async = true
            }
          }
        } else {
          response = await this.$api.httpGet(this.widget.dataSource)
          this.data = response.result
          this.data.forEach(element => {
            if (element.entityId === 0) {
              this.list.push(element)
            }
          })
          this.viewModel = this.getList(this.list)
          this.async = true
        }
      },
      checkChange (e, a) {
        this.$emit('input', a.checkedKeys)
      },
      getList (list) {
        if (list.length !== 0) {
          this.data.forEach((element, index) => {
            for (let l in list) {
              if (list[l].relationId === element.entityId) {
                list[l].children = []
                list[l].children.push(element)
                this.getList(list[l].children)
              }
            }
          })
        }
        return list
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .x-class {
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    .el-tree-node__label {
      font-size: 13px;
      color: #666666;
    }
  }
</style>
