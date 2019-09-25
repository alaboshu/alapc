// SkuUI相关的逻辑在此文件中维护
export default {
  // 控制表头，实现批量填充
  renderHeader (jsThis, h, {
    column
  }) {
    var vueThis = jsThis
    return h('div', [
      h('span', column.label),
      h('el-input', {
        class: 'input_div',
        on: {
          change: function (msg) {
            vueThis.fillvalue = msg
            vueThis.fillType = column.property
          }
        }
      })
    ])
  },
  // 判断输入框只能输入整数
  stockInput (jsThis, ev) {
    if (ev.target.value !== ev.target.value.replace(/\D/g, '')) {
      jsThis.$alert('只能输入整数')
      ev.target.value = ev.target.value.replace(/\D/g, '')
    }
  },
  // 判断输入框只能输入数字类型
  currencyInput (jsThis, ev) {
    if (isNaN(ev.target.value)) {
      jsThis.$alert('只能输入数字类型')
      ev.target.value = ''
    }
  },
  batchFill (jsThis, scope, ev) {
    if (jsThis.productView.productSkus.length > 0) {
      for (let i = 0; i < jsThis.productView.productSkus.length; i++) {
        jsThis.productView.productSkus[i][scope] = ev
      }
    }
  }
}
