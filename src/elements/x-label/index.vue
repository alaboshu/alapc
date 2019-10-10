<template>
  <span class="x-label" :style="'color:'+fontColor">
    <slot></slot>
  </span>
</template>
<script>
  export default {
    data () {
      return {
        fontColor: '#5867dd'
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
          this.fontColor = '#716aca'
        } else if (colorType === 'info') {
          this.fontColor = '#36a3f7'
        } else if (colorType === 'metal') {
          this.fontColor = '#575962'
        } else if (colorType === 'primary') {
          this.fontColor = '#5867dd'
        } else if (colorType === 'success') {
          this.fontColor = '#34bfa3'
        } else if (colorType === 'warning') {
          this.fontColor = '#ffb822'
        } else if (colorType === 'focus') {
          this.fontColor = '#9816f4'
        } else if (colorType === 'accent') {
          this.fontColor = '#00c5dc'
        } else if (colorType === 'danger') {
          this.fontColor = '#f4516c'
        } else if (colorType === 'light') {
          this.fontColor = '#575962'
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .x-label {
    font-weight: 800;
    font-size: 1.2rem;
  }
</style>
