<template>
  <div class="admin-coupon-send">
    <x-border :title="title">
      <el-form label-width="300px" class="coupon-edit_form" size="medium">
        <el-form-item label="选择优惠券">
          <el-select v-model="value" placeholder="请选择" @change="getDiIds">
            <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择会员">
          <div class="coupon_intro-text">按用户发送</div>
          <el-input type="textarea" :rows="6" placeholder="请使用半角逗号隔开，如：aaa,bbb" v-model="textarea">
          </el-input>
          <div class="coupon_intro">订单生成后以模板消息的方式商家通知，可以制定多个人，如果不填写则不通知</div>
        </el-form-item>
      </el-form>
      <div class="commit_btn">
        <el-button type="primary" :loading="loading" @click="onSubmit">提交</el-button>
      </div>
    </x-border>
  </div>
</template>

<script>
  import './var.scss'
  import './styles'
  export default {
    name: 'admin-coupon-send',
    data () {
      return {
        loading: false,
        widgetModel: {},
        title: '发放优惠券',
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        value: '',
        id: '',
        textarea: ''
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
        var res = await this.$api.httpGet('/Api/coupon/GetCouponListForDr')
        if (res.status === 1) {
          this.options = res.result
        }
      },
      getDiIds (val) {
        this.id = val
      },
      async onSubmit () {
        this.loading = true
        var para = {
          couponId: this.id,
          usersStr: this.textarea
        }
        var res = await this.$api.httpGet('/Api/UserCoupon/SendCoupon', para)
        if (res.status === 1) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success',
            position: 'bottom-right'
          })
        } else {
          this.$notify({
            title: '警告',
            message: res.message,
            type: 'warning',
            position: 'bottom-right'
          })
        }
        this.loading = false
      }
    }
  }
</script>
