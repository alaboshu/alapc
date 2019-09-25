<template>
  <div class="admin-reward-sidebar">
    <div class="reward-sidebar_head">
      <i class="icon iconfont" :class="sidebarValue.icon"></i>
      <div class="head-title">{{sidebarValue.title}}</div>
    </div>
    <ul class="reward-sidebar_ul">
      <li class="reward-sidebar_li" v-for="(item,index) in sidebarValue.links" :key="index" @click="sidebarTo(item)">
        <i class="icon iconfont" :class="item.icon"></i>
        <div class="reward-sidebar_text">{{item.name}}</div>
      </li>
    </ul>
    <!-- <ul class="configuration_ul">
      <li class="configuration_li" v-for="(tionItem,tionIndex) in 6" :key="tionIndex">
        <div class="configuration_left">
          <p class="one-p">配置数量</p>
          <p class="two-p">所有的配置数量</p>
        </div>
        <div class="configuration_right">0</div>
      </li>
    </ul> -->
  </div>
</template>

<script>
  import sidebar from './sidebar.json'
  import './var.scss'

  export default {
    data () {
      return {
        widgetModel: {},
        sidebarValue: ''
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
        this.sidebarValue = sidebar
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      sidebarTo (val) {
        this.$router.push(val.url)
      }
    }
  }
</script>
