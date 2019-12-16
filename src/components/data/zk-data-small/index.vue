<template>
  <div class="zk-data-small">
    <el-row :span="24">
      <el-col v-for="(item,index) in widgetModel" :key="index" :md="span" :xs="24" :sm="12">
        <div class="item">
          <router-link to="item.href" @click="item.click?item.click(item):''">
            <div class="item-header" :style="{backgroundColor:item.color,backgroundImage:`url(${item.colorImg})`}">
              <span class="item-title">{{item.title}}</span>
              <span class="item-subtitle">{{item.subtitle}}</span>
            </div>
            <div class="item-content">
              <div class="item-img">
                <img :src="item.img" alt="">
              </div>
              <div class="item-list">
                <div class="item-row" v-for="(citem,cindex) in item.list" :key="cindex">
                  <span class="item-label">{{citem.label}}</span>
                  <span class="item-value">{{citem.value}}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  
  import dataJson from './data.json'
  export default {
    
    data () {
      return {
        widgetModel: '',
        span: 8
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
        this.widgetModel = dataJson
      }
    }
  }
</script>
<style  lang="scss" scoped>
  @import "./index.scss";
</style>
