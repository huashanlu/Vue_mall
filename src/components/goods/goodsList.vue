<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="#/" class="router-link-active">首页</a> &gt;
        <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div class="left-220" style="margin: 0px;">
            <div class="banner-nav">
              <ul>
                <li v-for="item of goodsList.catelist" :key="item.id">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span v-for="subitem of item.subcates" :key="subitem.id">
                        {{subitem.title}}&nbsp;
                      </span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <a v-for="subitem2 of item.subcates" :key="subitem2.id" href="#">{{subitem2.title}}</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <el-carousel :interval="4000" type="card" height="340px">
                <el-carousel-item v-for="item in goodsList.sliderlist" :key="item.id">
                  <img :src="item.img_url" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for="(item,index) of goodsList.toplist" :key="item.id">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time | moment('YYYY-MM-DD')}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-for="item of goodsGroupList" :key="item.level1cateid" class="section">
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a v-for="subitem of item.level2catelist" :key="subitem.subcateid" href="#">{{subitem.subcatetitle}}</a>
          <a href="/goods/40.html">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="subitem of item.datas" :key="subitem.artID">
              <router-link :to="'/site/goodsinfo/'+subitem.artID" class="">
                <div class="img-box">
                  <img v-lazy="subitem.img_url">
                </div>
                <div class="info">
                  <h3>{{subitem.artTitle}}</h3>
                  <p class="price">
                    <b>{{subitem.sell_price}}</b>元</p>
                  <p>
                    <strong>库存 {{subitem.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{subitem.market_price}}</s>
                    </span>
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  // import axios from "axios";
  export default {
    data() {
      return {
        goodsList: {},
        goodsGroupList: []
      };
    },
    created() {
      this.getGoodsListData();
      this.getGoodsGroupData();
    },
    methods: {
      getGoodsListData() {
        const url = "site/goods/gettopdata/goods";
        this.$axios.get(url).then(
          res => {
            console.log(res.data.message);
            this.goodsList = res.data.message;
          },
          err => console.log(err)
        );
      },
      getGoodsGroupData() {
        const url = "site/goods/getgoodsgroup";
        this.$axios.get(url).then(
          res => {
            this.goodsGroupList = res.data.message;
          },
          err => console.log(err)
        );
      }
    }
  };
</script>