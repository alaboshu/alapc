<template>
  <div class="exchange-item">
    <div class="exchange-item_li" :style="'width:'+100/count+'%;'" v-for="(item,index) in widget" :key="index">
      <div class="exchange-item_li-box" @click="$router.push(item.url.value)">
        <div class="exchange-item_icon" :style="'background:'+item.backGroundColor+';'">
          <x-icon :src="item.icon.name" :size="item.icon.size" :color="item.icon.iconSecondColor"></x-icon>
        </div>
        <div class="exchange-item_right">
          <div class="exchange-item_title">{{item.name}}</div>
          <div class="exchange-item_intro">{{item.intro}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      widget: {},
      count: {
        default: 5
      }
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
