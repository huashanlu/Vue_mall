<template>
  <div>
    <div>
      <div class="section">
        <div class="location">
          <span>当前位置：</span>
          <a href="javascript:;">首页</a> &gt;
          <router-link to="/site/goodsList">购物商城</router-link> &gt;
          <a href="javascript:;" v-if="goodsData.goodsinfo">{{goodsData.goodsinfo.title}}</a>
        </div>
      </div>
      <div class="section">
        <div class="wrapper clearfix">
          <div class="wrap-box">
            <div class="left-925">
              <div class="goods-box clearfix">
                <div class="pic-box">
                  <div class="magnifier" id="magnifier1">
                    <div class="magnifier-container">
                      <div class="images-cover"></div>
                      <!--当前图片显示容器-->
                      <div class="move-view"></div>
                      <!--跟随鼠标移动的盒子-->
                    </div>
                    <div class="magnifier-assembly">
                      <div class="magnifier-btn">
                        <span class="magnifier-btn-left">&lt;</span>
                        <span class="magnifier-btn-right">&gt;</span>
                      </div>
                      <!--按钮组-->
                      <div class="magnifier-line">
                        <ul class="clearfix animation03">
                          <li v-for="item in goodsData.imglist" :key="item.id">
                            <div class="small-img">
                              <img :src="item.thumb_path" />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!--缩略图-->
                    </div>
                    <div class="magnifier-view"></div>
                    <!--经过放大的图片显示容器-->
                  </div>
                </div>
                <div class="goods-spec" v-if="goodsData.goodsinfo">
                  <h1>{{goodsData.goodsinfo.title}}</h1>
                  <p class="subtitle">{{goodsData.goodsinfo.sub_title}}</p>
                  <div class="spec-box">
                    <dl>
                      <dt>货号</dt>
                      <dd id="commodityGoodsNo">{{goodsData.goodsinfo.goods_no}}</dd>
                    </dl>
                    <dl>
                      <dt>市场价</dt>
                      <dd>
                        <s id="commodityMarketPrice">¥{{goodsData.goodsinfo.market_price}}</s>
                      </dd>
                    </dl>
                    <dl>
                      <dt>销售价</dt>
                      <dd>
                        <em id="commoditySellPrice" class="price">¥{{goodsData.goodsinfo.sell_price}}</em>
                      </dd>
                    </dl>
                  </div>
                  <div class="spec-box">
                    <dl>
                      <dt>购买数量</dt>
                      <dd>
                        <div class="stock-box">
                          <div class="el-input-number el-input-number--small">
                            <span role="button" class="el-input-number__decrease is-disabled">
                              <i class="el-icon-minus"></i>
                            </span>
                            <span role="button" class="el-input-number__increase">
                              <i class="el-icon-plus"></i>
                            </span>
                            <div class="el-input el-input--small">
                              <el-input-number v-model="purchaseQuantity" size="small" :min="1" :max="10" label="描述文字"></el-input-number>
                            </div>
                          </div>
                        </div>
                        <span class="stock-txt">
                          库存
                          <em id="commodityStockNum">{{goodsData.goodsinfo.stock_quantity}}</em>件
                        </span>
                      </dd>
                    </dl>
                    <dl>
                      <dd>
                        <div id="buyButton" class="btn-buy">
                          <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                          <button ref="addToShopCartBtnRef" @click="addToShopCart" class="add">加入购物车</button>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div id="goodsTabs" class="goods-tab bg-wrap">
                <Affix>
                  <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                    <ul>
                      <li @click="isShowComment=false">
                        <a href="javascript:;" :class="isShowComment?'':'selected'">商品介绍</a>
                      </li>
                      <li @click="isShowComment=true">
                        <a href="javascript:;" :class="isShowComment?'selected':''">商品评论</a>
                      </li>
                    </ul>
                  </div>
                </Affix>
                <div class="tab-content entry" style="display: block;" v-show="!isShowComment" v-html="goodsData.goodsinfo.content" v-if="goodsData.goodsinfo">
                </div>
                <div class="tab-content" style="display: block;" v-show="isShowComment">
                  <div class="comment-box">
                    <div id="commentForm" name="commentForm" class="form-box">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="conn-box">
                        <div class="editor">
                          <textarea ref="commentContentRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                          <span class="Validform_checktip"></span>
                        </div>
                        <div class="subcon">
                          <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="postComment()">
                          <span class="Validform_checktip"></span>
                        </div>
                      </div>
                    </div>
                    <ul id="commentList" class="list-box" v-if="commentData.message">
                      <p v-if="commentData.totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                      <li v-for="item of commentData.message" :key="item.id">
                        <div class="avatar-box">
                          <i class="iconfont icon-user-full"></i>
                        </div>
                        <div class="inner-box">
                          <div class="info">
                            <span>{{item.user_name}}</span>
                            <span>{{item.add_time | moment('YYYY-MM-DD')}}</span>
                          </div>
                          <p>{{item.content || "评论为空"}}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPageIndex" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="commentData.totalcount">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="item in goodsData.hotgoodslist" :key="item.id">
                    <div class="img-box">
                      <router-link :to="'/site/goodsinfo/'+item.id" class="">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link :to="'/site/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                      <span>{{item.add_time | moment('YYYY-MM-DD')}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 被动画元素 -->
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
      <div id="animationImgId" v-show="isShowAnimaPic">
        <img v-if="goodsData.imglist" :src="goodsData.imglist[0].thumb_path" alt="">
      </div>
    </transition>
  </div>
</template>

<style>
/*导入图片放大镜的css*/
@import "../../statics/site/js/jqueryplugins/jqimgzoom/css/magnifier.css";

/*飞入购物车动画样式*/
#animationImgId {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0;
  top: 0;
  transition: all .5s ease-in-out;
}
#animationImgId img {
  width: 100%;
  height: 100%;
}
</style>


<script>
//导入图片放大镜的js
import "../../statics/site/js/jqueryplugins/jqimgzoom/js/magnifier.js";
//按需引入iview-Affix
import { Affix } from "iview";

export default {
  data() {
    return {
      purchaseQuantity: 1, //购买数量
      goodsData: {},
      isShowComment: false,
      currentPageIndex: 1,
      pageSize: 5,
      commentData: {},
      isShowAnimaPic: false,
      animationPicBeginOffset: null,
      animationPicEndOffset: null
    };
  },
  created() {
    this.getProductInfo();
    this.getCommentData();
  },
  watch: {
    purchaseQuantity(newVlaue, oldValue) {
      if (newVlaue == undefined || newVlaue <= 1) {
        console.log(newVlaue);
        this.purchaseQuantity = 1;
      }
    },
    $route(newVlaue, oldValue) {
      this.getProductInfo();
      this.purchaseQuantity = 1;
    }
  },
  methods: {
    getProductInfo() {
      setTimeout(() => {
        this.$refs.commentContentRef.value = "";
      }, 500);
      this.isShowComment = false;
      this.getCommentData();
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`;
      this.$axios.get(url).then(
        res => {
          // console.log(res);
          this.goodsData = res.data.message;
          // console.log(this.goodsData);
          //初始化图片放大镜
          setTimeout(() => {
            //因为图片是异步加载的，虽然现在ajax的数据回来了，但是图片还没加载
            //所以需要延时等图片加载出来之后再初始化放大镜
            $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
          }, 800);

          setTimeout(() => {
            this.animationPicBeginOffset = $(
              this.$refs.addToShopCartBtnRef
            ).offset();
            // this.animationPicEndOffset = $(this.$refs.shopCartRef).offset();
            this.animationPicEndOffset = $("#shoppingCartCount").offset();

            $("#animationImgId").css({
              left: this.animationPicBeginOffset.left + "px",
              top: this.animationPicBeginOffset.top + "px"
            });
          }, 200);
        },
        err => document.write(err)
      );
    },
    getCommentData() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.currentPageIndex}&pageSize=${this.pageSize}`;
      this.$axios.get(url).then(res => {
        // console.log(res.data);
        this.commentData = res.data;
      });
    },
    handleSizeChange(val) {
      this.currentPageIndex = 1;
      this.pageSize = val;
      this.getCommentData();
    },
    handleCurrentChange(val) {
      this.currentPageIndex = val;
      this.getCommentData();
    },
    postComment() {
      let commentContent = this.$refs.commentContentRef.value;
      // console.log(commentContent);
      const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      }`;
      this.$axios
        .post(url, {
          commenttxt: commentContent
        })
        .then(res => {
          this.$refs.commentContentRef.value = "";
          this.currentPageIndex = 1;
          this.getCommentData();
        });
    },
    addToShopCart() {
      this.isShowAnimaPic = true;
      //准备好载荷
      const goodsObj = {
        goodsId: this.$route.params.goodsId,
        count: this.purchaseQuantity
      };
      // console.log(goodsObj);
      this.$store.commit('addGoods', goodsObj);
    },
    //动画钩子
    beforeEnter(el) {
      el.style.left = `${this.animationPicBeginOffset.left}px`;
      el.style.top = `${this.animationPicBeginOffset.top}px`;
      el.style.opacity = 1;
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.left = `${this.animationPicEndOffset.left}px`;
      el.style.top = `${this.animationPicEndOffset.top}px`;
      el.style.opacity = 0.5;
      done();
    },
    afterEnter() {
      this.isShowAnimaPic = false;
    }
  },
  components: {
    //注册本组件中需要用到的子组件
    Affix
  }
};
</script>