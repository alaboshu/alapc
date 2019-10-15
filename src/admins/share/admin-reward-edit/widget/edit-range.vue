<template>
  <div>
    <x-line :border="true" title="价格限制，订单金额相关限制" type="metal" icon="flaticon-infinity" style="padding:0px 15px;">
      <el-form-item label="价格限制方式">
        <x-radio v-model="viewModel.range.priceLimitType" type="PriceLimitType"></x-radio>
        <div class="demo_intro">订单总价：按商品的订单总金额限制。商品单价限制：按当个商品的价格显示</div>
        <div class="demo_intro">比如一个订单可能有3件商品，价格分别为100,200,300.如果价格限制范围为150-250，则只有价格为200的商品产生分润</div>
      </el-form-item>
      <el-form-item label="最小触发金额">
        <el-input-number v-model="viewModel.range.minimumAmount" :precision="2" :min="0" :step="1"></el-input-number>
        <div class="demo_intro">分润的最小触发金额，当用户下单金额小于最小触发金额时不会触发分润</div>
      </el-form-item>
      <el-form-item label="最大触发金额" :required="true">
        <el-input-number v-model="viewModel.range.maxAmount" :precision="2" :min="0" :step="1"></el-input-number>
        <div class="demo_intro">分润的最大触发金额，当用户下单金额大于最小触发金额时不会触发分润（等于时触发),0表示不限制</div>
      </el-form-item>
      <el-form-item label="分润触发类型" :required="true">
        <x-radio v-model="viewModel.range.triggerType" type="TriggerType"></x-radio>
        <div class="demo_intro">用户或用户类型升级：用户或用户类型升级:比如会员注册、会员升级，省代理加盟、门店开通等。商城购物订单：指商城系统下单</div>
      </el-form-item>
    </x-line>
    <x-line :border="true" v-if="viewModel.range.triggerType === 2" title="商品范围" type="metal" icon="flaticon-rocket" style="padding:0px 15px;">
      <el-form-item label="分润价格类型">
        <x-radio v-model="viewModel.range.productRule.amountType" type="PriceType"></x-radio>
        <div class="demo_intro">分润所依赖的数据来源，不同的价格在不同的地方设置。商品价格、分润价格在商品编辑处设置</div>
        <div class="demo_intro">1. 虚拟资产服务费:订单使用虚拟资产支付时，产生的现金服务费。服务费比例在货币类型处设置.如某订单使用100积分进行购买，服务费比例是0.1,则服务费为100*0.1=10元</div>
      </el-form-item>
      <el-form-item label="商品依赖范围">
        <x-radio v-model="viewModel.range.productRule.productModel" type="ProductModelType"></x-radio>
        <div class="demo_intro">选择商品的限制范围</div>
      </el-form-item>
      <el-form-item label="所属产品线" v-if="viewModel.range.productRule.productModel==1">
        <x-checkbox v-model="viewModel.range.productRule.productLines" :widget="checkValue">
        </x-checkbox>
        <div class="demo_intro">可选择多条产品线，<router-link to="" class="demo_text-a">产品线管理</router-link>
          <router-link to="" class="demo_text-a">新增产品线</router-link>
        </div>
      </el-form-item>
      <el-form-item label="所属商城" v-if="viewModel.range.productRule.productModel==2">
        <x-radio v-model="viewModel.range.productRule.priceStyleId" type="PriceStyleConfig"></x-radio>
        <div class="demo_intro">商品所属的商城，比如“现金商城”、“积分商城”、“现金+授信商城”，不同的商城会员购买方式不同。<span style="color:#766ECD;">商城模式配置</span></div>
      </el-form-item>
    </x-line>
  </div>
</template>
<script>
  // import editRangeUser from './edit-range-user'
  export default {
    components: {
      // editRangeUser
    },
    props: {
      viewModel: {}
    },
    data () {
      return {
        checkValue: {
          dataSource: 'api/productline/getkeyvalue'
        }
      }
    }
  }
</script>
