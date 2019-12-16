<template>
  <div v-if="async">
    <x-line :border="true" :title="data.name" :icon="data.icon"></x-line>
    <ul class="activity-edit">
      <li>
        <div class="activity-text">活动时间<span>*</span></div>
        <div class="activity-calendar">
          <el-date-picker v-model="activity.dataTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <div>选择开始与结束时间，活动会在时间段内自动开启、结束</div>
        </div>
      </li>
      <li>
        <div class="activity-text">最大库存<span>*</span></div>
        <div class="activity-calendar">
          <el-input v-model="viewModel.activityRules.buyerCount"></el-input>
          <div>0则表示不限制库存、活动的最大库存，当活动使用的库存量超过库存时，活动自动停止</div>
        </div>
      </li>
      <li>
        <div class="activity-text">添加商品<span>*</span></div>
        <div class="activity-calendar">
          <el-form>
            <x-data-select @selectProductData="selectProductData"></x-data-select>
          </el-form>
        </div>
      </li>
    </ul>
    <div class="activity-line">
      <zk-auto-form :serviceConfig="viewModel.autoForm" v-if="async" @saveForm="saveForm"></zk-auto-form>
    </div>
  </div>
</template>


<script>
  import service from './service'
  export default {
    props: ['data'],
    data () {
      return {
        async: false,
        viewModel: {
          activityRules: {
            buyerCount: 0
          }
        },
        activity: {
          dataTime: [],
          buyerCount: 0
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        let paramenter = {
          Key: this.data.key,
          productId: this.$crud.getId()
        }
        var response = await this.$api.httpGet('api/Activity/GetView', paramenter)
        if (response.status === 1) {
          this.viewModel = response.result
          this.activity.dataTime.push(this.viewModel.activity.createTime)
          this.activity.dataTime.push(this.viewModel.activity.endTime)
          this.async = true
        }
        console.info('表单结构', this.viewModel.autoForm)
      },
      async saveForm (model) {
        this.viewModel.activity.createTime = this.activity.dataTime[0]
        this.viewModel.activity.endTime = this.activity.dataTime[1]
        // 会员折扣价单独处理
        if (this.data.key === 'ZKCloud.App.Shop.Activitys.Modules.MemberDiscount.Model.MemberDiscountActivity') {
          model = service.memberDiscountActivity(model)
        }
        this.viewModel.activityRules = model
        var response = await this.$api.httpPost(' /Api/Activity/Save', this.viewModel)
        this.$crud.message(response)
      },

      // 商品选择
      selectProductData (row, column) { }
    }
  }
</script>




<style  lang="scss" scoped>
  @import "~./styles/edit.scss";
</style>

