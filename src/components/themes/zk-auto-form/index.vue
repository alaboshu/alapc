<template>
  <div class="zk-auto-form" v-if="formConfig&&async">
    <div v-if="serviceConfig.fromMessage==null">
      <el-alert v-if="formConfig.tooltip && formConfig.tooltip.alertText" :title="formConfig.tooltip.alertText" show-icon type="success" :closable="false"></el-alert>
      <el-form ref="generateForm" :model="viewModel" :rules="rules">
        <div v-if="formConfig.type==='tab'">
          <el-tabs v-model="tabActiveName">
            <el-tab-pane v-for="(column,index) in formConfig.columns" :key="index" :name="index">
              <span slot="label"><i :class="tabIconList[Number(index+1)]"></i> {{column.name}}</span>
              <!-- <form-item v-model="viewModel[tabColumn.field]" :column="tabColumn" :currentModel="viewModel"></form-item> -->
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-for="(item,index) in formConfig.columns" :key="index">

          <template>
            <form-item :key="item.key" :viewModel.sync="viewModel" :rules="rules" :widgets="item" :parament="parament"></form-item>
          </template>
        </div>
        <template v-if="formConfig.tooltip&&formConfig.tooltip.buttomHelpText!==undefined &&formConfig.tooltip.buttomHelpText!==null&&formConfig.tooltip.buttomHelpText.length > 0">
          <x-line :border="true" title="温馨提示">
            <ul class="zkAutoFormUl">
              <li class="zkAutoFormList" v-for="(item, index) in formConfig.tooltip.buttomHelpText" :key="index">{{index+1}}、 {{item}}</li>
            </ul>
          </x-line>
        </template>
      </el-form>
      <div class="auto-btn-box" v-if="showBotton">
        <div class="btn">
          <el-button type="primary" :loading="loading" @click="saveForm()">保存</el-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="operate-susscs">
        <div class="operate-susscs_icon">
          <i class="el-icon-check"></i>
        </div>
        <div class="susscs-text">{{serviceConfig.fromMessage.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import formItem from './form-item'
  import convert from './convert'
  import service from './service'

  export default {
    name: 'zk-auto-form',
    components: {
      formItem
    },
    props: {
      notConvert: {
        default: false
      },
      showBotton: {
        default: true
      },
      serviceConfig: {},
      dataModel: {},
      widget: {},
      afterSave: {
        type: Boolean,
        default: false
      }, // 判断父组件中是否定义保存后执行单独的方法，如果设置为true，在需要定义afterSave事件  
      // 示范用法：<zk-auto-form type="RecommendAddUser" @afterSave="afterSave" :afterSave="true"></zk-auto-form>
      type: {} // 如果type不为空的时候，表单从服务器上动态获取
    },
    data () {
      return {
        viewModel: {},
        formConfig: null,
        autoForm: {},
        rules: {},
        tabIconList: [],
        formLabelWidth: 100,
        parament: null,
        tabActiveName: 0,
        loading: false,
        async: false
      }
    },
    mounted () {
      this.init()
      this.$nextTick(() => {
        this.$on('form_change_widget_data', (widgetData) => {
          this.init(widgetData)
        })
      })
    },
    methods: {
      async init (newWidget) {
        console.info('wdigetdata', this.serviceConfig, this.type)
        var widgetData = this.serviceConfig
        if (this.notConvert) {
          this.autoForm = widgetData
        } else {
          if (!this.$api.isEmpty(newWidget)) {
            widgetData = newWidget
          }
          if (!this.$api.isEmpty(widgetData)) {
            this.autoForm = await convert.toConfig(widgetData)
          }
        }
        this.viewModel = service.getModel(this.autoForm, this.dataModel)
        this.async = true
        this.$emit('formLoad', this.async)
        this.tabIconList = convert.geIcon()
      },
      async saveForm () {
        this.$emit('saveForm', this.viewModel)
      }
    },
    watch: {
      value: {
        deep: true,
        handler (val) {
          this.viewModel = { ...this.viewModel, ...val }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
  @import "./autoform.scss";
</style>
