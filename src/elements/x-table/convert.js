export default {
  // 转换表格
  to (jsThis) {
    if (jsThis.$base.filter() === 3 || jsThis.$base.filter() === '3') {
      for (let item of jsThis.dataResult.tableActions) {
        if (item.url.toLowerCase().indexOf('api') < 0) {
          item.url = item.url.replace(/\/User\//g, '/Admin/')
        }
      }
    }
    if (jsThis.$base.filter() === 2 || jsThis.$base.filter() === '2') {
      for (let item of jsThis.dataResult.tableActions) {
        if (item.url.toLowerCase().indexOf('api') < 0) {
          item.url = item.url.replace(/\/Admin\//g, '/User/')
        }
      }
    }
  },
  // 数据加载完后，表格渲染
  apply (jsThis) {
    // 处理表格排序问题
    if (jsThis.dataResult.columns) {
      if (jsThis.dataResult.columns[0].label !== '操作') {
        jsThis.dataResult.columns.unshift(
          jsThis.dataResult.columns.splice(
            jsThis.dataResult.columns.length - 1,
            1
          )[0]
        )
      }
    }
  },
  // 处理字典格式的数据
  handle (jsThis) {
    var dateItem = null
    if (jsThis.dataResult.columns) {
      jsThis.dataResult.columns.forEach((element, index) => {
        if (element.style.type === 'dictionary') {
          dateItem = JSON.parse(JSON.stringify(element))
          jsThis.dataResult.columns.splice(index, 1)
        }
      })
    }
    // dateItem 不为null 时执行
    if (jsThis.dataResult.result.result && dateItem) {
      jsThis.dataResult.result.result.forEach((element, index) => {
        // 处理表头的数据
        if (index === 0 && element[dateItem.prop]) {
          element[dateItem.prop].forEach((elementChilde, indexChild) => {
            var obj = {
              style: {
                align: 2,
                isShow: true,
                sort: false
              }
            }
            obj.prop = 'code' + indexChild
            obj.style.type = 'code' + indexChild
            obj.style.width = dateItem.style.width
            obj.label = elementChilde.name
            jsThis.dataResult.columns.push(obj)
          })
        }
        // 处理表格内容
        if (element[dateItem.prop]) {
          element[dateItem.prop].forEach((elementChild, childIndex) => {
            element['code' + childIndex] = elementChild.value
          })
        }
      })
    }
    this.getGradModel(jsThis)
  },
  // 处理数据重复请求问题
  async getGradModel (jsThis) {
    var response = await jsThis.$api.httpGet('/Api/AutoConfig/GetAutoConfigList?type=UserGradeConfig')
    if (response.status === 1) {
      jsThis.$api.vuexLocalSet('grade_data_model', response.result)
    }
  }
}
