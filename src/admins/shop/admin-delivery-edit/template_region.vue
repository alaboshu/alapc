<template>
  <div class="template_region">
    <div class="region-head">
      <el-checkbox :checked="selectAll" @change="change">全选/全不选</el-checkbox>
      <el-row :gutter="30" align="left">
        <el-col :span="4" v-for="(region,index) in regions" :key="index">
          <tempRegionBtn :region="region" ref="regionbtn"></tempRegionBtn>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import tempRegionBtn from './template_regionbtn'
  export default {
    data () {
      return {
        selectAll: false
      }
    },
    props: {
      regions: undefined
    },
    components: {
      tempRegionBtn
    },
    methods: {
      change () {
        this.selectAll = !this.selectAll
        this.regions.forEach(region => {
          this.setChecked(region, this.selectAll)
        })
      },
      setChecked (r, value) {
        r.checked = value
        if (r.children !== undefined) {
          r.children.forEach(c => {
            this.setChecked(c, value)
          })
        }
      },
      async save () {
        this.$emit('regiinBut', false)
      }
    }
  }
</script>
<style lang="scss">
  .template_region {
    .region-head {
      padding: 10px 25px;
    }
  }
</style>

