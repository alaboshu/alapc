<template>
  <div class="form" v-if="async">
    <el-form-item label="获利会员用户类型">
      <el-select v-if="type === 'orderUser'" v-model="viewModel.orderUserTypeId" @change="reqData(true)" filterable placeholder="请选择">
        <el-option v-for="item in widgetModel" :key="item.value" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
      <el-select v-else v-model="viewModel.shareUserTypeId" @change="reqData(true)" filterable placeholder="请选择">
        <el-option v-for="item in widgetModel" :key="item.value" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
      <div class="demo_intro">选择获利用户的用户类型，比如选择股东，则该条分润规则只针对股东有效。用户类型管理</div>
    </el-form-item>
    <!--分割线-->
    <el-form-item label="是否限制获利用户等级">
      <el-switch v-if="type === 'orderUser'" v-model="viewModel.isLimitOrderUserGrade" @change="headleChange(viewModel.isLimitOrderUserGrade, 'orderUser')"></el-switch>
      <el-switch v-else v-model="viewModel.isLimitShareUserGrade" @change="headleChange(viewModel.isLimitShareUserGrade, 'shareUser')"></el-switch>
      <div class="demo_intro">选择获利用户的用户类型等级。</div>
    </el-form-item>
    <el-form-item v-if="viewModel.isLimitOrderUserGrade || viewModel.isLimitShareUserGrade" :label="textIntro">
      <el-select v-if="type === 'orderUser'" v-model="viewModel.orderUserGradeId" filterable placeholder="请选择">
        <el-option v-for="item in selectData" :key="item.value" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
      <el-select v-else v-model="viewModel.shareUserGradeId" filterable placeholder="请选择">
        <el-option v-for="item in selectData" :key="item.value" :label="item.value" :value="item.key">
        </el-option>
      </el-select>
      <div class="demo_intro">开启等级以后只有相应的等级才能够产生分润。</div>
    </el-form-item>
  </div>
</template>


<script>
  export default {
    props: {
      viewModel: {},
      type: {
        default: null
      }
    },
    data () {
      return {
        async: false,
        widgetModel: '',
        textIntro: '',
        selectData: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.isalt = this.type === 'orderUser'
        var response = await this.$api.httpGet('/Api/Type/GetKeyValue?Type=UserTypeConfig')
        if (response.status === 1) {
          this.widgetModel = response.result
          if (response.result && response.result.length > 0) {
            this.getRewardUrl(response.result, 'UserTypeConfig')
          }
        }
        this.decideType()
        this.async = true
      },
      headleChange (val, type) {
        this.reqData(val, type)
      },
      async reqData (isTrue, type) {
        if (isTrue) {
          var para = {
            userTypeId: this.viewModel.orderUserTypeId || this.viewModel.shareUserTypeId
          }
          var response = await this.$api.httpGet('/Api/RewardRule/GetUserGradeListByUserTypeId', para)
          if (response.status === 1) {
            this.selectData = response.result
            if (response.result && response.result.length > 0) {
              this.getRewardUrl(response.result, 'userTypeId')
            }
          }
        } else {
          if (type === 'orderUser') {
            this.viewModel.orderUserGradeId = ''
          } else if (type === 'shareUser') {
            this.viewModel.shareUserGradeId = ''
          }
        }
      },
      decideType () {
        if (this.type === 'orderUser') {
          this.textIntro = '获利用户等级'
        } else {
          this.textIntro = '触发用户等级'
        }
      },
      getRewardUrl (response, type) {
        if (type === 'UserTypeConfig') {
          if (this.type === 'orderUser') {
            this.viewModel.orderUserTypeId = response[0].key
          } else {
            this.viewModel.shareUserTypeId = response[0].key
          }
        } else {
          if (this.type === 'orderUser') {
            this.viewModel.orderUserGradeId = response[0].key
          } else {
            this.viewModel.shareUserGradeId = response[0].key
          }
        }
      }
    },
    watch: {
      'viewModel.orderUserTypeId': {
        deep: true,
        handler (val) {
        }
      }
    }
  }
</script>
