<template>
  <div class="x-select">
    <el-select v-model="currentValue" placeholder="请选择">
      <el-option v-for="item in viewModel" :key="item.key" :label="item.value" :value="item.key">
      </el-option>
    </el-select>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: '',
        currentValue: this.value
      }
    },
    props: {
      type: {
      },
      value: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var para = {
          type: this.type
        }
        var respone = await this.$api.httpGet('/Api/Type/GetKeyValue', para)
        if (respone.status !== 1) {
          this.$notify.error({
            title: '错误',
            message: respone.message,
            position: 'bottom-right'
          })
          return
        }
        this.viewModel = respone.result
      }
    },
    watch: {
      currentValue (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
