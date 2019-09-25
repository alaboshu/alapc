<template>
  <div class="show_right_detail" v-if="productView.detail.intro" v-html="detailHtml">
    <!-- <h3><u>商品描述</u></h3>
    <p>海量新品 潮流穿搭 玩趣互动</p>
    <h3><u>产品参数</u></h3>
    <ul class="show_right_detail_list">
      <li v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
    <h3><u>穿着效果</u></h3>
    <img src="//s11.mogucdn.com/mlcdn/c45406/190305_4kka52jdbl0e9a01c1643caa44add_1000x800.jpg_750x999.jpg" class="img" alt="">
    <img src="//s5.mogucdn.com/mlcdn/c45406/190220_700jgi6l8ie41j1de5fddah622hid_650x938.jpg_750x999.jpg" class="img2" alt="">
    <img src="//s5.mogucdn.com/mlcdn/c45406/190220_04fd53k1840be56l961agd9i6gck2_650x791.jpg_750x999.jpg" class="img2" alt="">
    <img src="//s11.mogucdn.com/mlcdn/c45406/190220_381f9237j5fd07fle9f04h4l09eci_650x595.jpg_750x999.jpg" class="img2" alt=""> -->
    <div>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          '图案: 纯色', '裙型: A字裙', '颜色: 粉红色', '袖型: 常规袖', '衣门襟: 套头', '腰型: 高腰', '尺码: S,XL,L,M', '版型: A型', '季节: 春夏', '材质: 雪纺'
        ],
        detailHtml: ''
      }
    },
    props: {
      productView: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        // eslint-disable-next-line
        this.detailHtml = this.productView.detail.intro.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"')
        // eslint-disable-next-line
        var p = document.getElementsByTagName('img')
        // var productView = document.getElementsByClassName('show_right_detail').find('p')
        p.style = 'vertical-align:top'
      }
    }
  }
</script>



<style lang="scss" scoped>
  .show_right_detail {
    padding: 10px;
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
  .show_right_detail >>> p {
    background: red;
    display: none;
  }
</style>

