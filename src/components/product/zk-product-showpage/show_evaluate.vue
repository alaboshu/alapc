<template>
  <div class="show_evaluate">
    <h3><u>卖家评价</u></h3>
    <div class="show_evaluate_top">
      <!-- <div class="show_evaluate_top_head">
        <el-rate value='3'></el-rate>
        <div class="text">4.0分</div>
        <div>
          <div class="text_all">描述相符</div>
          <el-rate show-score score-template='2' value1="2"></el-rate>
        </div>
        <div>
          <div class="text_all">商品质量</div>
          <el-rate show-score score-template='4' value1="4"></el-rate>
        </div>
      </div> -->
      <ul class="show_evaluate_top_bottom">
        <li>款式好（1）</li>
        <span>|</span>
        <li>料子很不错（6）</li>
        <span>|</span>
        <li>性比价高（1）</li>
      </ul>
    </div>
    <div class="evaluate_top">
      <div>全部评价（12）</div>
      <div>晒图（3）</div>
    </div>
    <ul>
      <li class="evaluate-cont" v-for="item in list" :key="item">
        <img src="https://s11.mogucdn.com/mlcdn/5abf39/180815_4i1adf97f8k5a183cek91884a2ab2_100x100.jpg_64x64.jpg" alt="">
        <div class="evaluate-cont_right">
          <div class="evaluate_cont_top">
            <div>阳光192</div>
            <div>2019年03月03日</div>
          </div>
          <p>衣服很漂亮时尚潮流，穿上很舒服合身，价格也实惠。</p>
          <p>颜色:粉红色 尺码:M </p>
          <p>是否合身: 合身</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [1, 2, 3, 4, 5]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .show_evaluate {
    width: 100%;
    border-right: 1px solid #e5e5e5;
    h3 {
      font-size: 16px;
      padding-top: 40px;
    }
    .show_evaluate_top {
      margin-top: 15px;
      width: 97%;
      height: 100px;
      background: #fafafa;
      border: 1px solid #e5e5e5;
      .show_evaluate_top_head {
        height: 66px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        line-height: 66px;
        .el-rate {
          margin-left: 20px;
          margin-top: 25px;
        }
        .text {
          margin-left: 10px;
          padding-right: 10px;
          font-size: 25px;
          color: #ef2f23;
          border-right: 1px dashed #e5e5e5;
        }
      }
      .text_all {
        height: 20px;
        text-align: center;
        color: #494646;
      }
      .show_evaluate_top_bottom {
        display: flex;
        justify-items: center;
        padding-top: 10px;
        li {
          margin: 0 10px;
          color: #ef2f23;
        }
      }
    }
    .evaluate_top {
      margin-top: 20px;
      display: flex;
      div {
        margin-right: 10px;
        color: #666;
        cursor: pointer;
      }
    }
    .evaluate-cont {
      margin-top: 10px;
      height: 85px;
      width: 97%;
      display: flex;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0;
      }
      .evaluate-cont_right {
        margin-left: 10px;
        color: #909399;
        p {
          min-height: 18px;
        }
        p:nth-of-type(1) {
          font-size: 13px;
          color: #666;
          margin-bottom: 4px;
          line-height: 18px;
          word-break: break-all;
          word-wrap: break-word;
        }
        .evaluate_cont_top {
          display: block;
          width: 590px;
          height: 22px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>

<style>
  .el-rate__icon {
    margin: 0;
  }
</style>
