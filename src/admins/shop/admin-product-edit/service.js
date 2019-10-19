import api from '@/service/prototypes/api'
import crud from '@/service/prototypes/crud'
import user from '@/service/prototypes/user'

export default {
  // 获取商品视图
  async getProductView (categoryId, priceStyleId) {
    var para = {
      id: crud.getId(),
      categoryId: categoryId,
      userId: user.id(),
      priceStyleId: priceStyleId
    }
    var response = await api.httpGet('/Api/ShopStore/GetProductView', para)
    if (response.status === 1) {
      return response.result
    } else {
      api.alert(response.message)
    }
  },
  async save (jsThis) {
    var data = jsThis.viewModel
    data.product.productExtensions.productCategory = data.category
    data.product.productExtensions.store = data.store
    if (jsThis.$route.query.priceStyleId) {
      data.product.priceStyleId = jsThis.$route.query.priceStyleId
    }
    var response = await jsThis.$api.httpPost('/Api/Store/EditProduct', data)
    if (response.status === 1) {
      jsThis.$api.localRemove('productView')
      var text = '商品添加成功, 是否继续?'
      if (jsThis.$base.filter() !== 3) {
        text = '商品已提交审核，是否继续？'
      }
      jsThis
        .$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        })
        .then(() => {
          if (jsThis.$route.name.indexOf('admin') > -1) {
            // jsThis.$router.push('/Admin/Product/Edit')
            window.location.href = '/Admin/Product/Edit'
          } else {
            // jsThis.$router.push('/User/Product/Store/edit')
            window.location.href = '/User/Product/Store/edit'
          }
        })
        .catch(() => {
          if (jsThis.$route.name.indexOf('admin') > -1) {
            jsThis.$router.push('/admin/product/List')
          } else {
            jsThis.$router.push('/User/Product/Store/list')
          }
        })
    } else {
      jsThis.$notify({
        title: '错误',
        message:
          '保存失败:' + (response === undefined ? '异常' : response.message),
        type: 'error',
        position: 'bottom-right'
      })
    }
  }
}
