<template>
  <div class="zk-rank-report">
    <div class="rank-report_list" :style="'width:'+100/3+'%;'" v-for="(item,index) in 3" :key="index">
      <div class="rank-report_head">
        <div class="head-title">Download Files</div>
        <div class="head-buttom">Latest<i class="el-icon-arrow-down"></i></div>
      </div>
      <div class="rank-report_box">
        <ul class="rank-report_ul">
          <li class="rank-report_li" v-for="(itemList,indexList) in 6" :key="indexList">
            <div class="image-is">
              <img src="http://img4.imgtn.bdimg.com/it/u=508387608,2848974022&fm=26&gp=0.jpg" alt="" />
            </div>
            <div class="writing-a">
              <div class="writing-a_name">Elskdksj Ojkkk Psjands</div>
              <div class="writing-a_intro">asdas Radasd Unnasbdbasbdm</div>
            </div>
            <div class="buttom-a">Follow</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import './var.scss'

  export default {
    name: 'zk-rank-report',
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
