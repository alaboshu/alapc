<template>
  <x-widget type="city" v-if="async"></x-widget>
</template>

<script>
  export default {
    data () {
      return {
        async: false
      }
    },
    mounted () {
      this.async = true
    },
    methods: {
    }
  }
</script>
