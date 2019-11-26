<template>
  <div class="single-data-1">
    <ul class="sinle-data-1-list">
      <li class="sinle-data-1-list-cont" v-for="(item, index) in viewModel" :key="index">
        <v-border-8 :docHeight="70" :docWidth="150">
          <div class="single-border-1">
            <p class="title">交易量</p>
            <x-count-up class="dataNum" v-model="item.value"></x-count-up>
          </div>
        </v-border-8>

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
  .single-data-1 {
    .sinle-data-1-list {
      display: flex;
      flex-wrap: wrap;
      .sinle-data-1-list-cont {
        width: 150px;
        height: 70px;
        margin: 5px;
        box-sizing: border-box;
        background: #02122c;
        .title {
          color: rgba(255, 255, 255, 0.6);
          font-family: "Microsoft Yahei, Arial, sans-serif";
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          height: 20px;
          line-height: 20px;
        }
        .dataNum {
          height: 40px;
          line-height: 40px;
          color: rgb(98, 165, 244);
          display: inline-block;
          letter-spacing: 0.02em;
          text-indent: 0.02em;
          font-size: 36px;
          font-weight: normal;
          letter-spacing: 0.02em;
          margin-right: 0em;
          border-radius: 6px;
        }
        .single-border-1 {
          padding: 5px;
        }
      }
    }
  }
</style>
