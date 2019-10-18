<template>
  <div class="zk-product-listpage" v-loading="loading">
    <div class="pc-x-product-listpage">
      <div class="pc-x-product-class">
        <ul>
          <li class="pc-x-product-class_li" v-for="(item,index) in classModel" :key="index">
            <dl class="pc-xproductclass_dl">
              <dt class="pc-xproductclass_dt"> {{item.name}}</dt>
              <dd class="pc-xproductclass_dd" v-for="(t,i) in item.childClass" :key="i">
                <span class="content_grid" @click="xProductClass(t.name,t.id,index,i)" :class="{'active':hu[index]==i&&nums==index}">
                  {{t.name}}
                </span>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="pc-listpage_theprice">
        <dl class="pc-listpage_dl">
          <dt class="pc-listpage_dt">价格:</dt>
          <dd class="pc-listpage_dd">
            <ul class="pc-listpage_ul">
              <li>
                <div @click="restrictPrice(0,120,1)" :class="{'listdigital':gitalIndex==1}">0-120</div>
              </li>
              <li>
                <div @click="restrictPrice(120,240,2)" :class="{'listdigital':gitalIndex==2}">120-240</div>
              </li>
              <li>
                <div @click="restrictPrice(240,360,3)" :class="{'listdigital':gitalIndex==3}">240-360</div>
              </li>
              <li>
                <div @click="restrictPrice(360,480,4)" :class="{'listdigital':gitalIndex==4}">360-480</div>
              </li>
              <li>
                <div @click="restrictPrice(480,600,5)" :class="{'listdigital':gitalIndex==5}">480-600</div>
              </li>
              <li class="li_input-box">
                <input class="input-box" v-model="productList.MinPrice" type="text" />
                <i class="input-box_i"></i>
                <input class="input-box" v-model="productList.MaxPrice" type="text" />
                <div class="input-box_determine" @click="init">确定</div>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="choose">
        <div to="" @click="sortNum(2)" :class="{'chooseclick':conterIndex==2}">
          <span class="choose_span">最新</span>
        </div>
        <div @click="sortNum(5)" :class="{'chooseclick':conterIndex==5}">
          <span class="choose_span">最热</span>
          <i class="icon iconfont zk-unfoldfill choose_i"></i>
        </div>
        <div @click="sortNum(6)" :class="{'chooseclick':conterIndex==6}">
          <span class="choose_span">关注</span>
          <i class="icon iconfont zk-unfoldfill choose_i"></i>
        </div>
        <div @click="sortNum(1)" :class="{'chooseclick':conterIndex==1}">
          <span class="choose_span">价格</span>
          <i class="icon iconfont zk-unfoldfill choose_i"></i>
        </div>
        <div @click="sortNum(3)" :class="{'chooseclick':conterIndex==3}">
          <span class="choose_span">人气</span>
          <i class="icon iconfont zk-unfoldfill choose_i"></i>
        </div>
        <div @click="sortNum(4)" :class="{'chooseclick':conterIndex==4}">
          <span class="choose_span">销量</span>
          <i class="icon iconfont zk-unfoldfill choose_i"></i>
        </div>
      </div>
      <div class="cont" v-show="listtype"></div>
      <div class="list-of-goods">
        <div class="productclass-item_right">
          <div class="notData_box" v-if=" viewModel&&viewModel.productItems.length===0">
            <div class="message">
              <i class="glyph-icon flaticon-exclamation-1"></i>暂无数据
            </div>
          </div>
          <ul v-if="async">
            <li class="item_right-li" v-for="(item,index) in viewModel.productItems" :key="index">
              <router-link :to="'/product/show?id='+item.id">
                <div class="item_right-box">
                  <img class="item_right-img" :src="item.thumbnailUrl" />
                </div>
                <div class="item_right-conter">
                  <div class="conter_money">
                    <em class="conter_money-span1">￥{{item.displayPrice}}</em>
                    <span class="conter_money-span2">已售0件</span>
                  </div>
                  <div class="conter_weight">
                    <router-link to="">{{item.name}}</router-link>
                  </div>
                  <!-- <div class="goods-collect">
                  <div class="goods-collect_1">
                    <p class="fonts-icon_p">
                      <router-link   to="">
                        <i class="icon iconfont zk-helpuser"></i>
                        对比
                      </router-link>
                      <router-link   to="">
                        <i class="icon iconfont zk-favorite"></i>
                        收藏
                      </router-link>
                      <router-link   to="">
                        <i class="icon iconfont zk-news"></i>
                        0
                      </router-link>
                    </p>
                    <p class="online-supermarket">
                      <router-link   to="">
                        <span class="online-supermarket_span1">自营</span>
                        <span>融合城商贸网上超市</span>
                      </router-link>
                    </p>
                  </div>
                  <div class="goods-collect_2">
                    <router-link   class="item_right-conter_a" to="">
                      <x-icon :pdisplay="pdisplay" src="zk-cart" size="16"></x-icon>
                    </router-link>
                  </div>
                </div> -->
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" layout="prev, pager, next, jumper" :page-count="viewModel.totalSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

  import { PRODUCT_LIST_GET, PRODUCT_CLASS_GET } from '@/service/core/apiUrl'
  export default {

    data () {
      return {
        async: false,
        widgetModel: '',
        current: 0,
        test: 'lorem',
        viewModel: '',
        listtype: false,
        boxhigh: '',
        currentPage3: 1,
        classModel: '',
        pageIndex: 1, // 从第一页开始加载
        pageSize: 20,
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
          pageIndex: 1,
          pageSize: 20
        },
        hu: [],
        nums: '',
        gitalIndex: '',
        conterIndex: '',
        loading: true
      }
    },
    props: {
      widget: {}
    },
    created () {
      for (var i in this.$route.query) {
        for (var q in this.productList) {
          if (i === q) {
            this.productList[q] = this.$route.query[i]
          }
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        // this.widgetModel = await this.$api.themeWidget(this.widget)
        // 获取商品class名称
        var response = await this.$api.httpGet(PRODUCT_CLASS_GET)
        this.classModel = response.result
        // 获取全部商品
        if (!this.$api.isEmpty(this.productList.Keyword)) {
          this.$bus.$emit('zkHeadSearch', this.productList.Keyword)
        }
        var listResponse = await this.$api.httpGet(PRODUCT_LIST_GET, this.productList)
        this.viewModel = listResponse.result
        this.async = true
        setTimeout(() => {
          this.loading = false
        }, 500)
      },
      async restrictPrice (minPrice, maxPrice, umber) {
        this.gitalIndex = umber
        this.productList.MaxPrice = maxPrice
        this.productList.MinPrice = minPrice
        var response = await this.$api.httpGet(PRODUCT_LIST_GET, this.productList)
        this.viewModel = response.result
      },
      async sortNum (id) {
        this.conterIndex = id
        this.productList.SortOrder = id
        var response = await this.$api.httpGet(PRODUCT_LIST_GET, this.productList)
        this.viewModel = response.result
      },
      async xProductClass (name, id, index, i) {
        this.productList.Keyword = ''
        this.productList.ClassIds = String(id)
        var response = await this.$api.httpGet(PRODUCT_LIST_GET, this.productList)
        this.viewModel = response.result
        this.$set(this.hu, index, i)
        this.nums = index
      },
      handleSizeChange (val) {
      },
      async handleCurrentChange (val) {
        this.productList.pageIndex = val
        var response = await this.$api.httpGet(PRODUCT_LIST_GET, this.productList)
        if (response.status === 1) {
          this.viewModel = response.result
        }
      },
      listpages () {
        let offtop = this.$refs.jyt.offsetTop
        let scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrolltop >= offtop) {
          this.listtype = true
        } else {
          this.listtype = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~_style_all/variable.scss";
  @import "~_style_all/theme.scss";
  .pc-x-product-class {
    font-size: $gl-size-base;
    width: 1200px;
    margin: 0 auto;
  }
  .active {
    color: $gl-brand !important;
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
    background-color: #e5e5e5;
    width: 100px;
    height: 36px;
    line-height: 37px;
    color: #606266;
    padding-left: 15px;
  }
  .pc-xproductclass_dd {
    float: left;
    height: 38px;
    line-height: 38px;
    padding: 0px 20px;
    .content_grid {
      cursor: pointer;
    }
  }
  .pc-xproductclass_dd > span {
    color: #909399;
  }
  .pc-xproductclass_dd > span:hover {
    color: $gl-brand;
  }
  .pc-x-product-listpage {
    font-size: $gl-size-base;
    width: 1200px;
    margin: 20px auto;
  }
  .tobu {
    position: fixed;
    top: 0px;
    background-color: $gl-light;
    z-index: 999;
  }
  .cont {
    width: 100%;
    height: 444px;
  }
  .pc-listpage_theprice {
    width: 1200px;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    border: 1px solid #e5e5e5;
    border-top: none;
  }
  .pc-listpage_dt {
    color: #909399;
  }
  .pc-listpage_dd,
  .pc-listpage_dt {
    float: left;
  }
  .pc-listpage_ul > li {
    float: left;
    padding: 0px 10px;
    overflow: hidden;
  }
  .pc-listpage_ul > li > div {
    color: #303133;
    cursor: pointer;
  }
  .listdigital {
    color: $gl-brand !important;
  }
  .pc-listpage_ul > li > div:hover {
    color: $gl-brand;
  }
  .li_input-box {
    margin-top: 10px;
  }
  .input-box {
    float: left;
    width: 60px;
    height: 27px;
    border: 1px solid #e5e5e5;
    padding: 0px 5px;
    color: #909399;
    border-radius: 4px;
  }
  .input-box_determine {
    float: left;
    height: 27px;
    line-height: 27px;
    border: 1px solid #e5e5e5;
    padding: 0px 12px;
    border-radius: 4px;
    margin-left: 5px;
  }
  .input-box_determine:hover {
    color: $gl-brand;
    border: 1px solid $gl-brand;
  }

  .input-box_i {
    float: left;
    overflow: hidden;
    width: 4px;
    height: 1px;
    margin: 12px 4px 0 3px;
    background: #ccc;
  }
  .choose {
    widows: 100%;
    height: 43px;
    line-height: 43px;
    background-color: #e5e5e5;
    border: 1px solid #e5e5e5;
    border-top: none;
    cursor: pointer;
  }
  .choose > div {
    overflow: hidden;
    float: left;
    height: 40px;
    padding: 0px 20px;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    color: #606266;
  }
  .choose > div:hover {
    background-color: $gl-light;
    color: $gl-brand;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
  }
  .chooseclick {
    background-color: $gl-light !important;
    color: $gl-brand !important;
    border-left: 1px solid #e5e5e5 !important;
    border-right: 1px solid #e5e5e5 !important;
  }
  .choose_span,
  .choose_i {
    float: left;
  }
  .choose_i {
    margin-top: 1px;
  }
  .block {
    width: 1200px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .list-of-goods {
    width: 100%;
  }
  .productclass-item_right {
    width: 100%;
    overflow: hidden;
    color: #b6b6b6;
    .notData_box {
      .message {
        display: flex;
        font-size: 24px;
        justify-content: center;
        align-items: center;
        margin: 100px 0;
        i {
          font-size: 48px;
          margin-right: 10px;
        }
      }
    }
  }
  .item_right-li {
    width: 228px;
    height: 320px;
    border: 2px solid $gl-light-grey;
    float: left;
    box-sizing: border-box;
    margin-left: 15px;
    margin-top: 15px;
    border-radius: 4px;
    transition: 1s all;
  }
  .item_right-li:nth-child(5n + 1) {
    margin-left: 0px;
  }
  .item_right-li:hover {
    border: 2px solid $gl-brand;
    transform: translate3d(0px, -2px, 0px);
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
    // margin: 0px 20px;
    width: 100%;
    height: 85px;
    // border: 1px solid red;
    padding: 0px 8px;
    position: relative;
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
  .conter_money-span1 {
    font-size: 14px;
    color: $gl-brand;
  }
  .conter_money-span2 {
    color: #909399;
    float: right;
    margin-top: 8px;
  }
  .conter_weight a {
    position: absolute;
    height: 32px;
    bottom: 10px;
    left: 8px;
    right: 8px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #606266;
  }
  .conter_weight a:hover {
    color: $gl-brand;
  }
  .fonts-icon_p > a {
    color: #909399;
    margin-right: 5px;
  }
  .fonts-icon_p > a > i {
    vertical-align: middle;
  }
  .fonts-icon_p > a:hover > i {
    color: $gl-brand;
  }
  .online-supermarket {
    margin-top: 4px;
  }
  .online-supermarket > a {
    color: #303133;
  }
  .online-supermarket > a:hover {
    color: $gl-brand;
  }
  .online-supermarket_span1 {
    display: inline-block;
    padding: 0px 7px;
    background-color: $gl-brand;
    color: $gl-light;
    border-radius: 3px;
    margin-right: 3px;
  }
  .goods-collect {
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
  }
  .goods-collect_1,
  .goods-collect_2 {
    float: left;
  }
  .goods-collect_2 {
    margin-left: 36px;
    margin-top: 7px;
  }
</style>
