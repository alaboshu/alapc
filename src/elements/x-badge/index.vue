<template>
  <span class="x-badge" :style="'background-color:'+backGroundColor+';color:'+fontColor">
    <slot></slot>
  </span>
</template>
<script>
  export default {
    data () {
      return {
        backGroundColor: '',
        fontColor: ''
      }
    },
    props: {
      color: {
        default: 'brand'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.convert(this.color)
      },
      convert (colorType) {
        if (colorType === 'brand') {
          this.backGroundColor = '#716aca'
          this.fontColor = '#ffffff'
        } else if (colorType === 'info') {
          this.backGroundColor = '#36a3f7'
          this.fontColor = '#ffffff'
        } else if (colorType === 'metal') {
          this.backGroundColor = '#575962'
          this.fontColor = '#ffffff'
        } else if (colorType === 'primary') {
          this.backGroundColor = '#5867dd'
          this.fontColor = '#ffffff'
        } else if (colorType === 'success') {
          this.backGroundColor = '#34bfa3'
          this.fontColor = '#ffffff'
        } else if (colorType === 'warning') {
          this.backGroundColor = '#ffb822'
          this.fontColor = '#ffffff'
        } else if (colorType === 'focus') {
          this.backGroundColor = '#9816f4'
          this.fontColor = '#ffffff'
        } else if (colorType === 'accent') {
          this.backGroundColor = '#00c5dc'
          this.fontColor = '#ffffff'
        } else if (colorType === 'danger') {
          this.backGroundColor = '#f4516c'
          this.fontColor = '#ffffff'
        } else if (colorType === 'light') {
          this.backGroundColor = '#ffffff'
          this.fontColor = '#575962'
        } else {
          this.fontColor = '#575962'
          this.backGroundColor = this.bgColor
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .x-badge {
    padding: 0;
    margin: 0;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    font-size: 0.8rem;
    height: 0;
    width: auto;
    padding: 0.75rem 0.75rem;
    border-radius: 2px;
  }
</style>
