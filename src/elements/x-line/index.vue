<template>
  <div class="x-line">
    <div class="line-header" :class="{'line-border':border}">
      <span class="more"></span>
      <div class="line-header-title" :style="{color:backGroundColor}">
        <i class="iconver iconfont glyph-icon line-header-i" v-if="!index" :class="Icon"></i>
        {{title}}
        <span class="line-header-intro">
          <div v-if="index" class="line-header-list">{{index}}.</div>
          {{intro}}
        </span>
      </div>
      <div class="header-right">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <div class=" line-body">
      <slot></slot>
    </div>
    <div class="line-footer">
      <span></span>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        Icon: null,
        backGroundColor: '',
        fontColor: '#575962'
      }
    },
    props: {
      title: {},
      intro: {},
      type: {
        type: String,
        validator: function (t) {
          return t === 'metal' || t === 'brand' || t === 'primary' || t === 'success' || t === 'warning' || t === 'focus' || t === 'accent' || t === 'danger' || t === 'light'
        },
        defalut: 'metal'
      },
      icon: {},
      index: {
        default: null
      },
      border: {
        default: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (!this.icon) {
          this.Icon = this.$random.icon()
        } else {
          this.Icon = this.icon
        }
        this.convert(this.type)
      },
      convert (type) {
        if (type === 'brand') {
          this.backGroundColor = '#716aca'
          this.fontColor = '#ffffff'
        } else if (type === 'info') {
          this.backGroundColor = '#36a3f7'
          this.fontColor = '#ffffff'
        } else if (type === 'metal') {
          this.backGroundColor = '#575962'
          this.fontColor = '#ffffff'
        } else if (type === 'primary') {
          this.backGroundColor = '#5867dd'
          this.fontColor = '#ffffff'
        } else if (type === 'success') {
          this.backGroundColor = '#34bfa3'
          this.fontColor = '#ffffff'
        } else if (type === 'warning') {
          this.backGroundColor = '#ffb822'
          this.fontColor = '#ffffff'
        } else if (type === 'focus') {
          this.backGroundColor = '#9816f4'
          this.fontColor = '#ffffff'
        } else if (type === 'accent') {
          this.backGroundColor = '#00c5dc'
          this.fontColor = '#ffffff'
        } else if (type === 'danger') {
          this.backGroundColor = '#f4516c'
          this.fontColor = '#ffffff'
        } else if (type === 'light') {
          this.backGroundColor = '#ffffff'
          this.fontColor = '#575962'
        } else {
          this.backGroundColor = '#ffffff'
          this.fontColor = '#575962'
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "./style.scss";
</style>
