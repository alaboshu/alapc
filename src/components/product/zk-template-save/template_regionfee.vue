<template>
  <div class="template_reg">
    <el-row :gutter="10" style="background-color:aliceblue">
      <el-col :span="11">{{ ">" + text}}</el-col>
      <el-col :span="2">
        <el-button type="text" @click="modification"></el-button>
        <el-dialog title="选择配送区域" :visible.sync="dialogTableVisible">
          <templateRegion :regions="editingRegions"></templateRegion>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col :span="2">
        <el-button @click="deleteFee" type="text"></el-button>
      </el-col>
      <el-col :span="2">
        <el-input disabled v-model="regionfee.startStandard"></el-input>
      </el-col>
      <el-col :span="2">
        <el-input disabled v-model="regionfee.startFee"></el-input>
      </el-col>
      <el-col :span="2">
        <el-input disabled v-model="regionfee.endStandard"></el-input>
      </el-col>
      <el-col :span="2">
        <el-input disabled v-model="regionfee.endFee"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import templateRegion from './template_region.vue'
  export default {
    components: {
      templateRegion
    },
    data () {
      return {
        dialogTableVisible: false,
        loading: false,
        editingRegions: []
      }
    },
    props: {
      allfee: undefined,
      regionfee: {},
      regions: undefined
    },
    computed: {
      text () {
        var txt = ''
        this.regions.forEach(reg => {
          txt += this.getRegionText(reg)
        })
        return txt.length > 0 ? txt.substr(0, txt.length - 1) : ''
      },
      selectType (region) {
        return this.getSelectType(region)
      }
    },
    watch: {
      dialogTableVisible (cur, old) {
        if (cur) {
          this.editingRegions = this.getEditionRegions()
        } else {
          this.regionfee.regionList = this.getSelectedRegions()
        }
      }
    },
    mounted () {
    },
    methods: {
      modification () {
        this.dialogTableVisible = true
      },
      getEditionRegions () {
        return this.copyRegion({ children: this.regions }).children
      },
      copyRegion (region) {
        var children = []
        region.children.forEach(child => {
          if (!this.selectedByOther(child)) {
            var copyChild = this.copyRegion(child)
            if (copyChild.children.length === 0 && child.children.length !== 0) {

            } else {
              children.push(copyChild)
            }
          }
        })

        var ret = {
          id: region.id,
          name: region.name,
          checked: this.array_contain(this.regionfee.regionList, region.id),
          children: children
        }

        if (!ret.checked && ret.children !== undefined && ret.children.length > 0) {
          var alltrue = true
          ret.children.forEach(c => {
            if (c.checked !== true) {
              alltrue = false
            }
          })
          if (alltrue) {
            ret.checked = true
          }
        }

        return ret
      },
      selectedByOther (region) {
        for (var feeIndex in this.allfee) {
          var fee = this.allfee[feeIndex]
          if (fee.id !== this.regionfee.id) {
            if (this.array_contain(fee.regionList, region.id)) {
              return true
            }
          }
        }
        return false
      },
      getSelectedRegions () {
        var selected = []
        var list = [{
          id: -1,
          children: this.editingRegions
        }]
        while (list.length > 0) {
          var curReg = list[0]
          list.splice(0, 1)

          curReg.children.forEach(child => {
            list.push(child)
          })

          if (curReg.checked && curReg.children.length === 0) {
            selected.push(curReg.id)
          }
        }
        return selected
      },
      deleteFee () {
        var index = -1
        for (var i = 0; i < this.allfee.length; i++) {
          if (this.allfee[i].id === this.regionfee.id) {
            index = i
            break
          }
        }
        if (index >= 0) {
          this.allfee.splice(index, 1)
        }
      },
      onSubmit () {
      },
      getSelectType (region) {
        if (region.children === undefined || region.children === null || region.children.length === 0) {
          if (this.array_contain(this.regionfee.regionList, region.id)) {
            return 1
          } else {
            return -1
          }
        } else {
          var selectCount = 0
          region.children.forEach(child => {
            if (this.getSelectType(child) === 1) {
              selectCount++
            }
          })
          if (selectCount === region.children.length) {
            return 1
          }
          if (selectCount === 0) {
            return -1
          }
          return 0
        }
      },
      array_contain (array, obj) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === obj) { return true }
        }
        return false
      },
      getRegionText (region) {
        if (this.getSelectType(region) === 1) {
          return region.name + ','
        } else {
          if (region.children !== undefined && region.children !== null) {
            var txt = ''
            region.children.forEach(reg => {
              txt += this.getRegionText(reg)
            })
            return txt
          }
        }
        return ''
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .template_reg {
    .el-dialog__footer {
      border-top: 1px solid #f5f7fa;
    }
  }
</style>

