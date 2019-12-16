<template>
  <div class="show_paramenter">
    <div class="title">
      24小时热销榜
    </div>
    <div class="show-product_list">
      <div class="item" v-for="(item,index) in listModel" :key="index" v-show="index<6">
        <router-link :to="'/product/show?id='+item.id" target="_blank" class="img-wrap">
          <img :src="item.thumbnailUrl" alt="">
        </router-link>
        <router-link :to="'/product/show?id='+item.id" target="_blank" class="content">
          <div class="content_title">{{item.name}}</div>
          <div class="price">￥{{item.displayPrice}}
            <!-- <span class="counterPrice">￥224</span> -->
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  // import ShowBar from './show_bar'
  export default {
    components: {
      // ShowBar
    },
    props: {
      widget: {}
    },
    data () {
      return {
        listModel: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var response = await this.$api.httpGet('/api/product/list')
        if (response.status === 1) {
          this.listModel = response.result.productItems
        }
      }
    }
  }
</script>
<style  lang="scss" scoped>
  @import "~_style_all/theme.scss";
  .show_paramenter {
    border: 1px solid #e5e5e5;
    .title {
      background: #f5f5f5;
      height: 42px;
      text-align: left;
      line-height: 42px;
      font-weight: 700;
      font-size: 14px;
      padding: 0px 10px;
      color: #666666;
    }
    .show-product_list {
      .item {
        margin-top: 24px;
        margin-left: 24px;
        margin-right: 24px;
        .img-wrap {
          width: 100%;
          height: 250px;
          display: block;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content {
          display: block;
          text-align: center;
          cursor: pointer;
          padding: 0 5px 18px;
          border-bottom: 1px solid #e5e5e5;
          .content_title {
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box !important;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            margin-bottom: 8px;
          }
          .price {
            font-size: 14px;
            line-height: 1;
            color: #d62525;
            text-align: center;
            .counterPrice {
              color: #666;
              text-decoration: line-through;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>

