<template>
  <div class="v-decoration" v-if="widgetModel">
    <v-decoration-1 v-if="widgetModel.decorationType == 1">
      <slot></slot>
    </v-decoration-1>
    <v-decoration-2 v-if="widgetModel.decorationType == 2">
      <slot></slot>
    </v-decoration-2>
    <v-decoration-3 v-if="widgetModel.decorationType == 3">
      <slot></slot>
    </v-decoration-3>
    <v-decoration-4 v-if="widgetModel.decorationType == 4">
      <slot></slot>
    </v-decoration-4>
    <v-decoration-5 v-if="widgetModel.decorationType == 5">
      <slot></slot>
    </v-decoration-5>
    <v-decoration-6 v-if="widgetModel.decorationType == 6">
      <slot></slot>
    </v-decoration-6>
    <v-decoration-7 v-if="widgetModel.decorationType == 7">
      <slot></slot>
    </v-decoration-7>
    <v-decoration-8 v-if="widgetModel.decorationType == 8">
      <slot></slot>
    </v-decoration-8>
    <v-decoration-9 v-if="widgetModel.decorationType == 9">
      <slot></slot>
    </v-decoration-9>
    <v-decoration-10 v-if="widgetModel.decorationType == 10">
      <slot></slot>
    </v-decoration-10>
  </div>
</template>

<script>
  import stylesWedget from './styles-wedget'
  export default {
    mixins: [stylesWedget],
    data () {
      return {
        widgetModel: null
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.widget && this.widget.value) {
          this.widgetModel = this.widget.value
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
