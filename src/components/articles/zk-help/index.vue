<template>
  <div class="zk-help">
    <div class="zk-help-left">
      <div class="zk-help-left-cont">
        <div v-for="(item,index) in viewModel" :key="index">
          <div class="zk-help-title">{{item.relationName}}</div>
          <div class="zk-help-list" :class="{'cl':listItem.id === helpId}" @click="assist(listItem.id)" v-for="(listItem, listIndex) in item.article" :key="listIndex">{{listItem.title}}</div>
        </div>
      </div>
    </div>
    <div class="zk-help-right" v-if="async">
      <div class="zk-help-detail-title">{{detailCont.title}}</div>
      <!-- <div class="zk-help-detail-fubiao">MOBILE REGISTRATION</div> -->
      <div class="zk-help-detail" v-html="detailCont.content">
      </div>
    </div>
  </div>
</template>

<script>
  
  // import { HELP_NAV_GET, ARTICLE_ARTICLEDETAIL_GET } from '@/service/core/apiUrl'
  export default {
    
    data () {
      return {
        widgetModel: '',
        viewModel: '',
        messageBox: 0,
        conter: '',
        listnav: '',
        conterIndexs: [],
        detailCont: '',
        async: false,
        helpId: ''
      }
    },
    props: {
      widget: {}
    },
    async onShow () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.helpId = this.$route.query.id
        var para = {
          id: this.$route.query.id
        }
        var resposne = await this.$api.httpGet('Api/Manual/GetManualListByRelation')
        this.viewModel = resposne.result
        var detailCont = await this.$api.httpGet('/api/article/ArticleDetail', para)
        this.detailCont = detailCont.result
        // if (this.helpId) {
        //   for (let i in this.viewModel) {
        //     for (let j of this.viewModel[i].article) {
        //       if (this.helpId === j.id) {
        //         this.detailCont = j
        //       }
        //     }
        //   }
        // }
        this.async = true
      },
      async assist (id) {
        this.async = false
        this.$router.push('/articles/help/index?id=' + id)
        document.body.scrollTo(0, 0)
        this.init()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
