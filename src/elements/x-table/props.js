// x-table的结构以及所实现的功能已比较复杂，具有超高难度
// 为了减低维护成本，在没有认真了解属性之前 请勿轻易新增属性，
// 请勿轻易新增属性，以下属性基本上能够满足绝大部分需求了，有其他的需求可以在外部控制
let props = {
  type: {
    type: String,
    required: true
  }, // 类型必须填写，通过Type和后台Api/Auto/Table来获取数据
  apiUrl: {
    type: String,
    default: 'Api/Auto/Table'
  }, // 类型必须填写，通过Type和后台Api/Auto/Table来获取数据
  columns: {
    type: Array,
    default: null
  }, // 自定义列，可以通过diy体系来控制
  isTemplate: {
    type: Boolean,
    default: false
  }, // 是否模板显示,bi
  widgetData: Object // 数据类型Type、过滤方式filter、标题等信息
}

export default props
