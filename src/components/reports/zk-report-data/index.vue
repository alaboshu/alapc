<template>
  <div v-if="async">
    <number-item v-if="widget.autoReprotData.type===1" :widget="widget.autoReprotData.list"></number-item>
    <tabs-item v-if="widget.autoReprotData.type===2" :widget="widget.autoReprotData.list"></tabs-item>
    <amount-item v-if="widget.autoReprotData.type===3" :widget="widget.autoReprotData.list"></amount-item>
    <mount-item v-if="widget.autoReprotData.type===4" :widget="widget.autoReprotData.list"></mount-item>
    <general-item v-if="widget.autoReprotData.type===5" :widget="widget.autoReprotData.list"></general-item>
    <growing-item v-if="widget.autoReprotData.type===6" :widget="widget.autoReprotData.list"></growing-item>
    <introduce-item v-if="widget.autoReprotData.type===7" :widget="widget.autoReprotData.list"></introduce-item>
    <member-item v-if="widget.autoReprotData.type===8" :widget="widget.autoReprotData.list"></member-item>
    <ratio-item v-if="widget.autoReprotData.type===9" :widget="widget.autoReprotData.list"></ratio-item>
    <states-item v-if="widget.autoReprotData.type===10" :widget="widget.autoReprotData.list"></states-item>
    <totalItem v-if="widget.autoReprotData.type===11" :widget="widget.autoReprotData.list"></totalItem>
  </div>
</template>
<script>
  // import convert from '../../convert.js'
  import numberItem from './items/number-item.vue'
  import tabsItem from './items/tabs-item.vue'
  import amountItem from './items/amount-item.vue'
  import mountItem from './items/mount-item.vue'
  import generalItem from './items/general-item.vue'
  import growingItem from './items/growing-item.vue'
  import introduceItem from './items/introduce-item.vue'
  import memberItem from './items/member-item.vue'
  import ratioItem from './items/ratio-item.vue'
  import statesItem from './items/states-item.vue'
  import totalItem from './items/total-item.vue'
  export default {
    components: {
      numberItem,
      tabsItem,
      amountItem,
      mountItem,
      generalItem,
      growingItem,
      introduceItem,
      memberItem,
      ratioItem,
      statesItem,
      totalItem
    },
    data () {
      return {
        async: false,
        data: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        // this.data = await convert.toConfig(this.widget)
        this.async = true
      }
    }
  }
</script>
