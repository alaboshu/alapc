<template>
  <x-border title="储值充值" type="primary">
    <div class="admin-stored-edit">
      <el-form label-width="250px">
        <el-form-item label="套餐">
          <div class="regulation_box">
            <ul>
              <li v-for="(item,index) in viewModel" :key="index" @click="relativeSelected(item,index)" :class="{'regulation_li':typeDataIndex==index}">
                <p class="p1">￥{{item.storeAmount}}</p>
                <p>{{item.intro}}</p>
                <div class="regulation_selected" :class="{'regulation_vistev':typeDataIndex==index}">已选择</div>
              </li>
            </ul>
          </div>
          <div class="stored-edit_intro">请选择套餐类型</div>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userName"></el-input>
          <div class="stored-edit_intro">请输入用户名</div>
        </el-form-item>
      </el-form>
      <div class="stored_footer">
        <div class="stored_btn" @click="save">充值</div>
      </div>
    </div>
  </x-border>
</template>
<script>
  export default {
    data () {
      return {
        typeDataIndex: 0,
        viewModel: '',
        paraValue: '',
        userName: ''
      }
    },
    props: {
      widgetData: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var respone = await this.$api.httpGet('/Api/RechargeAccountLog/GetRechargeConfigList', {})
        this.viewModel = respone.result
        this.paraValue = this.viewModel[this.typeDataIndex]
      },
      async relativeSelected (value, index) {
        this.typeDataIndex = index
        this.paraValue = this.viewModel[this.typeDataIndex]
      },
      async save () {
        this.paraValue.userName = this.userName
        this.$confirm('确认充值？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.onInterface()
          })
          .catch(action => {
          })
      },
      async onInterface () {
        var savePones = await this.$api.httpPost('/Api/RechargeAccountLog/Save', this.paraValue)
        if (savePones.status === 1) {
          this.$notify({
            title: '成功',
            message: '充值成功',
            type: 'success',
            position: 'bottom-right'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: savePones.message,
            position: 'bottom-right'
          })
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
