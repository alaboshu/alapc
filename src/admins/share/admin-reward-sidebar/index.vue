<template>
  <div class="admin-reward-sidebar">
    <ul class="reward-sidebar_ul">
      <li class="reward-sidebar_li" v-for="(item,index) in sidebarValue.links" :key="index" :class="{'actions-list': index == sidebarIndex}" @click="sidebarTo(item, index), sidebarIndex=index">
        <div class="reward-sidebar_text">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import sidebar from './sidebar.json'
  import './var.scss'

  export default {
    data () {
      return {
        sidebarIndex: 0,
        sidebarValue: ''
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
        this.sidebarValue = sidebar
      },
      sidebarTo (val, index) {
        this.$router.push(val.url)
      }
    }
  }
</script>
