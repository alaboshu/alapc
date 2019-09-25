<template>
  <div class="recommend-item">
    <div class="recommend-item_li" v-for="(item,index) in widget" :key="index">
      <div class="recommend-item_li-box" :style="'background:'+item.backGroundColor+';'" @click="$router.push(item.url.value)">
        <div class="recommend-item_center">
          <div class="recommend-item_title">{{item.name}}</div>
          <div class="recommend-item_intro">{{item.intro}}</div>
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
