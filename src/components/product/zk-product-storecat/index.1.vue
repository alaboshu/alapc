<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-table :data="catList" :row-style="toggleDisplayTr" border stripe class="init_table">
          <el-table-column label="分类名称" min-width="200" show-overflow-tooltip align="left">
            <template slot-scope="scope">
              <p :style="`margin-left: ${scope.row.__level * 20}px;margin-top:0;margin-bottom:0`">
                <i
                  @click="toggleFoldingStatus(scope.row)"
                  class="permission_toggleFold"
                  :class="toggleFoldingClass(scope.row)"
                ></i>
                <el-input
                  v-model="scope.row.treeItem.name"
                  style="width:200px"
                  placeholder="输入分类名称"
                ></el-input>
              </p>
            </template>
          </el-table-column>
          <el-table-column align="center" width="80" label="图标">
            <template slot-scope="scope">
              <i :class="scope.row.treeItem.icon"></i>
            </template>
          </el-table-column>
          <el-table-column align="center" width="300" label="操作">
            <template slot-scope="scope">
              <el-button @click="moveUp(scope.row.treeItem)">上移</el-button>
              <el-button @click="moveDown(scope.row.treeItem)">下移</el-button>
              <el-button @click="moveDown(scope.row.treeItem)">添加子分类</el-button>
              <el-button @click="remove(scope.row.treeItem)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        foldList: [],
        catTree: [],
        catList: []
      }
    },
    watch: {
      catTree (cur, old) {
        this.catList = this.formatConversion([], this.catTree)
      }
    },
    created () {
      this.catTree = [{
        id: 0,
        name: '分类1',
        icon: 'el-icon-info',
        children: [{
          id: 1,
          icon: 'el-icon-info',
          name: '分类11'
        }, {
          id: 2,
          icon: 'el-icon-info',
          name: '分类12'
        }, {
          id: 3,
          icon: 'el-icon-info',
          name: '分类13'
        }]
      }, {
        id: 4,
        icon: 'el-icon-info',
        name: '分类2',
        children: [{
          id: 5,
          icon: 'el-icon-info',
          name: '分类21'
        }, {
          id: 6,
          icon: 'el-icon-info',
          name: '分类22'
        }, {
          id: 7,
          icon: 'el-icon-info',
          name: '分类23'
        }]
      }]
    },
    methods: {
      addChild (item) {
        item.children = [...item.children, {}]
      },
      save () {
      },
      cancel () {
      },
      moveUp (obj, ary = this.catTree) {
        for (var i = 0; i < ary.length; i++) {
          if (ary[i] === obj) {
            if (i > 0) {
              ary.splice(i, 1)
              ary.splice(i - 1, 0, obj)
            }
            return true
          }
        }
        for (var j = 0; j < ary.length; j++) {
          if (this.moveUp(obj, ary[j].children)) {
            return true
          }
        }
        return false
      },
      moveDown (obj, ary = this.catTree) {
        for (var i = 0; i < ary.length; i++) {
          if (ary[i] === obj) {
            if (i < ary.length - 1) {
              ary.splice(i, 1)
              ary.splice(i + 1, 0, obj)
            }
            return true
          }
        }
        for (var j = 0; j < ary.length; j++) {
          if (this.moveDown(obj, ary[j].children)) {
            return true
          }
        }
        return false
      },
      remove (item) {
      },
      startWith (str, start) {
        var reg = new RegExp('^' + start)
        return reg.test(str)
      },
      toggleFoldingStatus (params) {
        this.foldList.includes(params.__identity) ? this.foldList.splice(this.foldList.indexOf(params.__identity), 1) : this.foldList.push(params.__identity)
      },
      toggleDisplayTr ({ row, index }) {
        for (let i = 0; i < this.foldList.length; i++) {
          let item = this.foldList[i]

          if (row.__family.includes(item) && row.__identity !== item) return 'display:none;'
        }
        return ''
      },
      toggleFoldingClass (params) {
        return params.treeItem.children === undefined || params.treeItem.children === null || params.treeItem.children.length === 0
          ? 'permission_placeholder' : (this.foldList.indexOf(params.__identity) === -1
            ? 'iconfont icon-minus-square-o' : 'iconfont icon-plussquareo')
      },
      formatConversion (parent, children, index = 0, family = [], elderIdentity = 'x') {
        if (children.length > 0) {
          children.map((x, i) => {
            var listItem = { treeItem: x }
            listItem.__level = index
            listItem.__family = [...family, elderIdentity + '_' + i]
            listItem.__identity = elderIdentity + '_' + i
            this.foldList.push(listItem.__identity)
            parent.push(listItem)
            if (x.children !== undefined && x.children !== null && x.children.length > 0) this.formatConversion(parent, x.children, index + 1, [...family, elderIdentity + '_' + i], elderIdentity + '_' + i)
          })
        }
        return parent
      }
    }
  }
</script>

<style  lang="scss" scoped>
   @import "~_style/index.scss";
  @font-face {
    font-family: "iconfont";
    src: url("iconfont.eot?t=1536808746819"); /* IE9*/
    src: url("iconfont.eot?t=1536808746819#iefix") format("embedded-opentype"),
      /* IE6-IE8 */
        url("data:application/x-font-woff;charset=utf-8;base64,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")
        format("woff"),
      url("iconfont.ttf?t=1536808746819") format("truetype"),
      /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        url("iconfont.svg?t=1536808746819#iconfont") format("svg"); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-wodezhanghao:before {
    content: "\e645";
  }

  .icon-tuichu:before {
    content: "\e66a";
  }

  .icon-ai-list:before {
    content: "\e610";
  }

  .icon-hrrenshirenshiguanli380:before {
    content: "\e67e";
  }

  .icon-plussquareo:before {
    content: "\e7c6";
  }

  .icon-minus-square-o:before {
    content: "\e6cc";
  }

  .icon-chaxun:before {
    content: "\e606";
  }

  .icon-xitongbangzhu:before {
    content: "\e616";
  }

  .icon-yewu:before {
    content: "\e687";
  }

  .icon-home:before {
    content: "\e63e";
  }

  .app_title {
    display: block;
    width: 100%;
    font-size: 24px;
    line-height: 60px;
    color: #41dae4;
    text-align: center;
  }

  .permission_toggleFold {
    vertical-align: middle;
    padding-right: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  .permission_placeholder {
    content: " ";
    display: inline-block;
    width: 16px;
    font-size: 16px;
  }

  .init_table {
    width: 900px !important;
    margin-left: 0 auto !important;

    th {
      background-color: #edf6ff;
      text-align: center !important;
      color: #066cd4;
      font-weight: bold;

      .cell {
        padding: 0 !important;
      }
    }

    td,
    th {
      font-family: "宋体";
      font-size: 12px;
      padding: 0 !important;
      height: 40px !important;
    }

    .el-table--border,
    .el-table--group {
      border: 1px solid #dde2ef;
    }

    td,
    th.is-leaf {
      border-bottom: 1px solid #dde2ef;
    }

    .el-table--border td,
    .el-table--border th,
    .el-table__body-wrapper
      .el-table--border.is-scrolling-left
      ~ .el-table__fixed {
      border-right: 1px solid #dde2ef;
    }

    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background-color: #f7f9fa;
    }
  }
</style>

