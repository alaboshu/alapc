<template>
  <div class="common-item">
    <div class="common-item_li" v-for="(item,index) in widget" :key="index">
      <div class="common-item_li-box" @click="$router.push(item.url.value)">
        <div class="common-item_icon" :style="'background:'+item.backGroundColor+';'">
          <x-icon :src="item.icon.name" :size="item.icon.size" :color="item.icon.iconSecondColor"></x-icon>
        </div>
        <div class="common-item_title">{{item.name}}</div>
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
