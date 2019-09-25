<template>
  <div class="asset-allocation">
    <div class="alert-success">
      <div class="alert-success_box">
        <p>不同的分润维度，可以分配到不同的资产账户，总比例必须等于1，<span>资产账户管理</span></p>
      </div>
    </div>
    <x-line :border="true" title="不同的分润维度，可以分配到不同的资产账户，总比例必须等于1" color="brand" icon="null" style="padding:0px 15px;">
      <div class="asset_table">
        <el-table :data="viewModel.ruleItems" style="width: 100%">
          <el-table-column prop="moneyTypeId">
            <template slot="header" slot-scope="scope">
              <span v-if="scope" />
            </template>
            <template slot-scope="scope">
              <x-select v-model="scope.row.moneyTypeId" type="moneytypeconfig" :value="viewModel.ruleItems.moneyTypeId"></x-select>
            </template>
          </el-table-column>
          <el-table-column prop="ratio">
            <template slot="header" slot-scope="scope">
              <span v-if="scope" />
            </template>
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.ratio" :precision="4" :max="1" :min="0" :step="0.01"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="actions_but" @click="actionsDete(scope.$index)">删除</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="actions_add" @click="actionsAdd">新增数据</div>
      </div>
    </x-line>
  </div>
</template>
<script>
  export default {
    props: {
      viewModel: {}
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      async actionsDete (index) {
        this.$confirm('是否删除此数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.viewModel.ruleItems.splice(index, 1)
        }).catch(() => { })
      },
      async actionsAdd () {
        this.viewModel.ruleItems.push({
          moneyTypeId: '',
          ratio: ''
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/asset-allocation.scss";
</style>
