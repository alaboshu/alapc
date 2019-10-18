// 弹窗操作，比如审核等
export default {
  // 保存操作
  async saveForm (jsThis, models) {
    models.userId = jsThis.$user.id()
    if (
      jsThis.$api.isEmpty(jsThis.dialogForm.columnActionView.service.postApi)
    ) {
      var type = jsThis.dialogForm.columnActionType
      if (jsThis.$route.query.id) {
        models.id = jsThis.$route.query.id
      }
      let parameter = {
        type: type,
        userId: jsThis.$user.id(),
        model: JSON.stringify(models)
      }
      var response = await jsThis.$api.httpPost(
        '/api/auto/save',
        parameter
      )
      jsThis.$crud.message(response)
      jsThis.init()
    } else {
      // 使用专用API接口保存
      var para = {
        userId: jsThis.$user.id(),
        ...models
      }
      response = await jsThis.$api.httpPost(
        jsThis.dialogForm.columnActionView.service.postApi,
        para
      )
      jsThis.$crud.message(response)
      jsThis.init()
    }
  },
  async columnAction (jsThis, data, scope) {
    let par = {
      type: data.type,
      userId: jsThis.$user.id(),
      id: scope.id
    }
    jsThis.dialogForm.columnActionType = data.type
    var response = await jsThis.$api.httpGet('/Api/Auto/Form', par)
    if (response.status !== 1) {
      jsThis.$notify({
        title: '操作失败',
        type: 'error',
        message: response.message,
        position: 'bottom-right'
      })
    } else {
      jsThis.dialogForm.columnActionView = response.result
      jsThis.dialogForm.showColumnActionView = true
    }
    if (jsThis.$refs.dialogAutoForm !== undefined) {
      jsThis.$refs.dialogAutoForm.$emit(
        'form_change_widget_data',
        jsThis.dialogForm.columnActionView
      )
    }
    jsThis.dialogVisible = true
  }
}
