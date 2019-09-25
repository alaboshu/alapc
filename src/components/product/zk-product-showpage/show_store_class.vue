<template>
  <div class="show_store_class">
    <div class="show_store_class_left">
      <Showparameter />
    </div>
    <div class="show_store_class_right" v-if="data">
      <Right :productView="data"></Right>
    </div>
  </div>
</template>


<script>
  import Right from './show_right'
  import Showparameter from './show_parameter'
  export default {
    data () {
      return {
        data: null
      }
    },
    components: {
      Right,
      Showparameter
    },
    props: {
      productView: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.data = this.productView
      }
    }
  }
</script>



<style lang="scss" scoped>
  .show_store_class {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 20px;
    .show_store_class_left {
      width: 290px;
    }
    .show_store_class_right {
      width: 900px;
      border: 1px solid #e5e5e5;
    }
  }
</style>

