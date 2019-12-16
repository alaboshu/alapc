<template>
  <div class="zk-image">
    <router-link :to="viewModel.Url" :title="viewModel.Name" :style="'width:'+width+';height:'+height" v-if="isArray">
      <img :src="viewModel.Image" :alt="viewModel.Name">
    </router-link>
    <router-link :to="url" :title="name" :style="'width:'+width+';height:'+height" v-if="!isArray">
      <img :src="src" :alt="name">
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'x-image',
    props: {
      elementData: {},
      width: {
        default: '100%'
      },
      height: {
        default: '180px'
      },
      src: {},
      url: {},
      name: {
        default: ''
      }
    },
    data () {
      return {
        viewModel: '',
        isArray: true
      }
    },
    async onShow () {
    },
    mounted () {
      if (this.elementData !== undefined) {
        this.viewModel = this.elementData
        this.isArray = true
      } else {
        this.isArray = false
      }
    },
    methods: {
    }
  }
</script>


<style  lang="scss" scoped>
  @import "~_style/theme.scss";
  .zk-image {
    font-size: $gl-size-base;
    a {
      display: block;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
