<template>
  <div class="admin-user-tree" v-if="async" v-cloak>
    <x-border :title="title" name="icon-5333-beifen16" type="primary">
      <div class="admin-user-tree_container">
        <el-tree :data="data" :props="defaultProps" :highlight-current="true" :load="loadNodeList" lazy></el-tree>
      </div>
    </x-border>
  </div>
</template>

<script>
  import './var.scss'
  import './styles'

  export default {
    name: 'admin-user-tree',
    data () {
      return {
        async: false,
        widgetModel: {},
        title: '组织架构',
        data: [],
        defaultProps: {
          label: 'name',
          children: 'children'
        },
        expanded: []
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
        var para = {
          id: this.$user.id(),
          isFirst: 'YES'
        }
        var res = await this.$api.httpGet('/api/UserTree/GetUserTree', para)
        if (res.status === 1) {
          this.widgetModel = res.result
        }
        this.data = this.widgetModel
        this.async = true
      },
      async loadNodeList (node, resolve) {
        if (node.level === 0) {
          return resolve(this.data)
        }
        var val
        if (!Array.isArray(node.data)) {
          var para = {
            id: node.data.id
          }
          var res = await this.$api.httpGet('/api/UserTree/GetUserTree', para)
          if (res.status === 1) {
            val = res.result
          }
        } else {
          val = []
        }
        resolve(val)
      },
      async getNode (data, node) {
        var para = {
          id: data.id
        }
        var res = await this.$api.httpGet('/api/UserTree/GetUserTree', para)
        var _this = this
        if (res.status === 1) {
          if (res.result.length > 0) {
            this.$nextTick(() => {
              _this.getTreeUrl(_this.data, res.result, data.id)
            })
          } else {
            this.$message.warning('此分类没有数据')
          }
        }
      },
      getTreeUrl (data, list, id) {
        if (data !== null) {
          data.forEach((element, index) => {
            if (element.id === id) {
              this.expanded.push(id)
              this.$set(element, 'children', list)
            } else if (element.children) {
              this.getTreeUrl(element.children, list, id)
            }
          })
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  [v-cloak] {
    display: none !important;
  }
  .admin-user-tree {
    .admin-user-tree_container {
      padding: 0px 20px;
      padding-bottom: 20px;
    }
  }
</style>


