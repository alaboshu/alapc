<template>
  <el-form-item :label="column.name" :prop="column.field" class="from-item" v-if="async&&column.type !== 'hidden'">
    <template v-if="column.type == 'label'">
      <label>{{dataModel}}</label>
    </template>
    <template v-if="column.type == 'checkbox'" x-verify="已验证">
      <x-checkbox v-model="viewModel" :apiUrl="column.dataSource"></x-checkbox>
    </template>
    <template v-if="column.type=='radiobutton'" x-verify="已验证">
      <x-radio v-model="viewModel" :apiUrl="column.dataSource"></x-radio>
    </template>
    <template v-if="column.type == 'textbox'" x-verify="已验证">

      <el-input v-model="viewModel" :placeholder="column.placeholder" :value="column.value"></el-input>
    </template>
    <template v-if="column.type == 'textarea'" x-verify="已验证">
      <el-input type="textarea" :rows="5" v-model="viewModel" :placeholder="column.placeholder"></el-input>
    </template>
    <template v-if="column.type == 'dropdownlist'" x-verify="已验证">
      <x-select v-model="viewModel" :apiUrl="column.dataSource"></x-select>
    </template>
    <template v-if="column.type=='switch'" x-verify="已验证">
      <el-switch v-model="viewModel" :disabled="column.disabled">
      </el-switch>
    </template>
    <template v-if="column.type == 'numberic'" x-verify="已验证">
      <el-input-number v-model="viewModel" :min="0" :step="column.step" controls-position="right"></el-input-number>
    </template>
    <template v-if="column.type == 'decimal'" x-verify="已验证">
      <el-input-number v-model="viewModel" :min="0" :precision="2" :step="0.1" controls-position="right"></el-input-number>
    </template>
    <template v-if="column.type=='image'">
      <x-select-image v-model="viewModel" :count="Number(column.mark)"></x-select-image>
    </template>
    <template v-if="column.type == 'x-json'">
      <x-json :widget="widget" v-model="viewModel"></x-json>
    </template>

    <template v-if="column.type == 'timepicker'">
      <el-time-picker v-model="viewModel" :is-range="column.isRange" :placeholder="column.placeholder" :start-placeholder="column.startPlaceholder" :end-placeholder="column.endPlaceholder" :readonly="column.readonly" :disabled="column.disabled" :editable="column.editable" :clearable="column.clearable" :arrowControl="column.arrowControl" :value-format="column.format" :style="{width: column.width}">
      </el-time-picker>
    </template>

    <template v-if="column.type=='datepicker'">
      <el-date-picker v-model="viewModel" :type="column.type" :placeholder="column.placeholder" :start-placeholder="column.startPlaceholder" :end-placeholder="column.endPlaceholder" :readonly="column.readonly" :disabled="column.disabled" :editable="column.editable" :clearable="column.clearable" :value-format="column.timestamp ? 'timestamp' : column.format" :format="column.format" :style="{width: column.width}">
      </el-date-picker>
    </template>

    <template v-if="column.type =='rate'">
      <el-rate v-model="viewModel" :max="column.max" :disabled="column.disabled" :allow-half="column.allowHalf"></el-rate>
    </template>

    <template v-if="column.type == 'color'">
      <el-color-picker v-model="viewModel" :disabled="column.disabled" :show-alpha="column.showAlpha"></el-color-picker>
    </template>

    <template v-if="column.type=='slider'">
      <el-slider v-model="viewModel" :min="column.min" :max="column.max" :disabled="column.disabled" :step="column.step" :show-input="column.showInput" :range="column.range" :style="{width: column.width}"></el-slider>
    </template>

    <template v-if="column.type=='icon'">
      <x-icon-input :icondata="dataModel"></x-icon-input>
    </template>

    <template v-if="column.type == 'fileuploder'">
      <x-upload v-model="viewModel"></x-upload>
    </template>
    <template v-if="column.type == 'markdown'">
      <x-markdown v-model="viewModel"></x-markdown>
    </template>

    <template v-if="column.type == 'hidden'">
      <el-input v-model="viewModel" placeholder="请输入内容" type="hidden"></el-input>
    </template>
    <template v-if="column.type == 'area'">
      <x-city-picker v-model="viewModel" :widgetName="widgetName" :introHtml="column.helpBlock" :requiredFool="column.required" />
    </template>
    <template v-if="column.type == 'editor'">
      <div class="editor-box">
        <x-editor v-model="viewModel"></x-editor>
      </div>
    </template>
    <template v-if="column.type == 'password'">
      <el-input v-model="viewModel" type="password" password :placeholder="column.placeholder"></el-input>
    </template>

    <template v-if="column.type == 'timepicker'">
      <el-date-picker v-model="viewModel" type="datetime" placeholder="选择日期时间">
      </el-date-picker>
    </template>
    <template v-if="column.type == 'datepicker'">
      <el-date-picker v-model="viewModel" type="date" placeholder="选择日期时间">
      </el-date-picker>
    </template>
    <template v-if="column.type == 'tags'||column.model == 'tags'">
      <x-tags v-model="viewModel" :widget="widget"></x-tags>
      <div class="help-back">
        一条记录可以设置多个标签-
        <span @click="CmdJump('tag')" class="help-back-jump">{{widgetName}}管理</span>
      </div>
    </template>
    <template v-if="column.model == 'classes'">
      <x-class :widget="widget" v-model="viewModel"></x-class>
      <div class="help-back">
        一条记录可以设置多个分类-
        <span @click="CmdJump('class')" class="help-back-jump">{{widgetName}}管理</span>
      </div>
    </template>
    <div class="help-back" v-html="column.helpBlock" v-if="column.type !== 'x-Json'&&column.type !== 'area'"></div>
  </el-form-item>
</template>

<script>

  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    props: {
      column: {},
      currentModel: {}, // 当前输入的ViewModel，监听客户输入
      value: {},
      dataModel: {},
      usercode: {}
    },
    data () {
      return {
        viewModel: this.value,
        async: false
      }
    },
    mounted () {
      this.init().then(() => {
        this.async = true
      })
    },
    methods: {
      async init () {
        if (this.dataModel) {
          this.viewModel = this.dataModel
        }
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          this.$emit('change', this.viewModel)
        }
      }
    }
  }
</script>
<style  lang="scss" scoped>
  @import "./style.scss";
</style>


