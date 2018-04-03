<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1.</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2.</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3.</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="center">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-for="item of goodsList" :key="item.id">
                  <td width="48" align="center">
                    <el-switch v-model="item.isSelected" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                  </td>
                  <td align="left" colspan="2">
                    <div class="goods-info">
                      <img :src="item.img_url" alt="">
                      <span>{{item.title}}</span>
                    </div>
                  </td>
                  <td width="84" align="left">{{item.sell_price}}</td>
                  <td width="104" align="center">
                    <vcounter :initCount="item.buyCount" :goodsId="item.id" @countChange="getCountChange"></vcounter>
                  </td>
                  <td width="104" align="center">{{item.sell_price * item.buyCount}}(元)</td>
                  <td width="54" align="center">
                    <a href="javascript:void(0)" @click="deletGoods(item.id)">删除</a>
                  </td>
                </tr>

                <tr>
                  <td colspan="10">
                    <div class="msg-tips" v-if="goodsList.length==0">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{calcTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{calcTotalPrice}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" @click="continueBuy">继续购物</button>
              <button class="submit" @click="goToOrder">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.goods-info {
  /* text-align: left; */
  display: flex;
  padding-left: 10px;
  align-items: center;
}
.goods-info img {
  width: 50px;
  height: 50px;
  margin: 0 10px;
}
</style>


<script>
//按需导入操作localStorage的模块
import { getLocalGoods, getTotalCount } from "../../commom/localStorageHelper.js";
//导入counter子组件
import vcounter from "../subcomponents/v-counter.vue";

export default {
  data() {
    return {
      goodsList: []
    };
  },
  computed: {
    calcTotalCount() {
      let totalCount = 0;
      this.goodsList.forEach(item => {
        if (item.isSelected) totalCount += item.buyCount;
      });
      return totalCount;
    },
    calcTotalPrice() {
      let totalPrice = 0;
      this.goodsList.forEach(item => {
        if (item.isSelected) totalPrice += item.buyCount * item.sell_price;
      });
      return totalPrice;
    }
  },
  created() {
    this.getGoodsListData();
  },
  methods: {
    getGoodsListData() {
      //获取loaclStorage中存储的对象
      const localGoods = getLocalGoods();
      const keys = [];
      for (const key in localGoods) {
        keys.push(key);
      }
      //做一下判断，如果一个都没有，就没必要去后台请求
      if (keys.length == 0) return;
      const url = `site/comment/getshopcargoods/${keys.join(",")}`;
      this.$axios.get(url).then(res => {
        //将服务器返回的数据中的购买数量改为实际本地存储的数量
        res.data.message.forEach(item => {
          item.buyCount = localGoods[item.id];
          item.isSelected = true;
        });
        this.goodsList = res.data.message;
        // console.log(this.goodsList);
      });
    },
    //获取子组件传过来的数据
    getCountChange(goodsObj) {
      // console.log(goodsObj);
      //利用计算属性更新总数量和总价格
      this.goodsList.forEach(item => {
        // console.log(item.id, item.buyCount);
        if (item.id == goodsObj.goodsId) {
          item.buyCount = goodsObj.count;
        }
      });
      //还需要更新localStorage和vuex中的buyCount
      this.$store.commit("updateGoods", goodsObj);
    },
    deletGoods(id) {
      this.$confirm("确定要从购物车删除该商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //根据id查找索引
          const index = this.goodsList.findIndex(item => {
            return item.id == id;
          });
          this.goodsList.splice(index, 1);
          //调用vuex删除loacalstorage并更新buyCount
          this.$store.commit("deleteGoodsById", id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    continueBuy() {
      this.$router.push("/site/goodsList");
    },
    goToOrder() {
      const idsArr = [];
      this.goodsList.forEach(item => {
        if (item.isSelected) {
          idsArr.push(item.id);
        }
      });
      if (idsArr.length == 0) {
        this.$message({
          message: "请至少选择一件商品！",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        path: `/site/order/${idsArr.join(",")}`
      });
    }
  },
  //注册子组件
  components: {
    vcounter
  }
};
</script>