<template>
  <div class="zk-product-showpage" v-loading="loading">
    <div class="container_box">
      <div class="all_box">
        <div class="data_model" v-if="shows">
          <img src="https://hbimg.huabanimg.com/d6b3e232d0b5ebd6df581c8e4f3d9e4710f0069bc3d5-LM6zTj_fw658" alt="">
        </div>
        <div v-if="viewModel">
          <div class="pages-product-show">
            <AhowThumbnail :productShow="viewModel" />
            <ShowInto :productView="viewModel" />
          </div>
          <div class="show_recommended">
            <div class="title">
              <ul class="show_recommended-ul">
                <li class="show_recommended-li">你可能还喜欢</li>
              </ul>
            </div>
            <el-carousel indicator-position="outside" :autoplay="false" arrow="always" height="225px">
              <el-carousel-item v-for="(item,index) in 4" :key="index">
                <div class="recommended_item">
                  <ul>
                    <li v-for="(list,listIndex) in productList[index]" :key="listIndex" v-show="listIndex<4">
                      <router-link tag="div" :to="'/product/show?id='+list.id">
                        <div class="item_img" @click="goLinks(list.id)">
                          <img :src="list.thumbnailUrl" alt="">
                        </div>
                        <div class="item_name">{{list.name}}</div>
                        <div class="item_price">{{list.displayPrice}}</div>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <ShowStoreClass :productView="viewModel"></ShowStoreClass>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  import AhowThumbnail from './show_thumbnail'
  import ShowStoreClass from './show_store_class'
  import ShowInto from './show_into'
  export default {
    
    components: {
      AhowThumbnail,
      ShowStoreClass,
      ShowInto
    },
    data () {
      return {
        viewModel: null,
        listModel: [],
        productList: [],
        shows: false,
        loading: false
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        if (!this.$user.isLogin()) {
          this.$alert('您未登录，请登录', {
            confirmButtonText: '确定'
          }).then(() => {
            this.$user.toLogin()
          }).catch(() => {

          })
          return
        }
        var list = await this.$api.httpGet('/api/product/list')
        if (list.status === 1) {
          this.listModel = list.result.productItems
          this.shows = false
        } else {
          this.shows = true
        }
        var num = 0
        this.productList.push([])
        this.listModel.forEach((element, index) => {
          if (index > 0 & index % 4 === 0) {
            num += 1
            this.productList.push([])
          }
          this.productList[num].push(element)
        })
        let parameter = {
          id: this.$route.query.id,
          userId: this.$user.id()
        }
        var productShow = await this.$api.httpGet('/api/product/show', parameter)
        this.setTime(productShow)
        if (productShow.status === 1) {
          this.viewModel = productShow.result
        } else {
          this.$alert(productShow.message, {
            confirmButtonText: '确定'
          }).then(() => {
            this.$router.push('/')
          }).catch(() => {
            this.$router.push('/')
          })
        }

        this.loading = false
      },
      async setTime (productShow) {
        setTimeout(() => {
          if (productShow === undefined) {
            this.loading = true
          } else if (productShow.status === 1) {
            this.loading = false
          }
        }, 300)
      },
      goLinks (id) {
        window.location.href = '/product/show?id=' + id
      }
    }
  }

</script>

<style  lang="scss" scoped>
  @import "~_style/theme.scss";
  .data_model {
    width: 60%;
    margin: 0 auto;
    text-align: center;
    height: 420px;
    color: #666;
    img {
      width: 450px;
      height: 400px;
      display: block;
      margin-top: 75px;
    }
    .model_icon {
      font-size: 20px;
      .iconfont {
        font-size: 20px;
      }
    }
  }
  .pages-product-show {
    width: 1200px;
    margin: 0 auto;
    &::after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      clear: both;
    }
  }
  .show_recommended {
    width: 1200px;
    margin: 0 auto;
    margin-top: 40px;

    .title {
      background: #f5f5f5;
      height: 42px;
      line-height: 42px;
      .show_recommended-ul {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #e4393c;
        .show_recommended-li {
          height: 100%;
          display: inline-block;
          padding: 0px 20px;
          background-color: #e4393c;
          color: #ffffff;
          font-size: 14px;
        }
      }
    }
    .recommended_item {
      width: 100%;
      height: 100%;
      padding: 20px 50px;
      background: #fff;
      ul {
        width: 100%;
        height: 100%;
        &::after {
          content: "";
          display: block;
          width: 0;
          height: 0;
          clear: both;
        }
        li {
          float: left;
          width: 275px;
          .item_img {
            width: 150px;
            height: 150px;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .item_name {
            width: 150px;
            margin: 10px auto 0 auto;
            color: #000;
            overflow: hidden;
            text-align: center;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box !important;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          .item_price {
            margin-top: 250px;
            margin: 10px auto 0 auto;
            color: $gl-themeColor;
            text-align: center;
          }
        }
      }
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
