<template>
  <x-border title="活动设置" type="focus">
    <div class="product-activity">
      <el-tabs tab-position="left" v-model="activeName">
        <el-tab-pane v-for="(item, index) in editList" :key="index" :label="item.name" :name="item.num">
          <span slot="label"><i class="el-icon-date" :class="item.icon"></i> {{item.name}}</span>
          <edit v-if="item.num === activeName" :data="item"></edit>
        </el-tab-pane>
      </el-tabs>
    </div>
  </x-border>
</template>

<script>
  import activity from './json/activity.json'
  import edit from './edit'
  export default {
    data () {
      return {
        editList: activity,
        activeName: 'first'
      }
    },
    components: {
      edit
    }
  }
</script>


<style  lang="scss" scoped>
  @import "~./styles/product.scss";
</style>
