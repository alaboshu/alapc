import Sortable from 'sortablejs'
import base from '@/service/prototypes/base'

export default {
  // 表格样式和拖动
  style (jsThis) {
    // jsThis.$refs['table'].$on('expand', (row, expanded) =>
    //   jsThis.emitEventHandler('expand', row, expanded)
    // )
    if (jsThis.switchShow) {
      const el = document.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      Sortable.create(el, {
        onStart: () => {},
        onEnd: msg => {
          jsThis.dataResult.result.result.splice(
            msg.newIndex,
            0,
            jsThis.dataResult.result.result[msg.oldIndex]
          )
          jsThis.dataResult.result.result.splice(msg.oldIndex, 1)
        }
      })
    }
  },
  // 表格操作方法
  getBoolText (value) {
    if (value === true || value === 'true') {
      return '是'
    }
    return '否'
  },
  getColor (value) {
    if (value % 10 === 1) {
      return '#5867dd'
    }
    if (value % 10 === 2) {
      return '#575962'
    }
    if (value % 10 === 3) {
      return '#34bfa3'
    }
    if (value % 10 === 4) {
      return '#ffb822'
    }
    if (value % 10 === 5) {
      return '#36a3f7'
    }
    if (value % 10 === 6) {
      return '#9816f4'
    }
    if (value % 10 === 7) {
      return '#00c5dc'
    }
    if (value % 10 === 8) {
      return '#f4516c'
    }
    if (value % 10 === 9) {
      return '#B2B1C4'
    }
  },
  getEmun (name, val, tabs) {
    if (tabs == null || tabs === undefined || tabs.length === 0) {
      var enums = base.allEnums()
      for (let item of enums) {
        if (item.name === name) {
          for (let list of item.keyValue) {
            if (list.key === val) {
              return list.value
            }
          }
        }
      }
    } else {
      for (let item of tabs) {
        if (item.key === val) {
          return item.value
        }
      }
    }
  }
}
