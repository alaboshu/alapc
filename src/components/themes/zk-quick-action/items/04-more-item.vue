<template>
  <div class="more-item">
    <div class="more-item_li" :style="'width:'+100/8+'%;'" v-for="(item,index) in widget" :key="index">
      <div class="more-item_li-box" @click="$router.push(item.link.url)">
        <div class="more-item_icon" :style="'background:'+item.bgColor+';'">
          <x-icon :icon="item.icon" :size="25"></x-icon>
        </div>
        <div class="more-item_title">{{item.link.name}}</div>
      </div>
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
  .more-item {
    padding: 5px;
    .more-item_li {
      display: inline-block;
      margin: 7px;
      width: 80px !important;
      padding: 10px;
      background-color: #f7f8fa;
      .more-item_li-box {
        cursor: pointer;

        .more-item_icon {
          width: 50px;
          height: 50px;
          border-radius: 3px;
          text-align: center;
          line-height: 50px;
          margin: 0 auto;
          color: #fff;
        }

        .more-item_title {
          font-size: 12px;
          margin-top: 8px;
          color: #909399;
          text-align: center;
        }
      }
    }
  }
</style>
