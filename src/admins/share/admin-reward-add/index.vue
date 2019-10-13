<template>
  <x-border :title="widgetModel.name" v-if="async" type="success">
    <div class="admin-reward-add">
      <zk-auto-form :serviceConfig="widgetModel.autoForm"></zk-auto-form>
    </div>
  </x-border>
</template>

<script>
  import './var.scss'

  export default {
    data () {
      return {
        async: false,
        widgetModel: {}
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
        var para = {
          moduleId: this.$route.query.moduleId
        }
        var repones = await this.$api.httpGet('/Api/RewardRule/GetEditSimpleView', para)
        if (repones.status === 1) {
          this.widgetModel = repones.result
          this.async = true
        }
      }
    }
  }
</script>
