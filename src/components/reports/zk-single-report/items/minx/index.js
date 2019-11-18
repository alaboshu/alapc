export default {
  methods: {
    getDate (num) {
      var timer = setInterval(() => {
        if (this.viewNum === null) {
          this.viewNum = num + 1000
        }
        if (Number(this.viewNum) === Number(num)) {
          clearInterval(timer)
        } else {
          this.viewNum--
        }
      }, 80)
    }
  }
}
