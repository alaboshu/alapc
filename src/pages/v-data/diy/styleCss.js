export default {
  getStyle (jsThis, widget) { 
    var resize = widget.resizeLayout
    // width:${resize.w}px;height:${resize.h}px;
    var styleB = `top:${resize.y}px;left:${resize.x}px; position:absolute`
    return styleB
  }
}
