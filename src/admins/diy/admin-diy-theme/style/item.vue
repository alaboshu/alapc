<template>
  <div class="theme-item_outset theme-item-list">
    <div class="outset-img">
      <img v-lazy="theme.image" />
      <div class="outset-show" v-if="theme.id===defautTheme.id">
        <div class="outset-test">默认模板</div>
      </div>
      <div class="outset-layer">
        <div class="them_text">{{ theme.id }}</div>
        <div class="outset-layer_but">
          <span class="layer_but" @click="diy(theme)" v-if="theme.isPublic===false">编 辑</span>
          <span class="layer_but1" @click="make(theme)">复 制</span>
          <br /><br />
          <span class="layer_but3" @click="setDefault(theme)" v-if="theme.isPublic===false">设置默认</span>
          <span class="layer_but2" @click="deleteTheme(theme)" v-if="theme.isPublic===false">删除默认</span>
        </div>
      </div>
    </div>
    <div class="item_outset-text">
      <div class="outset-text_left">
        <p class="text_p1">
          <x-code>{{theme.sign}}</x-code>{{ theme.name }}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  import service from './service'
  export default {
    props: {
      theme: {},
      defautTheme: {}
    },
    methods: {
      async diy (theme) {
        await service.diy(this, theme)
      },
      async setDefault (theme) {
        this.$emit('setDefault', theme)
      },
      async deleteTheme (theme) {
        this.$emit('deleteTheme', theme)
      },
      async make (theme) {
        this.$emit('makeTheme', theme)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
