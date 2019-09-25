// 常用帮助函数
'use strict'
export default {
  // 判断字符串是否为空或null,undefined
  isNullOrEmpty (str) {
    if (str === undefined) {
      return true
    }
    if (str === null) {
      return true
    }
    if (str === 'null') {
      return true
    }
    if (str === 'undefined') {
      return true
    }
    if (str === '') {
      return true
    }
    var regu = '^[ ]+$'
    var re = new RegExp(regu)
    return re.test(str)
  },
  // 判断字符串长度
  length (str) {
    if (this.isNullOrEmpty(str)) {
      return 0
    } else {
      try {
        var len = str.length
        return len
      } catch (err) {
        return 0
      }
    }
  },
  isEmpty (str) {
    if (str === undefined) {
      return true
    }
    if (str === null) {
      return true
    }
    if (str === 'null') {
      return true
    }
    if (str === 'undefined') {
      return true
    }
    if (str === '') {
      return true
    }
    var regu = '^[ ]+$'
    var re = new RegExp(regu)
    return re.test(str)
  }
}
