<template>
  <x-border v-if="data" :title="data.title" :type="data.type" icon="flaticon-alert">
    <div class="admin-operation-interface">
      <div class="operation_box">
        <div class="m-portlet__body">
          <div class="alert-primary mistake-primary" :style="'background-color:'+backgroundColor">
            <div class="alert-primary_text">
              <i class="flaticon-danger"></i>
              <span class="alert-conter">操作成功<span class="operator-text">操作成功</span></span>
            </div>
          </div>
          <div class="alert-primary_buttom">
            <div class="buttom-a" @click="getReturn(0)">返回上一页</div>
            <div class="buttom-a" @click="goHome">系统首页</div>
            <div class="buttom-a" @click="goUrl(item)" v-for="(item,index) in history" :key="index" v-show="index<=2 &&item.name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </x-border>

</template>
<script>
  export default {
    data () {
      return {
        data: null,
        backgroundColor: '',
        history: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.data = {
          message: this.$route.query.message,
          type: this.$crud.getType()
        }
        this.data.type = 'success'
        if (this.data.type === 'danger' || this.data.type === 'error') {
          this.data.type = 'danger'
          this.backgroundColor = '#f4516c'
        }
        if (!this.data.title) {
          this.data.title = '提示信息'
        }
        this.history = this.$api.vuexLocalGet('admin_browsing_history')
      },
      getReturn () {
        var list = this.$api.vuexLocalGet('admin_browsing_history')
        var item = list[0]
        this.$admin.to(item.name, item.url)
        this.$router.push(item.url)
      },
      goHome () {
        this.$router.push('/admin/index')
      },
      goUrl (item) {
        this.$admin.to(item.name, item.url)
        this.$router.push(item.url)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>

