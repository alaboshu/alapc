<template>
  <!-- <x-border :title="title">
    <x-table :config="viewModel" v-if="async"></x-table>
  </x-border> -->
  <div class="admin-auto-task">
    <x-border title="重新生成组织架构图" type="accent">
      <div class="auto-task_one">
        <div class="warm-prompt">
          <p class="warm-prompt_p"><span class="warm-prompt_span">温馨提示！</span>重新生成组织架构图</p>
          <p class="warm-prompt_p">重新生成组织架构图需要较长的时间，请耐心等待</p>
        </div>
        <el-button :loading="loading" class="uto-task_one-buttom" @click="rebuildGet">重新生成组织架构图</el-button>
      </div>
    </x-border>
    <div class="auto-task_box">
      <x-border title="最近重新生成组织架构图后台队列任务" type="accent">
        <div class="task_box-table">
          <el-table :data="tableData" style="width: 100%">
            <div v-for="(item,index) in confing" :key="index">
              <el-table-column :label="item.name">
                <template slot-scope="scope">
                  {{scope.row[item.prop]}}
                </template>
              </el-table-column>
            </div>
          </el-table>
        </div>
      </x-border>
    </div>
  </div>
</template>
<script>
  import './style.scss'
  export default {
    props: {
      widgetData: {}
    },
    data () {
      return {
        async: false,
        viewModel: null,
        title: '数据编辑',
        loading: false,
        confing: [
          { name: '分润名单', prop: 'address' },
          { name: '用户名', prop: 'name' },
          { name: '执行类型', prop: 'data' },
          { name: '状态', prop: 'data' },
          { name: '已执行次数', prop: 'data' },
          { name: '最大执行次数', prop: 'data' },
          { name: '创建时间', prop: 'date' }
        ],
        tableData: []
      }
    },

    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        // this.async = false
        // var type = this.$crud.getType()
        // var para = {
        //   type: type
        // }
        // var response = await this.$api.httpGet('/Api/Auto/task', para)
        // if (response.status === 1) {
        //   this.viewModel = response.result
        //   this.title = this.viewModel.name
        //   this.async = true
        // } else {
        //   this.$alert(response.message, '类型输入错误', {
        //     confirmButtonText: '确定'
        //   })
        // }
        var gulistPara = {
          type: 'ZKCloud.App.Core.User.UI.UserMapAutoTask'
        }
        await this.$api.httpGet('/Api/Task/List', gulistPara)
      },
      getPath () {
        this.init()
      },
      async rebuildGet () {
        this.loading = true
        await this.$api.httpPost('/Api/Task/Exceute')
        this.loading = false
      }
    },
    watch: {
      '$route': 'getPath'
    }
  }
</script>
