<template>
  <div class="guide-item">
    <div class="guide-item_li" v-for="(item,index) in widget" :key="index">
      <div class="guide-item_li-left" :style="'background:'+item.backGroundColor+';'">
        <x-icon :src="item.icon.name" :size="item.icon.size" :color="item.icon.iconSecondColor"></x-icon>
      </div>
      <div class="guide-item_name">{{item.name}}</div>
      <div class="guide-item_intro">{{item.intro}}</div>
      <div class="guide-item_buttom" @click="$router.push(item.url.value)">去看看</div>
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
