
<template>
  <div class="x-border" v-if="async">
    <div class="widget-header" :style="{background:backGroundColor}">
      <span class="more"></span>
      <h3 class="widget-header-title" :style="{color:fontColor}">
        <x-icon class="iconver" :name="borderIcon" :color="fontColor"></x-icon>
        {{borderTitle}}
        <div class="widget-header-desc" v-if="description">{{description}}</div>
      </h3>
      <div class="header-right">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <div class="widget-body">
      <slot></slot>
    </div>
    <div class="widget-footer">
      <span></span>
    </div>
  </div>
</template>
<script>
  import service from './service'
  export default {
    data () {
      return {
        borderIcon: null,
        backGroundColor: '#ffffff',
        fontColor: '#575962',
        description: null,
        borderTitle: null,
        async: false
      }
    },
    props: {
      title: {
        default: null
      },
      desc: {
        default: null
      },
      type: {
        type: String,
        validator: function (t) {
          return t === 'metal' || t === 'brand' || t === 'primary' || t === 'success' || t === 'warning' || t === 'focus' || t === 'accent' || t === 'danger' || t === 'light'
        },
        defalut: 'metal'
      },
      icon: {
        // 图标名称
        default: null
      },
      // 图标对象
      border: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      // 修改标题，图标和颜色
      changeStyle (title, icon, type, desc) {
        this.borderTitle = null
        this.backGroundColor = '#ffffff'
        this.fontColor = '#575962'
        if (title && !this.borderTitle) {
          this.borderTitle = title
        }
        if (icon) {
          this.borderIcon = icon
        }
        if (type) {
          this.convert(type)
        }
        if (!this.borderIcon && this.$base.filter() === 3) {
          this.borderIcon = service.getAdminborderIcon()
        }
        this.description = desc
      },
      async init () {
        if (this.icon) {
          this.borderIcon = this.icon
        }
        if (this.title) {
          this.borderTitle = this.title
        }
        if (this.desc) {
          this.description = this.desc
        }
        if (this.border) {
          if (this.border.title) {
            this.borderTitle = this.border.title
          }
          if (this.border.description) {
            this.description = this.border.description
          }
          if (this.border.icon) {
            if (this.border.icon.includes('fa-') !== -1) {
              this.borderIcon = this.border.icon
            }
          }
        }
        if (!this.icon) {
          this.borderIcon = this.$random.icon()
        }
        console.info('thsi.border', this.border)
        this.convert(this.type)
        this.async = true
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
<style lang="scss" rel="stylesheet/scss">
  @import "~_style_all/theme.scss";
  @import "./style.scss";
</style>
