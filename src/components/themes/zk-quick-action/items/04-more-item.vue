<template>
  <div class="more-item">
    <div class="more-item_li" :style="'width:'+100/8+'%;'" v-for="(item,index) in widget" :key="index">
      <div class="more-item_li-box" @click="$router.push(item.url.value)">
        <div class="more-item_icon" :style="'background:'+item.backGroundColor+';'">
          <x-icon :src="item.icon.name" :size="item.icon.size" :color="item.icon.iconSecondColor"></x-icon>
        </div>
        <div class="more-item_title">{{item.name}}</div>
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
