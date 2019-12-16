<template>
  <div class="show_list">
    <ul>
      <li class="show_list_al" v-for="(item,index) in listModel" :key="index">
        <router-link target="_blank" :to="'/product/show?id='+item.id" class="list_item_all">
          <div>
            <img :src="item.thumbnailUrl" class="list_img">
          </div>
          <!-- <div style="display:flex">
            <div class="smallImg" v-for="(item,index) in smallImg" :key="index" :class="{actives:index == num}" @click="getIndex(index)">
              <img :src="item" alt="">
            </div>
          </div> -->
          <div class="show_list_buttom">
            <div class="list_name">￥{{item.price}}</div>
            <span class="sale_count">销量：{{item.soldCount}}</span>
          </div>
          <div class="show_list_text">{{item.name}}</div>
          <!-- <div class="p-commit">
            <div class="p-commit-left">
              <div class="p-eva">已有<em>0 +</em>评价</div>
            </div>
            <div class="p-commit-right">
              <a onclick="javascript:addToCart(2516,0,event,this,'flyItem');" class="addcart" rev="../images/201704/thumb_img/2516_thumb_G_1490988570201.jpg" data-dialog="addCart_dialog" data-id="" data-divid="addCartLog" data-url="" data-title="请选择属性">
                <i class="icon iconfont zk-cart"></i>
                购买
              </a>
            </div>
          </div> -->
        </router-link>
      </li>
    </ul>
    <transition name="fade">
      <div class="show_right_detail" v-show="count==1">
        <div v-for="(item,index) in bgImgList" :key="index">
          <img :src="item" class="img" alt="">
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="show_list" v-show="count==2">
        <h3>本店同类商品</h3>
        <ul>
          <li class="show_list_al" v-for="(item,cindex) in list" :key="cindex" @mouseenter="shows=true" @mouseleave="shows=false" @mouseover="getIds(cindex)">
            <div class="list_item_all">
              <div v-for="(item,index) in imgList" :key="index" v-show="lsitIndec[cindex] == index">
                <img :src="item" class="list_img">
              </div>
              <div style="display:flex">
                <div class="smallImg" v-for="(item,Lindex) in smallImg" :key="Lindex" :class="{actives:Lindex == num}" @click="getIndex(Lindex,cindex,cindex)">
                  <img :src="item" alt="">
                </div>
              </div>
              <div class="show_list_buttom">
                <div class="list_name">￥93</div>
                <span class="sale_count">销量：1</span>
              </div>
              <div class="show_list_text">秋装女套装新款韩版气质长袖POLO领拼接衬衫女高腰a字短裙显瘦百褶半身裙两件套套装</div>
              <div class="p-commit">
                <div class="p-commit-left">
                  <div class="p-eva">已有<em>0 +</em>评价</div>
                  <div class="p-store">
                    <a href="javascript:void(0)" class="p-brand">
                      <i class="icon iconfont zk-point" style="color:orange;margin-right:10px;"></i>D2F039</a>
                  </div>
                </div>
                <div class="p-commit-right">
                  <a onclick="javascript:addToCart(2516,0,event,this,'flyItem');" class="addcart" rev="../images/201704/thumb_img/2516_thumb_G_1490988570201.jpg" data-dialog="addCart_dialog" data-id="" data-divid="addCartLog" data-url="" data-title="请选择属性">
                    <i class="icon iconfont zk-cart"></i>
                    购买
                  </a>
                </div>
              </div>
              <div class="list_bottom_content">
                <div class="p-operation">
                  <a href="javascript:;" id="compareLink">
                    <i class="icon iconfont zk-recommend"></i>
                    <label for="8753">对比</label></a>
                  <a href="javascript:collect(8753);" class="choose-btn-coll "><i class="icon iconfont zk-favorite"></i>收藏</a>
                  <a id="IM" onclick="openWin(this)" href="javascript:;" goods_id="8753" class="seller-btn custom">
                    <i class="icon iconfont zk-service "></i>客服</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>

    <transition name="fade">
      <comments v-show="count==3"></comments>
    </transition>
  </div>

</template>

<script>
  import comments from './show_evaluate'
  export default {
    components: {
      comments
    },
    data () {
      return {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        imgList: ['http://www.sjq.cn/images/201704/thumb_img/2527_thumb_P_1490989255270.jpg',
          'http://www.sjq.cn/images/201704/thumb_img/2527_thumb_G_1490989255585.jpg'],
        smallImg: ['http://www.sjq.cn/images/201704/thumb_img/2527_thumb_P_1490989255270.jpg',
          'http://www.sjq.cn/images/201704/thumb_img/2527_thumb_G_1490989255585.jpg'],
        num: 0,
        allindex: 0,
        lsitIndec: [],
        shows: false,
        ids: 0,
        lists: [
          '图案: 纯色', '裙型: A字裙', '颜色: 粉红色', '袖型: 常规袖', '衣门襟: 套头', '腰型: 高腰', '尺码: S,XL,L,M', '版型: A型', '季节: 春夏', '材质: 雪纺'
        ],
        count: 1,
        listModel: [],
        bgImgList: []
      }
    },
    props: {
      productView: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        for (var j = 0; j < this.productView.detail.imageJson.length; j++) {
          this.bgImgList.push(this.productView.detail.imageJson[j].OriginalUrl)
        }
        var response = await this.$api.httpGet('/api/product/list')
        if (response.status === 1) {
          this.listModel = response.result.productItems
        }
        var arr = []
        for (var i = 0; i < this.list.length; i++) {
          arr.push(0)
          this.lsitIndec = arr
        }
      },
      getIds (id) {
        this.ids = id
      },
      getIndex (index, num, eve) {
        this.$set(this.lsitIndec, eve, index)
        this.num = index
        this.allindex = num
      },
      getAllIndex (index) {
        this.allindex = index
      },
      change: function (index) {
        this.count = index
      }

    }
  }
</script>




<style lang="scss" scoped>
  @import "~_style/theme.scss";
  .show_list {
    h3 {
      font-size: 16px;
      padding-top: 40px;
    }
    ul {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
    }
    .show_list_al {
      width: 240px;
      margin-bottom: 20px;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      transition: 0.5s all;
      margin-left: 35px;
      .list_item_all {
        display: block;
        width: 216px;
        margin: 10px 10px;
        margin-bottom: 0;
        height: 100%;
      }
      .list_img {
        width: 216px;
        height: 216px;
      }
      .show_list_text {
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 24px;
        line-height: 20px;
        color: #717171;
      }
      .show_list_buttom {
        width: 100%;
        height: 24px;
        display: flex;
        justify-items: center;
        margin-top: 10px;
        .sale_count {
          width: 165px;
          text-align: right;
          margin-top: 4px;
        }
        .list_name {
          font-size: 20px;
          font-weight: 400;
          color: $gl-themeColor;
          float: left;
          line-height: 24px;
          display: block;
        }
        .show_list_img {
          height: 12px;
          width: 17px;
          margin-top: 5px;
          margin-left: 10px;
          background: url(https://s10.mogucdn.com/p1/150924/upload_ieytmmbvgy3tsndegmzdambqmeyde_32x300.png)
            no-repeat 0 -200px;
        }
        span {
          color: #999;
        }
      }
    }
    .show_list_al:hover {
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    }
    .show_list_al:hover .list_bottom_content {
      display: block;
    }
    .smallImg {
      display: flex;
      img {
        display: inline-block;
        width: 26px;
        height: 26px;
        border: 1px solid #fff;
      }
    }
    .show_list .acitves {
      border: 1px solid red;
    }
    .p-commit {
      line-height: 20px;
      overflow: hidden;
      display: flex;
      .p-store {
        .p-brand {
          color: #3a78bf;
          i {
            display: inline-block;
          }
        }
      }
      .p-eva {
        color: #bdbdbd;
        em {
          color: #f03177;
          margin: 0 5px;
        }
      }
      .p-commit-right {
        margin-top: 12px;
        margin-left: 65px;
        a i {
          position: absolute;
          display: block;
          font-style: normal;
          left: 4px;
          width: 18px;
          height: 18px;
        }
      }
      .p-commit-right a.addcart {
        text-align: center;
        color: $gl-themeColor;
        cursor: pointer;
      }
      .p-commit-right a {
        float: left;
        height: 25px;
        line-height: 25px;
        border: 1px solid #ddd;
        padding: 0 5px 0 30px;
        position: relative;
        background: #fff;
      }
    }
    .list_bottom_content {
      .p-operation {
        background: #fe8a8b;
        overflow: hidden;
        margin: 0 -7px 0;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-around;
        a {
          color: #fff;
        }
      }
    }
  }
  .show_right_detail {
    h3 {
      font-size: 16px;
      margin-top: 40px;
    }
    p {
      padding-top: 20px;
      color: #666;
      font-size: 13px;
      margin-bottom: 40px;
    }
    .show_right_detail_list {
      margin-top: 10px;
      width: 97%;
      border-top: 0.5px solid #e5e5e5;
      border-left: 0.5px solid #e5e5e5;
      margin-bottom: 40px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 33.33%;
        height: 30px;
        box-sizing: border-box;
        line-height: 30px;
        padding-left: 10px;
        border-bottom: 0.5px solid #e5e5e5;
        border-right: 0.5px solid #e5e5e5;
      }
    }
    .img {
      margin-top: 10px;
      width: 97%;
    }
    .img2 {
      margin-top: 20px;
      margin-left: 20px;
      width: 90%;
    }
  }
  .showRightTop {
    height: 58px;
    background: #f6f6f6;
    display: flex;
    li {
      margin: 0 3px;
      width: 21%;
      height: 100%;
      font-size: 16px;
      text-align: center;
      line-height: 58px;
      background: #f6f6f6;
      border: 1px solid #e5e5e5;
      border-top: none;
      &:nth-child(1) {
        margin-left: 0;
      }
      &:hover {
        border-top: 4px solid red;
        background: #fff;
      }
    }
  }
</style>

