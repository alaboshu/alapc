<template>
  <div class="admin-coupon-edit" v-if="async">
    <x-border :title="title">
      <el-form label-width="300px" class="coupon-edit_form" size="medium">
        <el-form-item label="优惠券名称">
          <el-input v-model="DName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="使用条件">
          <el-input v-model="UseElse" placeholder="请输入内容"></el-input>
          <div class="coupon_intro">消费满多少可用, 空或0 不限制(只能输入数量)</div>
        </el-form-item>
        <el-form-item label="使用时间限制">
          <div class="form-restrictions">
            <el-radio-group v-model="type">
              <div class="form-restrictions_li">
                <el-radio v-model="radio1" label="1" size="small">获得后</el-radio>
                <el-input v-model="TimeLimit" placeholder="请输入内容" class="restrictions_li-input"></el-input>
                <div class="tag_news">天内有效(空为不限时间使用)</div>
              </div>
              <div class="form-restrictions_li">
                <el-radio v-model="radio" label="5" size="small">在日期</el-radio>
                <el-date-picker size="small" value-format="yyyy-MM-dd HH:mm:ss" v-model="BetweenDay" type="datetimerange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" onPick="showData" @change="changData">
                </el-date-picker>
                <div class="tag_news">内有效</div>
              </div>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="优惠方式">
          <el-radio-group v-model="radios">
            <el-radio v-model="Reduce" label="3">立减</el-radio>
            <el-radio v-model="Discount" label="6">打折</el-radio>
          </el-radio-group>
          <div class="group_discount-input" v-if="radios==='3'">
            <div class="discount_tag">立减</div>
            <el-input v-model="ReduceValue" placeholder="请输入内容" size="medium" class="discount_tag-input"></el-input>
            <div class="discount_tag">元</div>
          </div>
          <div class="group_discount-input" v-if="radios==='6'">
            <div class="discount_tag">打</div>
            <el-input v-model="ReduceValue" placeholder="请输入内容" size="medium" class="discount_tag-input"></el-input>
            <div class="discount_tag">折</div>
          </div>
        </el-form-item>
        <el-form-item label="发放总数">
          <el-input v-model="TotalCount" placeholder="请输入内容"></el-input>
          <div class="coupon_intro">优惠券总数量，没有不能领取或发放,-1 为不限制张数</div>
        </el-form-item>
      </el-form>
      <div class="commit_btn">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </x-border>
  </div>
</template>

<script>
  import './var.scss'

  export default {
    data () {
      return {
        loading: false,
        widgetModel: {},
        title: '添加优惠券',
        radio: '',
        value2: '',
        radios: '',
        radio1: '',
        type: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        DName: '', // 优惠券名称
        UseElse: '', // 使用条件
        TimeLimit: '', // 有效期天数
        BetweenDay: [], // 时间内有效
        Reduce: 'Reduce', // 立减
        Discount: 'Discount', // 打折
        TotalCount: '', // 发放总数
        MoneyCount: '', // 折扣数量
        ReduceValue: '', // 立减多少元
        async: false
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
        var para = {
          id: this.$route.query.id
        }
        var res = await this.$api.httpGet('api/coupon/GetCouponView', para)
        if (res.status === 1) {
          if (res.result) {
            this.widgetModel = res.result
            this.DName = this.widgetModel.name
            this.UseElse = this.widgetModel.minOrderPrice

            if (this.widgetModel.type === 1) {
              this.radios = '3'
            } else if (this.widgetModel.type === 2) {
              this.radios = '6'
            }
            this.ReduceValue = this.widgetModel.value
            this.TotalCount = this.widgetModel.totalCount
            if (this.widgetModel.afterDays >= 0) {
              this.type = '1'
              this.TimeLimit = this.widgetModel.afterDays
            } else {
              this.type = '5'
              this.showData(this.widgetModel.startPeriodOfValidity, this.widgetModel.endPeriodOfValidity)
              this.BetweenDay[0] = this.widgetModel.startPeriodOfValidity
              this.BetweenDay[1] = this.widgetModel.endPeriodOfValidity
              this.changData()
            }
            console.info('时间', this.BetweenDay)
          }
        } else {
          this.$notify({
            message: res.message,
            position: 'bottom-right'
          })
        }
        this.async = true
      },
      showData () {
        console.info('2222222222222', event)
      },
      changData () {
        console.info(event)
      },
      async onSubmit () {
        this.loading = true
        if (this.radios === '3') {
          this.Reduce = 'Reduce'
        } else {
          this.Reduce = 'Discount'
        }
        if (this.type === '1') {
          var para = {
            id: this.$route.query.id,
            Name: this.DName,
            StoreId: 10004,
            MinOrderPrice: Number(this.UseElse),
            TotalCount: Number(this.TotalCount),
            Type: this.Reduce,
            AfterDays: Number(this.TimeLimit),
            Value: Number(this.ReduceValue),
            TimeLimit: 'Days'
          }
        } else if (this.type === '5') {
          para = {
            id: this.$route.query.id,
            Name: this.DName,
            StoreId: 10004,
            MinOrderPrice: Number(this.UseElse),
            TotalCount: Number(this.TotalCount),
            Type: this.Reduce,
            Value: Number(this.ReduceValue),
            TimeLimit: 'PeriodOfValidity',
            StartPeriodOfValidity: this.BetweenDay[0],
            EndPeriodOfValidity: this.BetweenDay[1]
          }
        }
        if (para) {
          var res = await this.$api.httpPost('api/coupon/saveCoupon', para)
          if (res.status === 1) {
            this.$notify({
              title: '成功',
              message: res.message,
              type: 'success',
              position: 'bottom-right'
            })
            this.init()
          } else {
            this.$notify({
              title: '失败',
              message: res.message,
              type: 'warning',
              position: 'bottom-right'
            })
          }
          this.loading = false
        } else {
          this.$notify({
            title: '失败',
            message: '请输入有效的优惠券内容',
            type: 'warning',
            position: 'bottom-right'
          })
        }
      }
    }
  }
</script>
