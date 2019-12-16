<template>
  <div class="zk-cart" v-loading="loading">
    <div class="pc-x-cart_box" v-if="async">
      <div class="x-cart-nav">
        <div class="nav-checker">
          全选
        </div>
        <div class="nav-item">
          商品信息
        </div>
        <div class="nav-sku">
          规格
        </div>
        <div class="nav-messgae">
          单价
        </div>
        <div class="nav-messgae">
          数量
        </div>
        <div class="nav-messgae">
          金额
        </div>
        <div class="nav-operation ">
          操作
        </div>
      </div>
      <div class="x-cart-store_box" v-for="(store,storeIndex) in viewModel.storeItems" :key="storeIndex">
        <div class="store-nav">
          <div class="item_checker">
            <span aria-checked="mixed" class="el-checkbox__input " :class="{'is-checked':storeCheker[storeIndex]}" @click="storeClick(storeIndex)">
              <span class="el-checkbox__inner"></span>
              <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="">
            </span>
            {{store.storeName}}
          </div>
        </div>
        <div class="store-item_box">
          <div class="store-item" v-for="(item,index) in store.productSkuItems" :key="index">
            <div class="item_checker">
              <span aria-checked="mixed" class="el-checkbox__input " :class="{'is-checked':productChecker[storeIndex][index]}" @click="productClick(storeIndex,index)">
                <span class="el-checkbox__inner"></span>
                <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="">
              </span>
            </div>
            <div class="item_image">
              <img :src="item.thumbnailUrl" alt="">
            </div>
            <div class="item_info">
              <router-link to="">
                {{item.name}}
              </router-link>
            </div>
            <div class="item_sku">
              <p class="sku_content">
                {{item.propertyValueDesc}}
              </p>
            </div>
            <div class="item_message">
              <p class="message_unitprice">
                {{item.displayPrice}}
              </p>
            </div>
            <div class="item_message">
              <p class="message_number">
                {{item.buyCount}}
              </p>
            </div>
            <div class="item_message">
              <p class="message_price">
                {{(item.price*item.buyCount).toFixed(2)}}元
              </p>
            </div>
            <div class="item_operation">
              <div class="operation_delete" @click="removecart(item)">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-nodata" v-if="viewModel.totalCount==0">
        <div class="cart-nodata_box"><i class="glyph-icon flaticon-exclamation-1"></i>暂无数据</div>
      </div>
      <div class="x-cart_allnav">
        <div class="close" :class="{'close_hover':allPrice>0}" @click="buy()">
          <span>结算</span>
        </div>
        <div class="all_price">{{allPrice}}</div>
        <div class="all_txt">
          合计（不含运费）：
        </div>
        <div class="all_checker">
          <span aria-checked="mixed" class="el-checkbox__input " :class="{'is-checked':allChecker}" @click="allCheckClick()">
            <span class="el-checkbox__inner"></span>
            <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="">
          </span>
          全选</div>
      </div>
    </div>
  </div>
</template>

<script>
  
  import './var.scss'
  import './styles'
  import { CART_GETCART_GET, CART_REMOVECART_GET } from '@/service/core/apiUrl'
  export default {
    
    data () {
      return {
        widgetModel: '',
        viewModel: '',
        async: false,
        allChecker: false, // 判断商品是否被全选
        allPrice: 0,
        storeCheker: [],
        productChecker: [],
        loading: true
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        var para = {
          loginUserId: this.$user.id()
        }
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var response = await this.$api.httpGet(CART_GETCART_GET, para)
        if (response.status === 1) {
          this.viewModel = response.result
          this.viewModel.storeItems.forEach((store, storeIndex) => {
            this.storeCheker.push(false)
            this.productChecker.push([])
            store.productSkuItems.forEach((product, productIndex) => {
              this.productChecker[storeIndex][productIndex] = false
            })
          })
        }
        this.async = true
        setTimeout(() => {
          this.loading = false
        }, 500)
      },
      storeClick (sIndex) {
        if (this.storeCheker[sIndex]) {
          this.$set(this.storeCheker, [sIndex], false)
          this.productCheckerAllType(sIndex, false)
        } else {
          this.$set(this.storeCheker, [sIndex], true)
          this.productCheckerAllType(sIndex, true)
        }
        this.allCheck()
        this.calculationPrice()
      },
      productClick (sIndex, pIndex) {
        if (this.productChecker[sIndex][pIndex]) {
          this.$set(this.productChecker[sIndex], [pIndex], false)
        } else {
          this.$set(this.productChecker[sIndex], [pIndex], true)
        }
        this.$set(this.storeCheker, [sIndex], this.isStoreAllChecer(sIndex))
        this.allCheck()
        this.calculationPrice()
      },
      isStoreAllChecer (sIndex) {
        var allCheck = true
        this.productChecker[sIndex].forEach(type => {
          if (!type) {
            allCheck = type
          }
        })
        return allCheck
      },
      productCheckerAllType (sIndex, type) {
        this.productChecker[sIndex].forEach((product, productIndex) => {
          this.$set(this.productChecker[sIndex], [productIndex], type)
        })
      },
      calculationPrice () {
        var allPrice = 0
        this.productChecker.forEach((item, itemIndex) => {
          item.forEach((itemType, itemTypeIndex) => {
            if (itemType) {
              var count = this.viewModel.storeItems[itemIndex].productSkuItems[itemTypeIndex].buyCount // 商品数量
              var price = this.viewModel.storeItems[itemIndex].productSkuItems[itemTypeIndex].price // 商品单价
              allPrice += count * price
              // price += this.viewModel.storeItems[itemIndex].productSkuItems[itemTypeIndex].price
            }
          })
        })
        this.allPrice = allPrice.toFixed(2)
      },
      allCheckClick () {
        this.allChecker = !this.allChecker
        if (this.allChecker) {
          this.storeCheker.forEach((store, storeIndex) => {
            this.$set(this.storeCheker, [storeIndex], true)
            this.productCheckerAllType(storeIndex, true)
          })
        } else {
          this.storeCheker.forEach((store, storeIndex) => {
            this.$set(this.storeCheker, [storeIndex], false)
            this.productCheckerAllType(storeIndex, false)
          })
        }
        this.calculationPrice()
      },
      allCheck () {
        var isAllCheck = true
        this.storeCheker.forEach(type => {
          if (!type) {
            isAllCheck = type
          }
        })
        this.allChecker = isAllCheck
      },
      async buy () {
        var buyProductInfo = []
        var userId = this.$user.id()
        this.productChecker.forEach((productRadio, productRadioIndex) => {
          productRadio.forEach((product, productIndex) => {
            if (product) {
              var info = this.viewModel.storeItems[productRadioIndex].productSkuItems[productIndex]
              let productinfo = {
                ProductSkuId: info.productSkuId,
                Count: info.buyCount,
                ProductId: info.productId,
                storeId: this.viewModel.storeItems[productRadioIndex].storeId,
                LoginUserId: userId
              }
              buyProductInfo.push(productinfo)
            }
          })
        })
        if (this.viewModel.storeItems === 0) {
          this.$notify.warning('请先添加商品入购物车')
        } else if (buyProductInfo.length === 0) {
          this.$notify.warning('请先选择商品')
        } else {
          this.$api.localSet('buyProductInfo', buyProductInfo)
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          setTimeout(() => {
            loading.close()
            this.$router.push({
              path: '/order/buy'
            })
          }, 2000)
        }
      },
      async removecart (item) {
        var para = {
          ProductSkuId: item.productSkuId,
          productId: item.productId,
          storeId: item.storeId,
          count: item.buyCount,
          loginUserId: this.$user.id()
        }
        this.$confirm('确定将此商品从购物车中移除？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async () => {
          var response = await this.$api.httpGet(CART_REMOVECART_GET, para)
          this.$crud.message(response)
          this.init()
        }).catch(() => { })
      }
    }
  }
</script>
<style  lang="scss">
  @import "~_style/theme.scss";

  .pc-x-cart_box {
    width: 1200px;
    margin: 0 auto;
    .x-cart-nav {
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 3px solid #ccc;
      .nav-checker {
        width: 130px;
      }
      .nav-item {
        flex: 1;
      }
      .nav-sku {
        width: 170px;
      }
      .nav-messgae {
        width: 120px;
      }
      .nav-operation {
        width: 84px;
      }
    }
    .x-cart-nav > div {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
    }
    .x-cart-store_box {
      margin-top: 10px;
      .store-nav {
        height: 38px;
        padding: 0 10px;
      }
      .store-item > div {
        padding: 25px 10px 0 10px;
      }
      .store-item_box {
        border: 1px solid #ccc;
      }
      .store-item {
        height: 130px;
        display: flex;
        .item_checker {
          width: 50px;
        }
        .item_image {
          width: 80px;
          padding: 25px 0;
          height: 100%;
          img {
            width: 80px;
            height: 80px;
          }
        }
        .item_info {
          flex: 1;
          padding-top: 25px;
          padding-left: 10px;
        }
        .item_sku {
          width: 170px;
          .sku_content {
            color: #9c9c9c;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .item_message {
          width: 120px;
          .message_unitprice {
            font-weight: bold;
          }
          .message_price {
            color: $gl-brand;
            font-weight: bold;
          }
        }
        .item_operation {
          width: 84px;
          .operation_delete {
            cursor: pointer;
          }
          .operation_delete:hover {
            color: $gl-brand;
            text-decoration: underline;
          }
        }
      }
    }
    .cart-nodata {
      width: 1200px;
      height: 500px;
      position: relative;
      .cart-nodata_box {
        width: 100%;
        font-size: 24px;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        i {
          font-size: 48px;
          margin-right: 10px;
        }
      }
    }
    .x-cart_allnav {
      margin-top: 20px;
      background: #e5e5e5;
      height: 50px;
      display: flex;
      flex-direction: row-reverse;
      .close {
        background: #b0b0b0;
        color: #fff;
        border-left: 1px solid #e7e7e7;
        width: 119px;
        cursor: pointer;
        text-decoration: none;
        text-align: center;
        line-height: 50px;
        span {
          font-size: 22px;
        }
      }
      .close_hover {
        background-color: #c81332;
      }
      .all_price {
        line-height: 50px;
        font-weight: 700;
        font-size: 22px;
        color: $gl-brand;
        padding: 0 5px;
      }
      .all_txt {
        line-height: 50px;
      }
      .all_checker {
        flex: 1;
        line-height: 50px;
        padding: 0 10px;
      }
    }
  }
</style>

