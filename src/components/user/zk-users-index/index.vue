<template>
  <div class="users_index">
    <p-panel-group @handleSetLineChartData="handleSetLineChartData"></p-panel-group>
    <el-row>
      <p-line-chart :chart-data="lineChartData" v-if="async"></p-line-chart>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <p-raddar-chart></p-raddar-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <p-pic-chart></p-pic-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <p-bar-chart></p-bar-chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <p-transaction-table></p-transaction-table>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <p-todo-list></p-todo-list>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <p-box-card></p-box-card>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  export default {
    data () {
      return {
        async: false,
        lineChartData: lineChartData.newVisitis
      }
    },
    async onShow () {
    },
    mounted () {
      this.async = true
    },
    methods: {
      handleSetLineChartData (type) {
        this.lineChartData = lineChartData[type]
      }
    }
  }
</script>
<style scoped lang="scss">
  .users_index {
    padding: 12px;
    .card-panel {
      -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      background: #fff;
      border-color: rgba(0, 0, 0, 0.05);
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      color: #666;
      cursor: pointer;
      font-size: 12px;
      height: 108px;
      overflow: hidden;
      position: relative;
      .card-panel-icon-wrapper {
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        webkit-transition: all 0.38s ease-out;
        border-radius: 6px;
        float: left;
        transition: all 0.38s ease-out;
      }
      .card-panel-description {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        .card-panel-text {
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          line-height: 18px;
          margin-bottom: 12px;
          font-weight: bold;
        }
        .card-panel-num {
          font-size: 20px;
          font-weight: 700;
        }
      }
    }
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
