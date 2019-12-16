<template>
  <div class="zkweb-col" :class="xClass" :style="style">
    <slot />
  </div>
</template>
<script>
  export default {
    props: {
      xClass: {
        type: String
      },
      col: {
        type: Number,
        default: 12
      }
    },
    computed: {
      style () {
        const col = this.col > 24 ? 24 : this.col
        const { gutter } = this.$parent
        const num = gutter === '' ? 0 : gutter / 2

        return {
          paddingLeft: num + 'px',
          paddingRight: num + 'px',
          width: (100 / 24) * col + '%'
        }
      }
    }
  }
</script>
<style  lang="scss" scoped>
  @import "~_style/theme.scss";
  .zkweb-col {
    float: left;
  }
</style>

