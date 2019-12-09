import api from '@/service/prototypes/api'

export default {
  // 表格操作方法
  tableActionMethod (intance, action, rowScope) {
    if (api.isEmpty(action)) {
      intance.$alert('操作按钮配置错误', '操作按钮配置错误', {
        confirmButtonText: '确定'
      })
      return
    }
    if (action.type === 'event') {
      if (api.isEmpty(action.method)) {
        intance.$alert('事件名称不能为空', '事件名称不能为空', {
          confirmButtonText: '确定'
        })
        return
      }
      if (action.method !== 'copy') {
        intance.$emit(action.method, rowScope)
      }
    }
    // links
    if (action.type === 1) {
      if (api.isEmpty(action.url)) {
        intance.$alert('Url链接不能为空', 'Url链接不能为空', {
          confirmButtonText: '确定'
        })
      }
      if (rowScope !== undefined) {
        var query = {
          id: rowScope.id || rowScope.userId
        }
        if (action.para !== undefined || action.para !== null) {
          var paraString = JSON.stringify(action.para)
          if (!api.isEmpty(paraString)) {
            paraString = paraString.replace('id', rowScope.id)
            var actionPara = JSON.parse(paraString)
            query = {
              ...query,
              ...actionPara
            }
          }
        }
        if (intance.$route.matched[0].path.indexOf('/admin') !== -1) {
          if (action.url.substring(0, 6).indexOf('/user') !== -1) {
            action.url = action.url.replace(
              '/user',
              intance.$route.matched[0].path
            )
            intance.$router.push({
              path: action.url,
              query
            })
          } else if (action.url.substring(0, 6).indexOf('/User') !== -1) {
            action.url = action.url.replace(
              '/User',
              intance.$route.matched[0].path
            )
            intance.$router.push({
              path: action.url,
              query
            })
          } else {
            intance.$router.push({
              path: action.url,
              query
            })
          }
        } else {
          intance.$router.push({
            path: action.url,
            query
          })
        }
      } else {
        if (intance.$route.matched[0].path.indexOf('/admin') !== -1) {
          if (action.url.substring(0, 6).indexOf('/user') !== -1) {
            action.url = action.url.replace(
              '/user',
              intance.$route.matched[0].path
            )
            intance.$router.push({
              path: action.url
            })
          } else if (action.url.substring(0, 6).indexOf('/User') !== -1) {
            action.url = action.url.replace(
              '/User',
              intance.$route.matched[0].path
            )
            intance.$router.push({
              path: action.url
            })
          } else {
            intance.$router.push({
              path: action.url,
              query
            })
          }
        } else {
          if (intance.$route.matched[0].path.indexOf('/user') !== -1) {
            intance.$router.push({
              path: action.url,
              query
            })
          } else {
            intance.$router.push({
              path: intance.$route.matched[0].path + action.url,
              query
            })
          }
        }

        // intance.$router.push({
        //   path: action.url.replace(/\/Admin\//g, '/')
        // })
      }
    }
  },
  // 列表页删除事件
  async columnDeleteMethod (intance, action, rowScope) {
    if (api.isEmpty(action.url)) {
      intance.$alert('删除接口ApiUrl不能为空，请配置ApiUrl', 'ApiUrl不能为空', {
        confirmButtonText: '确定'
      })
      return
    }
    if (api.isEmpty(rowScope)) {
      intance.$alert('选择的行数据不存在', '数据不存在', {
        confirmButtonText: '确定'
      })
      return
    }
    if (api.isEmpty(rowScope.id)) {
      intance.$alert('行数据Id不存在', 'Id不存在', {
        confirmButtonText: '确定'
      })
      return
    }
    var name = rowScope.name
    if (api.isEmpty(name)) {
      name = '该数据'
    }

    try {
      await intance.$confirm('此操作将删除' + name + ',是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      var response = this.delete(intance, action.url, rowScope)
      return response
    } catch (error) {
      intance.$message({
        type: 'info',
        message: '已取消删除'
      })
    }
  },
  delete (intance, apiUrl, rowScope) {
    let parament = {
      id: rowScope.id,
      loginUserId: intance.$user.id(),
      ...intance.$crud.routeToObject()
    }
    console.info('rowScope', rowScope, intance.type)
    if (parament.type === undefined) {
      if (intance.$route.query.key !== undefined) {
        parament.type = intance.$route.query.key
      }
    }
    if (parament.type === undefined) {
      if (intance.type) {
        parament.type = intance.type
      }
    }
    return new Promise((resolve, reject) => {
      api.httpDelete(apiUrl, parament).then(response => {
        if (response.status === 1) {
          intance.$message({
            type: 'success',
            message: '删除成功!'
          })
          resolve(true)
        } else {
          api.alert('删除失败!' + response.message)
          resolve(false)
        }
      })
    })
  }
}
