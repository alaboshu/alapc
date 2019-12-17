<template>
  <div class="admin-pages-list">
    <div v-for="(widget, index) in widgetModel" :key="index">
      <div class="theme-item_outset theme-item-list">
        <div class="outset-img">
          <img :src="widget.image" />
          <div class="outset-show">
            <div class="outset-test">默认模板</div>
          </div>
          <div class="outset-layer">
            <div class="them_text">{{ widget.id }}</div>
            <div class="outset-layer_but">
              <span class="layer_but" @click="diy(widget)">编辑</span>
              <a target="_blank" class="layer_but1" :href="'/preview?themeId=' + widget.id">预览</a>
            </div>
          </div>
        </div>
        <div class="item_outset-text">
          <div class="outset-text_left">
            <p class="text_p1">
              <x-code v-if="widget.isDefault">默认</x-code>{{ widget.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      widgetModel: {}
    },
    methods: {
      async diy (theme) {
        var para = {
          themeId: theme.id
        }
        var response = await this.$api.httpGet('/api/theme/GetLoginUrl', para)
        if (response.status === 1) {
          window.open(response.message, '_blank')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
