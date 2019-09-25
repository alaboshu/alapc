<template>
  <div class="rank-item">
    <div class="rank-item_li" v-for="(item,index) in widget" :key="index">
      <div class="rank-item_li-box" @click="$router.push(item.url.value)">
        <div class="rank-item_li-left" :style="'background:'+item.backGroundColor+';'">
          <x-icon :src="item.icon.name" :size="item.icon.size" :color="item.icon.iconSecondColor"></x-icon>
        </div>
        <div class="rank-item_li-right">
          <div class="rank-item_name">{{item.name}}</div>
          <div class="rank-item_intro">{{item.intro}}</div>
        </div>
      </div>
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
