
<template>
  <div>
    <div v-if="type === 'number-item'">
      <template>
        <div class="item" :style="{background:widget.bgcolor}">
          <div class="item-box" :style="'color:'+widget.fontColor+';'">
            <span class="item-count">{{widgetValue}}</span>
            <span class="item-title">{{widget.name}}</span>
            <i class="icon iconfont " :class="widget.icon.name"></i>
          </div>
          <router-link to="">
            <p class="item-more">更多<i class="el-icon-arrow-right"></i></p>
          </router-link>
        </div>
      </template>
    </div>
    <div v-if="type === 'tabs-item'">
      <template>
        <div class="item" :style="{background:widget.color}">
          <div>
            <div class="item-header">
              <p>{{widget.name}}</p>
            </div>
            <div class="item-body">
              <span>{{widgetValue}}</span>
            </div>
            <div class="item-footer">
              <span>{{widgetValue}}</span>
              <p>{{widget.intro}}</p>
            </div>
            <p class="item-tip">
              <i class="icon iconfont" :style="'color:'+widget.icon.iconSecondColor" :class="widget.icon.name"></i>
            </p>
          </div>
        </div>
      </template>
    </div>
    <div v-if="type === 'amount-item'">
      <template>
        <div class="item">
          <div>
            <h5 class="count" :style="{color:widget.color}">{{widget.name}}</h5>
            <span class="splitLine" />
            <p class="title">{{widget.intro}}</p>
          </div>
        </div>
      </template>
    </div>
    <div v-if="type === 'mount-item'">
      <template>
        <div class="item">
          <div class="item-icon" :style="{background:widget.color}">
            <i class="icon iconfont" :class="widget.icon.name"></i>
          </div>
          <div class="item-info">
            <div class="item-title" :style="{color:widget.color}">{{widget.name}}</div>
            <span class="item-count">{{widget.intro}}</span>
          </div>
        </div>
      </template>
    </div>
    <div v-if="type === 'general-item'">
      <template>
        <div class="item" :class="[{'item--easy':discount}]">
          <div class="general-item-icon" :style="{color:widget.color}">
            <i class="icon iconfont" :class="widget.icon.name"></i>
          </div>
          <div class="item-info">
            <span>{{widget.name}}</span>
            <div class="count" :style="{color:widget.color}">{{widget.intro}}</div>
          </div>
        </div>
      </template>
    </div>
    <div v-if="type === 'growing-item'">
      <template>
        <div class="m-widget24__item">
          <h4 class="m-widget24__titles">
            {{widget.name}}
          </h4><br>
          <span class="m-widget24__desc">
            {{widget.intro}}
          </span>
          <span class="m-widget24__stats m--font-brand" :style="{color:widget.fontColor}">
            ￥<single-value :widget="widgetValue" :color="widget.fontColor" :size="20" :fontWeight="600"></single-value>
          </span>
          <div class="m--space-10"></div>
          <div class="progress m-progress--sm">
            <div class="progress-bar m--bg-brand" :style="'width:'+(widget.subValue.condition.value/widget.value.condition.value)*100+'%;'+'background:'+widget.color+';'"></div>
          </div>
          <div class="numerical-value">
            <div class="numerical-value_text">已使用{{widget.subValue.condition.value}}元</div>
            <div class="m-widget24__numbers" v-if="widget.subValue.condition.value!=0&&widget.value.condition.value!=0">
              {{(widget.subValue.condition.value/widget.value.condition.value*100).toFixed(2)}}%
            </div>
            <div class="m-widget24__numbers" v-else>
              0.00%
            </div>
          </div>
        </div>
      </template>
    </div>
    <div v-if="type === 'introduce-item'">
      <template>
        <span class="m-widget12__text1">{{widget.name}}<br><span>{{widgetValue}}</span></span>
        <span class="m-widget12__text2">{{widget.intro}}<br><span>{{widgetValue}}</span></span>
      </template>
    </div>
    <div v-if="type === 'member-item'">
      <template>
        <div class="row m-row--no-padding align-items-center">
          <div class="col">
            <h3 class="m-widget1__title">{{widget.name}}</h3>
            <span class="m-widget1__desc">{{widget.intro}}</span>
          </div>
          <div class="col m--align-right">
            <span class="m-widget1__number m--font-brand" :style="{color:widget.color}">{{widgetValue}}</span>
          </div>
        </div>
      </template>
    </div>
    <div v-if="type === 'ratio-item'">
      <template>
        <div class="item">
          <div>
            <div class="item-header">
              <div class="item-count" v-text="widgetValue+'%'"></div>
              <div class="item-title" v-text="widget.name"></div>
            </div>
            <el-progress :stroke-width="8" :percentage="Number(widgetValue)" :color="widget.color" :show-text="false">
            </el-progress>
          </div>
        </div>
      </template>
    </div>
    <div v-if="type === 'states-item'">
      <template>
        <span class="m-widget25__progress-number">
          {{widget.name}}
        </span>
        <div class="m--space-10"></div>
        <div class="progress m-progress--sm">
          <div class="progress-bar m--bg-danger" role="progressbar" :style="{width: widget.value.condition.value+'%;',background:widget.color}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <span class="m-widget25__progress-sub">
          {{widget.intro}}必须不能保存云
        </span>
      </template>
    </div>
    <div v-if="type === 'total-item'">
      <template>
        <div class="m-widget4__ext">
          <span class="m-widget4__icon m--font-brand">
            <i class="icon iconfont" :class="widget.icon.name"></i>
          </span>
        </div>
        <div class="m-widget4__info">
          <span class="m-widget4__text">
            {{widget.name}}
          </span>
        </div>
        <div class="m-widget4__ext">
          <span class="m-widget4__number m--font-info">
            {{widget.value.condition.value}}
          </span>
        </div>
      </template>
    </div>
    <div v-if="type === 'omit-item'">
      <template>
        <div class="omit-item_list-box">
          <div class="omit-item_left">
            <div class="omit-item_title">{{widget.name}}</div>
            <div class="omit-item_intro">{{widget.intro}}</div>
          </div>
          <div class="omit-item_right" :style="'color:'+widget.fontColor+';'">{{widgetValue}}</div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import actions from './actions'
  import props from './props'
  export default {
    props,
    data () {
      return {
        widgetValue: 0,
        discount: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var data = await actions.service(this, this.widget)
        if (data === 0) {
          this.widgetValue = data
        } else {
          this.widgetValue = 0
          if (data > 0) {
            this.widgetValue = data - 500
          } else {
            this.widgetValue = data + 500
          }
          var timer = setInterval(() => {
            if (this.widgetValue === data) {
              clearInterval(timer)
            } else {
              if (data > 0) {
                this.widgetValue++
              } else {
                this.widgetValue--
              }
            }
          }, 5)
        }
      }
    }
  }
</script>
