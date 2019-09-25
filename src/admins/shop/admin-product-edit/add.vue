<template>
  <div>
    <div class="mall-edit">
      <div class="category-box">
        <div class="choose-category">
          <div class="category-list">
            <div class="category-list_input">
              <input @input="change" placeholder="请输入名称">
            </div>
            <ul class="category-list_ul">
              <li class="category-list_li" v-for="(selectI,indexs) in selectList" :key="indexs" @click="addList(selectI)">
                <div class="list-list-title">{{selectI.name}}</div>
                <div class="list-list-icon">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </li>
            </ul>
          </div>
          <div class="category-list" v-if="false">
            <div class="category-list_input">
              <input placeholder="请输入名称">
            </div>
            <ul class="category-list_ul">
              <li class="category-list_li" v-for="(selectI,indexs) in selectList" :key="indexs">
                <div class="list-list-title">{{selectI.name}}</div>
                <div class="list-list-icon">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="prompt-dialog">
          <div class="dialog-left">您当前选择的是:</div>
          <div class="dialog-right" v-if="currentlySelected">
            <span class="right-text">{{currentlySelected}}</span>
            <router-link class="foot-edit edit" :to="'/admin/category/edit?category='+cuurrentId" v-if="filterType==3">编辑类目</router-link>
            <span class="foot-edit" @click="detele" v-if="filterType==3">删除类目</span>
          </div>
        </div>
        <div class="prompt-foot">
          <div class="foot-but" @click="goodsAdd">商品添加</div>
          <div class="foot-but categoryadd" v-if="filterType==3">添加类目</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      filterType: {}
    },
    data () {
      return {
        categoryList: [{}],
        categoryChildList: [[]],
        selectList: '',
        currentlySelected: '',
        cuurrentId: '',
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async selectCat (index) {
        this.categoryList.splice(index + 1, this.categoryList.length - index)
        this.categoryChildList.splice(
          index + 1,
          this.categoryChildList.length - index
        )
        var res = await this.$api.httpGet('/Api/Store/GetChildCategories', {
          parentId: this.categoryList[index].id
        })
        if (res !== undefined && res.status === 1) {
          if (res.result.length > 0) {
            this.categoryChildList.push(res.result)
            this.categoryList.push({})
          }
        } else {
          this.$notify({
            title: '提示',
            message: '获取类目列表失败',
            type: 'error'
          })
        }
      },
      addList (conter) {
        this.currentlySelected = conter.name
        this.cuurrentId = conter.id
      },
      goodsAdd () {
        if (this.cuurrentId) {
          this.$emit('change', this.cuurrentId)
        } else {
          this.$confirm('请选择商品类目', {
            confirmButtonText: '确 定',
            cancelButtonText: '取 消'
          }).catch(() => { })
        }
      },
      async init () {
        var res = await this.$api.httpGet('/Api/Store/GetChildCategories')
        if (res !== undefined && res.status === 1) {
          this.categoryChildList = [res.result]
          this.selectList = res.result
          this.data = res.result
        } else {
          this.$notify({
            title: '提示',
            message: '获取类目列表失败',
            type: 'error'
          })
        }
      },
      change (ev) {
        var list = []
        this.data.forEach(item => {
          if (item.name.indexOf(ev.target.value) > -1) {
            list.push(item)
          }
        })
        if (list.length > 0) {
          this.selectList = list
        }
      },
      detele () {
        this.$confirm('此操作将删除此类目，是否继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.httpDetele()
        }).catch(() => { })
      },
      async httpDetele () {
        var response = await this.$api.httpDelete('Api/Category/DeleteCategory?categoryId=' + this.cuurrentId)
        if (response) {
          this.$crud.message(response)
        }
        this.init()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./widgets/style/add.scss";
</style>
