<template>
  <x-badge :color="color" v-if="text">{{text}}</x-badge>
</template>
<script>
  export default {
    data () {
      return {
        text: null,
        color: ''
      }
    },
    props: {
      type: {
        default: null
      },
      value: {
        type: Number,
        default: 0
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        var find = this.$base.enumValue(this.type, this.value)
        console.info('find', find)
        if (find) {
          this.text = find.value
          this.color = find.cssType
        }
      }
    }
  }
</script>
