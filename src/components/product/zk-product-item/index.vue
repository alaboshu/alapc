<template>
  <div class="zk-product-item">
    <div class="pc-x-product-item">
      <div>
        <img src="http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/8/images/2017/08/07/15020994388179.png" />
      </div>
      <div class="productclass-item_right">
        <ul>
          <li class="item_right-li" v-for="(item,index) in dataModel.productItems" :key="index">
            <router-link :to="'/product/show?id='+item.id" target="_blank">
              <div class="item_right-box">
                <img class="item_right-img" :src="item.thumbnailUrl" />
              </div>
              <div class="item_right-conter">
                <p class="item_right-p1">{{item.name}}</p>
                <p class="item_right-p2">
                  <span class="item_right-conter_span" v-if="userId !== 0">￥{{item.price}}</span>
                  <span class="item_right-conter_span span" v-else>升级后查看价格</span>
                  <router-link class="item_right-conter_a" :to="'/product/show?id='+item.id" style="display:none">
                    <x-icon :pdisplay="pdisplay" src="zk-cart" size="16"></x-icon>
                  </router-link>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <div>zk-product-item</div> -->
</template>

<script>
  import { PRODUCT_LIST_GET } from '@/service/core/apiUrl'
  export default {

    data () {
      return {
        ready: false,
        widgetModel: '',
        dataModel: '',
        isCut: false,
        pdisplay: '',
        productList: {
          SortOrder: '', // 商品排序方式
          Keyword: '', // 搜索关键字
          MinPrice: '', // 最低价格
          MaxPrice: '', // 最高价格
          ClassIds: '', // 商品分类Id
          TagIds: '', // 商品标签ID
          ProductIds: '', // 商品Id
          BrandId: '', // 商品品牌Id
          PriceStyleId: '', //  商品模式
          OrderType: '', // 排序方式
          ClasssId: ''
        },
        userId: ''
      }
    },
    props: {
      widget: {}
    },
    created () {
      // if (this.$route.query.Keyword !== undefined) {
      //   this.productList.Keyword = this.$route.query.Keyword
      // }
      // if (this.$route.query.SortOrder !== undefined) {
      //   this.productList.SortOrder = this.$route.query.SortOrder
      // }
      // if (this.$route.query.MinPrice !== undefined) {
      //   this.productList.MinPrice = this.$route.query.MinPrice
      // }
      // if (this.$route.query.MaxPrice !== undefined) {
      //   this.productList.MaxPrice = this.$route.query.MaxPrice
      // }
      // if (this.$route.query.ClassIds !== undefined) {
      //   this.productList.ClassIds = this.$route.query.ClassIds
      // }
      // if (this.$route.query.TagIds !== undefined) {
      //   this.productList.TagIds = this.$route.query.TagIds
      // }
      // if (this.$route.query.ProductIds !== undefined) {
      //   this.productList.ProductIds = this.$route.query.ProductIds
      // }
      // if (this.$route.query.BrandId !== undefined) {
      //   this.productList.BrandId = this.$route.query.BrandId
      // }
      // if (this.$route.query.PriceStyleId !== undefined) {
      //   this.productList.PriceStyleId = this.$route.query.PriceStyleId
      // }
      // if (this.$route.query.OrderType !== undefined) {
      //   this.productList.OrderType = this.$route.query.OrderType
      // }
      // if (this.$route.query.ClasssId !== undefined) {
      //   this.productList.ClasssId = this.$route.query.ClasssId
      // }
    },
    async onShow () {
      this.init()
    },
    beforeMount () {
      if (this.$route.query.Keyword !== undefined) {
        this.productList.Keyword = this.$route.query.Keyword
      }
      if (this.$route.query.SortOrder !== undefined) {
        this.productList.SortOrder = this.$route.query.SortOrder
      }
      if (this.$route.query.MinPrice !== undefined) {
        this.productList.MinPrice = this.$route.query.MinPrice
      }
      if (this.$route.query.MaxPrice !== undefined) {
        this.productList.MaxPrice = this.$route.query.MaxPrice
      }
      if (this.$route.query.ClassIds !== undefined) {
        this.productList.ClassIds = this.$route.query.ClassIds
      }
      if (this.$route.query.TagIds !== undefined) {
        this.productList.TagIds = this.$route.query.TagIds
      }
      if (this.$route.query.ProductIds !== undefined) {
        this.productList.ProductIds = this.$route.query.ProductIds
      }
      if (this.$route.query.BrandId !== undefined) {
        this.productList.BrandId = this.$route.query.BrandId
      }
      if (this.$route.query.PriceStyleId !== undefined) {
        this.productList.PriceStyleId = this.$route.query.PriceStyleId
      }
      if (this.$route.query.OrderType !== undefined) {
        this.productList.OrderType = this.$route.query.OrderType
      }
      if (this.$route.query.ClasssId !== undefined) {
        this.productList.ClasssId = this.$route.query.ClasssId
      }
    },
    mounted () {
      this.init()
      this.$on('parentnum', function (num) {
        if (num != null) {
        }
      })
      if (this.isCut === true) {
        this.cutModel()
      }
    },
    methods: {
      async parentNum (e) {
        let params = {
          SortOrder: e, // 商品排序方式
          Keyword: this.productList.Keyword, // 搜索关键字
          MinPrice: this.productList.MinPrice, // 最低价格
          MaxPrice: this.productList.MaxPrice, // 最高价格
          ClassIds: this.productList.ClassIds, // 商品分类Id
          TagIds: this.productList.TagIds, // 商品标签ID
          ProductIds: this.productList.ProductIds, // 商品Id
          BrandId: this.productList.BrandId, // 商品品牌Id
          PriceStyleId: this.productList.PriceStyleId, //  商品模式
          OrderType: this.productList.OrderType, // 排序方式
          ClasssId: this.productList.ClasssId
        }
        var productListResponse = await this.$api.httpGet(PRODUCT_LIST_GET, params)
        this.dataModel = productListResponse.result
      },
      async cutModel () {
        var cutModelResponse = await this.$api.httpGet(PRODUCT_LIST_GET)
        this.dataModel = cutModelResponse.result
      },
      async  init () {
        this.userId = this.$user.id()
        let params = {
          SortOrder: this.productList.SortOrder, // 商品排序方式
          Keyword: this.productList.Keyword, // 搜索关键字
          MinPrice: this.productList.MinPrice, // 最低价格
          MaxPrice: this.productList.MaxPrice, // 最高价格
          ClassIds: this.productList.ClassIds, // 商品分类Id
          TagIds: this.productList.TagIds, // 商品标签ID
          ProductIds: this.productList.ProductIds, // 商品Id
          BrandId: this.productList.BrandId, // 商品品牌Id
          PriceStyleId: this.productList.PriceStyleId, //  商品模式
          OrderType: this.productList.OrderType, // 排序方式
          ClasssId: this.productList.ClasssId
        }
        var initResponse = await this.$api.httpGet(PRODUCT_LIST_GET, params)
        this.dataModel = initResponse.result
        this.ready = true
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      golinks (id) {
        window.location = '/product/list?id=' + id
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~_style/index.scss";
  .pc-x-product-item {
    font-size: $gl-size-base;
    width: 1200px;
    margin: 0 auto;
  }
  .productclass-item_right {
    width: 100%;
    overflow: hidden;
  }
  .item_right-li {
    width: 231px;
    height: 310px;
    border: 1px solid $gl-light-grey;
    float: left;
    box-sizing: border-box;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 4px;
    transition: 1s all;
  }
  .item_right-li:nth-child(5n + 1) {
    width: 235px;
    margin-left: 0px;
  }
  .item_right-li:hover {
    border: 1px solid $gl-brand;
    transform: translate3d(0, -8px, 0);
    box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);
  }
  .item_right-li:hover .item_right-p1 {
    color: $gl-brand;
  }
  .item_right-box {
    width: 100%;
    text-align: center;
    padding: 5px;
  }
  .item_right-img {
    width: 100%;
    height: 220px;
  }
  .item_right-conter {
    margin: 0px 20px;
  }
  .item_right-p1 {
    color: #909399;
    height: 35px;
    line-height: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .item_right-p2 {
    margin-top: 5px;
  }
  .item_right-conter_span {
    font-size: 17px;
    color: $gl-brand;
    font-weight: 600;
    &.span {
      font-weight: 500;
    }
  }
  .item_right-conter_a {
    float: right;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: $gl-light;
    border-radius: 100%;
    background-color: $gl-brand;
  }
</style>
