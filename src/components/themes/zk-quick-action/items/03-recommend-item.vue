<template>
  <div class="recommend-item">
    <div class="recommend-item_li" v-for="(item,index) in widget" :key="index">
      <div class="recommend-item_li-box" :style="'background:'+item.bgColor+';'" @click="$router.push(item.link.url)">
        <div class="recommend-item_center">
          <div class="recommend-item_title">{{item.link.name}}</div>
          <div class="recommend-item_intro">{{item.prompt}}</div>
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
  .recommend-item {
    padding: 10px;
    .recommend-item_li {
      width: 25%;
      display: inline-block;
      vertical-align: text-top;
      padding: 5px;

      .recommend-item_li-box {
        width: 100%;
        height: 130px;
        border-radius: 3px;
        position: relative;
        cursor: pointer;

        .recommend-item_center {
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding: 10px;

          .recommend-item_title {
            width: 100%;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
            font-weight: 600;
            font-family: "PingFang SC";
          }

          .recommend-item_intro {
            width: 100%;
            font-size: 12px;
            color: #ffffff;
            margin-top: 15px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
