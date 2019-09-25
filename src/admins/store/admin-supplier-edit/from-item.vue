<template>
  <div class="from-item">
    <div class="pay-another" v-if="currt=='OrderAdminPay'">
      <div class="another_list">
        <p><span class="span_h1">管理员代付</span>代付之前请注意：</p>
        <p>1.资产从您的账户上扣除：代付的金额，包括现金以及虚拟资产，将全部从您的账户上扣除</p>
        <p>2.产生的分润已订单用户为基准：代付成功以后，订单可能会产生分润请注意</p>
        <p>3.代付不可更改金额，根据会员下单方式扣除资产</p>
      </div>
      <div class="card-list">
        <ul>
          <li v-for="(item,index) in 6" :key="index">
            <p>0.00</p>
            <div class="card-text">升级点</div>
          </li>
        </ul>
      </div>
      <div class="from-list flows_top">
        <div class="from-list_box">
          <div class="form-label lable-top">代付现金</div>
          <div class="font-weight-bold"><span class="bold-number">{{ parseFloat(viewModel.paymentAmount).toFixed(2)}} 元</span></div>
        </div>
        <div class="from-list_box">
          <div class="form-label lable-top">代付资产</div>
          <div class="font-weight-bold"><span class="bold-savings">储蓄</span></div>
        </div>
        <div class="from-list_box">
          <div class="form-label">安全密码</div>
          <div class="font-weight-bold">
            <el-input v-model="user.password" type="password"></el-input>
            <div class="intro-text">请输入当前管理员的安全密码</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='2'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">所在区域：</div>
          <div class="font-weight-bold">
            <x-city-picker v-model="user.regionId"></x-city-picker>
            <div class="intro-text">请选择所在区域</div>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">详细地址：</div>
          <div class="font-weight-bold">
            <el-input v-model="user.address"></el-input>
            <div class="intro-text">请输入详细地址</div>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">收货人姓名:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.name"></el-input>
            <div class="intro-text">请输入收货人姓名</div>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">手机号码:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.mobile"> </el-input>
            <div class="intro-text">请输入手机号码</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='3'">
      <div class="from-list">
        <div class="form-label">备忘信息：</div>
        <div class="font-weight-bold">
          <textarea class="textarea" v-model="text" style="height: 50px;"></textarea>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='4'">
      <div class="from-list">
        <div class="form-label">留言信息：</div>
        <div class="font-weight-bold">
          <textarea class="textarea" v-model="text" style="height: 200px;"></textarea>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='5'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">安全密码：</div>
          <div class="font-weight-bold">
            <el-input v-model="widget.payPassword" type="password"></el-input>
            <div class="intro-text">请输入当前管理员的安全密码</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='6'">
      <div class="another_list">
        <p><span class="span_h1">物理删除</span>订单物理删除后，将无法恢复，可能会出现以下情况：</p>
        <p>1.订单已经执行分润，找不到订单 2.订单已经产生的数据记录不会丢失，但查看时找不到订单</p>
      </div>
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">安全密码：</div>
          <div class="font-weight-bold">
            <el-input v-model="widget.payPassword" type="password"></el-input>
            <div class="intro-text">请输入当前管理员的安全密码</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='UserOrderCancle'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">安全密码:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.password" type="password"></el-input>
            <div class="intro-text">请输入安全密码</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='OrderAdminRemark'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">备忘信息:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.remark"></el-input>
            <div class="intro-text">请输入备忘信息</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='OrderAdminChangeAddress'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">所在区域：</div>
          <div class="font-weight-bold">
            <x-city-picker v-model="user.regionId"></x-city-picker>
            <div class="intro-text">请选择所在区域</div>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">详细地址:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.address"></el-input>
            <div class="intro-text">请输入详细地址</div>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">收货人姓名:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.name"></el-input>
            <div class="intro-text">请输入收货人姓名</div>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">手机号码:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.mobile"></el-input>
            <div class="intro-text">请输入手机号码</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='UserOrderCheckLogistics'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">选择物流:</div>
          <div class="font-weight-bold">
            <el-select v-model="user.ExpressNo" placeholder="请选择" @change="changeExpress">
              <el-option v-for="item in express" :key="item.no" :label="item.com" :value="item.no">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">物流单号:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.logistics"> </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='OrderAdminDelivery'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">选择物流:</div>
          <div class="font-weight-bold">
            <el-select v-model="ExpressNo" placeholder="请选择" filterable @change="changeExpress">
              <el-option v-for="item in express" :key="item.no" :label="item.com" :value="item.no">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">物流单号:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.logistics"> </el-input>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">物流名称:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.remark"> </el-input>
          </div>
        </div>
        <div class="delivery-list" v-if="DeliveryList">
          <ul>
            <li v-for="(item,index) in DeliveryList" :key="index">
              <p>快递方式：{{item.expressName}}（{{item.expressNum}}）</p>
              <p>物流名称：{{item.remark}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='UpdateExpressAmount' && freightData">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">当前运费:</div>
          <div class="font-weight-bold">
            <el-input v-model="freightData.calculateExpressAmount" disabled> </el-input>
            <div class="intro-text">当前运费不可修改</div>
          </div>
        </div>
      </div>
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">调整运费:</div>
          <div class="font-weight-bold">
            <el-input v-model="freightData.expressAmount"> </el-input>
            <div class="intro-text">请输入调整运费</div>
          </div>
        </div>
      </div>
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">修改运费说明:</div>
          <div class="font-weight-bold">
            <el-input type="textarea" v-model="freightData.expressDescription"> </el-input>
            <div class="intro-text">请说明修改运费原因</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='Api/Refund/Process'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">处理方式:</div>
          <div class="font-weight-bold font-weiget-bold-mt">
            退款
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">处理结果:</div>
          <div class="font-weight-bold font-weiget-bold-mt">
            <el-radio-group v-model="radio" @change="change">
              <el-radio :label="3">驳回申请</el-radio>
              <el-radio :label="6">通过申请</el-radio>
              <el-radio :label="9">手动退款</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="from-list_box" v-if="radio===3">
          <div class="form-label">驳回申请原因:</div>
          <div class="font-weight-bold">
            <el-input v-model="refund.processMessage" type="textarea"></el-input>
            <div>请说明驳回申请原因</div>
          </div>
        </div>
        <div class="from-list_box" v-if="radio===6">
          <div class="form-label">输入地址:</div>
          <div class="font-weight-bold">
            <el-input v-model="refund.address" type="textarea"></el-input>
            <div>请输入地址</div>
          </div>
        </div>
        <div class="from-list_box" v-if="radio===9">
          <div class="form-label">输入金额:</div>
          <div class="font-weight-bold">
            <el-input type="number" :max="viewModel.totalAmount-viewModel.expressAmount" v-model="refund.amount"></el-input>
            <div>订单总价￥{{viewModel.totalAmount.toFixed(2)}}，商品总价￥{{(viewModel.totalAmount-viewModel.expressAmount).toFixed(2)}}, 运费￥{{viewModel.expressAmount.toFixed(2)}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='AdminAllowRefund'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">退货地址:</div>
          <div class="font-weight-bold">
            <el-input type="textarea" v-model="returnAddress"> </el-input>
            <div class="intro-text">请输入退货地址</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='AdminRefuseRefund'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">拒绝退货原因:</div>
          <div class="font-weight-bold">
            <el-input type="textarea" v-model="processMessage"> </el-input>
            <div class="intro-text">请输入拒绝退货原因</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='Api/Refund/Get'&&refundDetail">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">退款原因:</div>
          <div class="font-weight-bold font-weiget-bold-mt">
            <div class="intro-text">{{refundDetail.reason}}</div>
          </div>
        </div>
      </div>
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">退款金额:</div>
          <div class="font-weight-bold font-weiget-bold-mt">
            <div class="intro-text">{{refundDetail.amount}}</div>
          </div>
        </div>
      </div>
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">退款说明:</div>
          <div class="font-weight-bold font-weiget-bold-mt">
            <div class="intro-text">{{refundDetail.description}}</div>
          </div>
        </div>
      </div>
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">退货地址:</div>
          <div class="font-weight-bold font-weiget-bold-mt">
            <div class="intro-text">{{refundDetail.address}}</div>
          </div>
        </div>
      </div>
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">处理方式:</div>
          <div class="font-weight-bold font-weiget-bold-mt">
            <div class="intro-text">{{refundDetail.processMessage}}</div>
          </div>
        </div>
      </div>
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">图片:</div>
          <div class="font-weight-bold font-weiget-bold-mt">
            <div class="intro-text image_list" v-if="refundDetail.images">
              <img v-for="(item, index) in refundDetail.images" :key="index" :src="$api.baseUrl()+item" alt="" srcset="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='Api/Order/GetExpressInfo'">
      <div class="from-list">
        <div class="collapse_box" v-if="DeliveryList">
          <el-collapse accordion @change="getCollapse">
            <el-collapse-item v-for="(items,indexs) in DeliveryList" :key="indexs" :name="indexs">
              <template slot="title">
                <div class="collapse-title">
                  <p>快递方式：{{items.expressName}}（{{items.expressNum}}）</p>
                  <p>物流名称：{{items.remark}}</p>
                </div>
              </template>
              <div class="fold_conter" v-if="!expressFoobl">{{expressValue}}</div>
              <div class="fold_conter" v-if="expressFoobl">
                <ul>
                  <li v-for="(express,expressIndex) in expressList.list" :key="expressIndex">
                    <div class="text-time">{{express.datetime}}</div>
                    <div class="text-intro">{{express.remark}}{{express.remark}}</div>
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="from-list_box">
          <div class="form-label">选择物流:</div>
          <div class="font-weight-bold">
            <el-select v-model="ExpressNo" placeholder="请选择" filterable @change="changeExpress">
              <el-option v-for="item in express" :key="item.no" :label="item.com" :value="item.no">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">物流单号:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.logistics"> </el-input>
          </div>
        </div>
        <div class="from-list_box">
          <div class="form-label">物流名称:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.remark"> </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt=='Api/OrderAdmin/AdminCancel'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">支付密码:</div>
          <div class="font-weight-bold">
            <el-input v-model="user.password" type="password"></el-input>
            <div class="intro-text">请输入支付密码</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-another" v-if="currt == 'AdminPayment'">
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">货款:</div>
          <div class="font-weight-bold">
            <el-input :value="`订单总金额${viewModel.totalAmount}, 运费${viewModel.expressAmount}`" readonly> </el-input>
          </div>
        </div>
      </div>
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">备注:</div>
          <div class="font-weight-bold">
            <el-input type="textarea" v-model="adminPayment.desc"> </el-input>
            <div class="intro-text">请输入备注</div>
          </div>
        </div>
      </div>
      <div class="from-list">
        <div class="from-list_box">
          <div class="form-label">上传凭证:</div>
          <div class="font-weight-bold">
            <x-select-image v-model="adminPayment.icertificate" :count='3'></x-select-image>
            <div class="intro-text">请上传凭证</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      viewModel: {},
      widget: {}
    },
    data () {
      return {
        text: '',
        currt: '',
        express: '',
        user: {
        },
        ExpressName: '',
        ExpressNo: '',
        freightData: [],
        radio: 9,
        returnAddress: '',
        processMessage: '',
        refundDetail: [],
        refund: {
          amount: '',
          address: '',
          processMessage: ''
        },
        DeliveryList: '',
        expressFoobl: false,
        expressValue: '',
        config: {
          images: []
        },
        adminPayment: {
          icertificate: [],
          desc: ''
        }
      }
    },
    mounted () {
      this.init()
      this.$nextTick(() => {
        this.$on('changeover', () => {
        })
      })
    },
    methods: {
      async init () {
        var response = await this.$api.httpGet('api/order/Express')
        if (response.status === 1) {
          this.express = JSON.parse(response.message)
        }
        var paramenter = {
          OrderId: this.$route.query.id
        }
        var resposn = await this.$api.httpGet('/api/order/GetExpressList', paramenter)
        if (resposn.status === 1) {
          this.DeliveryList = resposn.result
        } else {
          this.$notify.error({
            title: '错误',
            message: resposn.message,
            position: 'bottom-right'

          })
        }
      },
      async changeover (method) {
        this.currt = method
        this.user = {}
        var dataGet = {
          orderId: this.viewModel.order.id
        }
        if (this.currt === 'OrderAdminChangeAddress' || this.currt === 'OrderAdminDelivery' || this.currt === 'Api/Order/GetExpressInfo') {
          this.user.regionId = this.viewModel.order.orderExtension.userAddress.regionId
          this.user.address = this.viewModel.order.orderExtension.userAddress.address
          this.user.name = this.viewModel.order.orderExtension.userAddress.name
          this.user.mobile = this.viewModel.order.orderExtension.userAddress.mobile
        }
        if (this.currt === 'OrderAdminPay') {
          this.user.PaymentAmount = this.viewModel.paymentAmount
        }
        if (this.$api.localGet('Express') !== undefined) {
          this.ExpressName = this.$api.localGet('Express').ExpressName
          this.ExpressNo = this.$api.localGet('Express').ExpressNo
        }
        if (this.currt === 'UpdateExpressAmount') {
          var resposne = await this.$api.httpGet('Api/Order/GetExpressAmount?orderId=' + this.viewModel.order.id)
          this.freightData = resposne.result
        }
        if (this.currt === 'Api/Refund/Get') {
          var refundGet = await this.$api.httpGet('api/refund/get', dataGet)
          this.refundDetail = refundGet.result
        }
        this.user.ExpressName = this.ExpressName
        this.user.ExpressNo = this.ExpressNo
      },
      changeExpress (val) {
        var that = this
        this.express.forEach(ex => {
          if (val === ex.no) {
            that.ExpressName = ex.com
            var str = {
              ExpressName: ex.com,
              ExpressNo: ex.no
            }
            this.$api.localSet('Express', str)
            this.user.ExpressNo = ex.no
            this.user.ExpressName = ex.com
          }
        })
      },
      async getCollapse (val) {
        var para = {
          expressId: this.DeliveryList[val].id
        }
        var reposConter = await this.$api.httpGet('/api/order/GetExpressInfo', para)
        var valuePara = JSON.parse(reposConter.message)
        if (valuePara.error_code !== 0) {
          this.expressValue = valuePara.reason
          this.expressFoobl = false
        } else {
          this.expressList = valuePara.result
          this.expressFoobl = true
        }
      },
      change (val) {
        this.refund.amount = ''
        this.refund.address = ''
        this.refund.processMessage = ''
      },
      async deliveryList () {
        this.init()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./styles/from-item.scss";
  .el-textarea__inner {
    resize: auto;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>

