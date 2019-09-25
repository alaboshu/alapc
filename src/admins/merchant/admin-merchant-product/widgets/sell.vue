<template>
  <div class="sell" v-if="viewModel">
    <x-border title="售卖信息">
      <ul class="sell-list">
        <li>
          <div class="text"><span>*</span>商品规格</div>
          <div class="sell-right">
            <div class="Specifications_top_text">商品规格决定价格和库存，如大份、小份 查看示例</div>
            <div class="Specifications-cont">
              <el-table :data="viewModel.skus" stripe style="width: 100%">
                <el-table-column prop="name" label="名称">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="价格">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.price" :min="0" controls-position="right"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column prop="stock" label="库存">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.stock" :min="0" controls-position="right"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column prop="fenRunPrice" label="分润价格" v-if="false">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.fenRunPrice" :min="0" controls-position="right"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="140px">
                  <template slot-scope="scope">
                    <el-button type="primary" @click.native="deleteSpec(scope)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="buttom Specifications-buttom" @click="AddSpec">添加规格</div>
          </div>
        </li>
        <li v-if="false">
          <div class="text">&nbsp;&nbsp;商品属性</div>
          <div>
            <div class="Specifications_top_text">商品属性是使用价值和价值是商品的两个基本属性。</div>
            <div class="Specifications-cont">
              <el-table :data="viewModel.properties" stripe style="width: 100%">
                <el-table-column prop="name" label="名称" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="值" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.key"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" @click.native="deleteNature(scope)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="buttom" @click="addNature">添加属性</div>
          </div>
        </li>
        <li>
          <!-- <div class="text">&nbsp;&nbsp;商品单位</div> -->
          <div class="text"><span>*</span>商品单位</div>
          <div class="input-l">
            <el-input v-model="viewModel.unit"></el-input>
            <div>请输入本商品的计量方式，默认为‘件’</div>
          </div>
        </li>
        <li class="list-buttom">
          <div class="text"></div>
          <div>
            <el-button type="primary" @click="save">确认</el-button>
            <el-button type="primary">取消</el-button>
          </div>
        </li>
      </ul>
    </x-border>
  </div>
</template>


<script>
  export default {
    props: ['viewModel', 'widgetData'],
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.viewModel.unit = '件'
      },
      async save () {
        if (this.viewModel.name === null) {
          return this.$notify({
            message: '商品名称不能为空，请输入',
            position: 'bottom-right',
            type: 'warning'
          })
        }
        if (this.viewModel.classId === '') {
          return this.$notify({
            message: '商品分类不能为空，请选择商品分类',
            position: 'bottom-right',
            type: 'warning'
          })
        }
        for (let i in this.viewModel.properties) {
          if (this.viewModel.properties[i].key === null && this.viewModel.properties[i].value === null) {
            this.viewModel.properties.splice(i, 1)
          }
        }
        if (this.viewModel.thumbnailUrl === null) {
          this.$notify({
            message: '至少需要一张图片,请上传图片',
            position: 'bottom-right',
            type: 'warning'
          })
          return
        }
        if (this.viewModel.unit === null) {
          return this.$notify({
            message: '商品单位不能为空，请输入商品单位',
            position: 'bottom-right',
            type: 'warning'
          })
        }
        await this.$crud.save('Api/MerchantProduct/SaveMerchantProduct', this.viewModel)
      },
      AddSpec () {
        var str = {
          skuId: '000000000000000000000000',
          name: 0,
          price: 0,
          stock: 0,
          fenRunPrice: 0,
          isDefault: false,
          attachPrice: 0,
          displayPrice: 0,
          propertyValueDesc: 0
        }
        this.viewModel.skus.push(str)
      },
      deleteSpec (scope) {
        this.viewModel.skus.splice(scope.$index, 1)
      },
      addNature () {
        var str = {
          key: '',
          value: ''
        }
        this.viewModel.properties.push(str)
      },
      deleteNature (scope) {
        this.viewModel.properties.splice(scope.$index, 1)
      }
    }
  }
</script>



<style lang="scss" scoped>
  @import "./styles/sell.scss";
</style>


<style lang="scss">
  .Specifications-cont {
    .el-input__inner {
      height: 30px !important;
    }
    .el-input-number {
      width: 155px;
      .el-input-number__increase {
        height: 15px;
        top: 4px;
      }
      .el-input-number__decrease {
        height: 15px;
        bottom: 4.5px;
      }
    }
  }
</style>
