export default {
  async toConfig (widget) {
    var config = []
    widget.autoReprotData.list.forEach((list, listIndex) => {
      let data = {
        count: list.value,
        title: list.name,
        color: list.color,
        icon: list.icon,
        rate: list.rate,
        change: list.change,
        text: list.text,
        subtitle: list.subtitle,
        allcount: list.allcount,
        key: list.key,
        data: list.data,
        mount: list.mount
      }

      config.push(data)
    })
    return config
  }
}
