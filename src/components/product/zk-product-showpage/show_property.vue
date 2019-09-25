<template>
  <div>
    <div class="magnify">
      <div class="preview-box" @mousemove="move($event)" @mouseout="out" ref="previewBox">
        <img width="100%" :src="previewImg" alt="">
        <div class="hover-box" ref="hoverBox"></div>
      </div>
      <div class="zoom-box" v-show="zoomVisiable" ref="zoomBox">
        <img :src="zoomImg" alt="" ref="bigImg">
      </div>
    </div>
  </div>

</template>

<script>
  function offset (el) {
    let top = el.offsetTop
    let left = el.offsetLeft
    while (el.offsetParent) {
      el = el.offsetParent
      top += el.offsetTop
      left += el.offsetLeft
    }
    return {
      left: left,
      top: top
    }
  }
  export default {
    name: 'magnify',
    props: {
      previewImg: {
        type: String,
        default: ''
      },
      zoomImg: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        zoomVisiable: false,
        hoverVisiable: false,
        min: 'https://img.alicdn.com/imgextra/i3/2857774462/TB21fgcwwNlpuFjy0FfXXX3CpXa_!!2857774462.jpg_430x430q90.jpg',
        max: 'https://img.alicdn.com/imgextra/i3/2857774462/TB21fgcwwNlpuFjy0FfXXX3CpXa_!!2857774462.jpg'

      }
    },
    methods: {
      out () {
        this.zoomVisiable = false
      },
      move (ev) {
        this.init()
        // 鼠标距离屏幕距离
        let moveX = ev.clientX
        let moveY = ev.clientY
        // 大盒子距离顶部的距离
        let offsetLeft = offset(this.oPreviewBox).left

        let offsetTop = offset(this.oPreviewBox).top
        let left = moveX - offsetLeft - this.houverWidth / 2
        let top
        if (this.scroll > 0) {
          top = moveY - offsetTop + this.scroll - this.houverHeight / 2
        } else {
          top = moveY - offsetTop - this.houverHeight / 2
        }
        let maxWidth = this.pWidth - this.houverWidth
        let maxHeight = this.pWidth - this.houverHeight
        left = left < 0 ? 0 : left > maxWidth ? maxWidth : left
        top = top < 0 ? 0 : top > maxHeight ? maxHeight : top
        let percentX = left / (maxWidth)
        let percentY = top / (maxHeight)
        this.oHoverBox.style.left = left + 'px'
        this.oHoverBox.style.top = top + 'px'
        this.oBigImg.style.left = percentX * (this.bWidth - this.imgWidth) + 'px'
        this.oBigImg.style.top = percentY * (this.bHeight - this.imgHeight) + 'px'
        this.$emit('move', ev)
        this.zoomVisiable = true
      },
      init () {
        this.oHoverBox = this.$refs.hoverBox
        this.oPreviewBox = this.$refs.previewBox
        this.oBigImg = this.$refs.bigImg
        this.imgBox = this.$refs.zoomBox
        this.houverWidth = this.oHoverBox.offsetWidth
        this.houverHeight = this.oHoverBox.offsetHeight
        this.pWidth = this.oPreviewBox.offsetWidth
        this.pHeight = this.oPreviewBox.offsetHeight
        this.imgWidth = this.oBigImg.offsetWidth
        this.imgHeight = this.oBigImg.offsetHeight
        this.bWidth = this.imgBox.offsetWidth
        this.bHeight = this.imgBox.offsetHeight
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop
      }
    }
  }
</script>
<style lang="scss" scoped>
  .magnify {
    position: relative;
    width: 405px;
    height: 405px;
    border: 1px solid #f0f0f0;
    .preview-box {
      position: relative;
      img {
        width: 100%;
       height: 405px;
        // height: 100%;
      }
      &:hover .hover-box {
        display: block;
      }
      .hover-box {
        position: absolute;
        display: none;
        left: 0;
        top: 0;
        width: 100px;
        height: 100px;
        border: 1px solid #545454;
        background: url("https://img-tmdetail.alicdn.com/tps/i4/T12pdtXaldXXXXXXXX-2-2.png")
          repeat 0 0;
        cursor: move;
        user-select: none;
      }
    }
    .zoom-box {
      width: 480px;
      height: 480px;
      overflow: hidden;
      position: absolute;
      left: 403px;
      top: 0;
      z-index: 99;
      border: 1px solid #f0f0f0;
      img {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>

