<template>
  <x-border title="单数据统计添加" color="success">
    <div class="zk-report-edit" v-if="async">
      <el-form ref="form" label-width="250px" class="report-form">
        <el-form-item label="名称">
          <el-input placeholder="输入名称" v-model="viewModel.name"></el-input>
          <div class="report-form_intro">请输入名称</div>
        </el-form-item>
        <el-form-item label="数据源">
          <el-select v-model="viewModel.entityType" placeholder="请选择数据源" @change="changeSource">
            <el-option v-for="(sourceItem,sourceIndex) in sourceView" :key="sourceIndex" :label="sourceItem.name" :value="sourceItem.key"></el-option>
          </el-select>
          <div class="report-form_intro">请选择数据源</div>
        </el-form-item>
        <el-form-item label="统计类型">
          <x-radio-group type="ReportStyle" :widget.sync="viewModel.style" @change="changeOperator"></x-radio-group>
          <div class="report-form_intro">请选择统计类型，请了解每一种统计方式的详细意思</div>
        </el-form-item>
        <el-form-item label="统计字段" v-if="typeFool">
          <el-select v-model="viewModel.field" placeholder="请选择统计字段">
            <el-option v-for="(fieldItem,fieldIndex) in fieldValue" :key="fieldIndex" :label="fieldItem.name" :value="fieldItem.key"></el-option>
          </el-select>
          <div class="report-form_intro">该功能为专业功能，并非所有显示的字段都可以统计，有些字段统计出来没有实际的意义</div>
        </el-form-item>
        <el-form-item label="时间周期">
          <x-radio-group type="TimeType" :widget.sync="viewModel.condition.timeType"></x-radio-group>
          <div class="report-form_intro">选择统计时间周期</div>
        </el-form-item>
      </el-form>
      <x-line title="查询条件" intro="设置数据的过滤条件，可以为空" icon="flaticon-squares"></x-line>
      <div class="query-condition">
        <div class="condition-table">
          <div class="inquire-li">
            <div class="inquire-li_text">字段</div>
            <div class="inquire-li_right">
              <el-select v-model="viewModel.condition.field" placeholder="请选择字段" size="small">
                <el-option v-for="(valItem,valIndex) in fielName" :key="valIndex" :label="valItem.name" :value="valItem.key"></el-option>
              </el-select>
            </div>
          </div>
          <div class="inquire-li">
            <div class="inquire-li_text">运算方式</div>
            <div class="inquire-li_right">
              <el-select v-model="viewModel.condition.operator" placeholder="请选择字段" size="small">
                <el-option v-for="(operateItem,operateIndex) in operateMode" :key="operateIndex" :label="operateItem.value" :value="operateItem.key"></el-option>
              </el-select>
            </div>
          </div>
          <div class="inquire-li">
            <div class="inquire-li_text">值</div>
            <div class="inquire-li_right">
              <el-input size="small" v-model="viewModel.condition.value" placeholder="请输入比较值"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="report-buttom">
        <el-button type="danger" @click="testValue">测试</el-button>
      </div>
    </div>
  </x-border>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: {
          condition: {}
        },
        async: false,
        sourceView: '',
        fieldValue: '',
        searchField: '',
        operateMode: '',
        sourceValue: '',
        fielName: '',
        typeFool: true
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var sourcePara = {
          type: 'CatalogEntity'
        }
        var sourceModel = await this.$api.httpGet('Api/Type/GetKeyValue', sourcePara)
        if (sourceModel.status === 1) {
          this.sourceView = sourceModel.result
        }
        var operatValue = {
          type: 'OperatorCompare'
        }
        var operatPosen = await this.$api.httpGet('/api/Type/GetKeyValue', operatValue)
        if (operatPosen.status === 1) {
          this.operateMode = operatPosen.result
        }
        if (this.$route.query.id) {
          var singPara = {
            id: this.$route.query.id
          }
          var respone = await this.$api.httpGet('/api/SingleReport/ViewByid', singPara)
          if (respone.status === 1) {
            this.viewModel = respone.result
          }
        }
        this.async = true
      },
      changeOperator (val) {
        if (this.viewModel.style === 1) {
          this.viewModel.field = 'id'
        }
      },
      async changeSource (val) {
        this.viewModel.condition.field = ''
        var para = {
          type: this.viewModel.entityType
        }
        var respone = await this.$api.httpGet('/api/field/ReportField', para)
        if (respone.status === 1) {
          this.fieldValue = respone.result
        }
        var formFile = await this.$api.httpGet('/api/field/QueryField', para)
        if (formFile.status === 1) {
          this.fielName = formFile.result
        }
      },
      async testValue () {
        var response = await this.$api.httpPost('/api/Report/GetSingleReport', this.viewModel)
        if (response.status === 1) {
          var value = response.result
          this.$alert(value, '统计结果', {
            confirmButtonText: '确定'
          })
        }
      },
      async submit () {
        var submitValue = await this.$api.httpPost('/api/SingleReport/Edit', this.viewModel)
        if (submitValue.status === 1) {
          this.$confirm('添加成功, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.$router.push('/user/Report/SingleDataReport/Edit')
            this.sourceValue = ''
            this.viewModel = {
              condition: {
                entityType: '',
                field: '',
                operator: '',
                value: ''
              },
              name: ''
            }
          }).catch(() => {
            this.$router.push('/user/Report/SingleDataReport')
          })
        } else {
          this.$message({
            type: 'info',
            message: submitValue.message
          })
        }
      }
    },
    watch: {
      'viewModel.style': {
        handler (val) {
          if (val === 1) {
            this.typeFool = false
          } else {
            this.typeFool = true
          }
        },
        deep: true
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .zk-report-edit {
    .el-radio + .el-radio {
      margin-left: 0px;
    }
    .el-radio {
      margin-right: 30px;
      line-height: 25px;
      .el-radio__label {
        font-size: 13px;
      }
    }
    .report-form {
      padding: 20px 20px 0px 20px;
      .el-form-item__label {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
      }
      .report-form_intro {
        font-size: 12px;
        line-height: 18px;
        color: #999999;
      }
      .el-select {
        width: 100%;
      }
    }
    .query-condition {
      .condition-head {
        padding: 0px 20px;
        display: flex;
        align-items: center;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px solid #f0f0f0;
        .condition-head_left {
          width: 250px;
          text-align: right;
          padding: 0px 10px;
        }
      }
      .condition-table {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
        .inquire-li {
          display: flex;
          align-items: center;
          margin: 0px 20px;
          .inquire-li_text {
            font-size: 13px;
            color: #666666;
            margin-right: 10px;
          }
        }
      }
    }
    .report-buttom {
      padding: 20px 270px;
      .report-but {
        display: inline-block;
        background-color: #00c5dc;
        color: #ffffff;
        font-size: 14px;
        padding: 10px 20px;
        border-radius: 3px;
        cursor: pointer;
      }
    }
    input {
      font-size: 13px;
    }
    input::-webkit-input-placeholder {
      font-size: 13px;
    }
  }
</style>
