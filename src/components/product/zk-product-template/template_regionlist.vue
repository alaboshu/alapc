<template>
  <div>
    <el-row :gutter="30" align="left" style="width=200px">
      <el-col :span="100" v-for="(region,index) in regions" :key="index">
        <el-popover placement="right" trigger="hover" width="80" :disabled="!hasChildren(region)">
          <!-- <tempRegionList :regions="region.children"></tempRegionList> -->
          <el-checkbox v-model="region.checked" slot="reference">{{region.name + (hasChildren(region)?'>':'')}}</el-checkbox>
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: {
      regions: undefined,
      fee: {}
    },
    methods: {
      hasChildren (region) {
        return region.children !== undefined && region.children !== null && region.children.length !== 0
      }
    }
  }
</script>
