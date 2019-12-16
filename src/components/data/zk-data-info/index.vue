<template>
  <div class="zk-data-info">
    <el-row span="24">
      <el-col :xs="24" :sm="12" :md="6" v-for="(item,index) in widgetModel" :key="index">
        <div class="item" :style="{background:item.color}">
          <router-link to="item.href">
            <div class="item-header">
              <img :src="item.imgsrc" alt="">
            </div>
            <div class="item-content">
              <span>{{item.title}}</span>
              <p>{{item.content}}</p>
            </div>
            <div class="item-footer">
              <div class="time">
                <span>{{item.time}}</span>
              </div>
              <div class="imgs">
                <ul>
                  <li v-for="(citem,cindex) in item.headimg" :key="cindex">
                    <img :src="citem.src" alt="" class="el-tooltip" aria-describedby="el-tooltip-3462" tabindex="0">
                  </li>
                </ul>
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
        span: 6
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
