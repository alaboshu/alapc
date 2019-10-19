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
    var response = await api.httpPost('/Api/ShopStore/EditProduct', data)
    crud.message(response)
  }
}
