<template>
  <div class="x-radio-group">
    <el-radio-group v-model="radioType">
      <el-radio v-for="(item,index) in viewModel" :key="index" :label="item.key">{{item.value}}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
  export default {
    props: {
      widget: {},
      type: {}
    },
    data () {
      return {
        radioType: this.widget,
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var para = {
          type: this.type
        }
        var repones = await this.$api.httpGet('/api/type/GetKeyValue', para)
        if (repones.status === 1) {
          this.viewModel = repones.result
        }
      }
    },
    watch: {
      radioType: {
        deep: true,
        handler (val) {
          this.$emit('update:widget', val)
        }
      }
    }
  }
</script>

