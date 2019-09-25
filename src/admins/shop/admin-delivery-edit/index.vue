<template>
  <div class="x-border-padding">
    <x-border :title="boxTitle">
      <zk-product-template :storeId="storeId" :templateId="templateId"></zk-product-template>
    </x-border>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        storeId: undefined,
        templateId: undefined,
        viewModel: {},
        boxTitle: '新建运费模板'
      }
    },
    async mounted () {
      if (this.$route.query.id !== undefined) {
        this.templateId = this.$route.query.id
        this.boxTitle = '编辑运费模板'
      }
      if (this.$route.query.storeId !== undefined) {
        this.storeId = this.$route.query.storeId
      }
    },
    methods: {
    }
  }
</script>
<style>
  .x-border-padding {
    padding: 10px;
    padding-left: 0px;
  }
</style>
