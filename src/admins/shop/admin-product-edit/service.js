export default {
  async getProductView (intance) {
    var para = {
      ...(await this.getPara(intance))
    }
    if (para.productId === undefined) {
      if (para.categoryId === '' || para.categoryId === undefined) {
        return
      }
      intance.isAdd = false
    } else {
      intance.isAdd = false
    }
    var response = await intance.$api.httpGet('/Api/Store/GetProductView', para)
    if (response.status === 1) {
      return response.result
    } else {
      intance.$alert('类目id不存在', {
        confirmButtonText: '确定',
        callback: action => {
          intance.$router.push('/Admin/Product/list')
        }
      })
    }
  },
  async save (intance) {
    var data = intance.viewModel
    data.product.productExtensions.productCategory = data.category
    data.product.productExtensions.store = data.store
    if (intance.$route.query.priceStyleId) {
      data.product.priceStyleId = intance.$route.query.priceStyleId
    }
    var response = await intance.$api.httpPost('/Api/Store/EditProduct', data)
    if (response.status === 1) {
      intance.$api.localRemove('productView')
      var text = '商品添加成功, 是否继续?'
      if (intance.$base.filter() !== 3) {
        text = '商品已提交审核，是否继续？'
      }
      intance
        .$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        })
        .then(() => {
          if (intance.$route.name.indexOf('admin') > -1) {
            // intance.$router.push('/Admin/Product/Edit')
            window.location.href = '/Admin/Product/Edit'
          } else {
            // intance.$router.push('/User/Product/Store/edit')
            window.location.href = '/User/Product/Store/edit'
          }
        })
        .catch(() => {
          if (intance.$route.name.indexOf('admin') > -1) {
            intance.$router.push('/admin/product/List')
          } else {
            intance.$router.push('/User/Product/Store/list')
          }
        })
    } else {
      intance.$notify({
        title: '错误',
        message:
          '保存失败:' + (response === undefined ? '异常' : response.message),
        type: 'error',
        position: 'bottom-right'
      })
    }
  },
  getPara (intance) {
    var para = {
      userId: intance.$user.id()
    }
    if (intance.$route.query.id !== undefined) {
      para.productId = intance.$route.query.id
    }
    para.categoryId = intance.$api.localGet('categoryId')
    return para
  }
}
