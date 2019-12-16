<template>
  <div class="zk-swiper" v-if="widgetModel">
    <div class="pc-x-swiper">
      <div class="nav-left-popup">
        <ul class="left-popup_box">
          <li class="kusia" v-for="(item,index ) in classModel" :key="index" @mouseover="classChilren(item.childClass)">
            <div class="popup_li">
              <div class="left-popup_boxleft">
                <x-icon :pdisplay="pdisplay" src="zk-pc-option" size="12"></x-icon>
                <span class="left-popup_span">{{item.name}}</span>
                <x-icon class="flotRinght" :pdisplay="pdisplay" src="zk-right" size="12"></x-icon>
              </div>
              <div class="intro_list">
                <span class="left-popup_left" v-for="(it,inits) in item.childClass" :key="inits">{{it.name}}</span>
              </div>
            </div>
            <div class="popup-children">
              <ul class="p-c_box">
                <li class="p-c_item" v-for="(item,index ) in classCModel" :key="index">
                  <router-link class="c_item_a" :to="'/product/list?'+'ClassIds='+item.id">{{item.name}}</router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="lunbo">
        <el-carousel height="443px">
          <el-carousel-item v-for="(item,index) in widgetModel.value.links" :key="index">
            <router-link to="/product/show">
              <img class="x-swiper_img" :src="item.image" />
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
  import { PRODUCT_CLASS_GET, ARTICLE_USERNOTICELIST_GET } from '@/service/core/apiUrl'
  
  export default {
    
    props: {
      widget: {}
    },
    data () {
      return {
        widgetModel: '',
        pdisplay: true,
        rums: 1,
        classModel: '',
        classCModel: '',
        disknone: true,
        noticeModel: ''
      }
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      classChilren (model) {
        this.classCModel = model
      },
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var response = await this.$api.httpGet(PRODUCT_CLASS_GET)
        this.classModel = response.result
        var notice = await this.$api.httpGet(ARTICLE_USERNOTICELIST_GET)
        this.noticeModel = notice.result
      },
      onClick (rum) {
        this.rums = rum
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import "~_style/theme.scss";
  .pc-x-swiper {
    font-size: $gl-size-base;
    text-align: center;
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    // position: relative;
  }
  .el-carousel__button {
    width: 15px;
    height: 15px;
    border-radius: 100%;
  }
  .el-carousel__arrow {
    display: none;
  }
  .x-swiper_img {
    width: 100%;
    height: 443px;
  }
  .nav-left-popup,
  .lunbo {
    float: left;
  }
  .lunbo {
    width: 972px;
  }
  // 全部分类
  .nav-left-popup {
    width: 228px;
    height: 443px;
    background: rgba(87, 77, 62, 1);
    position: relative;
    z-index: 999;
    .popup-children {
      position: absolute;
      left: 228px;
      top: 0;
      width: 120px;
      height: 443px;
      padding: 20px;
      display: none;
      background: #fff;
      .p-c_box {
        width: 100%;
        .p-c_item .c_item_a {
          display: block;
          width: 80px;
          height: 35px;
          text-align: justify;
          font-weight: bold;
          color: #666;
          cursor: pointer;
          font-size: 14px;
        }
        .p-c_item .c_item_a::after {
          content: "";
          display: inline-block;
          width: 100%;
        }
        .p-c_item > .c_item_a:hover {
          color: $gl-brand;
        }
      }
    }
    .kusia {
      cursor: pointer;
    }
    .kusia:hover .popup-children {
      display: block;
    }
    .left-popup_box {
      .kusia {
        .popup_li {
          display: block;
          color: $gl-light;
          font-size: 12px;
          padding: 11.6px 0px;
          .left-popup_span {
            font-size: 14px;
          }
        }
        .p-c_item:hover .popup-children {
          display: block;
        }
      }
      .kusia:hover {
        background: $gl-light;
      }
      .kusia:hover div.popup_li {
        color: $gl-brand;
      }
      .kusia:hover div.popup_li .left-popup_left {
        color: $gl-brand;
      }
    }
  }
  .left-popup_span {
    margin: 0px 40px 0px 10px;
  }
  .left-popup_boxleft {
    margin-left: 15px;
    margin: 0px 15px;
    text-align: left;
  }
  .intro_list {
    align-items: center;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 40px;
    padding-right: 25px;
    padding-top: 5px;
    .left-popup_left {
      color: #909399;
      margin-right: 5px;
      display: inline-block;
    }
  }

  // 商城公告、商城招商样式
  .nav-right-popup {
    width: 220px;
    height: 442px;
    position: absolute;
    right: 0px;
    top: 2px;
    z-index: 100;
  }
  .nav-right_announcement {
    width: 220px;
    height: 220px;
    background-color: #dcdfe6;
    ul {
      overflow: hidden;
      li {
        float: left;
        color: #606266;
        font-size: 12px;
        padding: 8px 31px;
        cursor: pointer;
      }
      .nav-right_ullist {
        background-color: $gl-light-grey;
      }
    }
    .nav-right_content {
      width: 220px;
      height: 185px;
      background-color: $gl-light-grey;
      ul {
        padding-top: 10px;
        li {
          width: 220px;
          padding: 0px 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a {
            color: #606266;
          }
          a:hover {
            color: $gl-brand;
          }
        }
      }
    }
    .nav-right_tenants_setting {
      width: 100%;
      margin: 5px auto;
      overflow: hidden;
      position: relative;
      a {
        color: #909399;
      }
      a:hover {
        color: $gl-brand;
      }
      .x-icon {
        display: inline-block;
        vertical-align: -2px;
      }
    }
    .fory {
      display: none;
    }
    .nav-right_tenants {
      width: 220px;
      height: 185px;
      background-color: $gl-light-grey;
      padding-top: 45px;
    }
    .nav-right_tenants_img {
      width: 165px;
      height: 60px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
  }
  .nav-right_iconlist {
    width: 220px;
    height: 218px;
    background: rgba(255, 255, 255, 0.85);
    margin-top: 2px;
  }
  .flotRinght {
    float: right;
  }
  .nav-right_iconlist_ul {
    overflow: hidden;
  }
  .nav-right_iconlist_ul {
    padding: 0px 2px;
    li {
      float: left;
      a {
        display: inline-block;
        color: #606266;
        padding: 10px 0px;
        width: 70px;
      }
      a:hover {
        color: $gl-brand;
      }
    }
  }
</style>
