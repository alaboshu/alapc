
export default {
  // 图片搜索
  async search (jsThis) {
    if (jsThis.imageListViewModel.length === 0) {
      jsThis.loading = true
      var para = {
        name: jsThis.searchModel.keyword,
        pageIndex: jsThis.searchModel.pageIndex,
        pageSize: jsThis.searchModel.pageSize
      }
      var response = await jsThis.$api.httpGet(
        'Api/StorageFile/QueryPageList',
        para,
        jsThis.isTenant
      )
      if (response.status === 1) {
        jsThis.totalCount = response.result.recordCount
        jsThis.imageListViewModel = response.result.result
      }
      jsThis.loading = false
    }
  },
  // 复制图片地址
  copyImageUrl (jsThis, url) {
    let oInput = document.createElement('input')
    oInput.value = url
    document.body.appendChild(oInput)
    oInput.select() // 选择对象
    document.execCommand('Copy')
    jsThis.$message({
      message: '已成功复制图片地址',
      type: 'success'
    })
  },
  // 图片删除
  delete (jsThis, id) {
    jsThis
      .$confirm('此操作将永久删除该文件，是否继续？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      .then(async () => {
        var data = {
          id
        }
        var res = await jsThis.$api.httpDelete(
          'api/StorageFile/querydelete',
          data,
          jsThis.isTenant
        )
        if (res.status === 1) {
          jsThis.$message({
            message: '删除成功 ',
            type: 'success'
          })
          jsThis.init()
        }
      })
      .catch()
  }
}
