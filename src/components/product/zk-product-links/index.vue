<template>
  <div class="zk-product-links">
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
                  <!-- <x-icon :pdisplay="pdisplay" src="zk-cart" size="16"></x-icon> -->
                </router-link>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import './var.scss'
  import { PRODUCT_LIST_GET } from '@/service/core/apiUrl'
  export default {

    data () {
      return {
        widgetModel: {},
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
        dataModel: '',
        userId: ''
      }
    },
    props: {
      widget: {}
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
    },
    methods: {
      async init () {
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
      }
    }
  }
</script>
