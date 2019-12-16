<template>
  <div class="upload_box">
    <!-- <el-input v-model="currentValue" placeholder="请输入内容" :disabled="true"></el-input> -->
    <div class="picture" v-if="currentValue">
      <img :src="currentValue" class="value_images" />
      <div class="masking">
        <i class="el-icon-zoom-in" @click="imgesVisible=true"></i>
        <i class="el-icon-edit-outline" @click="selectImg"></i>
      </div>
      <el-dialog title="图标预览" :visible.sync="imgesVisible" width="60%" top="10vh" :modal="false">
        <div class="dialog_box">
          <img :src="currentValue" alt="">
        </div>
      </el-dialog>
    </div>
    <div v-if="!currentValue" class="select_img" @click="selectImg">
      <i class="el-icon-plus"></i>
    </div>
    <el-dialog title="图标管理" :fullscreen="false" :modal="false" :visible.sync="dialogFormVisible">
      <zk-iconmanagement @clickImg="select"></zk-iconmanagement>
    </el-dialog>
  </div>

</template>

<script>


  export default {
    props: {
      value: {}
    },
    data () {
      return {
        input: '',
        clientHost: '',
        currentValue: '',
        imageUrl: '',
        dialogVisible: false,
        isObj: false,
        dialogFormVisible: false,
        imgesVisible: false
      }
    },
    computed: {
    },
    watch: {
      currentValue (val) {
        this.$emit('input', val)
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      selectImg () {
        this.dialogFormVisible = true
      },
      select (value) {
        this.dialogFormVisible = false
        this.currentValue = this.$api.baseUrl() + value.path
      },
      init () {
        if (!this.$api.isEmpty(this.value)) {
          this.currentValue = this.$api.baseUrl() + this.value
        }
      }
    }
  }
</script>

<style  lang="scss" scoped>
  @import "src/assets/style/theme.scss";
  @import "src/assets/style/mixins.scss";

  .upload_box {
    width: 100%;
    display: flex;
    .picture {
      width: 70px;
      height: 70px;
      border-radius: 4px;
      margin-right: 10px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      .value_images {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
      .masking {
        display: none;
        width: 70px;
        height: 70px;
        text-align: center;
        line-height: 70px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0px;
        left: 0px;
        i {
          font-size: 18px;
          color: #ffffff;
        }
        i:nth-child(2) {
          margin-left: 5px;
        }
      }
      &:hover .masking {
        display: block;
      }
      .el-dialog__body {
        max-height: 70vh;
        width: 100%;
        .dialog_box {
          width: 100%;
          height: 100%;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
  .select_img {
    cursor: pointer;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    border: 1px dotted #716aca;
    text-align: center;
    line-height: 100px;
    font-size: 18px;
  }
  .upload_item-box {
    padding: 10px;

    img {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .upload_dialog {
    .el-dialog {
      height: 75vh !important;
    }
  }
</style>
