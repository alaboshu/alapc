<template>
  <div>
    <ul class="edit-left-center">
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-wodes"></i>
          <span>姓名地址</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{detail.userAddress.name}}</span>
          <i class="icon iconfont zk-wodes"></i>
          <span>{{detail.userAddress.mobile}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-address"></i>
          <span>地址</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{viewModel.order.orderExtension.userAddress.addressDescription}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-Leavingmessage"></i>
          <span>买家留言</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{viewModel.order.orderExtension.message.buyerMessage}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-editor"></i>
          <span>平台留言</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{viewModel.order.orderExtension.message.platplatformMessage}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-name"></i>
          <span>平台备注</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{viewModel.order.orderExtension.orderRemark.platplatformRemark}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-order"></i>
          <span>订单编号</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{viewModel.order.serial}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-mall"></i>
          <span>店铺</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{detail.store.name}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-history"></i>
          <span>下单时间</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{detail.userAddress.createTime}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-presell"></i>
          <span>支付时间</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{viewModel.payTime}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-qunfengmaidanfenr"></i>
          <span>支付方式</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{viewModel.paymentType}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import list from './edit.json'
  export default {
    data () {
      return {
        list: list.list,
        detail: this.viewModel.order.orderExtension
      }
    },
    props: {
      viewModel: {}
    }
  }
</script>
