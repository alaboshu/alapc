<template>
  <div class="display-edit">
    <el-form ref="form" label-width="250px" size="mini">
      <el-form-item label="类目名称">
        <el-input v-model="productView.name" maxlength="30" @keydown.native="restrictedNum" placeholder="请输入类目名称"></el-input>
        <div class="sale-intro">请输入类目名称</div>
      </el-form-item>
      <el-form-item label="是否为顶级类目">
        <el-switch v-model="productView.isPartent"></el-switch>
        <div class="sale-intro">是否为顶级类目</div>
      </el-form-item>
      <el-form-item label="上级类目" v-if="!topcategory&&false">
        <el-select v-model="productView.partentId" placeholder="请选择上级类目">
          <el-option label="区域一" value="00000000-0000-0000-0000-000000000000"></el-option>
          <el-option label="区域二" value="00000000-0000-0000-0000-000000000001"></el-option>
        </el-select>
        <div class="sale-intro">请输入上级类目</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: {
      productView: {}
    },
    data () {
      return {
        topcategory: false,
        typecategory: ''
      }
    },
    methods: {
      restrictedNum (ev) {
        if (ev.target.value.length > 30) {
          this.$alert('最多输入三十个字符').then(() => { }).catch(() => { })
          this.productView.name = ''
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>

