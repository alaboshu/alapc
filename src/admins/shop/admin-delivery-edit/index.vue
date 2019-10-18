<template>
  <x-border title="运费模板编辑" icon="icon-5333-icon38">
    <div slot="headerRight">
      <el-button @click="addRegion" class="newly-increased">新增配送区域</el-button>
    </div>
    <div class="el-main">
      <el-form label-position="left">
        <div class="template_name">
          <el-form-item label="模板名称">
            <el-input v-model="template.templateName" placeholder="最多允许输入30个汉字(60个字符)"></el-input>
            <div class="prompt-message">请输入模块名称</div>
          </el-form-item>
        </div>
        <el-form-item label="计费方式">
          <el-radio-group v-model="template.calculateType" class="container-radio" @change="radioGroup">
            <el-radio :label="0">按重量</el-radio>
            <el-radio :label="1">按件数</el-radio>
            <el-radio :label="2">按体积</el-radio>
          </el-radio-group>
          <div class="prompt-message">请选择计费方式</div>
        </el-form-item>
        <x-line title="配送区域" type="brand" icon="icon-5333-quanqudao" intro="点击右上角的按钮，新增运费模板配送区域"></x-line>
        <el-form-item label="配送区域" class="patch_area">
          <el-row :gutter="10" style="background-color:#f7f8fa">
            <el-col :span="15">可配送区域</el-col>
            <el-col :span="2">{{title}}</el-col>
            <el-col :span="2">运费(元)</el-col>
            <el-col :span="2">{{continues}}</el-col>
            <el-col :span="2">运费(元)</el-col>
          </el-row>
          <templateRegionFee :allfee="template.templateFees" :regionfee="fee" :regions="regions" v-for="(fee,index) in template.templateFees" :key="index"></templateRegionFee>
        </el-form-item>
      </el-form>
      <div class="btn_type">
        <el-button @click="save" class="new-save" :loading="loading">保存</el-button>
      </div>
    </div>
  </x-border>

</template>

<script>
  import templateRegionFee from './template_regionfee.vue'
  export default {
    components: {
      templateRegionFee
    },
    data () {
      return {
        dialogTableVisible: false,
        regions: [],
        template: {
          templateName: '示例模板',
          storeId: 0,
          calculateType: 0,
          templateFees: [{
            id: 0,
            regionList: [1],
            startFee: 10,
            endFee: 8,
            startStandard: 1,
            endStandard: 1
          }]
        },
        title: '首重(kg)',
        continues: '首件(个)',
        loading: false
      }
    },
    props: {
      widget: {},
      storeId: undefined,
      templateId: undefined
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
      this.cancel()
    },
    methods: {
      cancel () {
        return this.$route.matched[0].path + '/DeliveryTemplate/list'
      },
      async init () {
        var res = await this.$api.httpGet('api/region/all')
        this.regions = res.result
        if (this.$route.query.templateId !== undefined) {
          res = await this.$api.httpGet('api/DeliveryTemplate/ViewById', { id: this.$route.query.templateId })
          if (res.status === 1) {
            this.template = res.result
            var index = 0
            this.template.templateFees.forEach(fee => {
              fee.id = index++
            })
          } else {
            this.$alert(res.message, '提示', {
              confirmButtonText: '确定'
            }).then(() => {
              history.back(-1)
            }).catch(() => {
              history.back(-1)
            })
          }
        } else {
          this.template.userId = this.$user.id()
        }
      },
      radioGroup (val) {
        if (val === 0) {
          this.title = '首重(kg)'
          this.continues = '首件(个)'
        } else if (val === 1) {
          this.title = '首件(个)'
          this.continues = '续件(个)'
        } else if (val === 2) {
          this.title = '体积'
          this.continues = '续体积'
        }
      },
      regiinsClose (value) {
        this.dialogTableVisible = value
      },
      async addRegion () {
        var list = [...this.regions]
        while (list.length > 0) {
          var head = list[0]
          if ((head.children === undefined || head.children.length === 0)) {
            if (!this.selected(head)) {
              break
            }
          } else {
            head.children.forEach(child => {
              list.push(child)
            })
          }
          list.splice(0, 1)
        }
        if (list.length === 0) {
          this.$notify({
            title: '提示',
            message: '已覆盖全部地址，无法新增配送区域',
            type: 'tips'
          })
          return
        }

        for (let i = 0; i < this.template.templateFees.length; i++) {
          const fee = this.template.templateFees[i]
          if (fee.regionList === undefined || fee.regionList.length === 0) {
            this.$alert('存在未选择地址的配送区域', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${action}`
                })
              }
            })
            return
          }
        }

        this.template.templateFees.push({
          id: this.template.templateFees.length,
          regionList: [],
          startFee: 10,
          endFee: 8,
          startStandard: 1,
          endStandard: 1
        })
      },
      selected (region) {
        for (var feeIndex in this.template.templateFees) {
          var fee = this.template.templateFees[feeIndex]
          if (this.array_contain(fee.regionList, region.id)) {
            return true
          }
        }
        return false
      },
      array_contain (array, obj) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === obj) { return true }
        }
        return false
      },
      async save () {
        this.loading = true
        var data = []
        this.template.storeId = this.$user.loginUser().store.id
        data.push(this.template)
        var res = await this.$api.httpPost('Api/DeliveryTemplate/SaveDeliveryTemplate', data)
        if (res !== undefined && res.status === 1) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: 'tips'
          })

          if (this.$route.path.substr(0, 12).toLowerCase() === '/admin-store') {
            this.$router.push('/admin-store/delivery/list')
          } else {
            this.$router.push('/user/deliveryTemplate/list')
          }
          // toLowerCase
        } else {
          this.$notify({
            title: '警告',
            message: '保存失败：' + (res === undefined ? '服务器异常' : res.message),
            type: 'warning'
          })
        }
        this.loading = false
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
