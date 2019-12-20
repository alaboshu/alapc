<template>
  <div class="zk-product-class">
    <div class="pc-x-product-class">
      <ul>
        <li class="pc-x-product-class_li" v-for="(item,index) in viewModel" :key="index">
          <dl class="pc-xproductclass_dl">
            <dt class="pc-xproductclass_dt"> {{item.name}}</dt>
            <dd class="pc-xproductclass_dd" v-for="(t,i) in item.childClass" :key="i">
              <span class="content_grid" :to="'/index?path=/product/list'+'?'+'ClassIds='+t.id" @click="ceshi(t.name,t.id)">
                {{t.name}}
              </span>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        widgetModel: '',
        viewModel: '',
        pageSize: 20,
        pageIndex: 1, // 从第一页开始加载
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
        }
      }
    },
    created () {
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
      if (this.$route.params.value !== undefined) {
        this.productList.Keyword = this.$route.params.value
      }
    },
    props: {
      widget: {}
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var response = await this.$api.httpGet('/api/product/class')
        this.viewModel = response.result
      },
      async  ceshi (name, id) {
        let params = {
          ClassIds: String(id) // 商品分类Id
        }
        var response = await this.$api.httpGet('/api/product/list', params)
        this.$emit('clickModel', response.result)
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import "~_style/theme.scss";
  @import "~_style/theme.scss";
  .pc-x-product-class {
    font-size: $gl-size-base;
    width: 1200px;
    margin: 0 auto;
  }
  .pc-xproductclass_dl {
    overflow: hidden;
  }
  .pc-x-product-class_li {
    width: 1200px;
    height: 38px;
    border: 1px solid #dcdfe6;
    border-bottom: none;
  }
  .pc-x-product-class_li:last-of-type {
    border-bottom: 1px solid #dcdfe6;
  }
  .pc-xproductclass_dt,
  .pc-xproductclass_dd {
    float: left;
  }
  .pc-xproductclass_dt {
    float: left;
    // background-color: #e5e5e5;
    width: 100px;
    height: 36px;
    line-height: 37px;
    color: #606266;
    padding-left: 15px;
  }
  .pc-xproductclass_dd {
    height: 38px;
    line-height: 38px;
    padding: 0px 20px;
    .content_grid {
      cursor: pointer;
    }
  }
  .pc-xproductclass_dd > a {
    color: #909399;
  }
  .pc-xproductclass_dd > span:hover {
    color: $gl-brand;
  }
</style>
