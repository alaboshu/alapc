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
              <a target="_blank" :href="'/diy?themeId=' + widget.id">编辑</a>
              <a target="_blank" class="layer_but1" :href="'/preview?themeId=' + widget.id">预览</a>
            </div>
            <a target="_blank" class="outset-layer_a" @click="getRemove(widget)">删除模板</a>
          </div>
        </div>
        <div class="item_outset-text">
          <div class="outset-text_left">
            <p class="text_p1">{{ widget.name }}</p>
            <!-- <p class="text_them">平台：<x-code :title="widget.siteName">{{widget.siteName}}</x-code>
            </p>
            <p class="text_p2">适用：
            </p> -->
          </div>
          <!-- <div class="outset-text_right">
            <img :src="widget.avator" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      widgetModel: {}
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
