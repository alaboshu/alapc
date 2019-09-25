<template>
  <div class="x-form-select">
    <el-select v-model="selectValue" :disabled="widget.options.disabled" :multiple="widget.options.multiple" :clearable="widget.options.clearable" :placeholder="widget.options.placeholder" :style="{width: widget.options.width}">
      <el-option v-for="(item, index) in viewModel" :key="index" :value="item.key" :label="item.value"></el-option>
    </el-select>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        selectValue: '',
        viewModel: []
      }
    },
    props: {
      widget: {},
      dataModel: {}
    },
    model: {
      event: 'selectValue',
      prop: 'dataModel'
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var para = {
          loginUserId: this.$user.id()
        }
        var response = await this.$api.httpGet(this.widget.dataSource, para)
        this.viewModel = response.result
        if (this.dataModel !== '' && this.dataModel !== undefined && this.dataModel !== null) {
          this.selectValue = this.dataModel
          if (this.dataModel === '00000000-0000-0000-0000-000000000000' || this.dataModel === '000000000000000000000000') {
            if (this.viewModel.length > 0) {
              this.selectValue = this.viewModel[0].key
            }
          }
        }
      },
      change (val) {
        this.$emit('selectValue', val)
      }
    },
    watch: {
      selectValue: 'change'
    }
  }
</script>
