<template>
  <x-border :title="setting.title" ref="xBorder" type="focus" icon="icon-5333-icon43">
    <div style="background:#ffffff;" class="list_detail" v-if="!setting.isAdd&&viewModel" v-loading="loading">
      <div class="container">
        <div class="container-head">
          <el-breadcrumb separator="/" class="container-head_top">
            <el-breadcrumb-item>店铺：{{viewModel.store.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>商城模式：{{viewModel.priceStyleConfig.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>
              类目：{{viewModel.category.name}}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <div class="categories" @click="isAdd = true">切换类目</div>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="failText" v-if="operation()">操作信息:{{viewModel.productDetail.productDetailExtension.aidutMessage}}</div>
        <basic ref="basic" :productView="viewModel"></basic>
        <sale :productView="viewModel"></sale>
        <imagepic :productView="viewModel" @changeImage="changeImage"></imagepic>
        <detail :productView="viewModel"></detail>
        <cat :widgetData="widgetData" :productView="viewModel" @changeClass="changeClass"></cat>
        <div class="goods_info buttom-save">
          <el-button class="goods_info-but right" v-if="judgeSave()" :loading="saveLoading" @click="save">保存</el-button>
          <el-button class="goods_button" v-if="$base.filter() === 4" @click="UnderCose">下架</el-button>
          <popup ref="dialog" :init="init" :viewModel="viewModel"></popup>
        </div>
      </div>
    </div>
    <add v-if="setting.isAdd" @selectCategory="selectCategory" :filterType="$base.filter()"></add>
  </x-border>
</template>

<script>
  import add from './add'
  import service from './service'
  import basic from './widgets/basic.vue'
  import detail from './widgets/content.vue'
  import cat from './widgets/classtag.vue'
  import imagepic from './widgets/image.vue'
  import sale from './widgets/sale.vue'
  import popup from './widgets/dialog.vue'
  import judge from './widgets/js/judge'
  export default {
    props: {
      widgetData: {}
    },
    components: {
      basic,
      sale,
      detail,
      cat,
      imagepic,
      add,
      popup
    },
    data () {
      return {
        loading: true,
        product: {},
        setting: {
          isAdd: true, // 判断是新增商品还是编辑商品
          title: '添加商品' // 标题
        },
        categoryId: '', // 类目id
        priceStyleId: null, // 商城模式Id
        category: {},
        saleConfigs: [],
        displayConfigs: [],
        productSkus: [],
        detail: null,
        images: [],
        viewModel: null,
        saveLoading: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.widgetData && this.widgetData.value) {
          this.priceStyleId = this.widgetData.value.priceStyleId
        }
        if (!this.priceStyleId) {
          this.$api.alert('商城模式不正确,请在DIY系统中配置')
        }
        if (this.categoryId || this.$crud.getId()) {
          this.setting.isAdd = false
        }
        if (this.setting.isAdd === false) {
          this.loading = true
          this.viewModel = await service.getProductView(this.categoryId, this.priceStyleId)
          this.setting = this.viewModel.setting
          this.$nextTick(() => {
            var border = {
              title: this.setting.title
            }
            this.$refs.xBorder.init(border)
          })
          console.info('商品ViewModel', this.viewModel)
        }
        this.loading = false
      },
      async save () {
        this.saveLoading = true
        await service.save(this)
        this.saveLoading = false
      },
      // 修改分类 
      changeClass (classes) {
        this.viewModel.productDetail.productDetailExtension.storeClass = classes
      },
      // 修改图片
      changeImage (uploadImage) {
        this.viewModel.images = []
        this.images = uploadImage
        for (let item of uploadImage) {
          if (item) {
            this.viewModel.images.push(item)
          }
        }
      },
      // 新商品选择类目
      selectCategory (categoryId) {
        this.categoryId = categoryId
        this.setting.isAdd = false
        this.init()
      },
      judgeSave () {
        return judge.judgeSave(this)
      },
      judgeExamine () {
        return judge.judgeExamine(this)
      },
      operation () {
        return judge.operation(this)
      }
    }
  }
</script>
<style lang="scss">
  @import "./widgets/style/_index.scss";
</style>



