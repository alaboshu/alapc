<template>
  <div class="single-item-4">
    <ul class="sinle-data-4-list">
      <li class="sinle-data-4-list-cont" v-for="(item, index) in viewModel" :key="index">
        <div class="single-border-5">
          <v-decoration :widget="widget">
            <x-count-up class="dataNum" v-model="item.value"></x-count-up>
          </v-decoration>
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
        ],
        widget: {
          value: {
            decorationType: 9
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .single-item-4 {
    .sinle-data-4-list {
      display: flex;
      flex-wrap: wrap;
      .sinle-data-4-list-cont {
        width: 150px;
        height: 150px;
        margin: 0 20px;
        .dataNum {
          margin: 48px 40px;
          width: 100px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 30px;
          color: #53e2e8;
          font-weight: bolder;
        }
      }
    }
  }
</style>
