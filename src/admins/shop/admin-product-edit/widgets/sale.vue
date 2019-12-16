<template>
  <div class="sales">
    <h1 class="basics_title">销售属性</h1>
    <ul class="editor_list">
      <li class="list" v-for="(prop,pIndex) in productView.category.salePropertys" :key="pIndex">
        <div class="editor-customerSaleValue">{{prop.name}}:</div>
        <div class="size">
          <div class="size-input">
            <el-input v-model="prop.selfDefineValue" @keydown.native="inputText($event,pIndex)" maxlength="8" placeholder="请输入自定义值"></el-input>
            <div class="size-bottom" @click="addCategoryPropertyValue(prop, prop.selfDefineValue, pIndex)">添加</div>
          </div>
          <ul class="size-list">
            <li v-for="(item, index) in  prop.propertyValues" :key="index">
              <el-checkbox v-model="item.isCheck" @change="selectSaleItem()" :checked="item.isCheck">{{item.valueName}}</el-checkbox>
              <div style="display:flex;">
                <el-input v-if="item.isCheck" v-model="item.valueAlias" @keydown.native="remarksInput(pIndex, index, $event)" placeholder="输入备注" @blur="selectSaleItem()"></el-input>
                <div class="size-pic" v-if="false">
                  <el-upload :action="api.baseUrl()+'/api/StorageFile/upload'" :show-file-list="false">
                    <div class="pic_all">
                      <img v-if="item.image" @mouseenter="valueImageStatus=true" :src="apiBaseUrl+item.image" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      <div v-if="valueImageStatus" @mouseleave="valueImageStatus=false" class="pic_detele">
                        <i class="el-icon-delete" @click.stop="imageRemove"></i>
                      </div>
                    </div>
                  </el-upload>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="batch_flex" v-if="productView.productSkus">
      <div class="batch-left"></div>
      <div class="box_c batch_full">
        <el-table :data="productView.productSkus" border style="width: 85.5%; margin-top: 20px">
          <el-table-column prop="bn" label="货号" width="120px">
            <template slot="header">
              货号
            </template>
            <template slot-scope="scope">
              <el-input v-model="scope.row.bn" placeholder="输入货号" class="batch-input"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="propertyValueDesc" label="销售规格">
            <template slot="header">
            </template>
          </el-table-column>
          <el-table-column prop="price" width="70px">
            <template slot="header" slot-scope="scope">
              <span v-if="scope" />
              <el-input placeholder="销售价" maxlength="10" v-model="productView.productSkus.price" @keydown.native="currencyInput" @afterpaste.native="currencyInput" @change="fillData(scope.column.property, productView.productSkus.price)"></el-input>
            </template>
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" maxlength="10" @keydown.native="currencyInput" @afterpaste.native="currencyInput" placeholder="输入销售价"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="costPrice" width="70px">
            <template slot="header" slot-scope="scope">
              <span v-if="scope" />
              <el-input placeholder="成本价" maxlength="10" @keydown.native="currencyInput" @afterpaste.native="currencyInput" v-model="productView.productSkus.costPrice" @change="fillData(scope.column.property, productView.productSkus.costPrice)"></el-input>
            </template>
            <template slot-scope="scope">
              <el-input v-model="scope.row.costPrice" maxlength="10" @keydown.native="currencyInput" @afterpaste.native="currencyInput" placeholder="输入成本价"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="marketPrice" width="70px">
            <template slot="header" slot-scope="scope">
              <span v-if="scope" />
              <el-input placeholder="市场价" maxlength="10" @keydown.native="currencyInput" @afterpaste.native="currencyInput" v-model="productView.productSkus.marketPrice" @change="fillData(scope.column.property, productView.productSkus.marketPrice)"></el-input>
            </template>
            <template slot-scope="scope">
              <el-input v-model="scope.row.marketPrice" maxlength="10" @keydown.native="currencyInput" @afterpaste.native="currencyInput" placeholder="输入市场价"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="manRunPrice" width="70px">
            <template slot="header" slot-scope="scope">
              <span v-if="scope" />
              <el-input placeholder="分润价" maxlength="10" @keydown.native="currencyInput" @afterpaste.native="currencyInput" v-model="productView.productSkus.fenRunPrice" @change="fillData(scope.column.property, productView.productSkus.fenRunPrice)"></el-input>
            </template>
            <template slot-scope="scope">
              <el-input v-model="scope.row.manRunPrice" maxlength="10" @keydown.native="currencyInput" @afterpaste.native="currencyInput" placeholder="输入分润价"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="weight" width="70px">
            <template slot="header" slot-scope="scope">
              <span v-if="scope" />
              <el-input placeholder="重量(g)" maxlength="10" @keydown.native="currencyInput" @afterpaste.native="currencyInput" v-model="productView.productSkus.weight" @change="fillData(scope.column.property, productView.productSkus.weight)"></el-input>
            </template>
            <template slot-scope="scope">
              <el-input v-model="scope.row.weight" maxlength="10" @keydown.native="currencyInput" @afterpaste.native="currencyInput" placeholder="输入重量"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="stock" width="70px">
            <template slot="header" slot-scope="scope">
              <span v-if="scope" />
              <el-input placeholder="库存" maxlength="10" @keydown.native="StockInput" @afterpaste.native="StockInput" v-model="productView.productSkus.stock" @change="fillData(scope.column.property, productView.productSkus.stock)"></el-input>
            </template>
            <template slot-scope="scope">
              <el-input v-model="scope.row.stock" maxlength="10" @keydown.native="StockInput" @afterpaste.native="StockInput" placeholder="输入库存"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="productStatus" label="上架" width="60px">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.productStatus" :active-value="2" :inactive-value="1"></el-switch>
            </template>
          </el-table-column>
        </el-table>
        <p class="img_news_a">在表格的头部输入销售价、市场价、分润价等可批量填充</p>
        <p class="img_news_a" style="color:red">重量单位：g</p>
      </div>
    </div>
  </div>
</template>
<script>
  import sale from './js/sale.js'
  import sku from './js/sku.js'
  import skuUI from './js/sku_ui.js'
  export default {
    props: {
      productView: {}
    },
    data () {
      return {
        valueImageStatus: true,
        dataSkuList: null // 数据库中的Sku
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.dataSkuList == null) {
          this.dataSkuList = this.productView.productSkus
        }
      },
      // 填充数据
      fillData (scope, ev) {
        skuUI.batchFill(this, scope, ev)
      },
      // 将选择的值推送到sku中去
      selectSaleItem () {
        var createSku = sku.createSkuList(this, this.productView)
        this.productView.productSkus = createSku
      },
      async addCategoryPropertyValue (item, customerSaleValue, index) {
        sale.addCategoryPropertyValue(this, item, customerSaleValue, index)
      },
      StockInput (ev) {
        skuUI.stockInput(this, ev)
      },
      currencyInput (text, ev) {
        skuUI.currencyInput(this, text, ev)
      },
      inputText (ev, pIndex) {
        var name = this.productView.category.salePropertys[pIndex].selfDefineValue
        sale.judgeInput(this, name, pIndex)
      },
      remarksInput (pIndex, index, ev) {
        var name = this.productView.category.salePropertys[pIndex]
        sale.judgeInput(this, pIndex, index, name)
      }
    }
  }
</script>


<style  lang="scss" scoped>
  @import "~./style/sale.scss";
</style>
