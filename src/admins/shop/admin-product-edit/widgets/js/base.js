export default {
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
  }
}
