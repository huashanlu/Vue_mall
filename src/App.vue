<template>
  <div>
    <!--顶部  -->
    <div class="header">
      <!-- 1.0 导航栏头部 -->
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>Vue买买买</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <span v-show="!isLogin">
              <router-link to="/site/login">登录</router-link>
              <strong>|</strong>
              <a href="javascript:;" class="">注册</a>
              <strong>|</strong>
            </span>
            <span v-show="isLogin">
              <router-link to="/site/vipCenter" href="javascript:;" class="">会员中心</router-link>
              <strong>|</strong>
              <a href="javascript:;" @click="doLogout">退出</a>
              <strong>|</strong>
            </span>
            <router-link to="/site/shopping-cart" class="">
              <i class="iconfont icon-cart"></i>购物车(
              <span id="shoppingCartCount" ref="shopCartRef">
                <span>{{$store.getters.getBuyCount}}</span>
              </span>)</router-link>
          </div>
        </div>
      </div>
      <!-- 2.0 导航条 -->
      <div class="head-nav">
        <div class="section">
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="#" class="">
                  <span class="out" style="top: 0px;">首页</span>
                </a>
              </li>
              <li class="news">
                <a href="#" class="">
                  <span class="out" style="top: 0px;">每日精选</span>
                </a>
              </li>
              <li class="photo">
                <a href="#" class="">
                  <span class="out" style="top: 0px;">秒杀专区</span>
                </a>
              </li>
              <li class="video">
                <a href="#" class="">
                  <span class="out" style="top: 0px;">Vue超市</span>
                </a>
              </li>
              <li class="down">
                <a href="#" class="">
                  <span class="out" style="top: 0px;">会员权益</span>
                </a>
              </li>
              <li class="goods">
                <router-link to="/site/goodsList" class="router-link-exact-active ">
                  <span class="out" style="top: 0px;">购物商城</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
            </div>
            <a href="javascript:;">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 组件占位 -->
    <router-view class="router-view-bg"></router-view>

    <!--底部 -->
    <div class="footer">
      <div class="section">
        <div class="foot-nav">
          <a href="">关于我们</a>
          <strong>|</strong>
          <a href="">联系我们</a>
          <strong>|</strong>
          <a href="">联系客服</a>
          <strong>|</strong>
          <a href="">合作招商</a>
          <strong>|</strong>
          <a href="">商家帮助</a>
          <strong>|</strong>
          <a href="">营销中心</a>
          <strong>|</strong>
          <a href="">隐私政策</a>
        </div>
        <div class="foot-box">
          <div class="copyright">
            <p>版权所有： 刘维 — Vue买买买 </p>
            <p>公司地址： 广东省深圳市 XXX 维哥家里</p>
            <p>联系电话：18680380770</p>
            <p class="gray">Copyright © 2009-2018 VictorLiu Corporation,All Rights Reserved.</p>
          </div>
          <div class="service">
            <p>周一至周日 9:00-24:00</p>
            <a href="#">
              <i class="iconfont icon-phone"></i>在线客服</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- scoped表示私有样式 -->
<style scoped>
@import "./statics/site/js/jqueryplugins/hoverNav/css/style.css";
.router-view-bg {
  background-color: #f5f5f5;
}
</style>

<script>
//导入公共Vue对象
import { bus, ISLOGIN } from "./commom/common_vue.js";

export default {
  //  module.export = function () {}  导出一个和当前组件匹配的Vue实例
  data() {
    return {
      isLogin: false
    };
  },
  created() {
    //接收goodsinfo.vue传过来的数据
    bus.$on("ISLOGIN", isLogin => {
      this.isLogin = isLogin;
    });
    //请求一次登录状态
    const url = "site/account/islogin";
    this.$axios.get(url).then(res => {
      if (res.data.code == "nologin") {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
  },
  methods: {
    doLogout() {
      const url = "site/account/logout";
      this.$axios.get(url).then(res => {
        if (res.data.message == "用户已注销") {
          this.$message({
            message: "已退出登录",
            type: "warning"
          });
          this.isLogin = false;
          this.$router.push({ path: "/" });
        }
      });
    }
  },
  mounted() {
    $("#menu2 li a").wrapInner('<span class="out"></span>');
    $("#menu2 li a").each(function() {
      $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
    });
    $("#menu2 li a").hover(
      function() {
        $(".out", this)
          .stop()
          .animate(
            {
              top: "48px"
            },
            300
          ); // move down - hide
        $(".over", this)
          .stop()
          .animate(
            {
              top: "0px"
            },
            300
          ); // move down - show
      },
      function() {
        $(".out", this)
          .stop()
          .animate(
            {
              top: "0px"
            },
            300
          ); // move up - show
        $(".over", this)
          .stop()
          .animate(
            {
              top: "-48px"
            },
            300
          ); // move up - hide
      }
    );
  }
};
</script>