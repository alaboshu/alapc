<template>
  <div class="zk-auto-form" v-if="autoForm&&async">
    <div v-if="serviceConfig.fromMessage==null">
      <el-alert v-if="autoForm.tooltip && autoForm.tooltip.alertText" :title="autoForm.tooltip.alertText" show-icon type="success" :closable="false"></el-alert>
      <el-form ref="generateForm" :model="viewModel">
        <div v-if="autoForm.type==='tab'">
          <el-tabs v-model="tabActiveName">
            <el-tab-pane v-for="(column,index) in autoForm.columns" :key="index">
              <span slot="label"><i :class="column.icon"></i> {{column.name}}</span>
              <form-item v-for="(tabColumn,tabIndex) in column.columns" :key="tabIndex" v-model="viewModel[tabColumn.field]" :column="tabColumn" :currentModel="viewModel"></form-item>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-else>
          <form-item v-for="(column,index) in autoForm.columns" :key="index" v-model="viewModel[column.field]" :column="column" :currentModel="viewModel"></form-item>
        </div>
        <template v-if="autoForm.tooltip&&autoForm.tooltip.buttomHelpText!==undefined &&autoForm.tooltip.buttomHelpText!==null&&autoForm.tooltip.buttomHelpText.length > 0">
          <x-line :border="true" title="温馨提示">
            <ul class="zkAutoFormUl">
              <li class="zkAutoFormList" v-for="(item, index) in autoForm.tooltip.buttomHelpText" :key="index">{{index+1}}、 {{item}}</li>
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
        autoForm: null,
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
        var configData = this.serviceConfig
        if (!newWidget) {
          configData = newWidget
        }
        if (!configData) {
          return
        }
        if (this.notConvert) {
          this.autoForm = configData
        } else {
          this.autoForm = await convert.toConfig(configData)
        }

        this.viewModel = service.getModel(this.autoForm, this.dataModel)
        this.async = true
        this.$emit('formLoad', this.async)
        console.info('wdigetdata', this.autoForm, this.viewModel)
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
