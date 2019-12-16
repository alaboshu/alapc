<template>
  <div class="zk-cell">
    <div v-if="async">
      <div v-if="isGroupLink">
        <div class="zk-cell_box" v-for="(group,groupIndex) in widgetModel.value" :key="groupIndex">
          <x-cell :elementData="group.links"></x-cell>
        </div>
        <div v-if="isGroupLink&&isLogin">
          <x-cell :tuchulist="tuchulist" @click="loginOut()" v-if="tuchulist"></x-cell>
        </div>
      </div>
      <div class="zk-cell_box" v-if="!isGroupLink">
        <x-cell :elementData="widgetModel.value"></x-cell>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default {
    
    data () {
      return {
        isLogin: false,
        widgetModel: '',
        async: false,
        isGroupLink: false, // 分组链接
        tuchulist: [
          { name: '退出登陆', image: 'zk-orderlist' }
        ]
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
    methods: {
      loginOut () {
        this.$api.localRemove('user')
        this.$api.localRemove('default_address')
        // this.$api.vuexSet('loginUser', null)
        // this.$api.vuexSet('loginUserTenant', null)
        window.location = '/login'
      },
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        if (this.widgetModel.apiUrl === '/api/theme/getlinkgroup') {
          this.isGroupLink = true
        }
        for (var i = 0; i < this.widgetModel.value.length; i++) {
          if (this.widgetModel.value[i].links !== undefined) {
            for (var io = 0; io < this.widgetModel.value[i].links.length; io++) {
              if (this.widgetModel.value[i].links[io].name === '退出登陆') {
                this.isLogin = true
              }
            }
          }
        }
        this.async = true
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "~_style/theme.scss";
  .zk-cell {
    background-color: #f8f8f8;
    border-top: 1px solid transparent;
  }
  .zk-cell_box:last-child {
    padding-bottom: 50px;
    margin-bottom: 70px;
  }
  .tuchucell::before {
    border-top: none !important;
  }
</style>


