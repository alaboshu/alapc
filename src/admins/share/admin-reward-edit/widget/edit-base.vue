<template>
  <div class="edit-base">
    <el-form-item label="配置/奖金/收益名称" :required="true">
      <el-input v-model="viewModel.base.name"></el-input>
      <div class="demo_intro"><span class="demo_intro-span" v-for="(item,index) in baseList" :key="index" @click="baseGet(item.name)">{{item.name}}</span></div>
      <div class="demo_intro">请填写市场人员容易理解的名称，配置名称不能超过6个字</div>
    </el-form-item>
    <el-form-item label="简要说明">
      <el-input type="textarea" v-model="viewModel.base.summary" rows="3"></el-input>
      <div class="demo_intro">请填写市场人员容易理解的名称，配置名称不能超过6个字</div>
    </el-form-item>
    <el-form-item label="日志模板" :required="true">
      <el-input v-model="viewModel.base.templateRule.loggerTemplate"></el-input>
      <div class="demo_intro">
        <div class="demo_intro-buttom" @click="dialogVisible=true">选择通用模版</div>可选参数:订单会员：<span class="demo_intro-color">{OrderUserName}</span> 订单编号：<span class="demo_intro-color">{OrderId}</span> 消费账户：<span class="demo_intro-color">{AccountName}</span> 消费金额：<span class="demo_intro-color">{OrderPrice}</span> 获利会员：<span class="demo_intro-color">{ShareUserName}</span> 分润金额：<span class="demo_intro-color">{ShareAmount}</span> 程序配置：<span class="demo_intro-color">{ConfigName}</span>
      </div>
    </el-form-item>
    <el-form-item label="是否启用">
      <el-switch v-model="viewModel.base.isEnable"></el-switch>
      <!--<el-switch v-model="viewModel.base.templateRule.isEnable"></el-switch>-->
      <div class="demo_intro">关闭以后，该维度将不在产生分润</div>
    </el-form-item>
    <el-form-item label="是否开启短信通知">
      <el-switch v-model="viewModel.base.templateRule.smsNotification"></el-switch>
      <div class="demo_intro">开启后所有分润操作将会有短信通知</div>
    </el-form-item>
    <el-form-item label="短信模板" v-if="viewModel.base.templateRule.smsNotification">
      <el-input v-model="viewModel.base.templateRule.smsTemplate"></el-input>
      <div class="demo_intro">
        可选参数:订单会员：<span class="demo_intro-color">{OrderUserName}</span> 订单编号：<span class="demo_intro-color">{OrderId}</span> 消费账户：<span class="demo_intro-color">{AccountName}</span> 消费金额：<span class="demo_intro-color">{OrderPrice}</span> 获利会员：<span class="demo_intro-color">{ShareUserName}</span> 分润金额：<span class="demo_intro-color">{ShareAmount}</span> 程序配置：<span class="demo_intro-color">{ConfigName}</span>
      </div>
    </el-form-item>
    <div class="base-dialong">
      <el-dialog title="选择分润日志模板" :visible.sync="dialogVisible">
        <div class="base-dialong_conter">
          <el-radio-group class="radio-group_box" v-model="viewModel.base.templateRule.loggerTemplate" v-for="(radioValue,radioIndex) in radioList" :key="radioIndex" @change="radioVisible">
            <el-radio :label="radioValue">{{radioValue}}</el-radio>
          </el-radio-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import '../styles/edit-base.scss'
  export default {
    props: {
      viewModel: {}
    },
    data () {
      return {
        dialogVisible: false,
        radio: '1',
        baseList: [
          { name: '招商奖' },
          { name: '团队奖' },
          { name: '领导奖' },
          { name: '服务业绩' },
          { name: '分销奖' },
          { name: '升级点' },
          { name: '积分' },
          { name: '代理奖' },
          { name: '季度分红' },
          { name: '年度分红' },
          { name: '区域业绩' },
          { name: '省代理业绩' },
          { name: '市代理业绩' },
          { name: '报单奖' },
          { name: '注册送' },
          { name: '经营奖' },
          { name: '岗位津贴' },
          { name: '推广奖' },
          { name: '分享奖' },
          { name: '岗位津贴' },
          { name: '推荐奖' },
          { name: '加权分红' },
          { name: '股东分红' },
          { name: '消费奖' },
          { name: '员工工资' },
          { name: '合伙人分红' },
          { name: '创客分润' },
          { name: '门店业绩' },
          { name: '锁定分润' },
          { name: '个人业绩' },
          { name: '股权收益 ' },
          { name: '独立奖' },
          { name: '提成' },
          { name: '基本工资' },
          { name: '破蛋奖' },
          { name: '全勤奖' },
          { name: '工龄奖' }
        ],
        radioList: [
          '会员{OrderUserName}加入会员{ShareUserName}的团队，会员{ShareUserName}获得团队奖数额为{ShareAmount}',
          '会员{ShareUserName}的团队新增会员{OrderUserName}，获得团队奖：{ShareAmount}',
          '会员{OrderUserName}加入会员{ShareUserName}的团队，会员{ShareUserName}获得极差奖数额为{ShareAmount}',
          '会员{ShareUserName}的团队新增会员{OrderUserName}，获得极差奖：{ShareAmount}',
          '{ShareUserName}成功注册成为会员，获得注册奖励{ShareAmount}，奖励存放于{AccountName} 账户',
          '{ShareUserName}成功注册成为代理，获得注册奖励{ShareAmount}，奖励存放于{AccountName} 账户',
          '会员{ShareUserName}购物获得奖励，订单编号为：{OrderId}，奖励数额为{ShareAmount}',
          '会员{ShareUserName}消费，会员获得{ShareAmount}奖励',
          '省代理{ShareUserName}消费，获得{ShareAmount}奖励',
          '市代理{ShareUserName}消费，获得{ShareAmount}奖励',
          '会员{ShareUserName}使用{AccountName}账户消费，会员获得{ShareAmount}奖励',
          '会员{ShareUserName}获得全球分红，分红数额为{ShareAmount}',
          '省代理{ShareUserName}获得全球分红，分红数额为{ShareAmount}',
          '市代理{ShareUserName}获得全球分红，分红数额为{ShareAmount}',
          '团队会员{OrderUserName}消费，会员{ShareUserName}获得团队奖：{ShareAmount}',
          '会员{ShareUserName}下级{OrderUserName}消费，获得团队奖数额为{ShareAmount}',
          '团队会员{OrderUserName}消费，会员{ShareUserName}获得极差奖：{ShareAmount}',
          '会员{ShareUserName}下级{OrderUserName}消费，获得极差奖数额为{ShareAmount}',
          '会员{ShareUserName}服务会员{OrderUserName}进入平台，获得服务奖，奖励数额为{ShareAmount}',
          '市代理区域内产生订单消费，订单编号为：{OrderId}，市代理{ShareUserName}获得代理奖，奖励数额为{ShareAmount}',
          '省代理区域内产生订单消费，订单编号为：{OrderId}，省代理{ShareUserName}获得代理奖，奖励数额为{ShareAmount}',
          '市代理{ShareUserName}的代理区域内产生收货订单，订单编号为：{OrderId}，获得{ShareAmount}收货地址奖',
          '省代理{ShareUserName}的代理区域内产生收货订单，订单编号为：{OrderId}，获得{ShareAmount}收货地址奖',
          '市代理{ShareUserName}的代理区域内产生备案订单，订单编号为：{OrderId}，获得{ShareAmount}备案地址奖',
          '省代理{ShareUserName}的代理区域内产生备案订单，订单编号为：{OrderId}，获得{ShareAmount}备案地址奖',
          '会员{ShareUserName}下级{OrderUserName}消费，会员{ShareUserName}获得{ShareAmount}奖励',
          '会员{ShareUserName}分享{OrderUserName}消费，会员{ShareUserName}获得{ShareAmount}奖励',
          '会员{ShareUserName}下级{OrderUserName}使用{AccountName}账户消费，会员{ShareUserName}获得奖励为{ShareAmount}',
          '会员{ShareUserName}下级{OrderUserName}使用{AccountName}账户消费，会员{ShareUserName}获得{ShareAmount}奖励，订单编号为：{OrderId}',
          '会员{OrderUserName}消费，上级{ShareUserName}获得{ShareAmount}奖励',
          '会员{OrderUserName}使用{AccountName}账户消费，上级{ShareUserName}获得{ShareAmount}奖励',
          '会员{ShareUserName}获得{ShareAmount}分红',
          '会员{OrderUserName}使用{AccountName}账户消费，门店{ShareUserName}获得{ShareAmount}奖励',
          '会员{OrderUserName}消费，门店{ShareUserName}获得{ShareAmount}奖励',
          '会员{ShareUserName}获得员工分红{ShareAmount}',
          '会员{ShareUserName}获得股东分红，分红数额为{ShareAmount}',
          '会员{ShareUserName}业绩达到对应量，获得{ShareAmount}奖励'
        ]
      }
    },
    methods: {
      async baseGet (val) {
        this.viewModel.base.name = val
      },
      radioVisible () {
        this.dialogVisible = false
      }
    }
  }
</script>
