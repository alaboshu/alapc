<template>
  <div class="x-table" v-if="async" v-loading="loading">
    <div class="x-table_tabs">
      <el-tabs v-if="dataResult.tabs.length!==0" v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane name="-1">
          <span slot="label" class="tab-pane-span"><i class="flaticon-analytics"></i>全部</span>
          <div class="tab-pane-box">
          </div>
        </el-tab-pane>
        <el-tab-pane v-for="(item,index) in dataResult.tabs" :key="index" :name="String(item.key)">
          <span slot="label" class="tab-pane-span"><i :class="item.icon"></i>{{item.value}}</span>
          <div class="tab-pane-box">
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="administration_box">
      <div class="search_box">
        <search-form @searchForm="search" ref="searchForm" :submit-loading="loading" />
      </div>
      <div class="table-action" v-if="dataResult.tableActions">
        <el-button-group>
          <el-button type="primary" v-for="(tableAction,tableIndex) in dataResult.tableActions.filter(r=>r.actionType===2)" :key="tableIndex" @click="tableActionMethod(tableAction)">{{tableAction.name}}</el-button>
        </el-button-group>
      </div>
      <slot name="form" :loading="loading" :search="searchHandler" />
    </div>
    <el-table v-show="!isTemplate" class="table_box" ref="table" :data="dataResult.result.result" :stripe="true" :fit="true" :highlight-current-row="true">
      <slot name="prepend" />
      <div v-for="(column, columnIndex) in dataResult.columns" :key="columnIndex">
        <el-table-column border :column-key="column.columnKey" :label="column.label+column.style.type" :width="column.style.width" :prop="column.prop" :fixed="column.fixed" :render-header="column.headBackground" :sortable="column.sortable" :sort-by="column.sortBy" :sort-method="column.method" :show-overflow-tooltip="false" :align="column.style.algin" header-align="center" :class-name="column.className" :label-class-name="column.labelClassName" :selectable="column.selectable" :reserve-selection="column.reserveSelection" :filters="column.filters" :filter-placement="column.filterPlacement" :filter-multiple="column.filterMultiple" :filter-method="column.filterMethod" :filtered-value="column.filteredValue">
          <template slot-scope="scope" :scope="newSlotScope ? 'scope' : false">
            <span v-if="column.filter">{{ Vue.filter(column['filter'])(scope.row[column.prop]) }}</span>
            <span v-else-if="column.slotName">
              <slot :name="column.slotName" :row="scope.row" :$index="scope.$index" />
            </span>
            <span v-else-if="column.render">{{ column.render(scope.row) }}</span>
            <span v-else-if="column.style.image === 'image'">
              <img :src="getImage(scope.row[column.prop])" style="width: 30px; height:30px;" alt="">
            </span>
            <span v-else-if="column.style.type  === 'icon'">
              <x-icon :src="scope.row[column.prop].name" :name="scope.row[column.prop]"></x-icon>
              {{scope.row[column.prop].name}}
            </span>
            <span v-else-if="column.style.type  === 'bool'">
              <div class="column_type" :style="{background:scope.row[column.prop]?'#68BCA4':'#DD5C6D' }">{{scope.row[column.prop]?'是':'否'}}</div>
            </span>
            <span v-else-if="column.style.type  === 'enum'">
              <div class="column_type">
                <x-enum :type='column.style.parameter' :value='scope.row[column.prop]'></x-enum>
              </div>
            </span>
            <span v-else-if="column.style.type  === 'button'">
              <el-button type="primary" @click.native="action(scope.row[column.prop], scope.row)">{{scope.row[column.prop]}}</el-button>
            </span>
            <span v-else-if="column.style.type  === 'switch'||column.prop === 'switch'">
              <el-switch v-model="scope.row[column.prop]" active-color="#13ce66" inactive-color="#ff4949" :disabled="true">
              </el-switch>
            </span>
            <span v-else>
              <span v-html="scope.row[column.prop]" class="table-span" :class="{'table-afterAmount':column.prop==='afterAmount','table-amount':column.prop==='amount','table-flowAmoumtStr':column.prop==='flowAmoumtStr','table-billTypeName':column.prop==='billTypeName'}"></span>
            </span>
            <span v-if="column.prop==='action'">
              <div class="btn-group" @mouseenter="enter(scope.row)" @mouseleave="leave(scope.row)">
                <el-popover placement="bottom" width="70" trigger="hover">
                  <ul class="x-table_action">
                    <li v-for="(action,actionIndex) in  dataResult.tableActions.filter(r=>r.actionType===1)" :key="actionIndex">
                      <el-button :icon="action.icon" @click="tableActionMethod(action,scope.row,scope.$index)">{{action.name}}</el-button>
                    </li>
                  </ul>
                  <a slot="reference" class="btn-circle btn-sm" href="javascript:;" data-toggle="dropdown">
                    <i class="el-icon-setting"></i>操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </a>
                </el-popover>
              </div>
            </span>
          </template>
        </el-table-column>
      </div>
      <slot name="append" />
    </el-table>
    <slot :data="dataResult"></slot>
    <el-dialog title="审核" :visible.sync="dialogVisible" :before-close="handleDialogClose">
      <zk-auto-form @formLoad="formLoad" :serviceConfig="dialogForm.columnActionView" ref="dialogAutoForm" @saveForm="saveForm"></zk-auto-form>
    </el-dialog>
    <div style="margin-top: 10px;text-align: right;">
      <div class="block" style="height: 50px;">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="dataResult.result.pageIndex" :page-sizes="[10,15, 30, 60, 120]" :page-size="dataResult.result.pageSize" layout="total, sizes, prev, pager, next, jumper,->" :total="dataResult.result.recordCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import action from './action'
  import props from './props'
  import searchForm from './search/'
  import format from './format.js'
  import data from './data.js'
  import excel from './excel.js'
  import dialog from './dialog.js'
  export default {
    name: 'x-table',
    components: {
      searchForm
    },
    props,
    data () {
      return {
        dialogVisible: false, // 是否显示审核弹窗
        dataResult: {
          tableActions: [],
          tabs: [],
          searchOptions: [],
          icon: null,
          name: null,
          result: {
            result: [], // 数据源,
            pageSize: 15,
            pageCount: 1,
            pageIndex: 1,
            recoudSite: 1,
            recordCount: 0
          }
        }, // 表格数据，绑定表格用
        activeName: '-1', // 活动标签
        dialogForm: { // 弹窗表单信息
          columnActionView: null,
          showColumnActionView: false,
          columnActionType: null
        },
        dataSourceConfig: { // 数据源信息,
          type: null,
          columns: null
        },
        loading: true,
        fetchHandlersPara: {},
        async: false,
        Vue
      }
    },
    computed: {
      newSlotScope () {
        return Number(Vue.version.replace(/\./g, '')) >= 250
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      // 表格初始,可以在父组件中使用refs来调用，具体的用法可参考admin-auto-table
      async init (type, columns) {
        data.beforeInit(this, type, columns)
        await data.fetchDatas(this)
        // 表格加载完成后，调用父组件中的afterTableLoad事件，完成表格加载完后的其他操作，比如修改标题，修改颜色等
        // 具体的用法可参考admin-auto-table  admin-autoconfig-list 
        this.$emit('afterTableLoad', this.dataResult)
      },
      // 弹窗表格操作
      async  saveForm (models) {
        dialog.saveForm(this.models)
      },
      // 弹窗表格操作
      async  columnAction (data, scope) {
        await dialog.columnAction(this, data, scope)
      },
      // 弹窗表格操作
      formLoad (val) {
        if (val) {
          this.loading = false
        }
      },
      // 弹窗表格关闭
      handleDialogClose () {
        this.dialogVisible = false
      },
      // 导出操作
      async  toExcel (command) {
        await excel.toExcel(this, command)
      },
      // 标签操作
      tabHandleClick (tab) {
        data.tabClick(this, this.dataResult.tabs[tab.index - 1], tab.index)
      },
      // 搜索事件
      search (paramenter) {
        data.search(this, paramenter)
      },
      // 表格操作方法
      async   tableActionMethod (actionItem, rowScope, index) {
        if (actionItem.type === 2) {
          var deleteResult = await action.columnDeleteMethod(this, actionItem, rowScope)
          if (deleteResult) {
            this.dataResult.result.result.splice(index, 1)
          }
        } else {
          action.tableActionMethod(this, actionItem, rowScope)
        }
      },
      // 分页数量事件
      handleSizeChange (size) {
        this.dataResult.result.pageSize = size
        data.search(this)
      },
      // 分页页码事件
      handleCurrentChange (pageIndex) {
        this.dataResult.result.pageIndex = pageIndex
        this.fetchHandler()
      },
      searchHandler () {
        this.dataResult.result.pageIndex = 1
        data.search(this)
      },
      // 搜索用
      async fetchHandler () {
        data.fetchDatas(this)
      },
      // 操作列事件
      enter (row) {
        this.$set(row, 'show', !row.show)
      },
      // 操作列事件
      leave (row) {
        this.$set(row, 'show', !row.show)
      },
      tableCell (row) {
        var valueList = []
        valueList.push(row)
        this.$refs.table.toggleRowSelection(row)
      },
      handleSelectionChange (val) {
        if (val.length > 1) {
          this.toggleSelection(val[0])
        }
      },
      toggleSelection (rows) {
        this.$refs.table.toggleRowSelection(rows)
      },
      getImage (imageUrl) {
        if (imageUrl !== undefined && imageUrl !== null) {
          if (imageUrl.substr(0, 7).toLowerCase() === 'http://' || imageUrl.substr(0, 7).toLowerCase() === 'https:/') {
            return imageUrl
          }
          return this.$api.baseUrl() + imageUrl
        }
        return imageUrl
      },
      // 获取表格格式颜色
      getColor () {
        return format.getColor()
      },
      getEmun () {
        return format.getEmun()
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
