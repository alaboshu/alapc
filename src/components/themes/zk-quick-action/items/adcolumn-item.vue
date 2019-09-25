<template>
  <div class="adcolumn-item">
    <div class="adcolumn-item_li" :style="'width:calc('+100/2+'% - 5px);'+'background:'+item.backGroundColor+';'" v-for="(item,index) in widget" :key="index">
      <div class="adcolumn-item_title">{{item.name}}</div>
      <div class="adcolumn-item_intro">{{item.intro}}</div>
      <div class="adcolumn-item_buttom">
        <div class="left-but">
          <div class="left-but_promptly" @click="$router.push(item.url.value)">立即进入</div>
        </div>
        <div class="right-icon">
          <x-icon :src="item.icon.name" :size="36" :color="item.icon.iconSecondColor"></x-icon>
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
