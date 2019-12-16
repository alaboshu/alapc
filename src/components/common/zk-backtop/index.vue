<template>
  <div class="zk-backtop">
    <!-- <div class="pc-p-backtop" element-path="pc/p-backtop">
    <div class="side-gation">
      <ul class="side-gation_ul">
        <li>
          <router-link   to="http://zkgs.5ug.com/home/index">
            <x-icon src="zk-me" size="20"></x-icon>
          </router-link>
        </li>
        <li class="side-gation_cart" style="display:none">
          <router-link   to="">
            <x-icon src="zk-cart" size="20"></x-icon>
            <div class="side-gation_shoppingcart">购物车</div>
            <span class="side-gation_sentiment">0</span>
          </router-link>
        </li>
        <li style="display: none">
          <router-link   to="">
            <x-icon src="zk-ordershare" size="20"></x-icon>
          </router-link>
        </li>
        <li>
          <router-link   to="/share/index">
            <x-icon src="zk-fenrun" size="20"></x-icon>
          </router-link>
        </li>
        <li>
          <router-link   to="/articles/help/show">
            <x-icon src="zk-service" size="20"></x-icon>
          </router-link>
        </li>
        <li>
          <router-link   to="/user/favarite/index">
            <x-icon src="zk-favorite" size="20"></x-icon>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="the-second">
      <ul class="side-gation_ul">
        <li style="display: none">
          <router-link   class="side-gation_img" to="">
            <x-icon src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535715664363&di=4582af893a3abe9a63bf794cf854fdcf&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F48540923dd54564e747d6305b8de9c82d1584ff6.jpg" size="20"></x-icon>
          </router-link>
        </li>
        <li>
          <router-link   to="/user/qrcode">
            <x-icon src="zk-scan" size="20"></x-icon>
          </router-link>
        </li>
        <li class="side-gation_li3" :class="{'scrolldisplay':listscroll==true}">
          <router-link   to="">
            <x-icon src="zk-uparrow" size="20"></x-icon>
          </router-link>
        </li>
      </ul>
    </div>
  </div> -->
    <div></div>
  </div>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: '',
        viewModel: '',
        listscroll: false
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
      window.addEventListener('scroll', this.scrolltoptop, true)
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      scrolltoptop () {
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrolltop >= 500) {
          this.listscroll = true
        } else {
          this.listscroll = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~_style/theme.scss";
  .zk-backtop {
    font-size: $gl-size-base;
    height: 100%;
    background-color: black;
    width: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    right: 0px;
    top: 0px;
    z-index: 999;
  }
  .side-gation_ul li {
    text-align: center;
    margin-bottom: 10px;
  }
  .side-gation_ul li a {
    color: $gl-light;
  }
  .side-gation_ul li:hover {
    background-color: $gl-brand;
  }
  .side-gation_ul li:hover .side-gation_sentiment {
    color: $gl-brand;
    background-color: $gl-light;
  }
  .side-gation_shoppingcart {
    width: 20px;
    margin: 0 auto;
  }
  .side-gation_sentiment {
    display: inline-block;
    background-color: $gl-brand;
    padding: 0px 6px;
    border-radius: 100%;
  }
  .the-second {
    width: 35px;
    position: absolute;
    bottom: 0% !important;
  }
  .side-gation_img {
    display: inline-block;
    margin-top: 5px;
  }
  .side-gation_img img {
    border-radius: 100%;
  }
  .side-gation_li3 {
    display: none;
  }
  .scrolldisplay {
    display: block;
  }
</style>
