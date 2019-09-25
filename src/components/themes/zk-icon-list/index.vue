<template>
    <ul class="zk-icon-list">
        <li class="zk-icon-list-cont" v-for="item in list" :key="item">
            <img src="http://statics.76sd.com//data/files/img/20190308/5c815802bc196.png" class="img" alt="">
            <div class="cont-text">
                <p>全网影视VIP引流卡</p>
                <p>预期价格：<span>￥33.0元</span></p>
                <ul class="cont-text-border">
                    <li class="cont-text-border-list">这就是爱</li>
                    <li class="cont-text-border-list">这就是爱</li>
                    <li class="cont-text-border-list">这就是爱</li>
                    <li class="cont-text-border-list">这就是爱</li>
                </ul>
                <p>发布于广东省深圳市宝安区</p>
            </div>
            <div class="HeadPortrait">
                <img src="http://statics.76sd.com//data/files/recommend/20181126/small_5bfbbcdbbc312.png" class="HeadPortrait-img" alt="">
                <p>这就是你</p>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data () {
        return {
            list: [1, 2, 3, 4]
        }
    }
}
</script>



<style lang="scss" scoped>
@import '~./var.scss'
</style>
