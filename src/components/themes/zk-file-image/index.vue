<template>
  <div class="pc-zk-file-manage">
    <div class="text-imgsbox"></div>
    <div class="content-box">
      <div class="frame-head">
        <div class="reminder_intor"><i class="el-icon-warning"></i>可将图片拖拽至下方图片区域上传</div>
        <div class="rightinput">
          <div class="upload-demoss">
            <div class="bostudias">
              <a class="bostudias_a1">
                <span class="spanblock" @click="upload">
                  <i class="icon iconfont icon-xiangshangjiantou iconuparrow1"></i>上传</span>
                <div class="upload-box" v-if="uploadDialogVisible" ref="uploadbox">
                  <div class="tobu_box">
                    <div class="upload_top" @mousedown="drag($event)">
                      <i class="icon iconfont icon-ziyuan iconziyuan"></i>
                      多文件上传
                    </div>
                    <div class="floatright" @click="closeUploadForm">
                      <i class="icon iconfont zk-iconfontup"></i>
                    </div>
                  </div>
                  <div class="spring-blk">
                    <el-upload :action="$base.clientUploadApi()" :on-success="uploadSuccess" multiple :headers="headers">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <el-upload class="upload-demo" drag :action="$base.clientUploadApi()" multiple :on-success="uploadSuccess" :headers="headers">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <div class="show_uploadimg">
                      <div>
                        <img class="uploadimg_img" :src="$api.baseUrl()+imgItem" alt="" v-for="(imgItem,imgIndex) in uploadingImages" :key="imgIndex">
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a class="bostudias_a2">
                <i class="icon iconfont icon-shixiangxiajiantou- icon3"></i>
              </a>
            </div>
          </div>
          <el-input style='width:222px;' placeholder="搜索" prefix-icon="el-icon-search" v-model="searchModel.keyword" class="right_mar"></el-input>
          <el-button style='' @click.native="search(1)" type="primary" icon="search"> 搜索</el-button>
        </div>
      </div>
      <div class="piece_conter">
        <div class="piece_left" v-if="false">
          <ul>
            <li v-for="(leftlist,leftindex) in list" :key="leftindex"><i class="el-icon-menu iconlist"></i>{{leftlist.name}}</li>
          </ul>
        </div>
        <div class="image-text" ref="imagetext">
          <el-upload :action="$base.clientUploadApi()" drag multiple :on-success="uploadSuccess" :show-file-list="false">
            <ul class="image-text_ul" v-if="barTitleSelectIndex ===0" v-loading="loading">
              <li class="image-text_li" v-for="(itemImage,imageIndex) in imageListViewModel" :key="imageIndex" @click.stop="fromUpload(itemImage),selectImage(itemImage,imageIndex)" :class="{'textlihover':hoverIndex==imageIndex}">
                <div class="matter_box">
                  <div class="text-imgsbox"><img v-lazy="$api.baseUrl()+itemImage.path" /></div>
                </div>
                <div class="text-p">{{itemImage.name}}</div>
                <div class="remove_but">
                  <div class="but1" @click="copyImageUrl($base.clientHost()+itemImage.path)">复制</div>
                  <div class="but2" @click="deleteImage(itemImage.id)">删除</div>
                </div>
              </li>
            </ul>
          </el-upload>
        </div>
      </div>
      <div class="manage_pagina">
        <el-pagination background v-if="barTitleSelectIndex===0" :current-page="searchModel.pageIndex" @current-change="search" :page-size="searchModel.pageSize" @size-change="changeSearchSize" :page-sizes="[36, 100, 200, 500]" layout="total,prev, pager, next,sizes, jumper" :total="totalCount">
        </el-pagination>
      </div>
      <div class="management-foot">
        <div class="management-foot_text">图片服务器地址：{{$base.clientHost()}}</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="colseFileManger" type="primary" class="button">关 闭</el-button>
        </span>
      </div>
    </div>

  </div>
</template>
<script>

  import service from './service'
  import upload from './upload'
  export default {
    props: ['type', 'isTenant'],
    data () {
      return {
        uploadType: false,
        loading: false,
        barTitles: [], // 标题栏
        hoverIndex: null,
        barTitleSelectIndex: 0,
        systemBackGroundImageList: [],
        uploadingImages: [], // 正在上传的图片显示
        imageListViewModel: [],
        searchModel: {
          keyword: '',
          pageIndex: 1,
          pageSize: 36
        },
        totalCount: 0,
        uploadDialogVisible: false, // 是否显示图片上传

        imageUrl: '',
        headers: {

        }
      }
    },
    mounted () {
      this.init()
      if (!this.$api.isEmpty(this.$api.localGet('go-img'))) {
        this.uploadType = true
        this.$api.localRemove('go-img')
      }
    },
    methods: {
      chooseTitleBar (index) {
        this.barTitleSelectIndex = index
      },
      upload () {
        upload.upload(this)
      },
      fromUpload (val) {
        if (this.uploadType === true) {
          this.$bus.$emit('forImg', val.path)
        }
        this.imageUrl = val.path
        this.$emit('saveImage', this.imageUrl)
      },
      async init () {
        this.headers = {
          'zk-tenant': this.$api.tenant()
        }
        service.init(this)
        await service.search(this)
      },
      async search (pageIndex) {
        this.searchModel.pageIndex = pageIndex
        this.imageListViewModel = []
        await service.search(this)
      },
      async changeSearchSize (pageSize) {
        this.searchModel.pageSize = pageSize
        await this.search(1)
      },
      uploadSuccess (res, file) {
        if (res.status === 1) {
          this.$message.success('上传成功')
          this.uploadingImages.push(res.result.path)
          this.init()
        } else {
          this.$message.error('上传失败，请重新上传')
        }
      },
      closeUploadForm () {
        this.uploadDialogVisible = false
      },
      // 选择图片
      selectImage (listchen, Indeximg) {
        this.hoverIndex = Indeximg
      },
      // 拖动文件上传框
      drag (e) {
        upload.drag(this, e)
      },
      async deleteImage (id) {
        service.delete(this, id)
      },
      copyImageUrl (url) {
        service.copyImageUrl(this, url)
      },
      colseFileManger () {
        this.$emit('fileManagerClose', false)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>

