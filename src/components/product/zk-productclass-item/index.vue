<template>
  <div class="zk-productclass-item">
    <!-- <div class="pc-p-productclass-item" element-path="pc/p-productclass-item">
      <div class="shop-street">
        <div>
          <router-link class="shop-street_a">
            店铺街
            <span class="shop-street_span">推荐店铺</span>
          </router-link>
        </div>

        <div class="shop-street_box">
          <div class="left-picture">
            <router-link>
              <img class="left-picture_imgs" src="http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/08/22/15033866722095.jpg">
            </router-link>
          </div>
          <div class="imagelist-right">
            <ul class="imagelist-right_ul">
              <li class="imagelist-right_li" v-for="(listtian,listimgeIndex) in listimges" :key="listimgeIndex">
                <router-link class="li_a">
                  <img class="li_img" :src="listtian.imges">
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="margintop" v-for="(item,index) in classModel" :key="index">
        <div v-if="item.imges!==''">
          <router-link href>
            <img class="p-productclass-item_img" :src="item.imges">
          </router-link>
        </div>
        <div class="p-productclass-item_quan">
          <div class="productclass-item_box">
            <div class="productclass-item_span">
              <span>{{index+1}}F</span>
              <span class="productclass-item_food">{{item.name}}</span>
            </div>
            <ul class="productclass-item_ul">
              <li v-for="(items,indexs) in item.childClass" :key="indexs" class="productclass-item_ulli" :class="{'actives':bianliindexs[index]==indexs}" v-if="indexs<4" @mousemove="bianli(indexs,index)">{{items.name}}</li>
            </ul>
          </div>
          <div class="p-productclass-item_list">
            <div class="productclass-item_block">
              <el-carousel class="item_elcarousel" height="473px">
                <el-carousel-item v-for="(itimges,indexx) in item.imgslist" :key="indexx">
                  <router-link href>
                    <img :src="itimges.imges" alt=" " class="animation">
                  </router-link>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="productclass-item_right">
              <ul v-for="(ited,kans) in item.childClass" :key="kans" v-if="bianliindexs[index]==kans">
                <li class="item_right-li" v-for="(itemhu,tes) in ited.childClass" :key="tes" v-if="tes<8">
                  <div class="item_right-box">
                    <router-link :to="'/product/show?id='+itemhu.id">
                      <img class="item_right-img" :src="itemhu.thumbnailUrl">
                    </router-link>
                  </div>
                  <div class="item_right-conter">
                    <p class="item_right-p1">
                      <router-link :to="'/product/show?id='+itemhu.id">{{itemhu.name}}</router-link>
                    </p>
                    <p class="item_right-p2">
                      <span class="item_right-conter_span">￥{{itemhu.price}}</span>
                      <router-link   class="item_right-conter_a" to="" style="diaplay:none;">
                      <x-icon :pdisplay="pdisplay" src="zk-cart" size="16"></x-icon>
                      </router-link>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  
  import { PRODUCT_CLASS_GET, PRODUCT_LIST_GET } from '@/service/core/apiUrl'
  export default {
    
    data () {
      return {
        widgetModel: '',
        viewModel: '',
        //  conf: conf,
        bianliindexs: [],
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
        classModel: '',
        imgselist: [
          { 'imgsw': [{ 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/08/22/15033866722095.jpg' }, { 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/08/22/15033866944659.jpg' }] },
          { 'imgsw': [{ 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/08/22/15033865960756.jpg' }, { 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/08/22/15033865960756.jpg' }] },
          { 'imgsw': [{ 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/08/22/15033865960756.jpg' }] },
          { 'imgsw': [{ 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/08/22/15033866944659.jpg' }] },
          { 'imgsw': [{ 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/08/22/15033865928477.jpg' }] },
          { 'imgsw': [] }
        ],
        toimges: [
          { 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/12/12/15130504999066.jpg' },
          { 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2018/01/03/15149394370098.jpg' },
          { 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2018/01/03/15149394370098.jpg' },
          { 'imges': 'http://gssmshop.com/data/afficheimg/1437500451024703742.jpg' },
          { 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/12/12/15130504869621.jpg' },
          { 'imges': 'http://kinguv.oss-cn-beijing.aliyuncs.com/images/backend/gallery/2017/12/12/15130505139008.jpg' }
        ]
        // listimges: [
        //   { 'imges': 'http://gssmshop.com/data/supplier/logo/logo_supplier5.jpg' },
        //   { 'imges': 'http://gssmshop.com/data/supplier/logo/logo_supplier1.jpg' },
        //   { 'imges': 'http://gssmshop.com/data/supplier/logo/logo_supplier2.jpg' },
        //   { 'imges': 'http://gssmshop.com/data/supplier/logo/logo_supplier6.jpg' },
        //   { 'imges': 'http://gssmshop.com/data/supplier/logo/logo_supplier7.jpg' }
        // ]
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
        var response = await this.$api.httpGet(PRODUCT_CLASS_GET)
        this.classModel = response.result
        for (var j = 0; j < this.classModel.length; j++) {
          this.bianliindexs.push(0)
          this.$set(this.classModel[j], 'imgslist', this.imgselist[j].imgsw)
          this.$set(this.classModel[j], 'imges', this.toimges[j].imges)
          for (var k = 0; k < this.classModel[j].childClass.length; k++) {
            var classId = this.classModel[j].childClass[k].id
            this.productList.ClassIds = String(classId)
            var ko = await this.$api.httpGet(PRODUCT_LIST_GET, this.productList)
            var listko = ko.result.productItems
            this.$set(this.classModel[j].childClass[k], 'childClass', listko)
          }
        }
      },
      bianli (indexs, index) {
        // 根据index的索引改变数据
        this.$set(this.bianliindexs, index, indexs)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~_style/index.scss";
  .pc-p-productclass-item {
    font-size: $gl-size-base;
    width: 1200px;
    margin: 0 auto;
  }
  .margintop {
    margin-top: 15px;
  }
  .p-productclass-item_img {
    width: 100%;
    height: 100px;
  }
  .productclass-item_box {
    width: 1200px;
    height: 41px;
    line-height: 35px;
    position: relative;
    border-bottom: 1px solid $gl-brand;
  }
  .productclass-item_span,
  .productclass-item_eltab {
    float: left;
  }
  .productclass-item_span > span {
    font-size: 18px;
  }
  .productclass-item_food {
    color: $gl-brand;
    margin-left: 10px;
  }
  .p-productclass-item_quan {
    margin-top: 10px;
  }
  .productclass-item_ul {
    position: absolute;
    right: 0px;
    bottom: -1px;
  }
  .productclass-item_ulli {
    float: left;
    height: 35px;
    border: 1px solid #dcdfe6;
    margin-left: 15px;
    padding: 0px 15px;
    border-bottom: 1px solid $gl-brand;
    cursor: pointer;
  }
  .actives {
    border-top: 1px solid $gl-brand;
    border-right: 1px solid $gl-brand;
    border-left: 1px solid $gl-brand;
    border-bottom: 1px solid $gl-light;
    color: $gl-brand;
  }
  .p-productclass-item_list {
    width: 1200px;
    // height: 475px;
    overflow: hidden;
  }
  .item_elcarousel {
    width: 272px;
  }
  .item_elcarousel img {
    width: 100%;
    height: 100%;
  }
  .productclass-item_block,
  .productclass-item_right {
    float: left;
  }
  .productclass-item_block {
    box-sizing: border-box;
    border: 1px solid $gl-light-grey;
    border-top: none;
    width: 272px;
  }
  .productclass-item_right {
    width: 928px;
    // height: 475px;
  }
  .item_right-li {
    width: 232px;
    height: 237px;
    border-right: 1px solid $gl-light-grey;
    border-bottom: 1px solid $gl-light-grey;
    float: left;
    box-sizing: border-box;
  }
  .item_right-box {
    width: 100%;
    text-align: center;
  }
  .animation {
    transition: 0.5s all;
  }
  .animation:hover {
    transform: scale(1.1);
  }
  .item_right-img {
    width: 140px;
    height: 140px;
    margin-top: 10px;
    transition: 1s all;
  }
  .item_right-img:hover {
    transform: scale(1.1);
  }
  .item_right-conter {
    margin: 5px 20px;
  }
  .item_right-p1 {
    line-height: 15px;
  }
  .item_right-p1 a {
    color: #909399;
  }
  .item_right-p1 a:hover {
    color: $gl-brand;
  }
  .item_right-p2 {
    margin-top: 10px;
  }
  .item_right-conter_span {
    font-size: 17px;
    color: $gl-brand;
    font-weight: 600;
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
  .shop-street {
    width: 1200px;
    margin-top: 30px;
    display: none;
    .shop-street_a {
      font-size: 20px;
    }
    .shop-street_span {
      font-size: 12px;
      color: #909399;
    }
    .shop-street_box {
      width: 100%;
      overflow: hidden;
    }
    .left-picture,
    .imagelist-right {
      float: left;
    }
    .left-picture {
      width: 270px;
      height: 333px;
    }
    .left-picture_imgs {
      width: 100%;
      height: 100%;
    }
    .imagelist-right {
      width: 930px;
      height: 333px;
      border-top: 1px solid #e5e5e5;
    }
    .imagelist-right_ul {
      overflow: hidden;
    }
    .imagelist-right_li {
      width: 155px;
      height: 83px;
      border-right: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      float: left;
      cursor: pointer;
    }
    .li_a {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 17px 30px;
    }
    .li_img {
      width: 100%;
      height: 100%;
    }
    .li_img:hover {
      animation: shake 2s;
    }
    @keyframes shake {
      0% {
        -webkit-transform: translateY(-16);
      }
      10% {
        -webkit-transform: translateY(-0);
      }
      20% {
        -webkit-transform: translateY(-10);
      }
      30% {
        -webkit-transform: translateY(0);
      }
      40% {
        -webkit-transform: translateY(-8px);
      }
      50% {
        -webkit-transform: translateY(0);
      }
      60% {
        -webkit-transform: translateY(-6px);
      }
      70% {
        -webkit-transform: translateY(0);
      }
      80% {
        -webkit-transform: translateY(-2px);
      }
      90% {
        -webkit-transform: translateY(0);
      }
      100% {
        -webkit-transform: translateY(0);
      }
    }
  }
</style>
