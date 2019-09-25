<template>
  <div class="admin-smart-hand">
    <div class="admin-smart-hand_left">
      <div class="ring-figure">
        <ve-ring :data="chartData" :tooltip-visible="true" :legend-visible="false" :settings="chartSettings" :colors="colors">
          <div class="ring-figure_box">
            <span class="ring-figure_number">12</span>
            项待处理
          </div>
        </ve-ring>
      </div>
      <div class="hand_left-buttom">检测</div>
      <div class="hand_left-text">查看详情</div>
    </div>
    <div class="admin-smart-hand_right">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :label="tabs.name" :name="tabs.key" v-for="(tabs,tabsIndex) in itemList" :key="tabsIndex">
          <div class="tabs-pane">
            <div class="tabs-pane_ul" v-for="(item, index) in 2" :key="index">
              <div class="tabs-pane_li" v-for="(items, indexs) in 10" :key="indexs">
                <div class="corner-mark">任务{{indexs}}</div>
                <div class="pane-title">十九大加速度哈数据的噶事搭嘎啥时给搭嘎是固定</div>
                <div class="reminder-text">立即优化</div>
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import './var.scss'


  export default {
    name: 'admin-smart-hand',
    data () {
      return {
        widgetModel: {},
        colors: ['#DAE7FE', '#5487FA'],
        chartSettings: {
          radius: [50, 65],
          offsetY: 70,
          labelLine: {
            show: false
          },
          label: {
            show: false
          }
        },
        itemList: [
          { name: '店铺基础', key: '1' },
          { name: '商品体验', key: '2' },
          { name: '物流体验', key: '3' },
          { name: '售货体验', key: '4' }
        ],
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/4', '访问用户': 10 },
            { '日期': '1/5', '访问用户': 6 }
          ]
        },
        activeName: '1'
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
      },
      handleClick () {

      }
    }
  }
</script>
