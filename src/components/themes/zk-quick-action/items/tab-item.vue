<template>
  <div class="tab-item">
    <div class="tab-item_li" v-for="(item,index) in widget" :key="index" :style="'background:'+item.backGroundColor+';'" @click="$router.push(item.url.value)">
      <div class="tab-item_li-icon">
        <x-icon :src="item.icon.name" :size="item.icon.size" :color="item.icon.iconSecondColor"></x-icon>
      </div>
      <div class="tab-item_li-text">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./styles.scss";
</style>
