<template>
  <div class="diy-wrap" :class="'diy-wrap_'+masterPageIndex" id="wrap" v-if="viewModel" :style="'background:'+viewModel.setting.background+';'">
    <draggable v-model="viewModel.widgets" @change="dragEnd">
      <div v-for="(widget, index) in viewModel.widgets" :key="index" class="widgets-box">
        <layout-item v-if="!widget.layout" :widget="widget" @removeWidget="removeWidget" @editWidget="editWidget" @handleCheck="handleCheck" :removeIndex="index" ref="layoutitem"></layout-item>
        <div class="layout-box ">
          <!-- 标签容器 -->
          <div v-if="widget.layout==='tab-layer'" :class="'tab-box-'+widget.options.align" @click="handleLayoutCheck(widget,index)">
            <div class="swiper-tab" v-if="widget.columns.length!==0">
              <div v-for="(tab,tabIndex) in widget.columns" :key="tabIndex " class="swiper-tab_item " :class="{'active': tabIndex===tabLayoutIndex}" @click="tapTab(tabIndex)">{{tab.option.name}}</div>
            </div>
            <div class="tab-box-content" v-if="widget.columns.length!==0">
              <swiper :current="tabLayoutIndex" class="swiper-box tabs_swiper">
                <swiper-item v-for="(tablayout,layoutIndex) in widget.columns" :key="layoutIndex" class="tabs_swiper-item">
                  <div class="tab_swiper-masker" />
                  <draggable v-model="tablayout.widgets" v-show="auxiliaryRemove">
                    <div v-for="(tabWidget, tabWidgetIndex) in tablayout.widgets" :key="tabWidgetIndex">
                      <layout-item :widget="tabWidget" @removeWidget="removeWidget" @editWidget="editWidget" @handleCheck="handleCheck" :removeIndex="{'widgetIndex':index,'tablayout':layoutIndex,'tabWidgetIndex':tabWidgetIndex}"></layout-item>
                    </div>
                  </draggable>
                  <div class="diy-new-block" @dblclick="addWidget(masterPageIndex,true,index,layoutIndex)">
                    双击给容器加新模块
                  </div>
                </swiper-item>
              </swiper>
            </div>
          </div>
          <!-- 栅格容器 -->
          <div v-if="widget.layout==='grid-layer'" class="tab-box-top">
            <div class="grid-layer">
              <el-row :gutter="Number(widget.value.gutter)">
                <el-col :span="Number(widget.value.cols[layoutIndex].span)" v-for="(tablayout,layoutIndex) in widget.columns" :key="layoutIndex">
                  <div>
                    <div v-for="(tabWidget, tabWidgetIndex) in tablayout.columns" :key="tabWidgetIndex">
                      <layout-item :widget="tabWidget" @removeWidget="removeWidget" @editWidget="editWidget" @handleCheck="handleCheck" :removeIndex="{'widgetIndex':index,'tablayout':layoutIndex,'tabWidgetIndex':tabWidgetIndex}"></layout-item>
                    </div>
                    <div class="diy-new-block" @dblclick="addWidget(masterPageIndex,true, index, layoutIndex, widget)">
                      双击给容器添加新模块
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="layou-widget-actions">
            <span class="layou-widget-actions-span" @click="handleLayoutCheck(widget, index)">
              容器属性
            </span>
            <span class="layou-widget-actions-span" @click="removeWidgetDelete(widget,index)">
              删除容器
            </span>
          </div>
        </div>
      </div>
    </draggable>
    <div class="diy-new-block" @dblclick="addWidget(masterPageIndex,false)">
      双击添加新模块 <span v-if="masterPageIndex>0">母版页编号:{{masterPageIndex}}</span>
    </div>
    <view class="diy-widget-wrap_tabbar" v-if="viewModel.setting.showFoot">
      <zk-tabbar ref="zktabbar"></zk-tabbar>
      <div class="diy-dottedbox" />
      <div class="diy-widget-actions">
        <span class="diy-widget-actions-span" @click="eidtTabBar()">编辑</span>
        <span class="diy-widget-actions-span" @click="postMessage('pageSet',viewModel)">设置</span>
      </div>
    </view>
  </div>
</template>

<script>
  import theme from '@/service/core/theme'
  import draggable from 'vuedraggable'
  import layoutItem from './layout-item'

  export default {
    name: 'diy',
    components: {
      layoutItem,
      draggable
    },
    props: {
      masterPageIndex: {
        default: 0,
        type: Number
      }
    },
    data () {
      return {
        auxiliaryRemove: true,
        widgetsMask: -1,
        tabLayoutIndex: 0,
        theme: {},
        option: {},
        viewModel: {
          widgets: [],
          setting: {
            showFoot: false
          }
        },
        checkedWidgetIndex: -1,
        tabSwiperItem: -1,
        isClickContent: false
      }
    },
    onLoad (option) {
      this.option = option
    },
    mounted () {
      this.initListener()
      this.postMessage('clientIframeLoadRequest', 'wfsbpc')
    },
    methods: {

      tapTab (index) {
        this.tabLayoutIndex = index
      },
      async initWidget (data) {
        this.viewModel = {
          ...data,
          masterPageIndex: this.masterPageIndex
        }
        this.viewModel = theme.filerPageInfo(this.viewModel)
        console.info('唉就是你了')
        this.postMessage('clientIframeLoadSuccessful', true)
      },
      initListener () {
        window.addEventListener('message', (event) => {
          const { type, data } = event.data || {}
          switch (type) {
            case 'initWidget':
              this.initWidget(data)
              break
            case 'initTheme':
              this.initTheme(data)
              break
            case 'selectWidget':
              this.handleCheck(data)
              break
            case 'changeStyleCss':
              this.updateStyle('css', data)
              break
            case 'changeBorder':
              this.updateStyle('border', data)
              break
            case 'changeTheme':
              this.updateStyle('widgetTheme', data)
              break
            case 'changeVariable':
              this.updateVariable(data)
              break
            case 'widgetList':
              this.widgetList()
              // this.postMessage('widgetList', this.viewModel.widgets)
              break
            case 'addLayout':
              this.addLayout(data)
              break
            case 'removeWidget':
              this.removeWidgetAndSave(data)
              break
            case 'editLayouColumns':
              this.editLayouColumns(data)
              break
            case 'switchWidget':
              this.switchWidget(data)
          }
        })
      },
      editLayouColumns (data) {
        this.viewModel.widgets[data.layoutIndex] = data.data
        this.initWidget(this.viewModel)
        if (data.type === 'addColumns') {
          this.postMessage('widgetSave', data.data)
        }
      },
      handleCheck (value) {
        this.$bus.$emit('layoutItemCheck', value.index)
        this.postMessage('selectWidget', value)
      },
      // 编辑容器属性
      handleLayoutCheck (widget, index) {
        let data = {
          isLayout: true,
          layoutModel: widget,
          layoutIndex: index
        }
        this.postMessage('checkWidgetLayout', data)
      },
      // 添加容器
      addLayout (widget) {
        if (this.viewModel.widgets === null || this.viewModel.widgets.length === 0) {
          this.viewModel.widgets = []
        }
        this.viewModel.widgets.push(widget)
        this.postMessage('widgetSave', widget)
      },
      postMessage (type, data) {
        parent.postMessage({ type, data }, '*')
      },
      initTheme (data) {
        var bgColor = JSON.parse(data.tabBarSetting).backGround
        this.$refs.zktabbar.$emit('diyTab', JSON.parse(data.tabBarSetting))
        this.$refs.zktabbar.backgroundColor = bgColor
      },
      updateStyle (type, data) {
        const { viewModel, checkedWidgetIndex } = this
        if (checkedWidgetIndex === -1) return
        const currentWidget = viewModel.widgets[checkedWidgetIndex]
        if (currentWidget.style === null) {
          currentWidget.style = {}
        }
        this.$set(currentWidget.style, type, data)
      },
      // 删除容器或模块
      removeWidgetAndSave (removeData) {
        if (typeof (removeData) === 'number') {
          this.viewModel.widgets.splice(removeData, 1)
        }
        if (typeof (removeData) === 'object') {
          if (typeof (removeData.removeIndex) === 'number') {
            this.viewModel.widgets.splice(removeData.removeIndex, 1)
          } else {
            this.auxiliaryRemove = false
            this.viewModel.widgets[removeData.removeIndex.widgetIndex].columns[removeData.removeIndex.tablayout].widgets.splice(removeData.removeIndex.tabWidgetIndex, 1)
            this.auxiliaryRemove = true
          }
        }
        this.postMessage('diySave')
      },
      removeWidget (removeData) {
        this.postMessage('deleteWidgetAndSave', removeData)
      },
      editWidget (widget) {
        this.postMessage('editWidget', widget)
      },
      async addWidget (masterPageIndex, isLayout, widgetIndex, layoutIndex, widget) {
        var para = {
          masterPageIndex: masterPageIndex,
          isLayout: isLayout,
          widgetIndex: widgetIndex,
          layoutIndex: layoutIndex,
          widget
        }
        this.postMessage('showDialogWidget', para)
      },
      eidtTabBar () {
        var widget = {
          name: 'zk-tabbar',
          widgetId: '5c7b08e3a1355908e48cf4f3'
        }
        this.postMessage('editWidget', widget)
      },
      updateVariable (vars) {
      },
      async dragEnd () {
        this.postMessage('dragWidgetAndSave')
      },
      switchWidget (data) {
        this.initWidget(data)
      },
      // 删除容器
      removeWidgetDelete (widget, index) {
        this.$confirm(`确定删除${widget.title}容器?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeWidgetAndSave(index)
        }).catch(() => { })
      },
      widgetList () {
        this.postMessage('widgetList', this.viewModel.widgets)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>
