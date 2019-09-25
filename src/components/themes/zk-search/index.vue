<template>
  <view class="zk-search">{{widgetModel}}</view>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        widgetModel: {}
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      onSubmit () {
        this.$refs.search.setBlur()
        if (this.value === '' || this.value === undefined || this.value === null) {
          this.$api.toastWarn('输入内容不能为空')
        } else {
          // this.$router.push('/product/list?Keyword=' + this.value)
          window.location = '/product/list?Keyword=' + this.value
        }
      },
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      }
    }
  }
</script>
