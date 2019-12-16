<template>
  <div class="zk-head-user">
    <div class="pc-p-head-user">
      <div class="header-left">
        <router-link to="http://ui.5ug.com/static/hehe/swiper/01.jpg" class="head-logo"></router-link>
        <p class="logo-title">欢迎登陆</p>
      </div>
    </div>
  </div>
</template>
<script>
  
  export default {
    
    data () {
      return {
        widgetModel: ''
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
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import "~_style/theme.scss";
  .zk-head-user {
    height: 110px;
    line-height: 110px;
    border-bottom: 3px solid #ccc;
    .header-left {
      width: 68%;
      height: 110px;
      margin: 0 auto;
      font-size: 24px;
    }

    .head-logo {
      // 宽度为高度的3.2倍
      float: left;
      width: 160px;
      height: 50px;
      margin-top: 30px;
      margin-right: 20px;
      background-image: url(http://upload-images.jianshu.io/upload_images/15475986-4a8aec0d4e216f89.png);
      background-size: cover;
    }
    .logo-title {
      float: left;
      font-size: 24px;
      color: #333;
    }
    .header-right {
      float: right;

      .right-text {
        float: left;
        font-size: 16px;
        color: #999;
      }
      .right-link {
        display: inline-block;
        float: left;
        font-size: 16px;
        color: #c81623;
      }
      .right-link:hover {
        text-decoration: underline;
      }
    }
  }
</style>
