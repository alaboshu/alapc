<template>
  <x-border v-if="data" :title="data.type==='success'?'操作成功':'操作失败'" :type="data.type" icon="flaticon-alert">
    <div class="admin-operation-interface">
      <div class="operation_box">
        <div class="m-portlet__body">
          <div class="alert-primary mistake-primary" :style="'background-color:'+backgroundColor">
            <div class="alert-primary_text">
              <i class="flaticon-danger"></i>
              <span class="alert-conter">{{data.type==='success'?'操作成功':'操作失败'}}<span class="operator-text">{{data.message}}</span></span>
            </div>
          </div>
          <div class="alert-primary_buttom">
            <div class="buttom-a" @click="getReturn(0)">返回上一页</div>
            <div class="buttom-a" @click="goUrl(item)" v-for="(item,index) in history" :key="index" v-show="index<=4 &&item.name">{{item.name}}</div>
            <div class="buttom-a buttom-home" @click="goHome">系统首页</div>
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
        if (!this.data.type) {
          this.data.type = 'success'
        }
        if (this.data.type === 'danger' || this.data.type === 'error') {
          this.data.type = 'danger'
          this.backgroundColor = '#f4516c'
        }
        this.history = this.$api.vuexLocalGet('admin_browsing_history')
        this.history = this.history.filter(r => r.id && r.name && r.url)
      },
      getReturn () {
        this.$router.go(-1)
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

