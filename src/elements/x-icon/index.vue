<template>
  <div :class="{'pdisplaystyle':pdisplay==true}">
    <i :class="src+' icon iconfont '+xClass" v-if="!isImage" :style="'font-size:'+size+'px;color:'+color"></i>
    <img class="images" :class="xClass" :src="imgSrc" @click="onClick" :style="'width:'+size+'px;height:'+size+'px'" v-if="isImage">
  </div>
</template>

<script>
  export default {
    name: 'x-icon',
    props: {
      src: {
        type: String
      },
      xClass: {
        type: String
      },
      color: {},
      link: [String, Object],
      size: {
        default: 20
      },
      gridsizes: {},
      pdisplay: {}
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    data () {
      return {
        imgSrc: '',
        isImage: true
      }
    },
    computed: {
      clazz () {
        return {
          'svg-icon': true,
          spin: this.spin
        }
      }
    },
    methods: {
      init () {
        if (this.src !== undefined) {
          if (this.src.indexOf('/') <= 0) {
            // 不是远程图标，使用本地图标
            this.imgSrc = this.src
            this.isImage = false
          } else {
            this.imgSrc = this.src
            this.isImage = true
          }
          if (this.gridsizes === false) {
            this.size = 30
          }
        }
      },
      onClick () {
        if (this.link != null) {
          this.$router.push(this.link)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~_style/index.scss";
  img {
    vertical-align: baseline;
    margin: 0 auto;
  }
  .svg-icon {
    display: inline-block;
    fill: currentColor;
  }
  .pdisplaystyle {
    display: inline-block;
  }
  .weex-root figure {
    margin: 0 auto;
  }
  .images {
    margin: 0 auto;
  }
  .i-color {
    color: $gl-brand;
  }
</style>
