<template>

  <div class="product_show">
    <div class="show_all_box" v-if="async">
      <h2 class="product_show_title">
        {{productView.name}}
      </h2>
      <div class="product-detail_set">
        <p class="set_price">
          <span class="detail_label">价格</span>
          <span class="detail_price">¥<span class="detail_price-title">{{selectSku.marketPrice}}</span></span>
        </p>
        <div class="quick_sale_price">
          <div class="quick_sale_price_left">
            <div class="detail_label">促销价</div>
            <div class="quick_sale-price">￥<span>{{selectSkuDisplayPrice}}</span></div>
          </div>
          <div class="quick_sale_price_right">
            <span>评价 ：12</span>
            <span>累计销量{{productView.soldCount}}</span>
          </div>
        </div>
        <!-- <div class="sale_active">
          <span>店铺优惠:&nbsp;&nbsp;</span>
          <div class="sale_active_border">
            <span>满159元立减5元&nbsp;</span>
            <span class="getClick">领取</span>
          </div>
          <div class="sale_active_border">
            <span>满299元立减20元</span>
            <span class="getClick">领取</span>
          </div>
        </div> -->
      </div>
      <div class="product_attrs">
        <!-- <div style="display:flex">
          <span class="title_name">客&nbsp;&nbsp;服：</span>
          <span class="link_service"></span>
        </div> -->
        <!-- <p class="attrs_color">
          <span class="title_name">颜&nbsp;&nbsp;色111：</span>
          <span v-for="(item,index) in colorList" :key="index" class="color_item" @click="getIndex(index)" :class="{bgcolor:idIndex==index}">{{item}}</span>
        </p> -->
        <div class="attrs_color" v-for="(item, index) in productView.productExtensions.productCategory.salePropertys" :key="index ">
          <span class="title_name title_name-text">{{item.name}}</span>
          <div class="title_name-right">
            <span v-for="(sale,sIndex) in item.propertyValues " :key="sIndex" class="color_item" @click="selectPropertys(sale,index,sIndex)" :class="{'active':checkerIndex[index]===sIndex}"> {{sale.valueAlias}}</span>
          </div>
        </div>
        <!-- <div class="attrs_size" v-for="(item, index) in productView.productExtensions.productCategory.salePropertys" :key="index ">
          <span class="title_name">尺&nbsp;&nbsp;寸： </span>
          <div>
            <div v-for="(sale,sIndex) in item.propertyValues " :key="sIndex" class="size_item" @click="selectPropertys(sale,index,sIndex)" :class="{'active':checkerIndex[index]===sIndex}">
              {{sale.valueAlias}}
            </div>
          </div>
        </div> -->
        <div class="attrs_count">
          <span class="title_name title_name-text">数量</span>
          <!-- <div style="margin-top:-6px"> -->
          <el-input-number v-model="buyCount" :min="inputNumber.min" :step="inputNumber.step" :max="selectSku.stock" size="mini" @change="onNumberChange2"></el-input-number>
          <!-- </div> -->
          <span class="title_name stroage">库存{{selectSku.stock}}件</span>
        </div>
        <!-- <div class="post_address" style="display:flex">
          <span class="title_name" style="display:block;width:80px;margin-top:5px">配&nbsp;&nbsp;送：</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              选择地区<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </el-dropdown>
        </div> -->
      </div>
      <div class="sale_type">
        <div class="sale_type-btn" @click="buyProduct()">立即购买</div>
        <div class="sale_type-btn sale-btn2" @click="addCart()">
          <div class="sale-btn2_text">
            <x-icon src="zk-cart" style="margin-right:10px;" size="15"></x-icon>
            <span>加入购物车</span>
          </div>
        </div>
      </div>
      <div class="attrs_bottom">
        <div class="service_promise">
          <span class="title_name">服务承诺</span>
          <ul>
            <li v-for="(item,index) in serviceList" :key="index">
              <img :src="item.url">
              <span class="name_item" style="color:#aca4a4">{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import { CART_ADDCART_POST } from '@/service/core/apiUrl.js'
  import { setTimeout } from 'timers'
  export default {
    inject: ['reload'],
    components: {
    },
    props: {
      productView: {}
    },
    data () {
      return {
        lunboIndex: 0,
        carouselBool: true,
        current: 0,
        sizeList: [
          'S',
          'M',
          'L',
          'XL'
        ],
        value: 1,
        serviceList: [
          { url: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-11/5cff73212c55a80138f35cae.gif', name: '7天退货' },
          { url: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-11/5cff73212c55a80138f35cb0.png', name: '15天换货' },
          { url: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-11/5cff73212c55a80138f35caf.gif', name: '闪电发货' }
        ],
        selectSku: '', // 选择的商品Sku
        selectSkuDisplayPrice: '',
        saleItems: [], // 商品规格属性,
        buyCount: 1, // 购买数量
        checkerIndex: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        checkerType: [],
        num: 0,
        colorList: ['灰色', '蓝色', '红色 '],
        idIndex: 0,
        inputNumber: {
          min: 1,
          max: Infinity,
          step: 1
        },
        async: false
      }
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.selectSku = this.productView.productExtensions.productSkus[0]
        this.selectSkuDisplayPrice = this.productView.productExtensions.productSkus[0].displayPrice
        for (var i = 0; i < this.productView.productExtensions.productCategory.salePropertys.length; i++) {
          this.saleItems[i] = this.productView.productExtensions.productCategory.salePropertys[i].propertyValues[0]
        }
        this.productView.productExtensions.productCategory.salePropertys.forEach((sale, saleIndex) => {
          this.checkerType.push([])
          sale.propertyValues.forEach((property, propertyIndex) => {
            // this.checkerType[saleIndex][propertyIndex] = false
            this.$set(this.checkerType[saleIndex], [propertyIndex], false)
          })
        })
        if (this.productView.productActivityExtension.userPermissions.singleBuyCountMax !== 0) {
          this.inputNumber.max = this.productView.productActivityExtension.userPermissions.singleBuyCountMax
        }
        if (this.productView.productActivityExtension.userPermissions.singleBuyCountMin !== 0) {
          this.inputNumber.min = this.productView.productActivityExtension.userPermissions.singleBuyCountMin
          this.inputNumber.step = this.productView.productActivityExtension.userPermissions.singleBuyCountMin
        }
        this.async = true
      },
      onNumberChange2 (value) {
        this.buyCount = value
      },
      async addCart () {
        if (this.$api.isEmpty(this.$user.loginUser())) {
          var this_ = this
          const loading = this.$loading({
            lock: true,
            text: '请先登录',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          setTimeout(function () {
            this_.$api.localSet('browse_historys', window.location.pathname + window.location.search)
            this_.$router.push({
              path: '/login',
              query: {
                formBck: window.location.pathname + window.location.search
              }
            })
            loading.close()
          }, 2000)
        } else {
          let params = {
            ProductSkuId: this.selectSku.id,
            productId: this.productView.id,
            storeId: this.productView.storeId,
            count: this.buyCount,
            loginUserId: this.$user.id()
          }
          var message = await this.$api.httpPost(CART_ADDCART_POST, params)
          if (message.status === 1) {
            this.$notify.success('成功加入购物车')
            this.reload()
          } else {
            this.$notify.warning(message.message)
          }
        }
      },
      selectPropertys (item, index, sindex) {
        this.saleItems[index] = item
        this.changSku()
        this.checkerIndex[index] = sindex
      },
      changSku () {
        this.selectSku = this.getSku() // 根据specSn获取商品的规格
        this.saleValue = this.selectSku.propertyValueDesc
      },
      getSku () {
        var specSn = ''
        this.saleItems.forEach(element => {
          specSn += element.id + '|'
        })
        var productViewTemps = this.productView
        var skus = productViewTemps.productExtensions.productSkus
        var sku = ''
        for (var i = 0; i < skus.length; i++) {
          if (skus[i].specSn === specSn) {
            sku = skus[i]
            this.selectSkuDisplayPrice = skus[i].displayPrice
          }
        }
        return sku
      },
      async buyProduct () {
        if (this.$api.isEmpty(this.$user.loginUser())) {
          var this_ = this
          const loading = this.$loading({
            lock: true,
            text: '请先登录',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          setTimeout(function () {
            this_.$api.localSet('browse_historys', window.location.pathname + window.location.search)
            this_.$router.push({
              path: '/login',
              query: {
                formBck: window.location.pathname + window.location.search
              }
            })
            loading.close()
          }, 2000)
        } else {
          let buyProductInfo = [{
            ProductSkuId: this.selectSku.id,
            Count: this.buyCount,
            ProductId: this.productView.id,
            storeId: this.productView.storeId,
            // activityRecordId: this.activitySelectId, // 活动id，参与拼团时用到
            // isGroupBuy: isGroupBuy, // 是否为拼团
            LoginUserId: this.$user.loginUser().id
          }]
          this.$api.localSet('buyProductInfo', buyProductInfo)
          this.$router.push({
            path: '/order/buy'
          })
        }
      },
      getIndex (index) {
        this.idIndex = index
      }
    }
  }
</script>
<style lang="scss">
  @import "~_style_all/theme.scss";
  .product_show {
    float: left;
    color: #666;
    margin-top: 20px;
    .product_show_title {
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 700;
      color: #666666;
      width: 100%;
      margin-bottom: 15px;
      line-height: 28px;
      font-size: 16px;
    }
  }
  .show_all_box {
    width: 620px;
    margin-left: 30px;
    .title_name {
      color: #666;
      font-size: 12px;
      width: 50px;
      cursor: pointer;
      text-align-last: justify;
      text-align: justify;
      margin-right: 20px;
      line-height: 35px;
    }
    .title_name-right {
      flex: 1;
    }
    .product-detail_set {
      width: 100%;
      padding: 15px 15px;
      background: url("../../../../static/img/back.png") no-repeat;
      background-size: cover;
      border-top: 1px dotted #dedede;
      border-bottom: 1px dotted #dedede;
      .detail_label {
        width: 50px;
        display: inline-block;
        text-align-last: justify;
        text-align: justify;
        margin-right: 15px;
      }
      .detail_price {
        color: black;
        .detail_price-title {
          font-size: 16px;
          margin-left: 5px;
        }
      }
      .quick_sale-price {
        color: #ff0036;
        font-size: 16px;
        span {
          font-size: 26px;
          font-weight: 600;
        }
      }
      p,
      .quick_sale_price,
      .sale_active {
        font-size: 14px;
        color: #666;
        height: 32px;
        line-height: 32px;
      }
      .set_price {
        display: flex;

        div:nth-of-type(2) {
          font-size: 14px;
          color: #666;
          height: 32px;
          line-height: 32px;
          text-decoration: line-through;
        }
      }
      .quick_sale_price {
        display: flex;
        justify-content: space-between;
        .quick_sale_price_right {
          span:nth-of-type(1) {
            margin-right: 15px;
          }
        }
      }
      .quick_sale_price_left {
        display: flex;
        span:nth-of-type(2) {
          color: $gl-themeColor;
          font-size: 24px;
          display: inline-block;
          vertical-align: middle;
          font-weight: 700;
        }
      }
      .sale_active {
        .sale_active_border {
          border: 1px solid #f57;
          margin-left: 5px;
          display: inline-block;
          line-height: 20px;
          border-radius: 2px;
          margin-right: 5px;
          color: #f57;
          padding: 0 0 0 5px;
        }
      }
      .getClick {
        color: #fff;
        background: #f57;
        padding: 1px 5px;
      }
    }
    .product_attrs {
      padding: 0px 15px;
      .link_service {
        width: 85px;
        height: 24px;
        display: block;
        background: url("http://s10.mogucdn.com/pic/140815/sp1ku_ieygin3dgeydoztbmiytambqmeyde_16x17.gif")
          50% no-repeat;
        margin-top: -5px;
      }
      .attrs_color {
        display: flex;
        margin-top: 20px;
        cursor: pointer;
        .active {
          color: $gl-themeColor;
          border: 1px solid $gl-themeColor;
        }
      }
      .color_item {
        float: left;
        padding: 8px 10px;
        letter-spacing: 3px;
        border: 1px solid #e5e5e5;
        color: #333;
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 8px;
      }
      .bgcolor {
        border: 1px solid $gl-themeColor;
        color: $gl-themeColor;
      }
      .attrs_size {
        margin-top: 15px;
        display: flex;
        .size_item {
          display: inline-block;
          margin: 0 10px 5px 0;
          padding: 0 10px;
          font-weight: 700;
          line-height: 28px;
          border: 1px solid #ddd;
          cursor: pointer;
        }
        .active {
          color: #fff;
          background: $gl-themeColor;
        }
      }
      .attrs_count {
        margin-top: 10px;
        display: flex;
        align-items: center;
      }
      .post_address {
        margin-top: 15px;
        .el-dropdown {
          height: 26px;
          background: #fff;
          border: 1px solid #cecbce;
          padding: 0 30px 0 10px;
          line-height: 23px;
          color: #666;
          position: relative;
          cursor: pointer;
          border-radius: 2px;
          line-height: 26px;
        }
      }
      .addclick {
        width: 24px;
        height: 27px;
        display: inline-block;
        cursor: pointer;
        border: 1px solid #ddd;
        text-align: center;
        line-height: 25px;
      }
      .countValue {
        outline: none;
        width: 40px;
        height: 27px;
        text-align: center;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
      }
      .stroage {
        color: #666;
        font-size: 12px;
        margin-left: 20px;
        line-height: 17px;
        width: 110px;
      }
    }
    .sale_type {
      margin-top: 30px;
      margin-left: 85px;
      display: flex;
      .sale_type-btn {
        cursor: pointer;
        font-size: 18px !important;
        display: flex;
        justify-content: center;
        width: 150px;
        height: 50px;
        line-height: 50px;
        color: $gl-themeColor;
        border: 1px solid $gl-themeColor;
        background-color: #ffeded;
        margin-right: 20px;
      }
      .sale-btn2 {
        color: #fff;
        border: 1px solid $gl-themeColor;
        background: $gl-themeColor;
        .sale-btn2_text {
          display: flex;
          align-items: center;
          span {
            font-size: 16px;
          }
        }
      }
    }
    .start_count {
      display: block;
      width: 66px;
      height: 30px;
      border: 1px solid #ddd;
      line-height: 30px;
      text-align: center;
      border-radius: 16px;
      margin-right: 10px;
    }
    .product_show {
      .el-button {
        border-radius: 16px !important;
        padding: 7px 20px;
      }
    }
    .attrs_bottom {
      margin-top: 20px;
      overflow: hidden;
      padding: 0px 20px;
      .service_promise {
        display: flex;
        align-items: center;
        ul {
          display: flex;
          width: 530px;
          flex-wrap: wrap;
          li {
            display: flex;
            align-items: center;
            margin-right: 15px;
            img {
              width: 24px;
              height: 22px;
              margin-right: 5px;
            }
            span {
              color: #666;
              font-size: 14px;
            }
          }
          li:nth-last-child(1) {
            margin-left: 6px;
          }
        }
      }
    }
  }
</style>


