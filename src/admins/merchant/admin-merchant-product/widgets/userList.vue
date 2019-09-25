<template>
  <div>
    <ul class="edit-left-center">
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-order"></i>
          <span>订单编号</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{viewModel.serial}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-mall"></i>
          <span>店铺</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{viewModel.merchantStoreName}}</span>
        </div>
      </li>
      <li>
        <div class="edit-left-list-left">
          <i class="icon iconfont zk-history"></i>
          <span>下单时间</span>
        </div>
        <div class="edit-left-list-right">
          <span>{{viewModel.createTime}}</span>
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
  export default {
    props: {
      viewModel: {}
    }
  }
</script>
