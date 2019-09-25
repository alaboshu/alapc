<template>
  <div class="basics">
    <h1 class="basics_title">基础信息</h1>
    <div class="title_row basics_row">
      <div class="basics-title_row">
        <div class="title_left">商品标题 <span>*</span></div>
        <div class="title_right">
          <el-input size="large" @keydown.native="titleInput" maxlength="60" v-model="productView.product.name" placeholder="最多允许输入30个汉字(60个字符)"></el-input>
          <div class="text-inrto">商品的名称,60个字以内</div>
        </div>
      </div>
      <div class="basics-title_row">
        <div class="title_left">商品信息</div>
        <div class="title_right">
          <div class="right-price">
            <div class="right-price_title finally">货号</div>
            <div class="right-price_input ">
              <el-input size="large" v-model="productView.product.bn" :disabled="productView.productSkus.length>0" maxlength="15" placeholder="货号"></el-input>
            </div>
            <div class="right-price_title">重量(g)</div>
            <div class="right-price_input">
              <el-input size="large" v-model="productView.product.weight" @keydown.native="currencyInput" @afterpaste.native="currencyInput" maxlength="10" placeholder="重量(g)"></el-input>
            </div>
            <div class="right-price_title">库存</div>
            <div class="right-price_input price-right">
              <el-input size="large" v-model="productView.product.stock" @keydown.native="StockInput" @afterpaste.native="StockInput" maxlength="10" placeholder="库存"></el-input>
            </div>
          </div>
          <div class="text-inrto">商品货号，必须唯一，货号前缀可在商品发布选项中进行配置;商品的重量（以g为单位）;商品的库存</div>
        </div>
      </div>
      <div class="basics-title_row">
        <div class="title_left">商品价格</div>
        <div class="title_right">
          <div class="right-price">
            <div class="right-price_title finally">销售价</div>
            <div class="right-price_input">
              <el-input size="large" v-model="productView.product.price" @keydown.native="currencyInput" @afterpaste.native="currencyInput" :maxlength="80" placeholder="价格"></el-input>
            </div>
            <div class="right-price_title">元 市场价</div>
            <div class="right-price_input">
              <el-input size="large" v-model="productView.product.marketPrice" @keydown.native="currencyInput" @afterpaste.native="currencyInput" :maxlength="80" placeholder="市场价"></el-input>
            </div>
            <div class="right-price_title">元 成本价</div>
            <div class="right-price_input price-right">
              <el-input size="large" v-model="productView.product.costPrice" @input="input" @keydown.native="currencyInput" @afterpaste.native="currencyInput" :maxlength="80" placeholder="成本价"></el-input>
            </div>
          </div>
          <div class="text-inrto">商品的进货价，商品直接进货的价格,商品的成本价，成本价一般包括进货价、人工成本、损耗成本、库存成本等,商品的市场价，一般和商品的吊牌上的价格相同</div>
        </div>
      </div>
      <div class="basics-title_row right-whether">
        <div class="title_left title-swtict">是否上架</div>
        <div class="title_right">
          <el-switch v-model="productView.onSale" active-color="#E94729">
          </el-switch>
          <div class="text-inrto">商家是否设置了商品上架</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import base from './js/base.js'
  export default {
    props: {
      productView: {}
    },
    methods: {
      currencyInput (ev) {
        base.currencyInput(this, ev)
      },
      StockInput (ev) {
        base.stockInput(this, ev)
      },
      input (ev) {
        if (this.productView.product.price <= ev) {
          this.$alert('成本价不能大于销售价')
          this.productView.product.costPrice = ''
        }
      },
      titleInput (ev) {
        if (ev.target.value.length > 60) {
          this.$alert('字符最大为60个').then().catch(() => { })
          this.productView.product.name = ''
        }
      }
    }
  }
</script>

