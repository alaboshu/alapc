<template>
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
        <div class="dialog-right" v-if="selectCategory">
          <span class="right-text">{{selectCategory.name}}</span>
          <router-link class="foot-edit edit" :to="'/admin/category/edit?category='+selectCategory.id" v-if="filterType==3">编辑类目</router-link>
        </div>
      </div>
      <div class="prompt-foot ">
        <div class="foot-but" @click="goodsAdd">商品添加</div>
        <router-link class="foot-edit edit" to="/admin/category/edit" v-if="filterType==3">添加类目</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import store from './widgets/js/store'
  export default {
    props: {
      filterType: {}
    },
    data () {
      return {
        categoryList: [{}],
        categoryChildList: [[]],
        selectList: '',
        selectCategory: null // 当前选中的类目
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
        var childCatetories = store.getChildCategories(this.categoryList[index].id)
        this.categoryChildList.push(childCatetories)
        this.categoryList.push({})
      },
      addList (category) {
        this.selectCategory = category
      },
      goodsAdd () {
        if (this.selectCategory) {
          this.$emit('selectCategory', this.selectCategory.id)
        } else {
          this.$api.alert('请选择类目')
        }
      },
      async init () {
        var childCatetories = await store.getChildCategories()
        this.selectCategory = childCatetories[0]
        this.categoryChildList = childCatetories
        this.selectList = childCatetories
        this.data = childCatetories
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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./widgets/style/add.scss";
</style>
