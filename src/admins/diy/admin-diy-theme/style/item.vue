<template>
  <div class="theme-item_outset theme-item-list">
    <div class="outset-img">
      <img :src="theme.image" />
      <div class="outset-show" v-if="theme.isDefault">
        <div class="outset-test">默认模板</div>
      </div>
      <div class="outset-layer">
        <div class="them_text">{{ theme.id }}</div>
        <div class="outset-layer_but">
          <span class="layer_but" @click="diy(theme)" v-if="remote===false">编 辑</span>
          <span class="layer_but1" @click="diy(theme)">制 作</span>
          <br /><br />
          <span class="layer_but3" @click="diy(theme)" v-if="remote===false">设置默认</span>
          <span class="layer_but2" @click="del(theme)" v-if="remote===false">删 除</span>

        </div>
      </div>
    </div>
    <div class="item_outset-text">
      <div class="outset-text_left">
        <p class="text_p1">
          <x-code>{{type}}</x-code>{{ theme.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      theme: {},
      remote: {},
      type: {}
    },
    methods: {
      async diy (theme) {
        var para = {
          themeId: theme.id
        }
        this.$api.progressOpen('正在登录中,预计时间<span style="color: red;">1分钟</span>，请勿离开或刷新页面...')
        var response = await this.$api.httpGet('/api/theme/GetLoginUrl', para)
        this.$api.progressClose()
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
