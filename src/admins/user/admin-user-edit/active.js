import emuny from '@/service/data/enum.json'
export default {
  getEmun (name, val) {
    for (let item of emuny) {
      if (item.name === name) {
        for (let list of item.keyValue) {
          if (list.key === val) {
            return list.value
          }
        }
      }
    }
  }
}
