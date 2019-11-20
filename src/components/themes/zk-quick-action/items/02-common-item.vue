<template>
  <div class="common-item">
    <div class="common-item_li" v-for="(item,index) in widget" :key="index">
      <div class="common-item_li-box" @click="$router.push(item.link.url)">
        <div class="common-item_icon" :style="'background:'+item.bgColor+';'">
          <x-icon :icon="item.icon" :size="25"></x-icon>
        </div>
        <div class="common-item-right">
          <div class="common-item_title">{{item.link.name}}</div>
          <div class="common-item-intro">{{item.prompt}}</div>
        </div>
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
  .common-item {
    padding: 20px;
    padding-top: 5px;
    .common-item_li {
      display: inline-block;
      width: 230px;
      padding: 15px;
      margin: 5px;
      background-color: #f7f8fa;

      .common-item_li-box {
        display: flex;
        align-items: center;
        cursor: pointer;

        .common-item_icon {
          width: 50px;
          height: 50px;
          border-radius: 3px;
          text-align: center;
          line-height: 50px;
          color: #fff;
        }
        .common-item-right {
          margin-left: 10px;
          height: 50px;
          border-radius: 3px;
        }
        .common-item_title {
          height: 25px;
          font-size: 16px;
          color: #575962;
        }
        .common-item-intro {
          height: 25px;
          line-height: 25px;
          font-size: 12px;
          color: #c0c4cc;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
