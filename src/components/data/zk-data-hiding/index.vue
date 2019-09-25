<template>
  <div class="zk-data-hiding">
    <div class="m-portlet__body">
      <div class="m-widget13">
        <div class="m-widget13__item">
          <span class="m-widget13__desc m--align-right">
            Company Name
          </span>
          <span class="m-widget13__text m-widget13__text-bolder">
            Stuad Deportive
          </span>
        </div>
        <div class="m-widget13__item">
          <span class="m-widget13__desc m--align-right">
            Anual Taxes:
          </span>
          <span class="m-widget13__text m-widget13__text-bolder">
            $520,000
          </span>
        </div>
        <div class="m-widget13__item">
          <span class="m-widget13__desc m--align-right">
            Business Description:
          </span>
          <span class="m-widget13__text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </span>
        </div>
        <div class="m-widget13__item">
          <span class="m-widget13__desc m--align-right">
            Employee Amount:
          </span>
          <span class="m-widget13__text m-widget13__text-bolder">
            1,300
          </span>
        </div>
        <div class="m-widget13__item">
          <span class="m-widget13__desc m--align-right">
            Emal:
          </span>
          <span class="m-widget13__text">
            supporet@keenthemes.com
          </span>
        </div>
        <div class="m-widget13__item">
          <span class="m-widget13__desc m--align-right">
            Phone:
          </span>
          <span class="m-widget13__text m-widget13__number-bolder m--font-brand">
            (0) 123 456 78 90
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: ''
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
      }
    }
  }
</script>
<style lang="scss">
  @import "./index.scss";
</style>
