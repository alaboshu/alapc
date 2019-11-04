<template>
  <div class="admin-app">
    <x-border title="应用" type="focus" name="icon-5333-fenleyeezz" intro="应用市场、查找您所需要的应用功能">
      <div slot="headerRight" class="admin-app-select">
        <el-input v-model="selectInput" placeholder="请输入搜索内容" @input="selectClick" class="input-select"></el-input>
        <el-button type="primary" class="button-select" @click="selectClick">搜索</el-button>
      </div>
      <div class="admin-app-flex">
        <div class="admin-app-list" v-for="(item, index) in viewModel.menus" :key="index" @click="linkTo(item)" :title="item.name">
          <div class="admin-app-icon">
            <x-icon :xClass="item.icon" color="#fff"></x-icon>
          </div>
          <div class="admin-app-cont">
            <div class="admin-app-title">{{item.name}}</div>
            <div class="admin-app-intro">
              <span class="admin-app-span" v-for="(itemChild, indexChild) in item.menus" :key="index+indexChild" v-show="indexChild < 2">{{itemChild.name}}、</span>
            </div>
          </div>
        </div>
      </div>
    </x-border>
  </div>
</template>

<script>
  import './var.scss'
  import './styles'

  export default {
    data () {
      return {
        viewModel: {},
        widgetModel: {},
        selectInput: '',
        selectModel: {}
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
        var data = this.$api.localGet('adminRoleOutput')
        this.widgetModel = data
        for (let i of this.widgetModel.menus) {
          if (i.url === '/Admin/App') {
            this.viewModel = i
            this.selectModel = JSON.parse(JSON.stringify(i))
          }
        }
      },
      linkTo (data) {
        this.$bus.$emit('global_bus_admin_app_click', this.widgetModel, data)
      },
      selectClick () {
        if (this.selectInput !== '') {
          var data = []
          this.selectModel.menus.forEach(element => {
            if (element.name.indexOf(this.selectInput) > -1) {
              data.push(element)
            }
          })
          this.viewModel.menus = data
        } else {
          this.viewModel = JSON.parse(JSON.stringify(this.selectModel))
        }
      }
    }
  }
</script>
