<template>
  <div id="a">
    <div class="zk-grid-list">
      <div class="container">
        <div class="all_box" v-for="(allbox,allboxIndex) in 2" :key="allboxIndex">
          <div class="grid_list_card">
            <img src="https://img.alicdn.com/tfs/TB1BrULnL9TBuNjy0FcXXbeiFXa-300-350.png" class="bg_img">
            <div class="side_content">
              <div class="modal"></div>
              <div class="info">
                <header>
                  <div class="header_content">
                    <h2>女装</h2>
                    <p>时尚尖货</p>
                    <p>潮流速递</p>
                  </div>
                </header>
                <div class="dot"></div>
                <ul class="grid-tag">
                  <li v-for="(item,index) in contentList" :key="index">{{item}}</li>
                </ul>
              </div>
            </div>
            <ul class="bg_tag">
              <li v-for="(item,index) in cardTagList" :key="index">{{item}}</li>
            </ul>
          </div>
          <ul class="content_right">
            <li v-for="(item,index) in cardRightList" :key="index">
              <p>{{item.name}}</p>
              <p>{{item.text}}</p>
              <img :src="item.img" :alt="item.name">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        contentList: ['新品', '卫衣', '牛仔裤', '雪纺衫', '更多专场'],
        cardTagList: ['新品', '0成本库存', '商家排行'],
        cardRightList: [
          {
            'name': '学步鞋',
            'text': '实力好货',
            'img': 'https://cbu01.alicdn.com/img/ibank/2018/736/519/8822915637.jpg'
          },
          {
            'name': '优质商家',
            'text': '淘宝好货',
            'img': 'https://cbu01.alicdn.com/img/ibank/2018/518/303/9559303815.jpg'
          },
          {
            'name': '学步鞋',
            'text': '实力好货',
            'img': 'https://cbu01.alicdn.com/img/ibank/2018/736/519/8822915637.jpg'
          },
          {
            'name': '优质商家',
            'text': '淘宝好货',
            'img': 'https://cbu01.alicdn.com/img/ibank/2018/380/783/9581387083.jpg'
          }
        ]
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      }
    }
  }
</script>
