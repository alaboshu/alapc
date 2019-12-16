<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-tree draggable :data="catTree" node-key="id" :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
              <el-input v-model="data.name" style="width:200px" placeholder="输入分类名称"></el-input>
            </span>
            <span>
              <i :class="data.icon"></i>
              <el-button type="text" @click="addChild(node)">添加子分类</el-button>
              <el-button type="text" @click="remove(node)">删除</el-button>
            </span>
          </span>
        </el-tree>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        catTree: [],
        id: 0
      }
    },
    created () {
      this.catTree = [{
        id: this.id++,
        name: '分类1',
        icon: 'el-icon-info',
        children: [{
          id: this.id++,
          icon: 'el-icon-info',
          name: '分类11'
        }, {
          id: this.id++,
          icon: 'el-icon-info',
          name: '分类12'
        }, {
          id: this.id++,
          icon: 'el-icon-info',
          name: '分类13'
        }]
      }, {
        id: this.id++,
        icon: 'el-icon-info',
        name: '分类2',
        children: [{
          id: this.id++,
          icon: 'el-icon-info',
          name: '分类21'
        }, {
          id: this.id++,
          icon: 'el-icon-info',
          name: '分类22'
        }, {
          id: this.id++,
          icon: 'el-icon-info',
          name: '分类23'
        }]
      }]
    },
    methods: {
      addChild (node) {
        const newChild = { id: this.id++, label: 'testtest', children: [] }
        if (!node.data.children) {
          // this.$set(data, 'children', [])
        }
        node.data.children.push(newChild)
      },
      save () {

      },
      cancel () {
      },
      remove (node) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === node.data.id)
        children.splice(index, 1)
      },
      startWith (str, start) {
        var reg = new RegExp('^' + start)
        return reg.test(str)
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import "~_style/theme.scss";
</style>

