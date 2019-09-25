<template>
  <div class="zk-product-nav" v-if="async">
    <div class="product-nav_box">
      <router-link v-for="(item, index) in viewModel" :key="index" :to="item.url.value">
        <img :src="item.image" />
        {{item.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
  
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        viewModel: [],
        async: false
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        // this.widgetModel = await this.$api.isApiReqGet(this.widget)
        this.viewModel = this.widget.value.links
        this.async = true
      }
    }
  }
</script>
