<template>
  <x-border :title="title" v-loading="fullscreenLoading">
    <x-table :widgetData="widgetData" v-if="async" :isTemplate="true" :showTable="false" ref="xTable">
      <template slot-scope="user">
        <div class="admin-mall-order">
          <div class="order_list" v-for="(item,itemIndex) in user.data.result.result" :key="itemIndex">
            <div class="order_list_top">
              <div class="order_list_left" v-if="user.data.tableAction">
                <div>
                  <span>订单编号:</span>
                  <router-link tag="span" style="cursor: pointer;" :to="user.data.tableActions[0].url+'?id='+item.id">{{item.serial}}</router-link>
                  <span> {{item.createTime}}</span>
                </div>
              </div>
              <div class="order_list_top_center">{{item.storeName}}</div>
              <div class="order_list_top_right">
                <i class="iconfont zk-tree"></i>
                {{item.regionName}}{{item.address}}
              </div>
            </div>
            <div class="order_list_cont" v-for="(cont,contIndex) in item.outOrderProducts" :key="contIndex">
              <div class="order_list_cont_left">
                <!-- v-if="user.data.tableAction" -->
                <img :src="cont.thumbnailUrl" class="img" alt="">
                <!-- <router-link tag="img" class="img" style="cursor: pointer;" :src="cont.thumbnailUrl" :to="user.data.tableActions[0].url+'?id='+item.id"></router-link> -->
                <div class="order_cont">
                  <p>{{cont.name}}</p>
                  <p>{{item.propertyValueDesc}}</p>
                </div>
              </div>
              <div class="order_list_cont_center">
                <span>{{cont.displayPrice}}</span>X{{cont.buyCount}}
              </div>
              <div class="order_list_cont_right" v-if="contIndex===0">
                <div class="order_list_class">
                  <p>
                    <i class="iconfont zk-debt-me"></i>
                    <span>({{item.user.name}})</span>
                  </p>
                  <p>{{item.user.mobile}}</p>
                </div>
                <div class="price order_list_class">
                  <p>￥{{item.paymentAmount}}元 </p>
                  <p>含运费:{{item.expressAmount}}</p>
                </div>
                <div class="order order_list_class">
                  <p class="button">{{item.orderStatuName}}</p>
                  <div class="order-active" v-for="(tableActionsItem,tableActionsIndex) in user.data.tableActions" :key="tableActionsIndex" style="width: 100%;">
                    <p v-if="tableActionsItem.type !== 4">
                      <router-link class="iconfont zk-userfeedback" tag="i" :to="user.data.tableActions[0].url+'?id='+item.id" v-if="user.data.tableActions">订单详情</router-link>
                    </p>
                    <p class="iconfont zk-userfeedback" @click="tableActions(tableActionsItem, item)" v-else-if="item.postParas!==null">
                      <span>{{tableActionsItem.name}}</span>
                    </p>
                  </div>
                  <p v-if="false"><i class="iconfont zk-withdrawal"></i>分润详情</p>
                </div>
              </div>
            </div>
          </div>
          <admin-tenant-progress ref="progress"></admin-tenant-progress>
        </div>
      </template>
    </x-table>
  </x-border>
</template>


<script>
  export default {
    data () {
      return {
        async: false,
        viewModel: null,
        checked: false,
        fullscreenLoading: false
      }
    },
    props: {
      widgetData: {},
      title: {}
    },
    components: {
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.fullscreenLoading = true
        this.async = true
        setTimeout(() => {
          this.fullscreenLoading = false
        }, 500)
      },
      convertTo (type, viewModel) {
        return viewModel
      },
      watchWidgetData (val) {
        this.$refs.xTable.$emit('table_change_widget_data', val)
      },
      async tableActions (item, data) {
        if (item.url && data.postParas) {
          this.$refs.progress.dialogVisible = true
          this.$refs.progress.test = '预计<span style="color: red;">2分钟</span>时间，请勿离开或刷新页面...'
          var response = await this.$api.httpPost(item.url, JSON.parse(data.postParas))
          setTimeout(() => {
            if (response.status === 1) {
              this.$notify({
                title: '成功',
                message: '平台下单成功',
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '失败',
                message: response.message,
                position: 'bottom-right'
              })
            }
            this.$refs.progress.dialogVisible = false
          }, 500)
        }
      }
    },
    watch: {
      // '$route': 'getPath'
      widgetData: 'watchWidgetData'
    }
  }
</script>

<style lang="scss" scoped>
  @import "./styles/list.scss";
  .el-checkbox {
    margin-right: 5px;
  }

  .order_list {
    width: 100%;
    margin: 20px auto;

    .order_list_top {
      width: 100%;
      height: 40px;
      background: #f4f3f8;
      display: flex;
      padding: 0 10px;

      .order_list_left {
        height: 100%;
        width: 32%;
        display: flex;
        align-items: center;

        span {
          font-size: 13px;
          color: #575962;
          margin: 0 5px;

          &:nth-child(2) {
            color: #5867dd;
          }
        }
      }

      .order_list_top_center {
        line-height: 40px;
        font-size: 13px;
        width: 23%;
        color: #6f727d;
      }

      .order_list_top_right {
        width: 45%;
        height: 100%;
        line-height: 40px;
        text-align: right;
        color: #575962;

        i {
          color: #5867dd;
        }
      }
    }

    .order_list_cont {
      width: 100%;
      height: 110px;
      display: flex;

      .order_list_cont_left {
        height: 100%;
        width: 32%;
        display: flex;
        padding: 15px 0;

        .img {
          width: 91px;
          height: 91px;
          margin: 0;
          border-radius: 3px;
          background: #5867dd;
        }

        .order_cont {
          height: 91px;
          margin-left: 15px;

          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            &:nth-child(1) {
              width: 100%;
              font-size: 14px;
              color: #333439;
            }

            &:nth-child(2) {
              color: #6f727d;
            }

            span {
              color: #34bfa3;
            }

            line-height: 20px;
          }

          .order_text {
            margin-top: 10px;
            display: inline-block;
            background: #ebedf2;
            color: #e83e8c;
            padding: 0 2px;
          }
        }
      }

      .order_list_cont_center {
        padding: 15px 0;
        margin-left: 6px;
        font-size: 16px;
        font-weight: 600;
        width: 35%;
        color: #6f727d;

        span {
          color: #575962;
          font-size: 16px;
          font-weight: 600;
          margin-right: 5px;
        }
      }

      .order_list_cont_right {
        padding: 15px 0;
        width: 33%;
        height: 100%;
        display: flex;

        div {
          width: 33%;
          height: 100%;
          border-left: 1px dashed #ebedf2;

          span {
            color: #2739c1;
          }

          p {
            height: 20px;
            line-height: 20px;
            text-align: center;
            color: #6f727d;
          }
        }

        .price {
          min-width: 110px;
          p {
            color: #6f727d;

            &:nth-child(1) {
              font-size: 18px;
              font-weight: 700;
              color: #f4516c;
            }

            &:nth-child(2) {
              margin-top: 2px;
              line-height: 20px;
            }
          }
        }

        .order {
          line-height: 20px;

          .button {
            background: #716aca;
            width: 55px;
            height: 20px;
            border-radius: 9px;
            color: #fff;
            margin: 0 auto;
          }

          p {
            color: #716aca;

            cursor: pointer;

            i {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
