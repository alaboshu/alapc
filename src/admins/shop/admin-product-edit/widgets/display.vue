<template>
  <div class="basics">
    <div class="category basics_row">
      <div class="title_row">
        <div class="title_left">
          类目属性:
        </div>
        <div class="title_right">
          <div class="right-heading">
            <div class="right-head_list" v-for="(item,index) in productView.category.displayPropertys" :key="index">
              <div class="head_list-text"><span class="text-span" v-if="false">*</span>{{item.name}}:</div>
              <div class="head_list-option">
                <div v-if="item.controlsType === 4">
                  <el-checkbox :label="name.valueName" v-for="(name, num) in item.propertyValues" v-model="name.checked" :checked="name.checked" :key="num"></el-checkbox>
                </div>
                <el-time-picker v-if="item.controlsType === 9" v-model="item.createTime" >
                </el-time-picker>
                <el-switch v-model="item.isSale" v-if="item.controlsType === 15" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
                <el-input v-model="item.displayValue" v-if="item.controlsType === 2"></el-input>
                <div v-if="item.controlsType === 6">
                  <el-select v-model="item.displayValue" placeholder="请选择">
                    <el-option v-for="(name, index) in item.propertyValues" :key="index" :label="name.valueName" :value="name.valueName">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div class="text-inrto">错误选择宝贝属性，可能会宝贝下架或搜索流量减少，影响您的正常销量，请认真准确选择！</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      productView: {}
    },
    data () {
      return {
        checked: true
      }
    },
    methods: {
      checkChanged (index, value) {
        var config = this.displayConfigs[index]
        if (!value.checked) {
          for (let i = 0; i < config.propertyValues.length; i++) {
            const v = config.propertyValues[i]
            if (v.id === value.id) {
              config.propertyValues.splice(i, 1)
              break
            }
          }
        } else {
          config.propertyValues.push({ ...value })
        }
      }
    }
  }
</script>
