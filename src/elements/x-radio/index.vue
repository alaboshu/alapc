<template>
  <div v-if="async" class="x-radio">
    <el-radio-group v-model="radioType" @change="changeRadio">
      <el-radio v-for="(item,index) in viewModel" :key="index" :label="item.key" class="radio_text">{{item.value}}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
  export default {
    model: {
      event: 'input',
      prop: 'radioValue'
    },
    props: {
      widget: {},
      type: {},
      obj: {},
      radioValue: {}
    },
    data () {
      return {
        async: false,
        radioType: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var response
        if (this.radioValue) {
          this.radioType = this.radioValue
        }
        if (this.widget !== undefined) {
          // 兼容widget传值
          response = await this.$api.httpGet(this.widget.dataSource, {}, this.widget.tenant)
          if (response.status !== 1) {
            this.$notify.error({
              title: '错误',
              message: response.message,
              position: 'bottom-right'
            })
            return
          }
          this.viewModel = response.result
          if (!this.$api.isEmpty(this.widget.value)) {
            this.radioType = this.widget.value
            this.$emit('input', this.radioType)
          }
        } else if (this.type !== undefined) {
          // 兼容Type传值
          var para = {
            type: this.type
          }
          response = await this.$api.httpGet('Api/Type/GetKeyValue', para)
          if (response.status === 1) {
            this.viewModel = response.result
          }
        }
        this.async = true
      },
      changeRadio (e) {
        this.$emit('input', e)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .x-radio {
    .el-radio {
      padding: 8px 0px;
    }
    .el-radio__label {
      font-size: 13px;
      color: #575962;
    }
  }
</style>
