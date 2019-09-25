<template>
  <div>
    <el-select v-model="tagType" multiple :placeholder="widget.options.placeholder" @change="changeSelect">
      <el-option v-for="(item, index) in viewModel" :key="index" :label="item.className" :value="item.relationId"></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tagType: [],
        viewModel: []
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
        if (this.widget.value !== null) {
          this.tagType = this.widget.value
        }
        var response
        if (this.widget.isCms !== undefined && this.widget.isCms === true) {
          response = await this.$api.httpGet('/Api/Channel/GetChannelTagType', { channelId: this.$route.query.ChannelId })
          if (response.status === 1) {
            var getTagsList = await this.$api.httpGet(this.widget.dataSource.substring(0, this.widget.dataSource.indexOf('=')) + '=' + response.message)
            if (getTagsList.status === 1) {
              // this.props.label = 'name'
              var _this = this
              getTagsList.result.datas.forEach(item => {
                let obj = {
                  relationId: item.id,
                  className: item.name
                }
                _this.viewModel.push(obj)
              })
            }
          }
        } else {
          response = await this.$api.httpGet(this.widget.dataSource)
          this.viewModel = response.result
        }
      },
      changeSelect (e) {
        this.$emit('input', e)
      }
    }
  }
</script>
