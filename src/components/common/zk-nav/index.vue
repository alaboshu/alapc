<template>
  <div class="zk-nav">
    <ul>
      <li class=" nav_index " :class="{'nav-active':navActive===-1}">
        <router-link to="/index">首页</router-link>
      </li>
      <li class="nav_item" v-for="(item,itemIndex) in classModel" :key="itemIndex">
        <router-link :to="'/product/list?ClassIds='+item.id">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>


  export default {

    data () {
      return {
        widgetModel: '',
        viewModel: '',
        pdisplay: true,
        classModel: [],
        navActive: -1
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
    computed: {
      viewModelAct: function () {
        return this.viewModel.filters(function () {
          return this.viewModel.length < 6
        })
      }
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var response = await this.$api.httpGet('/api/product/class')
        this.viewModel = response.result
        var calssList = await this.$api.httpGet('/api/product/class')
        this.classModel = calssList.result
      },
      classChilren (model) {
        this.classCModel = model
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~_style/theme.scss";
  .zk-nav {
    width: 1200px;
    margin: 27px auto 0 auto;
    ul {
      display: flex;
      align-items: center;
    }
    .nav-active {
      a {
        display: block;
        color: $gl-themeColor;
        border-bottom: 3px solid $gl-themeColor;
      }
    }
    .nav_index {
      padding-right: 26px;
      font-weight: bold;
      a {
        font-size: 14px;
        padding: 7px 0;
        font-size: 15px;
        font-weight: 500;
        color: black;
      }
    }
    .nav_item {
      font-weight: bold;
      padding: 0 26px;
      a {
        padding: 7px 0;
        font-size: 15px;
        font-weight: 500;
        color: black;
      }
    }
    li:hover {
      a {
        color: $gl-themeColor;
        border-bottom: 3px solid $gl-themeColor;
      }
    }
  }
</style>
