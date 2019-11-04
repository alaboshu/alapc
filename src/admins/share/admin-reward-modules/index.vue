<template>
  <div class="admin-reward-modules" v-loading="isLoading">
    <div class="modules-search">
      <el-input placeholder="请输入维度名称，简介，维度Id等" v-model="searchValue" @input="search"></el-input>
      <div class="search-buttom" @click="search">搜索</div>
    </div>
    <div class="reward-modules_ul">
      <div class="reward-modules_li" v-for="(item,index) in widgetModel" :key="index">
        <div class="reward-modules_box">
          <div class="modules_li-left">
            <router-link :to="'/Admin/RewardRule/Edit?moduleId='+item.id" class="modules-title" :title="item.name" @click="rewardRouter(item)">{{item.name}}</router-link>
            <router-link :to="'/Admin/RewardRule/Edit?moduleId='+item.id" class="modules-intro" :title="item.intro" @click="rewardRouter(item)">{{item.intro}}</router-link>
            <router-link :to="'/Admin/RewardRule/Edit?moduleId='+item.id" class="modules-buttom" @click="rewardRouter(item)">维度管理</router-link>
          </div>
          <div class="modules_li-right">
            <x-icon :name="item.icon" size="50" color="#e8dbf5"></x-icon>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import './var.scss'
  import iconJson from './icon.json'
  export default {
    data () {
      return {
        widgetModel: null,
        searchValue: '',
        isLoading: true
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
        this.search()
        this.isLoading = false
      },
      async search () {
        this.widgetModel = null
        var para = {
          key: this.searchValue
        }
        var response = await this.$api.httpGet('/Api/RewardRule/Modules', para)
        if (response.status === 1) {
          this.widgetModel = response.result.shareModules
        }
        for (let i in this.widgetModel) {
          this.widgetModel[i].icon = iconJson[i]
        }
      }
    }
  }
</script>
