<template>
  <vue-ueditor-wrap v-model="reitText"></vue-ueditor-wrap>
</template>

<script>
  import VueUeditorWrap from 'vue-ueditor-wrap'
  export default {
    props: {
      viewModel: {}
    },
    data () {
      return {
        reitText: ''
      }
    },
    components: {
      VueUeditorWrap
    }
  }
</script>
