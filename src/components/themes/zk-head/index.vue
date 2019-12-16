<template>
  <div>
    <div class="pc-x-head">
      <div class="zk-header">
        <div class="header-logo">
          <router-link to="/index" class="logo_img">
            <img class="size_im" src="http://upload-images.jianshu.io/upload_images/15475986-4a8aec0d4e216f89.png" />
          </router-link>
        </div>
        <div class="header-search">
          <div class="search-input">
            <input type="text" v-model="inputModel" class="inp">
            <button type="button" @click="search" class="btn">搜索</button>
          </div>
          <div class="search-recommend">
            <div class="insearch">大家都在搜:</div>
            <ul class="recommend-box">
              <li class="recommend_li">
                <div to="" @click="searchKeyWord('女装')">女装</div>
              </li>
              <li class="recommend_li">
                <div to="" @click="searchKeyWord('连衣裙')">连衣裙</div>
              </li>
              <li class="recommend_li">
                <div to="" @click="searchKeyWord('婴儿用品')">婴儿用品</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="header-introduce">
          <div class="introduce-cart" @click="toCart">
            <span>
              <x-icon src="zk-cart"></x-icon>
            </span>
            <span> 购物车</span>
          </div>
        </div>
      </div>
      <zk-nav></zk-nav>
    </div>
    <div class="fixed-head" :class="{'show-fixed-head':showFiexdHead}">
      <div class="box">
        <div class="f-logo">
          <img src="" alt="">
        </div>
        <div class="f-logo"></div>
        <div class="f-nav">
          <ul>
            <li class=" nav_index " :class="{'nav-active':navActive===-1}">
              <router-link to="/index">首页</router-link>
            </li>
            <li class="nav_item" v-for="(item,itemIndex) in classModel" :key="itemIndex">
              <router-link :to="'/product/list?ClassIds='+ item.id">{{item.name}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { PRODUCT_CLASS_GET } from '@/service/core/apiUrl'
  
  export default {
    
    data () {
      return {
        widgetModel: '',
        async: false,
        inputModel: '',
        classModel: [],
        navActive: -1,
        showFiexdHead: false
      }
    },
    props: {
      widget: {},
      title: {}
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
      this.$nextTick(() => {
        this.$bus.$on('zkHeadSearch', inputValue => {
          this.inputModel = inputValue
        })
      })
      var that = this
      var scrollFunc = function (e) {
        e = document.body.scrollTop
        if (e >= 300) {
          that.showFiexdHead = true
        } else {
          that.showFiexdHead = false
        }
      }
      if (document.addEventListener) { // firefox
        document.addEventListener('DOMMouseScroll', scrollFunc, false)
      }
      window.onmousewheel = document.onmousewheel = scrollFunc
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var calssList = await this.$api.httpGet(PRODUCT_CLASS_GET)
        this.classModel = calssList.result
        this.async = true
      },
      search () {
        window.location = '/product/list?Keyword=' + this.inputModel
      },
      searchKeyWord (keyWord) {
        window.location = '/product/list?Keyword=' + keyWord
      },
      toCart () {
        window.location = '/order/cart'
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import "~_style/theme.scss";
  .pc-x-head {
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 4px 0 #eaeaea;
  }
  .show-fixed-head {
    top: 0px !important;
  }
  .fixed-head {
    width: 100%;
    height: 50px;
    position: fixed;
    top: -50px;
    left: 0;
    background: #fff;
    z-index: 9999;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.2s linear;
    .box {
      width: 1200px;
      height: 50px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .f-logo {
        width: 90px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 90px;
          height: 30px;
        }
      }
      .f-nav {
        flex: 1;
        ul {
          display: flex;
          align-items: center;
        }
        .nav-active {
          a {
            display: block;
            color: $gl-themeColor;
            border-bottom: 3px solid $gl-themeColor;
          }
        }
        .nav_index {
          padding-right: 26px;
          font-size: 14px;
          font-weight: bold;
          a {
            padding: 7px 0;
          }
        }
        .nav_item {
          font-weight: bold;
          padding: 0 26px;
          font-size: 14px;
          a {
            padding: 7px 0;
          }
        }
        li:hover {
          a {
            color: $gl-themeColor;
            border-bottom: 3px solid $gl-themeColor;
          }
        }
      }
    }
  }
  .zk-header {
    width: 1160px;
    height: 120px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .header-logo {
      width: 236px;
      height: 100%;
      position: relative;
      .logo_img {
        position: absolute;
        top: 50%;
        left: 35%;
        transform: translate(-50%, -50%);
        // width: 190px;
        // height: 50px;
        display: block;
        .size_im {
          width: 100%;
          height: 100%;
        }
      }
    }
    .header-search {
      width: 600px;
      padding-top: 35px;
      flex: 1;
      .search-input {
        width: 600px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        .inp {
          padding: 5px 10px;
          width: 440px;
          height: 38px;
          border: 2px solid $gl-brand;
          outline: none;
          font-size: 12px;
          border-bottom-left-radius: 19px;
          border-top-left-radius: 19px;
        }
        .btn {
          width: 100px;
          height: 38px;
          background: $gl-brand;
          color: #fff;
          font-size: 18px;
          border-bottom-right-radius: 19px;
          border-top-right-radius: 19px;
          outline: none;
        }
      }
      .search-recommend {
        margin-top: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        .insearch,
        .recommend-box {
          color: #909399;
          display: flex;
          margin-right: 10px;
          margin-left: 200px;
        }
        .recommend-box {
          margin-left: 5px;
          .recommend_li {
            padding: 0 10px;
            display: inline-block;
            cursor: pointer;
            border-right: 1px solid #e5e5e5;
          }
          .recommend_li:nth-last-of-type(1) {
            border: none;
          }
          .recommend_li:hover {
            color: $gl-brand;
          }
        }
      }
    }
    .header-introduce {
      .introduce-cart {
        border-radius: 20px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        border: 2px solid $gl-themeColor;
        color: $gl-themeColor;
        text-align: center;
        cursor: pointer;
        display: flex;
        // justify-content: space-around;
        padding-left: 20px;
        span:nth-of-type(2) {
          margin-left: 10px;
          font-size: 14px;
        }
      }
    }
  }
  .introduce_1 {
    display: inline-block;
    width: 60px;
    height: 70px;
  }
  .introduce_1 > img {
    width: 100%;
    height: 100%;
    transition: 0.5s;
  }
  .introduce_1 > img:hover {
    transform: scale(1.2);
  }
</style>

