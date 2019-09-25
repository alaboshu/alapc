<template>
  <div v-if="async">
    <el-form @submit.native.prevent>
      <el-form-item class="form_flex">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{serarchValue}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" :split-button="true" trigger="click">
            <el-dropdown-item :command="item.label" v-for="(item,index) in dropItem " :key="index" @click.native="dropdownItem(item)">{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-for="(item,index) in dropItem " :key="index">
          <el-input v-model="selectFormValue" @keyup.enter.native="searchHandler('search')" :placeholder="'请输入'+item.label" v-if="item.label === formConfig.label" class="form-data"></el-input>
        </div>
        <el-button type="primary" @click.native="searchHandler('search')" :loading="submitLoading" class="but_modality">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 区分区分 -->
    <div v-if="show">
      <div class="elForm">
        <div class="el_elasticity">
          <el-form class="showHiden">
            <el-form-item v-for="(form,formIndex) in formWidget.advancedForms" :key="formIndex" :label="form.label">
              <el-input v-model="SeniorSearchModel[form.prop]" placeholder="请输入内容" v-if="form.type==='TextBox'"></el-input>
              <x-select v-model="SeniorSearchModel[form.prop]" v-if="form.type==='DropdownList'" :type="form.modelValue" ref="XSelect"></x-select>
              <div v-if="form.type==='NumberRang'" class="number-rang">
                <el-input v-model="SeniorSearchModel[form.prop+'_Start']" placeholder="请输入内容"></el-input>
                <div class="center-icon">
                  <i class="el-icon-minus"></i>
                </div>
                <el-input v-model="SeniorSearchModel[form.prop+'_End']" placeholder="请输入内容"></el-input>
              </div>
              <div v-if="form.type==='DateTimeRang'">
                <div class="block">
                  <el-date-picker v-model="dataPicke" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']" @change="timeChange(form.prop)">
                  </el-date-picker>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <div class="hightSearch">
            <div class="hightSearch_box">
              <el-button style="background: #1786dc;color:#ffff" @click="advanced()">高级搜索</el-button>
              <el-button plain @click="show = false">关闭高级搜索</el-button>
              <el-button plain @click="closeSearchModel">清空搜索内容</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'searchForm',
    data () {
      return {
        async: false,
        show: false,
        serarchValue: '请输入',
        formConfig: '',
        selectFormValue: '',
        dropItem: [],
        SeniorSearchModel: {},
        dataPicke: [],
        submitLoading: false,
        formWidget: {}
      }
    },
    methods: {
      init (searchOptions) {
        this.dropItem = []
        if (searchOptions !== undefined) {
          this.formWidget = searchOptions
        } else {
          this.formWidget = this.forms
        }
        this.formWidget.forms.forEach(formVal => {
          if (this.$api.isEmpty(formVal.type)) {
            formVal.type = 'input'
          }
          if (formVal.type !== 'date') {
            this.dropItem.push(formVal)
          }
        })
        var advancedSearch = {
          label: '高级搜索',
          type: 'input'
        }
        this.dropItem.push(advancedSearch)
        for (var i = 0; i < this.formWidget.forms.length; i++) {
          if (this.formWidget.forms[i].type !== 'date') {
            this.formConfig = this.formWidget.forms[i]
            this.serarchValue = this.formWidget.forms[i].label
            break
          }
        }
        if (this.dropItem.length > 1) {
          this.async = true
        }
      },
      closeSearchModel () {
        this.dataPicke = ''
        for (var i in this.SeniorSearchModel) {
          this.SeniorSearchModel[i] = ''
        }
      },
      timeChange (prop) {
        this.SeniorSearchModel[prop + '_Start'] = this.dataPicke[0].getTime()
        this.SeniorSearchModel[prop + '_End'] = this.dataPicke[1].getTime()
      },
      dropdownItem (item) {
        this.formConfig = item
        if (item.label !== '高级搜索') {
          this.show = false
        }
      },
      advanced () {
        this.$emit('searchForm', this.SeniorSearchModel)
      },

      searchHandler (type) {
        console.info('this.formWidgets', this.formWidget)
        this.submitLoading = true
        var paramenter = {
          pageIndex: 1
        }
        this.formWidget.forms.forEach(formsVal => {
          paramenter[formsVal.modelValue] = ''
        })
        if (type === 'search') {
          for (var i in paramenter) {
            if (this.formConfig.modelValue === i) {
              paramenter[i] = this.selectFormValue
            }
          }
          this.$emit('searchForm', paramenter)
        }
        var this_ = this
        setTimeout(function () {
          this_.submitLoading = false
        }, 500)
      },
      handleCommand (command) {
        this.serarchValue = command
        if (command === '高级搜索') {
          this.show = !this.show
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
