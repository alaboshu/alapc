<template>
  <div class="zk-management" v-loading="loading">
    <div class="upload">
      <div class="upload_search">
        <el-input v-model="searchInput" placeholder="请输入搜索内容"></el-input>
        <div class="search_button" @click="searchData">搜 索</div>
      </div>
      <div class="u-btn" @click="showUpload=!showUpload">
        上传
      </div>
    </div>
    <div class="upload-box" v-show="showUpload">
      <div class="tobu_box">
        <div class="upload_top">
          <i class=" glyph-icon flaticon-multimedia-1"></i>
          多文件上传
        </div>
        <div class="upload_close" @click="showUpload=false">
          <i class=" glyph-icon flaticon-cancel"></i>
        </div>
      </div>
      <div class="select">
        <div>
          <el-upload :action="$api.baseUrl()+'/api/common/upload'" :on-success="handleAvatarSuccess" multiple>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div>
            <div>
              <img class="uploadimg_img" :src="imgItem" alt="" v-for="(imgItem,imgIndex) in uploadShowImg" :key="imgIndex">
            </div>
          </div>
          <el-upload drag :action="$api.baseUrl()+'/api/common/upload'" multiple :on-success="handleAvatarSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="file_iamge_Tips">请双击选择您所需要的图片！</div>
    <div class="file_image_cont">
      <ul>
        <li @dblclick="clickItem(item, index)" class="file_iamge_list" :class="{activeBg: imgResponseIndex === index}" v-for="(item, index) in imgResponse.result" :key="index">
          <div class="file_iamge">
            <img :src="$api.baseUrl()+item.path" alt="" srcset="">
          </div>
          <div class="file_iamge_text">{{item.name}}</div>
          <div class="file_iamge_button">
            <div @click="onCopy(item.path)">复制</div>
            <div @click="deleteList(item.id)">删除</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="file_iamge_foot">
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :page-size="imgResponse.pageSize" layout="prev, pager, next, jumper" :total="imgResponse.pageCount*imgResponse.pageSize">
        </el-pagination>
      </div>
      <div class="button">
        <div @click="closeData">取消</div>
        <div @click="clickImg(data)">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showUpload: false,
        uploadShowImg: [],
        imgResponse: [],
        imgResponseIndex: '',
        searchInput: '',
        loading: true
      }
    },
    mounted () {
      this.init(1)
    },
    methods: {
      async init (pageIndex) {
        var para = {
          pageSize: 18,
          pageIndex
        }
        var imgResponse = await this.$api.httpGet('Api/StorageFile/QuerypageList', para)
        if (imgResponse.status === 1) {
          this.imgResponse = imgResponse.result
          this.listData = imgResponse.result.result
          this.loading = false
        }
      },
      clickImg (value) {
        this.$emit('clickImg', value)
      },
      closeData () {
        this.$emit('closeData')
      },
      handleAvatarSuccess (res, file) {
        if (res.status === 1) {
          this.uploadShowImg = res.result.path
          this.init()
        }
      },
      handleCurrentChange (val) {
        this.init(val)
      },
      clickItem (item, index) {
        this.imgResponseIndex = index
        this.data = item
      },
      searchData () {
        var list = []
        this.listData.forEach(element => {
          if (element.name.indexOf(this.searchInput) > -1) {
            list.push(element)
          }
        })
        this.imgResponse.result = list
      },
      onCopy (val) {
        let url = this.$api.baseUrl() + val
        let oInput = document.createElement('input')
        oInput.value = url
        document.body.appendChild(oInput)
        oInput.select() // 选择对象
        document.execCommand('Copy')
        this.$message({
          message: '已成功复制图片地址',
          type: 'success'
        })
      },
      deleteList (id) {
        this.$confirm('此操作将永久删除该文件，是否继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async () => {
          var res = await this.$api.httpDelete('api/StorageFile/querydelete', { id })
          if (res.status === 1) {
            this.$crud.message(this, res)
            this.init()
          }
        }).catch()
      }
    }
  }
</script>

<style lang="scss">
  @import "./var.scss";
</style>

