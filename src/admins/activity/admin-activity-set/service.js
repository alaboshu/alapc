export default {
  // 单独处理会员等级价
  memberDiscountActivity (model) {
    var newdiscountList = []
    model.discountList.forEach((list, listIndex) => {
      var newList = {
        gradeItems: []
      }
      for (var i in list) {
        if (i.length > 30) {
          var obj = {
            id: i,
            price: list[i]
          }
          newList.gradeItems.push(obj)
        }
        if (i.length < 30) {
          newList[i] = list[i]
        }
      }
      newdiscountList.push(newList)
    })
    model.discountList = newdiscountList
    return model
  }
}
