<template>
  <div class="tab-item">
    <div class="tab-item_li" v-for="(item,index) in widget" :key="index" :style="'background:'+item.bgColor+';'" @click="$router.push(item.url.value)">
      <div class="tab-item_li-icon">
        <x-icon :icon="item.icon" :size="25" :color="item.icon.iconSecondColor"></x-icon>
      </div>
      <div class="tab-item_li-text">{{item.link.name}}</div>
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
        console.info('widget', this.widget)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./styles.scss";
</style>
