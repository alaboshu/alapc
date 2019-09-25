<template>
  <div class="zk-treetable">
    <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
      <el-table-column v-if="columns.length===0" width="150">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
          <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus" />
            <i v-else class="el-icon-minus" />
          </span>
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column v-for="(column, index) in columns" v-else :key="column.type" :label="column.text" :width="column.width">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
          <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus" />
            <i v-else class="el-icon-minus" />
          </span>
          <span v-if="column.type==='name'">{{ scope.row[column.type] }}</span>
          <span v-if="column.type==='image'">
            <img :src="baseUrl+scope.row.icon" class="img" alt="">
          </span>
          <span v-if="column.type==='set'">
            <!-- <el-button @click="addclass(scope.row.id)">添加子类</el-button> -->
            <el-button @click="edit(scope.row.id)">编辑</el-button>
            <el-button @click="detele(scope.row.id)">删除</el-button>
          </span>
        </template>
      </el-table-column>
      <slot />
    </el-table>
  </div>
</template>

<script>
  /**
    Auth: Lei.j1ang
    Created: 2018/1/19-13:59
  */
  import treeToArray from './eval'
  export default {
    name: 'TreeTable',
    data () {
      return {
        baseUrl: this.$api.baseUrl()
      }
    },
    props: {
      /* eslint-disable */
      data: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: false
      },
      detele: {},
      edit: {},
      addclass: {}
    },
    computed: {
      // 格式化数据源
      formatData: function () {
        let tmp
        if (!Array.isArray(this.data)) {
          tmp = [this.data]
        } else {
          tmp = this.data
        }
        const func = this.evalFunc || treeToArray
        const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
        return func.apply(null, args)
      }
    },
    methods: {
      showRow: function (row) {
        const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
        row.row._show = show
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
      // 切换下级是否展开
      toggleExpanded: function (trIndex) {
        const record = this.formatData[trIndex]
        record._expanded = !record._expanded
      },
      // 图标显示
      iconShow (index, record) {
        return (index === 0 && record.childClass && record.childClass.length > 0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>

<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>