<template>
  <div class="user-card">
    <img src='http://localhost:1800//wwwroot/static/images/GradeIcon/User03.png' alt='黄金会员' />
    <div class="user-card-detail">
      <a title='admin(老板) 等级:黄金会员' href='/Admin/User/Edit?id=1'>admin(老板)</a>
      <span>黄金会员</span>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        text: `<span>正常</span> `
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .user-card {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0;
    margin: 0;
    img {
      width: 40px;
      height: 40x;
      margin: 0px;
      margin-right: 0.5rem;
    }
    a {
      display: block;
      font-size: 1.1rem;
      font-weight: bold;
      line-height: 1.5rem;
      color: #7b7e8a;
    }
    span {
      margin-top: 3px;
      display: inline-block;
      font-size: 0.9rem;
      line-height: 1rem;
      color: #7b7e8a;
      font-weight: 100;
      background-blend-mode: color-dodge;
    }
  }
</style>
