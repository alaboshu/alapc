<template>
  <div class="zk-icon-ad">
    <div class="icon-ad_list" :style="'width:'+100/widget.value.count+'%;'" v-for="(item,index) in widget.value.reportValues" :key="index" @click="$router.push(item.url.value)">
      <div class="icon_box">
        <div class="icon_box-text" :style="'background:'+item.backGroundColor+';'">
          <x-icon :src="item.icon.name" :size="item.icon.size" :color="item.icon.iconSecondColor"></x-icon>
        </div>
      </div>
      <div class="icon-ad_name">{{item.name}}</div>
      <div class="icon-ad_intro">{{item.intro}}</div>
    </div>
  </div>
</template>

<script>
  import './var.scss'

  export default {
    name: 'zk-icon-ad',
    data () {
      return {
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
      }
    }
  }
</script>
