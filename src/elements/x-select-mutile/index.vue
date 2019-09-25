<template>
  <div class="x-select-mutile">
    <el-select v-model="selectOption" multiple placeholder="请选择">
      <el-option v-for="item in check" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
  export default {
    props: {
      widget: {}
    },
    data () {
      return {
        selectOption: this.widget,
        check: [
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
          }
        ]
      }
    },
    watch: {
      widget (val) {
        this.selectOption = val
      },
      selectOption: {
        handler (val) {
          this.$emit('update:widget', val)
        },
        deep: true
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .x-select-mutile {
    .el-input__suffix-inner {
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }
</style>
