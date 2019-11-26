<template>
  <div class="sinle-item-3">
    <ul class="sinle-data-3-list">
      <li class="sinle-data-3-list-cont" v-for="(item, index) in viewModel" :key="index">
        <div class="left">
          <i class="el-icon-orange"></i>
        </div>
        <div class="right">
          <div class="title">{{item.name}}</div>
          <x-count-up class="dataNum" v-model="item.value"></x-count-up>
        </div>
      </li>
    </ul>
  </div>
</template>



<script>
  export default {
    data () {
      return {
        viewModel: [
          {
            name: '交易量',
            value: '51234789'
          },
          {
            name: '已发货',
            value: '456123'
          },
          {
            name: '已完成',
            value: '54123'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sinle-item-3 {
    .sinle-data-3-list {
      display: flex;
      flex-wrap: wrap;
      .sinle-data-3-list-cont {
        min-width: 100px;
        height: 60px;
        margin: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .left {
          width: 50px;
          height: 50px;
          position: relative;
          i {
            color: #3d434b;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 50px;
          }
        }
        .right {
          height: 60px;
          .title {
            color: rgba(146, 188, 251, 0.7);
            font-weight: normal;
            font-family: "Microsoft Yahei", Arial, sans-serif;
            font-size: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            line-height: normal;
          }
          .dataNum {
            width: 100%;
            text-align: center;
            height: 30px;
            line-height: 30px;
            color: rgb(253, 60, 100);
            font-size: 30px;
            font-weight: normal;
            letter-spacing: 0.02em;
            border-radius: 6px;
          }
        }
      }
    }
  }
</style>
