<template>
  <div class="zk-address-edit">
    <!-- 就是不够聪明啊 -->
    <el-form status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item required label="收货人">
        <el-input v-model="addressInput.name" placeholder="请输入内容" size="mini"></el-input>
        <div class="tips">请输入收货人姓名</div>
      </el-form-item>
      <el-form-item required label="手机号">
        <el-input v-model="addressInput.mobile" type="number" :minlength="11" placeholder="请输入内容" size="mini"></el-input>
        <div class="tips">请输入你的手机号码，方便派单联系</div>
      </el-form-item>
      <el-form-item required label="地址信息">
        <x-city-picker v-model="addressInput.regionId" @changePicker="changePicker"></x-city-picker>
        <div class="tips">请选择你的收货地址</div>
      </el-form-item>
      <el-form-item required label="详细地址">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addressInput.address">
          <div class="tips">请输入详细地址</div>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="addressInput.isDefault">设置为默认地址</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="save()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: '',
        async: false,
        cityPicker: '',
        textarea: 'textarea',
        input: 'input',
        checked: false,
        addressInput: {
          name: '',
          mobile: '',
          address: '',
          isDefault: false,
          userId: this.$user.loginUser().id,
          regionId: '',
          type: 1
        }

      }
    },
    props: {
      widget: {},
      addressItem: {},
      // actionType 类型为add 则为添加，为edit则编辑，默认为添加
      actionType: {
        default: 'add'
      }
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        if (this.actionType === 'edit') {
          if (this.addressItem) {
            this.addressInput = this.addressItem
            // this.addressInput.name = this.addressItem.name
          }
        }
        this.widgetModel = await this.$api.themeWidget(this.widget)
        this.async = true
      },
      changePicker () {
      },
      async save () {
        if (this.$route.query.id !== undefined) {
          this.addressInput.id = this.$route.query.id
        }
        this.addressInput.userId = this.$user.loginUser().id
        var response = await this.$api.httpPost('/Api/UserAddress/SaveOrderAddress', this.addressInput)
        if (response.status === 1 && this.$route.query.id !== undefined) {
          this.$message.success('编辑成功')
        } else if (response.status === 1) {
          this.$message.success('添加成功')
          this.$emit('addressAdd')
        } else {
          this.$message.warning(response.message)
        }
      }
    }
  }
</script>



<style lang="scss">
  @import "./var.scss";
</style>
