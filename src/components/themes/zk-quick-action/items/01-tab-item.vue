<template>
  <div class="tab-item">
    <div class="tab-item_li" v-for="(item,index) in widget" :key="index" :style="'background:'+item.bgColor+';'" @click="$router.push(item.link.url)">
      <div class="tab-item_li-icon">
        <x-icon :icon="item.icon" :size="32" :color="item.icon.iconSecondColor"></x-icon>
      </div>
      <div class="tab-item_li-text">{{item.link.name}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      widget: {}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .tab-item {
    padding: 8px;

    .tab-item_li {
      width: 75px;
      height: 75px;
      background-color: olivedrab;
      display: inline-block;
      margin: 5px;
      cursor: pointer;

      .tab-item_li-icon {
        text-align: center;
        width: 100%;
        height: 45px;
        color: #fff;
        font-size: 20px;
        line-height: 40px;
        margin-top: 5px;
      }

      .tab-item_li-text {
        text-align: center;
        color: #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
