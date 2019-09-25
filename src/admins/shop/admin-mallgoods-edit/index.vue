<template>
  <x-border :title="title" color="#36a3f7">
    <div class="admin-mallgoods-edit">
      <el-form label-width="250px">
        <el-form-item label="商品">
          <div>
            <x-data-select @xdata="xdata" :widgetData="widgetData"></x-data-select>
            <div class="stored-edit_intro">请选择商品</div>
            <div class="product-info-box">
              <div class="product-info" v-show="productItem.length!==0" v-for="(item,index) in productItem" :key="index">
                <div class="info-item">
                  <div class="item-left">
                    商品名称:
                  </div>
                  <div class="item-right">
                    {{item.name}}
                  </div>
                </div>
                <div class="info-item">
                  <div class="item-left">
                    商品积分:
                  </div>
                  <div class="item-right">
                    <el-input v-model="item.price" type="number" :placeholder="item.price"></el-input>
                  </div>
                </div>
                <div class="info-item">
                  <div class="item-left">
                    商品图片:
                  </div>
                  <div class="item-right">
                    <img :src="$api.baseUrl()+item.thumbnailUrl" alt="">
                  </div>
                </div>
                <div class="info-item">
                  <div class="item-left">
                    起购量:
                  </div>
                  <div class="item-right">
                    {{item.minBuyCount}}
                  </div>
                </div>
                <div class="info-item">
                  <div class="item-left">
                    库存:
                  </div>
                  <div class="item-right">
                    {{item.stock}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品数量" v-if="false">
          <el-input-number v-model="viewModel.stock" controls-position="right" :min="1"></el-input-number>
          <div class="stored-edit_intro">请输入商品数量，至少需要一件商品</div>
        </el-form-item>
        <el-form-item label="备注" v-if="false">
          <el-input v-model="viewModel.remark"></el-input>
          <div class="stored-edit_intro">请输入备注</div>
        </el-form-item>
      </el-form>
      <div class="stored_footer">
        <el-button class="stored_btn" :loading="loading" @click.native="save">确定</el-button>
        <!-- <div >确定</div> -->
      </div>
    </div>
  </x-border>
</template>
<script>
  export default {
    props: {
      widgetData: {},
      title: {}
    },
    data () {
      return {
        viewModel: {},
        productItemPrice: 0,
        loading: false,
        productItem: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
      },
      async save () {
        this.loading = true
        this.viewModel.userId = this.$user.id()
        this.viewModel.shopType = this.$route.query.shopType
        this.viewModel.product = this.productItem
        var response = await this.$api.httpPost('/Api/CustomShopProduct/AddProductMany', this.viewModel)
        if (!response) {
          this.setTime()
          return this.$notify.error({
            title: '商品添加失败',
            message: '请正确输入内容',
            position: 'bottom-right'
          })
        }
        if (response.status === 1) {
          this.setTime()
          return this.$crud.message(response)
        } else {
          this.setTime()
          return this.$notify({
            title: '商品添加失败',
            message: response.message,
            position: 'bottom-right'
          })
        }
      },
      xdata (row, column) {
        // this.viewModel.productIds.push(row[0].id)
        // this.viewModel.minBuyCount = row[0].minBuyCount
        // row.forEach(item => {
        //   item.userId = this.$user.id()
        //   item.shopType = this.$route.query.shopType
        // })
        console.log('row', row)
        this.productItem = row
      },
      setTime () {
        setTimeout(() => {
          this.loading = false
        }, 500)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
