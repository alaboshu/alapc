<template>
  <div class="omit-item">
    <div class="omit-item_list" :style="'width:'+100/3+'%;'" v-for="(item,index) in viewModel" :key="index">
      <div class="omit-item_list-box">
        <div class="omit-item_left">
          <div class="omit-item_title">{{item.name}}</div>
          <div class="omit-item_intro">{{item.intro}}</div>
        </div>
        <div class="omit-item_right" :style="'color:' +item.bgcolor +';'">
          <x-count-up v-model="item.value" class="omit-item_right" :style="'color:' +item.bgcolor +';'"></x-count-up>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        widgetModel: ''
      }
    },
    props: {
      viewModel: {},
      count: {
        default: 3
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          if (this.viewModel) {
            this.viewModel.forEach((element, index) => {
              console.info('循环', index, element.value)
              this.$set(this.viewModel[index], 'value', 100)
            })
          }
          console.info('外面修改了值', this.viewModel)
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .omit-item {
    background: #ffffff;
    display: flex;
    flex-wrap: wrap;
    .omit-item_list {
      border-right: 1px solid #f0f0f0;
      padding: 0px 30px;
      .omit-item_list-box {
        display: flex;
        align-items: center;
        border-bottom: 1px dashed #f0f0f0;
        padding: 15px 0px;
        .omit-item_left {
          flex: 1;
          min-width: 0;
          .omit-item_title {
            font-size: 16px;
            color: #333333;
            font-weight: 500;
          }
          .omit-item_intro {
            font-size: 12px;
            color: #9699a2;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .omit-item_right {
          font-size: 1.5rem;
          font-weight: 600;
        }
      }
    }
  }
</style>
