<template>
  <div>
    <el-checkbox-group v-model="checkList" @change="changeList">
      <el-checkbox v-for="(check,checkIndex) in model" :key="checkIndex" @change="checkClick" :label="check.key">{{check.value}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        checkList: [],
        viewModel: [],
        model: '',
        currentValue: []
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
        var response = await this.$api.httpGet(this.widget.dataSource)
        if (response.status === 1) {
          this.model = response.result
        }
        if (this.widget.value !== null) {
          this.checkList = this.widget.value
          if (this.widget.value === '') {
            this.checkList = []
          }
          // this.$emit('input', this.checkList)
        }
      },
      checkClick (index) {
        // this.$emit('input', this.checkList)
      },
      changeList (value) {
        this.$emit('input', this.checkList)
      }
    }
  }
</script>
