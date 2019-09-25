<template>
  <el-table :data="viewModel.productList" border style="width: 100%">
    <el-table-column label="图片" width="90">
      <template slot-scope="scope">
        <img :src="$api.baseUrl()+scope.row.smallUrl" class="line-img" />
      </template>
    </el-table-column>
    <el-table-column label="名称">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>
    <el-table-column label="货号">
      <template slot-scope="scope">
        {{scope.row.bn}}
      </template>
    </el-table-column>
    <el-table-column label="价格">
      <template slot-scope="scope">
        {{scope.row.price}}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="130">
      <template slot-scope="scope">
        <div class="operation">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
  export default {
    props: {
      viewModel: {}
    },
    data () {
      return {}
    },
    methods: {
      handleDelete (index, conter) {
        var than = this
        this.$confirm('此操作将删除改商品，是否继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          than.viewModel.productList.splice(index, 1)
          // than.idArr.splice(index, 1)
          than.$emit('addChange', index)
        }).catch(() => { })
      }
    }
  }
</script>
