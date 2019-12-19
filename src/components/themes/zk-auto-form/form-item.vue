<template>
  <el-form-item :label="widgetName" :prop="widget.model" class="from-item" :rules="rulesInput" v-if="async&&widget.type !== 'hidden'">
    <!-- <template v-if="widget.type == 'label'">
      <el-input type="input" v-model="dataModel" :disabled="true" :placeholder="widget.placeholder" :style="{width: widget.width}"></el-input>
    </template> -->
    <template v-if="widget.type == 'label'">
      <label>{{dataModel}}</label>
    </template>
    <template v-if="widget.type == 'checkbox'" x-verify="已验证">
      <x-checkbox v-model="dataModel" :apiUrl="widget.dataSource"></x-checkbox>
    </template>
    <template v-if="widget.type=='radiobutton'" x-verify="已验证">
      <x-radio v-model="dataModel" :apiUrl="widget.dataSource"></x-radio>
    </template>
    <template v-if="widget.type == 'textbox'" x-verify="已验证">

      <el-input v-model="dataModel" :placeholder="widget.placeholder" :value="widget.value"></el-input>
    </template>
    <template v-if="widget.type == 'textarea'" x-verify="已验证">
      <el-input type="textarea" :rows="5" v-model="dataModel" :placeholder="widget.placeholder"></el-input>
    </template>
    <template v-if="widget.type == 'dropdownlist'" x-verify="已验证">
      <x-select v-model="dataModel" :apiUrl="widget.dataSource"></x-select>
    </template>
    <template v-if="widget.type=='switch'" x-verify="已验证">
      <el-switch v-model="dataModel" :disabled="widget.disabled">
      </el-switch>
    </template>
    <template v-if="widget.type == 'numberic'" x-verify="已验证">
      <el-input-number v-model="dataModel" :min="0" :step="widget.step" controls-position="right"></el-input-number>
    </template>
    <template v-if="widget.type == 'decimal'" x-verify="已验证">
      <el-input-number v-model="dataModel" :min="0" :precision="2" :step="0.1" controls-position="right"></el-input-number>
    </template>
    <template v-if="widget.type=='image'">
      <x-select-image v-model="dataModel" :count="Number(widget.mark)"></x-select-image>
    </template>
    <template v-if="widget.type == 'x-json'">
      <x-json :widget="widget" v-model="dataModel"></x-json>
    </template>

    <template v-if="widget.type == 'timepicker'">
      <el-time-picker v-model="dataModel" :is-range="widget.isRange" :placeholder="widget.placeholder" :start-placeholder="widget.startPlaceholder" :end-placeholder="widget.endPlaceholder" :readonly="widget.readonly" :disabled="widget.disabled" :editable="widget.editable" :clearable="widget.clearable" :arrowControl="widget.arrowControl" :value-format="widget.format" :style="{width: widget.width}">
      </el-time-picker>
    </template>

    <template v-if="widget.type=='datepicker'">
      <el-date-picker v-model="dataModel" :type="widget.type" :placeholder="widget.placeholder" :start-placeholder="widget.startPlaceholder" :end-placeholder="widget.endPlaceholder" :readonly="widget.readonly" :disabled="widget.disabled" :editable="widget.editable" :clearable="widget.clearable" :value-format="widget.timestamp ? 'timestamp' : widget.format" :format="widget.format" :style="{width: widget.width}">
      </el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate v-model="dataModel" :max="widget.max" :disabled="widget.disabled" :allow-half="widget.allowHalf"></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker v-model="dataModel" :disabled="widget.disabled" :show-alpha="widget.showAlpha"></el-color-picker>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider v-model="dataModel" :min="widget.min" :max="widget.max" :disabled="widget.disabled" :step="widget.step" :show-input="widget.showInput" :range="widget.range" :style="{width: widget.width}"></el-slider>
    </template>

    <template v-if="widget.type=='icon'">
      <x-icon-input :icondata="dataModel"></x-icon-input>
    </template>

    <template v-if="widget.type == 'fileuploder'">
      <x-upload v-model="dataModel"></x-upload>
    </template>
    <template v-if="widget.type == 'markdown'">
      <x-markdown v-model="dataModel"></x-markdown>
    </template>

    <template v-if="widget.type == 'hidden'">
      <el-input v-model="dataModel" placeholder="请输入内容" type="hidden"></el-input>
    </template>
    <template v-if="widget.type == 'area'">
      <x-city-picker v-model="dataModel" :widgetName="widgetName" :introHtml="widget.helpBlock" :requiredFool="widget.required" />
    </template>
    <template v-if="widget.type == 'editor'">
      <div class="editor-box">
        <x-editor v-model="dataModel"></x-editor>
      </div>
    </template>
    <template v-if="widget.type == 'password'">
      <el-input v-model="dataModel" type="password" password :placeholder="widget.placeholder"></el-input>
    </template>

    <template v-if="widget.type == 'timepicker'">
      <el-date-picker v-model="dataModel" type="datetime" placeholder="选择日期时间">
      </el-date-picker>
    </template>
    <template v-if="widget.type == 'datepicker'">
      <el-date-picker v-model="dataModel" type="date" placeholder="选择日期时间">
      </el-date-picker>
    </template>
    <template v-if="widget.type == 'tags'||widget.model == 'tags'">
      <x-tags v-model="dataModel" :widget="widget"></x-tags>
      <div class="help-back">
        一条记录可以设置多个标签-
        <span @click="CmdJump('tag')" class="help-back-jump">{{widgetName}}管理</span>
      </div>
    </template>
    <template v-if="widget.model == 'classes'">
      <x-class :widget="widget" v-model="dataModel"></x-class>
      <div class="help-back">
        一条记录可以设置多个分类-
        <span @click="CmdJump('class')" class="help-back-jump">{{widgetName}}管理</span>
      </div>
    </template>
    <div class="help-back" v-html="widget.helpBlock" v-if="widget.type !== 'x-Json'&&widget.type !== 'area'"></div>
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


