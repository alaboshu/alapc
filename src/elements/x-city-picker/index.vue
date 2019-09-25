<template>
  <div class="city-picker">
    <div :style="'width:'+colWidth+'px'" class="cityItem">
      <el-select v-model="provinceValue" placeholder="请选择" @change="changeProvince" :disabled="readonly" size="mini">
        <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div :style="'width:'+colWidth+'px'" class="cityItem" v-if="isCity">
      <el-select v-model="cityValue" placeholder="请选择" @change="changeCity" :disabled="readonly" size="mini">
        <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div :style="'width:'+colWidth+'px'" class="cityItem" v-if="isArea">
      <el-select v-model="areaValue" placeholder="请选择" @change="changeArea" :disabled="readonly" size="mini">
        <el-option v-for="item in area" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>

  export default {
    props: {
      colWidth: {
        default: 110
      },
      value: {},
      readonly: {
        default: false
      },
      widgetName: {},
      introHtml: {},
      requiredFool: {}
    },
    data () {
      return {
        province: '',
        provinceValue: '',
        cityList: '',
        city: '',
        cityValue: '',
        areaList: '',
        area: '',
        areaValue: '',
        isArea: true,
        isCity: true
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        if (this.$route.params[0].toLowerCase() === 'province/edit') {
          this.isArea = false
          this.isCity = false
        }
        if (this.$route.params[0].toLowerCase() === 'city/edit') {
          this.isArea = false
        }
        let province = await this.$api.httpGet('/Api/Region/GetRegionData', { level: 2 })
        let city = await this.$api.httpGet('/Api/Region/GetRegionData', { level: 3 })
        let area = await this.$api.httpGet('/Api/Region/GetRegionData', { level: 4 })
        this.province = JSON.parse(province.message)
        this.provinceValue = this.province[0].value
        this.cityList = JSON.parse(city.message)
        this.city = JSON.parse(city.message)[0]
        this.cityValue = this.city[0].value
        this.areaList = JSON.parse(area.message)
        this.area = this.areaList[0][0]
        this.areaValue = this.areaList[0][0][0].value
        // 数据回绑
        var value = this.value.toString()
        if (!this.$api.isEmpty(this.value)) {
          this.province.forEach((item, index) => {
            if (String(item.value) === value.substring(0, 2)) {
              this.provinceValue = item.value
              this.city = this.cityList[index]
              this.city.forEach((city, num) => {
                if (city.value === value.substr(0, 4)) {
                  this.cityValue = city.value
                  this.area = this.areaList[index][num]
                  this.area.forEach((area, areaIndex) => {
                    if (area.value === value) {
                      this.areaValue = area.value
                    }
                  })
                }
              })
            }
          })
        }
      },
      changeProvince (val) {
        if (!this.readonly) {
          this.province.forEach((provinceValue, provinceIndex) => {
            if (provinceValue.value === val) {
              this.city = this.cityList[provinceIndex]
              this.cityValue = this.cityList[provinceIndex][0].value
              this.area = this.areaList[provinceIndex][0]
              this.areaValue = this.areaList[provinceIndex][0][0].value
            }
          })
        }
      },
      changeCity (val) {
        if (!this.readonly) {
          this.cityList.forEach((cityValue, cityIndex) => {
            cityValue.forEach((cVal, cIndex) => {
              if (cVal.value === val) {
                this.area = this.areaList[cityIndex][cIndex]
                this.areaValue = this.areaList[cityIndex][cIndex][0].value
              }
            })
          })
        }
      },
      changeArea (val) {
        if (!this.readonly) {
          this.$emit('changePicker')
        }
      }
    },
    watch: {
      areaValue (val) {
        var city = val
        if (this.$route.params[0].toLowerCase() === 'province/edit') {
          city = val.substring(0, 2)
        }
        if (this.$route.params[0].toLowerCase() === 'city/edit') {
          city = val.substring(0, 4)
        }
        this.$emit('input', city)
      }
    }
  }
</script>

<style rel="stylesheet/scss"  lang='scss'>
  .city-picker {
    display: flex;
    .el-input--mini {
      .el-input__inner {
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .x-city-picker {
    background-color: #ffffff;
    margin-left: -230px;
    .el-form {
      .el-form-item {
        margin-bottom: 15px;
      }
    }
  }
</style>
