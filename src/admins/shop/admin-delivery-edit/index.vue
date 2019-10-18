<template>
  <x-border title="运费模板编辑" icon="icon-5333-icon38">

    <div class="el-main" v-if="viewModel" v-loading="loading">
      <el-form label-position="left">
        <el-form-item label="模板名称">
          <el-input v-model="viewModel.name" placeholder="最多允许输入30个汉字(60个字符)"></el-input>
          <div class="prompt-message">请输入运费模块名称</div>
        </el-form-item>
        <el-form-item label="费用承担方式">
          <x-radio type="deliveryTemplateType" v-model="viewModel.templateType"></x-radio>
          <div class="prompt-message">请输入运费模块名称</div>
        </el-form-item>
        <el-form-item label="计费方式" v-if="viewModel.templateType===1">
          <el-radio-group v-model="viewModel.calculateType" class="container-radio" @change="changeTemplateText">
            <el-radio :label="0">按重量</el-radio>
            <el-radio :label="1">按件数</el-radio>
            <el-radio :label="2">按体积</el-radio>
          </el-radio-group>
          <div class="prompt-message">请选择计费方式</div>
        </el-form-item>
        <el-form-item :label="'默认'+templateText.startTitle" v-if="viewModel.templateType===1">
          <el-input-number v-model="viewModel.startStandard" :precision="2" placeholder=""></el-input-number>
          <div class="prompt-message">默认首重,模板区域未找到时使用默认{{templateText.startTitle}}计算</div>
        </el-form-item>
        <el-form-item label="默认首费(单元：元)" v-if="viewModel.templateType===1">
          <el-input-number v-model="viewModel.startFee" :precision="2" placeholder=""></el-input-number>
          <div class="prompt-message">默认首费,模板区域未找到时使用默认首费计算</div>
        </el-form-item>
        <el-form-item :label="'默认'+templateText.continueTitle" v-if="viewModel.templateType===1">
          <el-input-number v-model="viewModel.endStandard" :precision="2" placeholder=""></el-input-number>
          <div class="prompt-message">默认{{templateText.continueTitle}},模板区域未找到时使用默认{{templateText.continueTitle}}计算</div>
        </el-form-item>
        <el-form-item label="默认续费(单元：元)" v-if="viewModel.templateType===1">
          <el-input-number v-model="viewModel.endFee" :precision="2" placeholder=""></el-input-number>
          <div class="prompt-message">默认续费,模板区域未找到时使用默认续费计算</div>
        </el-form-item>
        <x-line title="配送区域" type="brand" icon="icon-5333-quanqudao" intro="点击右上角的按钮，新增运费模板配送区域" v-if="viewModel.templateType===1">
          <div slot="headerRight">
            <el-button @click="addRegion" class="newly-increased">新增配送区域</el-button>
          </div>
        </x-line>
        <el-form-item label="配送区域" class="patch_area" v-if="viewModel.templateType===1">
          <el-row :gutter="10" style="background-color:#f7f8fa">
            <el-col :span="15">可配送区域</el-col>
            <el-col :span="2">{{templateText.startTitle}}</el-col>
            <el-col :span="2">运费(元)</el-col>
            <el-col :span="2">{{templateText.continueTitle}}</el-col>
            <el-col :span="2">运费(元)</el-col>
          </el-row>
          <templateRegionFee :allfee="viewModel.templateFees" :regionfee="fee" :regions="regions" v-for="(fee,index) in viewModel.templateFees" :key="index"></templateRegionFee>
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
        regions: null,
        viewModel: null,
        templateText: {
          startTitle: '首重(kg)',
          continueTitle: '续重(个)'
        },
        loading: true
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
        if (this.regions == null) {
          var res = await this.$api.httpGet('api/region/all')
          this.regions = res.result
        }
        var para = {
          id: this.$crud.getId()
        }
        res = await this.$api.httpGet('api/DeliveryTemplate/ViewById', para)
        if (res.status === 1) {
          this.viewModel = res.result
        } else {
          this.$api.alert(res.message)
        }
        this.loading = false
        console.info('this.viewModel', this.viewModel)
      },
      changeTemplateText (val) {
        if (val === 0) {
          this.templateText = {
            startTitle: '首重(kg)',
            continueTitle: '续重(kg)'
          }
        } else if (val === 1) {
          this.templateText = {
            startTitle: '首重(个)',
            continueTitle: '续件(个)'
          }
        } else if (val === 2) {
          this.templateText = {
            startTitle: '体积',
            continueTitle: '续体积'
          }
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

        for (let i = 0; i < this.viewModel.templateFees.length; i++) {
          const fee = this.viewModel.templateFees[i]
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

        this.viewModel.templateFees.push({
          id: this.viewModel.templateFees.length,
          regionList: [],
          startFee: 10,
          endFee: 8,
          startStandard: 1,
          endStandard: 1
        })
      },
      selected (region) {
        for (var feeIndex in this.viewModel.templateFees) {
          var fee = this.viewModel.templateFees[feeIndex]
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
        var response = await this.$api.httpPost('Api/DeliveryTemplate/Save', this.viewModel)
        if (response.status === 1) {
          this.$notify({
            title: '成功',
            message: '运费模板保存成功',
            type: 'success',
            position: 'bottom-right'
          })
        } else {
          this.$api.alert('保存失败：' + response.message)
        }
        this.loading = false
      }
    }
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
