<template>
  <div v-if="async" :style="'background:'+viewModel.setting.background+';'">
    <div v-for="(widget,index) in viewModel.widgets" :key="index" :style="widget.style && widget.style.css" :class="widget.borderClass+ ' '+ widget.blockList">
      <template v-if="widget.status !== 'small'">
        <div v-if="widget.border&&widget.border.name!=''">
          <div class="border-header" v-if="widget.border">
            <x-icon class="border-header-icon" v-if="widget.border.icon" :src="widget.border.icon" :size="widget.border.size" :color="widget.border.iconSecondColor"></x-icon>
            <div class="border-header-title" v-if="widget.border.title">{{widget.border.title}}</div>
            <div class="border-header-desc" v-if="widget.border.intro">{{widget.border.intro}}</div>
            <div class="border-header-tools"></div>
          </div>
          <div class="border-body">
            <component :is="widget.name" :widget="widget" :title="widget.title" />
          </div>
        </div>
        <component v-else :is="widget.name" :widget="widget" :title="widget.title" />
      </template>
      <div v-if="widget.layout==='tab-layer'">
        <el-tabs v-model="tabName">
          <el-tab-pane :label="columns.option.name" :name="columnsIndex" v-for="(columns,columnsIndex) in widget.columns" :key="columnsIndex">
            <div v-for="(tabWidget,tabWidgetIndex) in columns.widgets" :key="tabWidgetIndex">
              <component :is="tabWidget.name" :title="tabWidget.title" :widget="tabWidget" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- grid-proutelayer -->
      <div class="grid-layout" v-if="widget.layout==='grid-layer'">
        <el-row :gutter="Number(widget.value.gutter)">
          <el-col :span="Number(widget.value.cols[layoutIndex].span)" v-for="(tablayout,layoutIndex) in widget.columns" :key="layoutIndex">
            <div v-if="tablayout.columns !== null">
              <div v-for="(tabWidget, index) in tablayout.columns" :key="index">
                <component :is="tabWidget.name" :title="tabWidget.title" :widgetData="tabWidget" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="fullsreen-layout" style="width:100%" v-if="widget.layout==='fullsreen-layer'">
      </div>
    </div>
  </div>
</template>

<script>
  import service from './service'
  import theme from '@/service/core/theme'
  export default {
    name: 'x-widget',
    props: {
      type: {} // 类型包括Front,Admin,City，Store等
    },
    data () {
      return {
        viewModel: {},
        itemModeL: {},
        tabName: 0,
        async: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.viewModel = await theme.page(this.$route, this.type)
        if (this.type === 'admin') {
          if (!this.viewModel) {
            this.viewModel = service.setWidget(this)
          }
          if (!this.viewModel) {
            this.$admin.message('您输入的网址不正确,页面不存在', 'danger', '页面不存在')
            return
          } else {
            await service.checkAdminRole(this.viewModel)
          }
        }
        this.async = true
        if (!this.$base.isBuild()) {
          console.info('页面信息:', this.viewModel)
        }
      },
      watchRoute () {
        this.init()
      }
    },
    watch: {
      $route: 'watchRoute'
    }
  }
</script>
