export default {
  upload (jsThis) {
    jsThis.uploadDialogVisible = true
    jsThis.uploadFiles = []
    jsThis.uploadingImages = []
  },
  drag (jsThis, e) {
    jsThis.dish = e.clientY - jsThis.$refs.uploadbox.offsetTop
    jsThis.disw = e.clientX - jsThis.$refs.uploadbox.offsetLeft
    var than = jsThis
    var w = document.documentElement.clientWidth
    var h = document.documentElement.clientHeight
    document.onmousemove = function (e) {
      var boxh = e.clientY - than.dish
      var boxw = e.clientX - than.disw
      if (boxh <= 0) {
        boxh = 0
      } else if (boxh >= h - than.$refs.uploadbox.offsetHeight) {
        boxh = h - than.$refs.uploadbox.offsetHeight
      }
      if (boxw <= 0) {
        boxw = 0
      } else if (boxw >= w - than.$refs.uploadbox.offsetWidth) {
        boxw = w - than.$refs.uploadbox.offsetWidth
      }
      than.$refs.uploadbox.style.top = boxh + 'px'
      than.$refs.uploadbox.style.left = boxw + 'px'
    }
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmousemove = null
    }
    document.mouseover = function () {
      document.onmousemove = null
      document.onmousemove = null
    }
  }
}
