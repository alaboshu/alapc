<template>
  <div class="zk-auto-form" v-if="formConfig&&async">
    <div v-if="serviceConfig.fromMessage==null">
      <el-alert v-if="formConfig.config && formConfig.config.alertText" :title="formConfig.config.alertText" show-icon type="success" :closable="false"></el-alert>
      <el-form ref="generateForm" :model="models" :rules="rules" :label-width="formLabelWidth + 'px'">
        <template v-for="item in formConfig.list">
          <template v-if="item.type == 'grid'">
            <el-row :key="item.key" type="flex" :gutter="item.options.gutter ? item.options.gutter : 0" :justify="item.options.justify" :align="item.options.align">
              <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
                <template v-for="citem in col.list">
                  <el-form-item v-if="citem.type=='blank'" @viewForm="viewForm" :label="citem.name" :prop="citem.model" :key="citem.key">
                    <slot :name="citem.model" :model="models"></slot>
                  </el-form-item>
                  <form-item v-else :key="citem.key" @viewForm="viewForm" :models.sync="models" :rules="rules" :widgets="citem"></form-item>
                </template>
              </el-col>
            </el-row>
          </template>
          <template v-else-if="item.type == 'tab'">
            <el-tabs class="auto-form-tabs" :key="item.key+1" v-model="tabActiveName">
              <el-tab-pane v-for="(col, colIndex) in item.columns" :key="colIndex" :label="col.name" :name="col.name">
                <span slot="label" class="tab-list"><i class="glyph-icon" :class="tabIconList[colIndex]"></i> {{col.name}}</span>
                <template v-for="citem in col.list">
                  <el-form-item v-if="citem.type=='blank'" @viewForm="viewForm" :prop="citem.model" :key="citem.key">
                    <slot :name="citem.model" :model="models"></slot>
                  </el-form-item>
                  <form-item :saveForm="saveForm" v-else :key="citem.key" :models.sync="models" :rules="rules" :widgets="citem"></form-item>
                </template>
              </el-tab-pane>
            </el-tabs>
          </template>
          <template v-else-if="item.type == 'blank'">
            <el-form-item :label="item.name" :prop="item.model" :key="item.key">
              <slot :name="item.model" :model="models"></slot>
            </el-form-item>
          </template>
          <template v-if="item.type=='table'">
            <div :key="item.name" class="title">
              <h3>{{item.name}}</h3>
            </div>
            <x-table :autoFormId="item.options.autoFormId" :key="item.options.autoFormId"></x-table>
          </template>
          <template v-else>
            <form-item :key="item.key" :models.sync="models" @viewForm="viewForm" :rules="rules" :widgets="item" :parament="parament"></form-item>
          </template>
        </template>
        <template v-if="formConfig.config&&formConfig.config.buttomHelpText!==undefined &&formConfig.config.buttomHelpText!==null&&formConfig.config.buttomHelpText.length > 0">
          <x-line :border="true" title="温馨提示">
            <ul class="zkAutoFormUl">
              <li class="zkAutoFormList" v-for="(item, index) in formConfig.config.buttomHelpText" :key="index">{{index+1}}、 {{item}}</li>
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
      value: {},
      serviceConfig: {} // 从服务器上获取的config
    },
    data () {
      return {
        models: {},
        formConfig: {},
        confing: {},
        rules: {},
        tabIconList: [],
        formLabelWidth: 100,
        parament: null,
        tabActiveName: '',
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
        var widgetData = this.serviceConfig
        if (this.notConvert) {
          this.confing = widgetData
        } else {
          if (!this.$api.isEmpty(newWidget)) {
            widgetData = newWidget
          }
          if (!this.$api.isEmpty(widgetData)) {
            this.confing = await convert.toConfig(widgetData)
          }
        }
        if (!this.$api.isEmpty(this.confing)) {
          this.formConfig = this.confing
        }

        this.async = true
        this.$emit('formLoad', this.async)
        this.tabIconList = convert.geIcon()
        // 表单校验
        this.getFormUrl()
        for (var i = 0; i < this.formConfig.list.length; i++) {
          if (this.formConfig.list[i].type === 'tab') {
            this.tabActiveName = this.formConfig.list[i].columns[0].name
          }
        }
      },
      async saveForm () {
        this.loading = true
        for (let item of this.formConfig.list) {
          for (let i in this.models) {
            if (item.type === 'tab' || item.type === 'grid') {
              for (let list of item.columns) {
                list.list.forEach(element => {
                  if (element.model === i) {
                    if (element.required === true) {
                      if (this.models[i] === '') {
                        this.loading = false
                        return this.$message({
                          showClose: true,
                          message: element.name + '不能为空',
                          type: 'warning'
                        })
                      }
                    }
                  }
                })
              }
            } else {
              if (item.model === i) {
                if (item.required === true) {
                  if (this.models[i] === '') {
                    this.loading = false
                    return this.$message({
                      showClose: true,
                      message: item.name + '不能为空',
                      type: 'warning'
                    })
                  }
                }
              }
            }
          }
        }
        this.$emit('saveForm', this.models)
        setTimeout(() => {
          this.loading = false
        }, 500)
      },
      // 映射表格的值
      async mapTableData () {
        this.formConfig.list.forEach(element => {
          if (element.type === 'table') {
            element.dataList = this.models[element.model]
            if (this.$api.isEmpty(element.dataList)) {
              element.dataList = []
            }
          }
        })
        this.$set(this.formConfig, 'list', this.formConfig.list)
        this.generateModle(this.formConfig.list)
      },

      getFormUrl () {
        if (this.formConfig.list) {
          this.formConfig.list.forEach((item, index) => {
            if (item.required) {
              var data = {
                required: true,
                message: ' ',
                trigger: 'blur'
              }
              this.rules[item.model] = []
              this.rules[item.model].push(data)
            }
          })
        }
      },
      // 渲染前处理
      generateModle (genList) {
        for (let i = 0; i < genList.length; i++) {
          if (genList[i].type === 'grid') {
            genList[i].columns.forEach(item => {
              this.generateModle(item.list)
            })
          } else {
            if (this.value !== null) {
              if (Object.keys(this.value).indexOf(genList[i].model) >= 0) {
                this.models[genList[i].model] = this.value[genList[i].model]
              } else {
                if (genList[i].type === 'blank') {
                  this.models[genList[i].model] = genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : [])
                } else {
                  this.models[genList[i].model] = genList[i].options.defaultValue
                }
              }
              if (this.rules[genList[i].model]) {
                this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules]
              } else {
                this.rules[genList[i].model] = [...genList[i].rules]
              }
            }
          }
        }
      },
      getData () {
        return new Promise((resolve, reject) => {
          this.$refs.generateForm.validate(valid => {
            if (valid) {
              resolve(this.models)
            } else {
              reject(new Error('表单数据校验失败').message)
            }
          })
        })
      },
      viewForm (data) {
        this.$emit('viewForm', data)
      }
    },
    watch: {
      value: {
        deep: true,
        handler (val) {
          this.models = { ...this.models, ...val }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
  @import "~_style/autoform.scss";
</style>
