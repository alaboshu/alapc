<template>
  <div class="single-data-2">
    <ul class="sinle-data-2-list">
      <li class="sinle-data-2-list-cont" v-for="(item, index) in viewModel" :key="index">
        <div class="single-border-2">
          <p class="title">交易量</p>
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
            value: '1000'
          },
          {
            name: '已发货',
            value: '920'
          },
          {
            name: '已完成',
            value: '300'
          }
        ]
      }
    }
  }
</script>



<style lang="scss" scoped>
  .single-data-2 {
    .sinle-data-2-list {
      display: flex;
      flex-wrap: wrap;
      .sinle-data-2-list-cont {
        width: 150px;
        height: 60px;
        margin: 5px;
        box-sizing: border-box;
        .title {
          width: 100%;
          height: 30px;
          pointer-events: auto;
          color: rgba(255, 255, 255, 0.8);
          font-weight: normal;
          font-family: "Microsoft Yahei", Arial, sans-serif;
          font-size: 18px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-align: center;
        }
        .dataNum {
          width: 100%;
          text-align: center;
          height: 30px;
          line-height: 30px;
          color: rgb(83, 226, 232);
          font-size: 36px;
          font-weight: normal;
          letter-spacing: 0.02em;
          border-radius: 6px;
          font-weight: bolder;
          font-family: Georgia;
        }
        .single-border-2 {
          padding: 5px;
        }
      }
    }
  }
</style>
