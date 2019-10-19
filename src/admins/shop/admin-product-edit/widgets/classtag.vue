<template>
  <div class="basics">
    <h1 class="basics_title" v-if="isAdmin">分类标签</h1>
    <div class="title_row basics_row" v-if="isAdmin">
      <div class="basics-title_row">
        <div class="title_left">商品标签:</div>
        <div class="title_right">
          <div class="right-clear">
            <div class="clear-select">
              <el-select v-model="productView.productDetail.productDetailExtension.tags" multiple placeholder="请选择">
                <el-option v-for="item in productView.relation.tags" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="text-inrto">商品标签</div>
        </div>
      </div>
      <div class="basics-title_row">
        <div class="title_left">店铺分类:</div>
        <div class="title_right">
          <div class="classifi-cation">
            <el-tree ref="platform" show-checkbox :data="productView.relation.classes" :props="{children: 'childClass',label: 'name'}" @check="change" :default-checked-keys="productView.productDetail.productDetailExtension.storeClass" node-key="id" :accordion="true"></el-tree>
          </div>
          <div class="text-inrto">可以选择多个店铺分类</div>
        </div>

      </div>
      <div class="basics-title_row">
        <div class="title_left">运费模板:</div>
        <div class="title_right">
          <div class="right-clear">
            <div class="clear-select" v-if="judgeFreight()">
              <el-select v-model="productView.product.deliveryTemplateId" :disabled="isSelect()" filterable placeholder="请选择运费模板">
                <el-option v-for="(item,index) in productView.relation.deliveryTemplates" :key="index" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </div>
          </div>
          <div class="text-inrto" v-if="judgeFreight()">为了提升消费者购物体验,要求全网设置运费模板,可在输入框输入进行搜索</div>
        </div>
      </div>
      <div class="basics-title_row" v-if="false">
        <div class="title_left">所在城市:</div>
        <div class="title_right">
          <el-select size="large" :max="80" placeholder="请选择" v-model="productView.product.regionId">
            <el-option></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import judge from './js/judge'
  export default {
    props: {
      productView: {},
      widgetData: {}
    },
    data () {
      return {
        routeId: '',
        isAdmin: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.routeId = this.$route.query.id
        if (this.$route.matched[0].path.length < 7) {
          if (this.$route.matched[0].path.toLowerCase().indexOf('admin') !== -1) {
            this.isAdmin = true
          }
        }
      },
      change () {
        this.$emit('changeClass', this.$refs.platform.getCheckedKeys())
      },
      freightEdit () {
        if (this.$route.name.indexOf('admin') > -1) {
          this.$router.push('/Admin/Product/DeliveryTemplate')
          return
        }
        this.$router.push('/user/deliveryTemplate/list')
      },
      judgeFreight () {
        return judge.judgeFreight(this)
      },
      isSelect () {
        return judge.isSelect(this)
      }
    }
  }
</script>

