<template>
  <x-border :title="viewModel.name" type="brand">
    <div class="admin-hudong-edit">
      <div class="hudong-edit-box">
        <div class="hudong-edit_left">
          <div class="hudong-edit_form">
            <el-form label-width="250px">
              <el-form-item label="活动名称">
                <div class="lable-text">{{viewModel.name}}</div>
                <div class="stored-edit_intro">活动名称</div>
              </el-form-item>
              <el-form-item label="是否启用">
                <el-switch v-model="viewModel.isEnable"></el-switch>
                <div class="stored-edit_intro">请确认是否启用该活动</div>
              </el-form-item>
              <el-form-item label="每人每日可抽奖次数">
                <!-- <el-input v-model="viewModel.drawCount" ></el-input> -->
                <el-input-number v-model="viewModel.drawCount" width="150px" controls-position="right"></el-input-number>
                <div class="stored-edit_intro">请设置每人每天最多抽奖次数</div>
              </el-form-item>
              <el-form-item label="抽奖规则">
                <el-input type="textarea" v-model="viewModel.drawRule" width="150px"></el-input>
                <div class="stored-edit_intro">请设置抽奖规则</div>
              </el-form-item>
            </el-form>
          </div>
          <x-line :border="true" title="奖品设置" icon="null" type="metal">
            <div class="line-buttom" v-if="$route.query.Type !== 'BigWheel'" slot="headerRight">新增奖品设置</div>
            <div class="hudong-edit_table">
              <el-table :data="viewModel.awards" style="width: 100%" border>
                <el-table-column label="图片" width="70px">
                  <template slot-scope="scope">
                    <x-select-image width="55" height="55" v-model="scope.row.img" class="hudongImageUpload"></x-select-image>
                  </template>
                </el-table-column>
                <el-table-column label="奖品等级" width="150px">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.grade"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="获奖机率" width="150px">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.rate"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="奖项数量" width="150px">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.count"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="奖品类型" width="150px">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择奖品类型">
                      <!-- <el-option label="区域一" value="scope.row.type"></el-option> -->
                      <el-option v-for="item in express" :key="item.Key" :label="item.value" :value="item.key">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="奖品含量" width="150px">
                  <template slot-scope="scope">
                    <div class="column_text">
                      <el-input v-model="scope.row.worth"></el-input>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column label="设置说明">
                  <template slot-scope="scope">
                    <div class="column_text">
                      <el-input v-model="scope.row.intro"></el-input>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </x-line>
          <x-line :border="true" title="游戏规则设定" icon="null" type="metal">
            <div class="game-rule">
              <div class="activity-content">
                <p>活动内容：</p>
                <p>1.完结每次游戏，消耗兑换券。</p>
                <p>2.玩家获奖可以在个人中心，查找奖品，到店铺进行兑换。</p>
                <p>2.玩家获奖可以在个人中心，查找奖品，到店铺进行兑换。</p>
                <p>4.获得的奖品有：购物券、奖品、储值等。</p>
              </div>
              <div class="infuse-box">
                <div class="infuse-text">注：</div>
                <div class="infuse-conter">
                  <p>1.获奖次数必填，具体数值参考获奖几率，2个值比例相同，设置中奖次数满额后，该商品不在中奖，中奖几率累加到购物券。</p>
                  <p>2.获奖几率之和必须是100。</p>
                  <p>3.玩家获奖可以在个人中心，查找奖品，到店铺进行兑换，</p>
                  <p>4.购物券、储值金额自动进入玩家账户，无需兑换。</p>
                  <p>5.获得的奖品有：购物券、奖品、储值等。</p>
                </div>
              </div>
            </div>
          </x-line>
        </div>
        <div class="hudong-edit_right">
          <div class="edit_right-phone">
            <div class="phone-groove"></div>
          </div>
        </div>
      </div>
      <div class="stored_footer">
        <div class="stored_btn" v-on:click="saveForm">保存</div>
      </div>
    </div>
  </x-border>
</template>
<script>
  export default {
    data () {
      return {
        express: '',
        viewModel: ''
      }
    },
    props: {
      widgetData: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var responseOption = await this.$api.httpGet('api/Hudong/GetHudongType')
        if (responseOption.status === 1) {
          this.express = responseOption.result
        }
        var para = {
          key: this.$crud.getType()
        }
        if (this.$crud.getType()) {
          var response = await this.$api.httpGet('/Api/Hudong/GetView', para)
          if (response.status === 1) {
            this.viewModel = response.result
          } else {
            this.$notify({
              title: '操作失败',
              type: 'error',
              message: response.message,
              position: 'bottom-right'
            })
          }
        }
      },
      async saveForm (model) {
        this.viewModel.key = this.$crud.getType()
        this.viewModel.userId = this.$user.loginUser().id
        var response = await this.$api.httpPost('/Api/Hudong/edit', this.viewModel)
        if (response.status === 1) {
          this.$crud.message(response)
        } else {
          this.$notify({
            title: '失败',
            message: response.message,
            position: 'bottom-right'
          })
        }
      }
    },
    watch: {
      $route (val, from) {
        this.init()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./admin-hudong-edit.scss";
</style>
