<template>
  <x-border title="酷屏" type="focus" icon="icon-5333-sudu">
    <div class="admin-pages-list">
      <div v-for="(widget, index) in viewModel" :key="index">
        <div class="theme-item_outset theme-item-list">
          <div class="outset-img">
            <img :src="widget.setting.popImage" v-if="widget.setting && widget.setting.popImage" />
            <img v-else src="http://ui.5ug.com/static/vdata/vdata.png" />
            <div class="outset-layer">
              <div class="outset-layer_but">
                <a target="_blank" :href="'/diy?themeId='+widget.id">编辑</a>
                <a target="_blank" class="layer_but1" :href="'/admin/vdata/preview?path='+widget.path">预览</a>
              </div>
              <a target="_blank" class="outset-layer_a" @click="getRemove(widget)" v-if="false">删除酷屏</a>
            </div>
          </div>
          <div class="item_outset-text">
            <div class="outset-text_left">
              <p class="text_p1">{{widget.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </x-border>
</template>

<script>
  export default {
    data () {
      return {
        adminVData: {},
        viewModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var response = await this.$api.httpGet('/api/themepage/querylist?isVDataPage=true')
        if (response.status === 1) {
          this.viewModel = response.result
        }
        console.info(this.viewModel)
      },
      async getRemove () {

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "./var.scss";
</style>
