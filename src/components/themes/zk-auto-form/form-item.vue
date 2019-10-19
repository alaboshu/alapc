<template>

  <el-form-item :label="widgetName" :prop="widget.model" class="from-item" :rules="rulesInput" v-if="async&&widget.type !== 'hidden'">
    <template v-if="widget.type == 'label'">
      <el-input type="input" v-model="dataModel" :disabled="true" :placeholder="widget.options.placeholder" :style="{width: widget.options.width}"></el-input>
    </template>
    <template v-if="widget.type == 'checkBox'" x-verify="已验证">
      <x-checkbox v-model="dataModel" :apiUrl="widget.dataSource"></x-checkbox>
    </template>
    <template v-if="widget.type=='radiobutton'" x-verify="已验证">
      <x-radio v-model="dataModel" :widget="widget" :apiUrl="widget.dataSource"></x-radio>
    </template>
    <template v-if="widget.type == 'textbox'" x-verify="已验证">
      <el-input v-model="dataModel" :placeholder="widget.options.placeholder" :value="widget.value"></el-input>
    </template>
    <template v-if="widget.type == 'textarea'" x-verify="已验证">
      <el-input type="textarea" :rows="5" v-model="dataModel" :placeholder="widget.options.placeholder"></el-input>
    </template>
    <template v-if="widget.type == 'dropdownlist'" x-verify="已验证">
      <x-select v-model="dataModel" :widget="widget" :apiUrl="widget.dataSource"></x-select>
    </template>
    <template v-if="widget.type=='switch'" x-verify="已验证">
      <el-switch v-model="dataModel" :disabled="widget.options.disabled">
      </el-switch>
    </template>
    <template v-if="widget.type == 'numberic'" x-verify="已验证">
      <el-input-number v-model="dataModel" :min="0" @change="handleChange" :step="widget.options.step" controls-position="right"></el-input-number>
    </template>
    <template v-if="widget.type == 'decimal'" x-verify="已验证">
      <el-input-number v-model="dataModel" :min="0" :precision="2" :step="0.1" @change="handleChange" controls-position="right"></el-input-number>
    </template>

    <template v-if="widget.type == 'x-json'">
      <x-json :widget="widget" v-model="dataModel"></x-json>
    </template>

    <template v-if="widget.type == 'timepicker'">
      <el-time-picker v-model="dataModel" :is-range="widget.options.isRange" :placeholder="widget.options.placeholder" :start-placeholder="widget.options.startPlaceholder" :end-placeholder="widget.options.endPlaceholder" :readonly="widget.options.readonly" :disabled="widget.options.disabled" :editable="widget.options.editable" :clearable="widget.options.clearable" :arrowControl="widget.options.arrowControl" :value-format="widget.options.format" :style="{width: widget.options.width}">
      </el-time-picker>
    </template>

    <template v-if="widget.type=='datepicker'">
      <el-date-picker v-model="dataModel" :type="widget.options.type" :placeholder="widget.options.placeholder" :start-placeholder="widget.options.startPlaceholder" :end-placeholder="widget.options.endPlaceholder" :readonly="widget.options.readonly" :disabled="widget.options.disabled" :editable="widget.options.editable" :clearable="widget.options.clearable" :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format" :format="widget.options.format" :style="{width: widget.options.width}">
      </el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate v-model="dataModel" :max="widget.options.max" :disabled="widget.options.disabled" :allow-half="widget.options.allowHalf"></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker v-model="dataModel" :disabled="widget.options.disabled" :show-alpha="widget.options.showAlpha"></el-color-picker>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider v-model="dataModel" :min="widget.options.min" :max="widget.options.max" :disabled="widget.options.disabled" :step="widget.options.step" :show-input="widget.options.showInput" :range="widget.options.range" :style="{width: widget.options.width}"></el-slider>
    </template>
    <template v-if="widget.type=='albumuploder'|| widget.model==='imageUrl'">
      <x-select-image v-model="dataModel" :widget="widget"></x-select-image>
    </template>
    <template v-if="widget.type=='icon'">
      <x-icon-input :icondata="dataModel" @itemForm="formiconmanagement"></x-icon-input>
    </template>

    <template v-if="widget.type == 'link'">
      <div class="item_box-input">
        <el-input :type="widget.options.dataType" v-model="dataModel.value" :placeholder="widget.options.placeholder"></el-input>
        <div class="item_box-btn" @click="selectTrigger">选择</div>
      </div>
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
    <template v-if="widget.type == 'uploadImg'">
      <x-upload-list v-model="dataModel" :widget="widget"></x-upload-list>
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
      <el-input v-model="dataModel" type="password" password :placeholder="widget.options.placeholder"></el-input>
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
    <template v-if="widget.type==='x-select-table'">
      <xSelectTable v-model="dataModel" :widget="widget"></xSelectTable>
    </template>
    <div class="help-back" v-html="widget.helpBlock" v-if="widget.type !== 'x-Json'&&widget.type !== 'area'"></div>
  </el-form-item>
</template>

<script>
  import xSelectTable from './table/x-select-table'
  export default {
    props: ['widgets', 'models', 'rules', 'remote', 'parament'],
    data () {
      return {
        async: false,
        isDate: false,
        dataModel: this.models[this.widgets.model],
        fileList: [],
        widgetName: '',
        widget: this.widgets,
        rulesInput: {
          required: true,
          message: ' '
        }
      }
    },
    components: {
      xSelectTable
    },
    mounted () {
      this.init()
    },
    methods: {
      async   init () {
        if (this.widget.type !== 'tab') {
          this.widgetName = this.widget.name
        }
        if (!this.$api.isEmpty(this.widget.value)) {
          this.dataModel = this.widget.value
        }
        if (this.widget.type === 'switch') {
          if (this.widgets.value !== null || this.widgets.value !== undefined) {
            this.dataModel = this.widgets.value
          } else {
            this.dataModel = false
          }
        }
        this.rulesInput.required = this.widget.required
        if (this.widget.isCms === true) {
          var channelResponse
          if (this.widget.model === 'tags') {
            channelResponse = await this.$api.httpGet('api/Channel/ViewById', { Id: this.$route.query.ChannelId })
            if (channelResponse.status === 1) {
              this.widgetName = channelResponse.result.name + this.widgetName
            }
          }
          if (this.widget.model === 'classes') {
            channelResponse = await this.$api.httpGet('api/Channel/ViewById', { Id: this.$route.query.ChannelId })
            if (channelResponse.status === 1) {
              this.widgetName = channelResponse.result.name + this.widgetName
            }
          }
        }
        this.async = true
      },
      async CmdJump (type) {
        var getTypeResponse
        var api
        var url
        if (type === 'tag') {
          api = '/Api/Channel/GetChannelTagType'
          url = '/Admin/Tag?Type='
        } else {
          api = '/Api/Channel/GetChannelClassType'
          url = '/Admin/Class?Type='
        }
        getTypeResponse = await this.$api.httpGet(api, { channelId: this.$route.query.ChannelId })
        if (getTypeResponse.status === 1) {
          this.$router.push(url + getTypeResponse.message)
        }
      },
      formiconmanagement (fromvisarray) {
        var iconList = {
          name: fromvisarray.iconDesign,
          size: fromvisarray.iconFontsize,
          color: fromvisarray.colorName,
          colournumber: fromvisarray.iconColor
        }
        this.models[fromvisarray.fromvis] = iconList
        this.dataModel = this.models[fromvisarray.fromvis]
      },
      onlinkmana (type, conter) {
        var linkpram = {
          type: 'url',
          value: conter.url
        }
        this.models[type] = linkpram
        this.dataModel = this.models[type]
      },
      selectTrigger () {
        this.$refs.formitem_dialog.show()
      },
      handleChange (ev) {
        this.models.height = ev
      },
      watchWidgets (n, o) {
        this.widget = n
        this.init()
      }
    },
    created () {
      this.widget = this.widgets
      if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
        this.remote[this.widget.options.remoteFunc]((data) => {
          this.widget.options.remoteOptions = data.map(item => {
            return {
              value: item[this.widget.options.props.value],
              label: item[this.widget.options.props.label]
            }
          })
        })
      }
    },
    watch: {
      widgets: 'watchWidgets',
      parament: {
        deep: true,
        handler (val) {
        }
      },
      dataModel: {
        deep: true,
        handler (val) {
          this.models[this.widget.model] = val
          this.$emit('update:models', {
            ...this.models,
            [this.widget.model]: val
          })
        }
      },
      models: {
        deep: true,
        handler (val) {
          this.dataModel = val[this.widget.model]
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "./style.scss";
</style>


