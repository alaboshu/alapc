<template>
  <div>
    <div class="m-portlet__body">
      <!-- <div class="m-portlet_step">
        <div class="step-box">
          <span class="step-number"></span>
        </div>
      </div> -->
      <!-- <div class="step-boxs">
        <ul>
          <li>
            <div class="step-box_noe box_noe-hover">1</div>
            <div class="step-box_two"></div>
            <div class="step-box_three">代付款 (拍下商品)</div>
          </li>
          <li>
            <div class="step-box_noe">2</div>
            <div class="step-box_two"></div>
            <div class="step-box_three">代发货(买家付款)</div>
          </li>
          <li>
            <div class="step-box_noe">3</div>
            <div class="step-box_two"></div>
            <div class="step-box_three">待收货</div>
          </li>
          <li>
            <div class="step-box_noe">4</div>
            <div class="step-box_two"></div>
            <div class="step-box_three">待评价</div>
          </li>
          <li>
            <div class="step-box_noe">5</div>
            <div class="step-box_two"></div>
            <div class="step-box_three">完成(已评价、关闭、取消)</div>
          </li>
        </ul>
      </div> -->
      <div class="m-alert">
        <div class="m-alert_i"><i class="el-icon-warning"></i></div>
        <div class="m-alert_title">
          <span class="m-alert_span">{{orderType}}</span>您可以进行如下操作
        </div>
        <div class="m-alert_right">
          <div class="m-alert_a" :class="item.color" v-for="(item,index) in viewModel.methods" :key="index" @click="getDialog(item.method)">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="interlayer"></div>
    <div class="user-right">
      <el-tabs>
        <el-tab-pane>
          <span slot="label" class="tab-pane-span"><i class="flaticon-analytics"></i>商品信息</span>
          <div class="tab-pane-box">
            <MerChanDise :viewModel="viewModel"></MerChanDise>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane>
          <span slot="label" class="tab-pane-span"><i class="flaticon-diagram"></i>操作记录</span>
          <div class="tab-pane-box">
            <OperatingRecord :viewModel="viewModel"></OperatingRecord>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="tab-pane-span"><i class="flaticon-alarm"></i>发货记录</span>
          <div class="tab-pane-box">
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="tab-pane-span"><i class="flaticon-exclamation"></i>支付信息</span>
          <div class="tab-pane-box">
            <OperationList :viewModel="viewModel"></OperationList>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="tab-pane-span"><i class="flaticon-medical"></i>留言备注</span>
          <div class="tab-pane-box">
            <LeaveMessage :viewModel="viewModel"></LeaveMessage>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="tab-pane-span"><i class="flaticon-diagram"></i>退货退款</span>
          <div class="tab-pane-box">
            <OperatingRecord :viewModel="refund"></OperatingRecord>
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import MerChanDise from './merchandise'
  // import OperationList from './operation-list'
  // import LeaveMessage from './leave-message'
  // import OperatingRecord from './operating-record'
  import action from '../action.js'
  import server from '../js/right'

  export default {
    props: {
      viewModel: {},
      refund: {}
    },
    components: {
      MerChanDise
      // OperationList
      // LeaveMessage
      // OperatingRecord
    },
    data () {
      return {
        TableEdit: false,
        listIndex: 0,
        widget: '',
        orderType: '',
        editMethod: '',
        checkLogistics: false,
        LogisticsMessage: ''

      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widget = {
          userId: this.viewModel.userId,
          payPassword: '',
          orderId: this.viewModel.id
        }
        this.orderType = action.OrderStatus(this.viewModel.orderStatus)
        var par = {
          orderId: this.viewModel.id
        }
        // 临时退货详情 后续操作记录完成后改到操作记录中
        var res = await this.$api.httpGet('/Api/OrderAdmin/GetRefundInfo', par)
        if (res.status === 1) {
          this.refund = res.result
        }
      },
      async getDialog (method) {
        server.getDialog(this, method)
      },
      async cancelOrder () {
        let cancelPar = {

        }
        await this.$api.httpGet('/Api/OrderAdmin/Cancel', cancelPar)
      },
      async saveTableData () {
        server.saveTableData(this)
      },
      saveCancel () {
        var user = this.$refs.from_item.user
        this.widget.payPassword = user.password
        action.action(this, this.widget, 'AdminOrderCancle')
      },
      saveDelete () {
        action.action(this, this.widget, 'AdminOrderDelete')
      },
      async increaseDelivery () {
        server.increaseDelivery(this)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/style.scss";
</style>
