<template>
  <x-border title="平台功能" type="accent" icon="flaticon-puzzle">
    <div class="platform-function_box">
      <div class="platform-function">
        <div class="platform_intro">您可以根据您项目的实际需求，选择开启或关闭某些功能</div>
      </div>
      <x-line :border="true" title="平台(勾选启用)" type="metal" icon="flaticon-users">
        <div class="role-item_box">
          <div class="el-tree_list">
            <el-tree :data="data2" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
            </el-tree>
          </div>
        </div>
      </x-line>
      <div class="role-foot">
        <div class="role-foot_right">保存平台功能</div>
        <div class="role-foot_left">取消</div>
      </div>
    </div>
  </x-border>
</template>
<script>
  export default {
    data () {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./styles/open.scss";
</style>


