<template>
  <router-link class="column-link" :to="toUrl" v-html="title"></router-link>
</template>
<script>
  export default {
    data () {
      return {
        toUrl: ''
      }
    },
    props: {
      url: {
        default: null
      },
      value: {
        default: null
      },
      title: {
        default: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        console.info('this.title', this.title)
        if (this.url !== undefined && this.value !== undefined) {
          var linkUrl = this.url.replace('[[', 'linkBegin')
          this.toUrl = linkUrl.match(/(\S*)linkBegin/)[1]
          linkUrl = linkUrl.replace(']]', 'linkEnd')
          var query = linkUrl.match(/linkBegin(\S*)linkEnd/)[1]
          if (query !== undefined && query !== null) {
            query = this.replaceStr(query)
            var queryValue = this.value[query]
            this.toUrl = this.toUrl + queryValue
          }
        }
      },
      // 首字母小写
      replaceStr (str) {
        var strTemp = '' // 新字符串
        for (var i = 0; i < str.length; i++) {
          if (i === 0) {
            strTemp += str[i].toLowerCase() // 第一个
            continue
          }
          if (str[i] === ' ' && i < str.length - 1) { // 空格后
            strTemp += ' '
            strTemp += str[i + 1].toLowerCase()
            i++
            continue
          }
          strTemp += str[i]
        }
        return strTemp
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-table td {
    padding: 10px 0 !important;
    .column-link,
    .column-link:visited,
    a:visited {
      text-decoration: none;
      color: #7b7e8a;
    }

    .column-link:hover,
    a:hover {
      color: #ad5beb;
    }
  }
</style>
