<template>
  <div class="show_store_rate">
    <div class="store_all_box">
      <div class="store_top">
        <div class="seller-logo">
          <a href="javascript:void(0)" target="_blank">
            <img src="http://www.sjq.cn/seller_imgs/seller_logo/logo_thumb/1491604823803135105.jpg" height="45">
          </a>
        </div>
        <div class="seller-infor">
          <a href="javascript:void(0)" title="0790" target="_blank" class="name">0790</a>
          <i class="icon arrow-show-more"></i>
        </div>
        <div class="seller-zf seller_grade_name">
          <span>商家等级：</span>
          <div>
            <span title="1111">普通商家</span><img src="http://www.sjq.cn/data/seller_grade/1469558669252444227.png" width="20">
          </div>
        </div>
        <div class="seller-zf seller_grade_name">
          <span>公司信息：</span>
          <div>
            <a href="javascript:void(0)" target="_blank">
              <img style="float: none; margin: 5px 0 0 10px;" src="http://www.sjq.cn/images/national_emblem_light.png">
            </a>
          </div>
        </div>
        <div class="seller-zf shops_all_rate">
          <span style="width:63px">店铺总分：</span>
          <div>
            <span class="heart-white">
              <span class="heart-red h10" style="width:100%;" title="综合好评(100%)"> </span>
            </span>
            <em class="evaluate-grade"><strong title="10"><a target="_blank" href="#">5.00 分</a></strong></em>
          </div>
        </div>
        <div class="seller-pop-box">
          <dl class="pop-score-detail">
            <dt class="score-title">
              <span class="col1">评分明细</span>
              <span class="col2">与行业相比</span>
            </dt>
            <dd class="score-infor">
              <div class="score-part">
                <span class="score-desc">商品<em title="5" class="number">5</em></span>
                <span class="score-change"><em class="score-percent">100%</em></span>
                <span class="score-trend"><i class="sprite-up"></i></span>
              </div>
              <div class="score-part">
                <span class="score-desc">服务<em title="5" class="number">5</em></span>
                <span class="score-change"><em class="score-percent">100%</em></span>
                <span class="score-trend"><i class="sprite-up"></i></span>
              </div>
              <div class="score-part">
                <span class="score-desc">时效<em title="5" class="number">5</em></span>
                <span class="score-change"><em class="score-percent">100%</em></span>
                <span class="score-trend"><i class="sprite-up"></i></span>
              </div>
            </dd>
          </dl>
        </div>
        <div class="seller-address"></div>
        <div class="seller-kefu">
          <a target="_blank" href="javascript:void(0)" class="seller-btn"><i class="icon"></i>在线客服</a>
        </div>
        <div class="pop-shop-enter">
          <a href="javascript:void(0)" class="btn-gray btn-shop-access">进店逛逛</a>
          <a href="javascript:void(0);" class="btn-gray btn-shop-followey">关注店铺</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageInfo: null,
        title: {
          title: '基本信息',
          icon: 'el-icon-star-on'
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {

      }
    }
  }
</script>
<style lang="scss">
  @import "~_style_all/theme.scss";
  .store_all_box {
    width: 210px;
    border: 1px solid #dcdcdc;
    position: relative;
    // height: 200px;
    margin-top: 20px;
    margin-left: 42px;
    .seller-logo {
      height: 76px;
      width: 100%;
      text-align: center;
      line-height: 60px;
      font-size: 12px;
      font-weight: bold;
      a {
        display: inline-block;
        width: 180px;
        height: 60px;
        img {
          float: none;
          padding-top: 10px;
          width: 70px;
          height: 60px;
        }
      }
    }
    .seller-infor {
      padding: 0 20px;
      height: 32px;
      line-height: 32px;
      border-top: 1px solid #dcdcdc;
      position: relative;
      text-align: center;
      .name {
        color: #3a78bf;
      }
    }
    .seller-zf {
      padding: 0 20px;
      border-top: 1px solid #dcdcdc;
      height: 34px;
      line-height: 34px;
      color: #333;
      display: flex;
      div {
        span {
          color: #f00;
        }
        img {
          margin: 3px 0 0 10px;
        }
      }
      .heart-white {
        position: relative;
        overflow: hidden;
        width: 53px;
        height: 10px;
        border-radius: 4px;
        float: left;
        margin-top: 12px;
        background: #cccccc;
        .heart-red {
          float: left;
          width: 53px;
          height: 10px;
          background: $gl-themeColor;
        }
      }
      .evaluate-grade {
        margin-left: 9px;
        a {
          color: $gl-themeColor;
        }
      }
    }
    .shops_all_rate {
      line-height: 34px !important;
      border-bottom: none !important;
    }
    .seller-zf {
      padding: 0 20px;
      border-top: 1px solid #dcdcdc;
      height: 34px;
      line-height: 34px;
      color: #333;
    }
    .seller-pop-box {
      padding: 0 20px 5px;
      display: block;
      border-top: 1px solid #dcdcdc;
      .score-title {
        display: flex;
        height: 32px;
        line-height: 32px;
        span {
          display: inline-block;
          width: 85px;
          float: left;
        }
      }
      .score-part {
        line-height: 24px;
        .score-desc {
          display: inline-block;
          width: 85px;
          color: #666;
          em {
            color: #333;
            margin-left: 5px;
          }
        }
        .score-change em {
          color: #333;
          padding-left: 15px;
          display: inline-block;
          width: 32px;
        }
      }
    }
    .seller-address {
      padding: 5px 0px 5px 19px;
      border-top: 1px solid #dcdcdc;
    }
    .seller-kefu {
      text-align: center;
      border-top: 1px solid #dcdcdc;
      padding: 8px 0;
      a {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        border-radius: 5px;
        background: $gl-themeColor;
        color: #fff;
        padding: 0 10px 0 10px;
        font-family: "microsoft yahei";
        position: relative;
        text-align: center;
      }
    }
    .pop-shop-enter {
      border-top: 1px solid #dcdcdc;
      padding: 10px 0;
      text-align: center;
      .btn-gray {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        padding: 0 14px;
        border: 1px solid #d1c0a5;
        background: #f9e5c8;
        border-radius: 5px;
        font-family: "microsoft yahei";
        color: #333;
        margin-right: 8px;
      }
    }
  }
</style>


