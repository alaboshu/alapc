<template>
  <x-border title="运费设置">
    <div class="setprice-set">
      <el-input class="input" v-model="text" @input.native="change"></el-input>
      <router-link :to="'/Admin-Store/delivery/edit?storeId='+storeId">
        <el-button type="primary" class="setprice_buttom" @click="fregth">新建运费模板</el-button>
      </router-link>
      <el-table :data="templateList" border style="width: 96%;margin: 0 auto;">
        <el-table-column prop="templateName" label="模板" width="315"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link tag="a" :to="'/Admin-Store/delivery/edit?templateId='+scope.row.id">编辑</router-link>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </x-border>
</template>


<script>
  export default {
    props: {
      widgetData: {}
    },
    data () {
      return {
        templateList: [],
        storeId: undefined,
        text: ''
      }
    },
    mounted () {
      if (this.$route.query.storeId !== undefined) {
        this.storeId = this.$route.query.storeId
      }
      this.init()
    },
    methods: {
      async handleDelete (template) {
        this.$confirm('删除后不可恢复，确认删除?", "提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading'
          })
          var para = {
            storeId: template.storeId,
            id: template.id,
            userId: this.$user.id()
          }
          var response = await this.$api.httpDelete('/Api/DeliveryTemplate/DeleteDeliveryTemplate', para)
          this.$crud.message(response)
          loading.close()
          this.init()
        })
      },
      async init () {
        this.storeId = this.$user.loginUser().store.id
        var res = await this.$api.httpGet(
          '/Api/DeliveryTemplate/GetDeliveryTemplateList',
          { storeId: this.storeId }
        )
        // this.$crud.message(this, res)
        this.templateList = res.result
        this.data = res.result
      },
      change (val) {
        var list = []
        this.data.forEach(element => {
          if (element.templateName.indexOf(val.target.value) > -1) {
            list.push(element)
          }
        })
        this.templateList = list
      },
      fregth () {
        // this.$route.push('/test/deliveryTemplate/edit?storeId=' + this.storeId)
      }
    }
  }
</script>





<style lang="scss">
  @import "~./styles/set.scss";
</style>
