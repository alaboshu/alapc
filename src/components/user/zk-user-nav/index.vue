<template>
  <div class="zk-user-nav">
    <div class="zk-user-nav-left" :class="isShow?'showLeft':'hidLeft'">
      <div class="zk-user-nav-cont" :class="isShow?'showLeft':'hidLeft'">
        <div class="zk-user-nav-headIcon">
          <i class="fontClass" :class="isShow?'el-icon-s-fold':'el-icon-s-unfold'" @click="isShow=!isShow"></i>
          <ul>
            <li class="zk-user-nav-list" v-for="(item, index) in listData" :key="index" @click="listIndex = index,item.links?isRightShow=true:isRightShow=false" :class="{'selection-list':listIndex == index}" v-show="item.name!=='我是供应商'">
              <router-link :to="item.url" class="zk-user-nav-list_links" :class="{'links_active':listIndex == index}">
                <el-tooltip class="item" effect="dark" :content="item.name" placement="right" v-if="!isShow">
                  <i class="font-list iconfont" :class="item.icon"></i>
                </el-tooltip>
                <i class="font-list iconfont" :class="item.icon" v-else></i>
                <div :style="{display:isShow?'block':'none'}">{{item.name}}</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="zk-user-nav-right" :class="isRightShow?'showRight':'hidRight'">
      <div class="zk-user-nav-right-cont" :class="isRightShow?'showRight':'hidRight'">
        <div class="zk-user-nav-right-head showRightIcon" v-if="isRightShow" :class="isRightShow?'hidRightIcon':'showRightIcon'" @click="isRightShow = !isRightShow">
          <i class="iconLinks" :class="isRightShow?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></i>
        </div>
        <div class="zk-user-nav-menu">
          <el-menu v-if="isRightShow" default-active="2" class="el-menu-vertical-demo" unique-opened>
            <div v-for="(item,index) in viewModel.links" v-show="item.isShow" :key="index">
              <el-submenu :index="'_'+index" v-if="item.links">
                <template slot="title">
                  <span>{{item.name}}</span>
                </template>
                <router-link v-for="(listItem, listIndex) in item.links" :key="listIndex" :to="listItem.url">
                  <el-menu-item :index="'_'+index+'_'+listIndex">{{listItem.name}}</el-menu-item>
                </router-link>
              </el-submenu>
              <router-link :to="item.isExtLink?'':item.url" v-else>
                <el-menu-item :index="'_'+index" @click.native="routerLink(item)">
                  <div slot="title">
                    <span>{{item.name}}</span>
                  </div>
                </el-menu-item>
              </router-link>
            </div>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import userJson from './user.json'
  export default {
    data () {
      return {
        isShow: true,
        listData: userJson.links,
        listIndex: 0,
        isRightShow: false,
        viewModel: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        var list = window.sessionStorage.getItem('listIndex')
        if (list) {
          this.listIndex = list
          if (this.listIndex > 0) {
            this.isRightShow = true
          }
        }
        for (let i in this.listData) {
          if (Number(this.listIndex) === Number(i)) {
            this.viewModel = this.listData[i]
          }
        }
      },
      change (val) {
        window.sessionStorage.setItem('listIndex', val)
        this.init()
      },
      routerLink (item) {
        if (item.isExtLink) {
          window.open(item.url)
        }
      }
    },
    watch: {
      'listIndex': 'change'
    }
  }
</script>



<style  lang="scss" scoped>
  @import "./var.scss";
</style>
