
<template>
  <div class="essential" v-if="viewModel">
    <x-border title="基本信息">
      <ul class="essential-list">
        <li>
          <div class="text"> <span>*</span> 选择店铺</div>
          <div class="right-box">
            <div class="text-right">
              <div class="select">
                <el-select :value="viewModel.merchantStoreId">
                  <el-option v-for="item in shop" :value="item.key" :key="item.key" :label="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div>请填写商品分类</div>
          </div>
        </li>
        <li>
          <div class="text"> <span>*</span> 商品分类</div>
          <div class="right-box">
            <div class="text-right">
              <div class="select">
                <el-select v-model="viewModel.classId" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </div>
              <router-link to="/user/class?type=MerchantProductClassRelation">
                <div class="list-buttom">新建分类</div>
              </router-link>
            </div>
            <div>请填写商品分类</div>
          </div>
        </li>
        <li>
          <div class="text"> <span>*</span> 商品名称</div>
          <div class="right-box">
            <div class="text-right">
              <el-input v-model="viewModel.name"></el-input>
            </div>
            <div>请填写商品名称</div>
          </div>
        </li>
        <li>
          <div class="text">&nbsp;&nbsp;商品图片</div>
          <div>
            <div class="img_top_text">商品图片建议按如图所示类型上传</div>
            <Upload :config="viewModel"></Upload>
            <!-- <x-select-image v-model="viewModel.images" :count="5"></x-select-image> -->
          </div>
        </li>
        <li>
          <div class="text">&nbsp;&nbsp;商品描述</div>
          <div class="ueditro">
            <vue-ueditor-wrap v-model="viewModel.description"></vue-ueditor-wrap>
          </div>
        </li>
      </ul>
    </x-border>
  </div>
</template>

<script>
  import Upload from './upload'
  import VueUeditorWrap from 'vue-ueditor-wrap'
  export default {
    props: ['viewModel', 'widgetData'],
    components: {
      Upload,
      VueUeditorWrap
    },
    data () {
      this.data = {
        value: 'key',
        label: 'value',
        children: 'childClass'
      }
      return {
        value: '',
        img: '',
        baseUrl: this.$api.baseUrl(),
        options: [],
        shop: []

      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.viewModel.description === null) {
          this.viewModel.description = ''
        }
        if (this.viewModel.classId === 0) {
          this.viewModel.classId = ''
        }
        var para = {
          userId: this.$user.id()
        }
        var respone = await this.$api.httpGet('api/type/getkeyvalue?type=MerchantProductClassRelation', {})
        this.options = respone.result
        var res = await this.$api.httpGet('/Api/MerchantStore/GetMerchantStoreKeyValues', para)
        this.shop = res.result
        this.viewModel.merchantStoreId = this.shop[0].key
      },
      change (val) {
        this.viewModel.classId = val[0]
      },
      changeShop (val) {
        this.viewModel.merchantStoreId = val[0]
      }
    }
  }
</script>





<style lang="scss" scoped>
  @import "./styles/essential.scss";
</style>

<style rel="stylesheet/scss" lang="scss">
  .essential {
    .essential-list {
      .select {
        width: 740px;
        height: 42px;
        margin: 0;
        padding: 0;
      }
    }
    .ueditro {
      .edui-default {
        max-width: 900px !important;
      }
      .edui-editor-iframeholder {
        height: 500px !important;
      }
    }
    .el-upload--picture-card {
      width: 110px;
      height: 110px;
    }
    .el-textarea__inner {
      height: 100px;
      width: 880px;
    }
    .label {
      .select {
        width: 810px;
      }
    }
    .el-cascader {
      width: 100%;
    }
  }
</style>
