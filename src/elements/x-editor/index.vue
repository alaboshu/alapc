<template>
  <vue-ueditor-wrap v-model="ueditorWrap" @change.native="change"></vue-ueditor-wrap>
</template>

<script>
  import VueUeditorWrap from 'vue-ueditor-wrap'

  import './var.scss'
  import './styles'

  // x-editor
  export default {

    model: {
      prop: 'textType',
      event: 'value'
    },
    components: {
      VueUeditorWrap
    },
    data () {
      return {
        widgetModel: {},
        ueditorWrap: ''
      }
    },
    props: {
      value: {},
      widget: {},
      textType: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.textType !== undefined || this.textType !== null || this.textType !== '') {
          this.ueditorWrap = this.textType
        }
      },
      change () {
        this.$emit('value', this.ueditorWrap)
      }
    },
    watch: {
      textType: (n, o) => {
      },
      event (val) {
      },
      ueditorWrap: 'change'
    }
  }
</script>
