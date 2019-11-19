export default {
  chartType (type) {
    switch (type) {
      case 0:
        return 'line'
      case 1:
        return 'histogram'
      case 2:
        return 'bar'
      case 3:
        return 'pie'
      case 4:
        return 'ring'
      case 11:
        return 'scatter'
      default:
        return 'line'
    }
  }
}
