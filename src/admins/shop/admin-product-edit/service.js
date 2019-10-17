export default {
  async getProductView (jsThis) {
    var para = {
      ...(await this.getPara(jsThis))
    }
    if (para.productId === undefined) {
      if (para.categoryId === '' || para.categoryId === undefined) {
        return
      }
      jsThis.isAdd = false
    } else {
      jsThis.isAdd = false
    }
    var response = await jsThis.$api.httpGet('/Api/Store/GetProductView', para)
    if (response.status === 1) {
      return response.result
    } else {
      jsThis.$alert('类目id不存在', {
        confirmButtonText: '确定',
        callback: action => {
          jsThis.$router.push('/Admin/Product/list')
        }
      })
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
  },
  getPara (jsThis) {
    var para = {
      userId: jsThis.$user.id()
    }
    if (jsThis.$route.query.id !== undefined) {
      para.productId = jsThis.$route.query.id
      jsThis.isAdd = false
    }
    return para
  }
}
