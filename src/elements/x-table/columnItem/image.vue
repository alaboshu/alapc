<template>
  <img v-lazy="imageUrl" :width="imageWidth" :height="imageWidth" v-if="imageUrl" />
</template>
<script>
  export default {
    data () {
      return {
        imageUrl: null,
        imageWidth: '36px'
      }
    },
    props: {
      url: {
        default: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.imageUrl = this.getImage(this.url)
      },
      getImage (imageUrl) {
        if (imageUrl !== undefined && imageUrl !== null) {
          if (imageUrl.substr(0, 7).toLowerCase() === 'http://' || imageUrl.substr(0, 7).toLowerCase() === 'https:/') {
            return imageUrl
          }
          return this.$api.baseUrl() + imageUrl
        }
        return imageUrl
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-table td {
    img {
      border-radius: 50%;
    }
  }
</style>
