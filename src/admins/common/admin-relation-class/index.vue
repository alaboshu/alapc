<template>
  <div v-if="inshow">
    <x-border icon="zk-home" :title="borderTitle" color="accent">
      <div class="relation" v-if="async">
        <el-button class="buttom" @click="addclass(0)" type="primary">添加分类</el-button>
        <zk-treetable :data="viewModel" :edit="edit" :addclass="addclass" :columns="columns" :detele="detele" class="content" border></zk-treetable>
      </div>
    </x-border>
    <Dialog :viewModel="data" :save="save" :singleData="singleData" ref="dialogForm"></Dialog>
  </div>
</template>


<script>
  import Dialog from './class-dialog'
  export default {
    props: {
      widgetData: {},
      title: {}
    },
    data () {
      return {
        async: false,
        columns: [
          {
            text: '名称',
            type: 'name',
            width: 200
          },
          {
            text: '图标',
            type: 'image'
          },
          {
            text: '操作',
            type: 'set'
          }
        ],
        viewModel: [],
        inshow: false,
        baseUrl: this.$api.baseUrl(),
        singleData: '',
        viewName: '',
        borderTitle: ''
      }
    },
    components: {
      Dialog
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.borderTitle = this.title
        this.async = false
        var type = this.$crud.getType()
        var para = {
          type: type,
          userId: this.$user.id(this.widgetData.tenan)
        }
        var data = await this.$crud.getView('Api/relation/ViewById')
        if (this.$route.query.Type !== '' && this.$route.query.Type !== null && this.$route.query.Type !== undefined) {
          data.type = this.$route.query.Type
          para.type = this.$route.query.Type
        } else {
          data.type = type
        }
        var respone = await this.$api.httpGet('/Api/relation/getclass', para)
        data.userId = this.$user.id(this.widgetData.tenan)
        this.viewModel = respone.result.datas
        this.borderTitle = respone.result.title
        this.data = data
        this.inshow = true
        this.async = true
      },
      detele (id) {
        this.$confirm('此操作将删除此分类，是否继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.getHttp(id)
        }).catch(() => { })
      },
      async getHttp (id) {
        var response = await this.$api.httpDelete('Api/Relation/Delete?id=' + id, {})
        if (response.status === 1) {
          this.init()
        } else {
          this.$notify.error({
            title: '删除失败',
            message: response.message,
            position: 'bottom-right'
          })
        }
      },
      async edit (id) {
        this.$refs.dialogForm.dialogFormVisible = true
        this.data.id = id
        var data = {
          id
        }
        this.singleData = await this.$api.httpGet('Api/Relation/GetView', data)
      },
      addclass (id) {
        this.singleData = ''
        this.data.fatherId = id
        this.$refs.dialogForm.dialogFormVisible = true
      },
      async save () {
        var respone
        if (this.singleData.result) {
          respone = await this.$api.httpPost('Api/Relation/Save', this.singleData.result)
        } else {
          respone = await this.$api.httpPost('Api/Relation/Save', this.data)
        }
        if (respone.status === 1) {
          this.init()
          this.$refs.dialogForm.dialogFormVisible = false
        } else {
          this.$notify({
            title: '保存失败',
            message: respone.message,
            position: 'bottom-right'
          })
        }
      },
      getPath () {
        this.init()
      }
    },
    watch: {
      widgetData: 'getPath'
    }
  }
</script>



<style lang="scss" scoped>
  .relation {
    .buttom {
      margin: 0 15px 15px 0;
      float: right;
    }
    .content {
      width: 97%;
      margin: 15px auto;
    }
  }
</style>


