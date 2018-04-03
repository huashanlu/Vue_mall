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
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li class="active">
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <el-form class="cart-box" :model="order" :rules="rules" ref="order" label-width="150px">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div id="orderForm" name="orderForm" url="">
              <div class="form-box address-info">

                <el-form-item label="收货人姓名" prop="accept_name">
                  <el-input style="width:500px" v-model="order.accept_name"></el-input>
                </el-form-item>

                <el-form-item label="所属地区" prop="area">
                  <v-distpicker :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value" @selected="afterSelectedArea"></v-distpicker>
                </el-form-item>

                <el-form-item label="详细地址" prop="address">
                  <el-input style="width:500px" v-model="order.address"></el-input>
                </el-form-item>

                <el-form-item label="手机号码" prop="mobile">
                  <el-input style="width:500px" v-model="order.mobile"></el-input>
                </el-form-item>

                <el-form-item label="电子邮箱" prop="email">
                  <el-input style="width:500px" v-model="order.email"></el-input>
                </el-form-item>

                <el-form-item label="邮政编码" prop="post_code">
                  <el-input style="width:250px" v-model="order.post_code"></el-input>
                </el-form-item>

              </div>
              <h2 class="slide-tit">
                <span>2、支付方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <label>
                    <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
                    <em>手续费：0.00元</em>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>3、配送方式</span>
              </h2>
              <el-radio-group v-model="order.express_id" class="item-box clearfix" @change="changeExpress">
                <li>
                  <el-radio label="1">顺丰快递(20元)</el-radio>
                </li>
                <li>
                  <el-radio label="2">圆通(10元)</el-radio>
                </li>
                <li>
                  <el-radio label="3">韵达(8元)</el-radio>
                </li>
              </el-radio-group>
              <h2 class="slide-tit">
                <span>4、商品清单</span>
              </h2>
              <div class="line15"></div>
              <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                <tbody>
                  <tr>
                    <th colspan="2" align="left">商品信息</th>
                    <th width="84" align="left">单价</th>
                    <th width="84" align="center">购买数量</th>
                    <th width="104" align="left">金额(元)</th>
                  </tr>
                  <tr v-for="item of goodsList" :key="item.id">
                    <td width="68">
                      <router-link :to="'/site/goodsInfo/'+item.id">
                        <img :src="item.img_url" class="img">
                      </router-link>
                    </td>
                    <td>
                      <router-link :to="'/site/goodsInfo/'+item.id">{{item.title}}</router-link>
                    </td>
                    <td>
                      <span class="red">
                        ￥{{item.sell_price}}
                      </span>
                    </td>
                    <td align="center">{{item.buycount}}</td>
                    <td>
                      <span class="red">
                        ￥{{item.buycount * item.sell_price}}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"></div>
              <h2 class="slide-tit">
                <span>5、结算信息</span>
              </h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                  <dl>
                    <dt>订单备注(100字符以内)</dt>
                    <dd>
                      <textarea v-model="order.message" name="message" class="input" style="height:130px;width:450px"></textarea>
                    </dd>
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">{{getTotalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label id="goodsAmount" class="price">{{order.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                  </p>
                  <p class="btn-box">
                    <router-link to="/site/shopping-cart" class="btn button" href="javascript:;">返回购物车</router-link>
                    <a class="btn submit" @click="submitOrder(order)">确认提交</a>
                  </p>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLocalGoods } from "../../commom/localStorageHelper.js";

import VDistpicker from "v-distpicker";

export default {
  data() {
    const checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      const reg = /^1[3-9]\d{9}$/;
      if (!reg.test(value)) {
        return callback(new Error("手机号不合法"));
      } else {
        callback();
      }
    };
    const checkEmail = (rule, value, callback) => {
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (value && !reg.test(value)) {
        return callback(new Error("邮箱格式不合法"));
      } else {
        callback();
      }
    };
    return {
      goodsList: [],
      order: {
        accept_name: "刘维",
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        },
        address: "中粮商务公园3栋17楼",
        mobile: "18688888888",
        email: "wwdn7@vip.qq.com",
        post_code: "518000",
        payment_id: "6",
        express_id: "1",
        message: "请尽早发货，谢谢！",
        goodsids: "",
        cargoodsobj: {},
        goodsAmount: 0,
        expressMoment: 20
      },
      rules: {
        accept_name: [
          { required: true, message: "收货人不能为空！", trigger: "blur" }
        ],
        area: [
          { required: true, message: "请选择所属地区！", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请填写详细地址！", trigger: "blur" }
        ],
        mobile: [{ required: true, validator: checkMobile, trigger: "blur" }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      const ids = this.$route.params.ids;
      this.order.goodsids = ids;
      const url = `site/validate/order/getgoodslist/${ids}`;
      this.$axios.get(url).then(res => {
        const localGoodsObj = getLocalGoods();
        res.data.message.forEach(item => {
          item.buycount = localGoodsObj[item.id];
          this.order.cargoodsobj[item.id] = item.buycount;
        });
        this.goodsList = res.data.message;
      });
    },
    afterSelectedArea(data) {
      this.order.area = data;
    },
    changeExpress(label) {
      this.order.express_id = label;
      switch (label) {
        case "1":
          this.order.expressMoment = 20;
          break;
        case "2":
          this.order.expressMoment = 10;
          break;
        case "3":
          this.order.expressMoment = 8;
          break;
        default:
          break;
      }
    },
    submitOrder(order) {
      this.$refs.order.validate(valid => {
        if (valid) {
          const url = "site/validate/order/setorder";
          this.$axios.post(url, this.order).then(res => {
            if (res.data.status === 0) {
              // console.log(res.data.message);
              //跳转到支付订单页面
              this.$router.push({
                path: `/site/payOrder/${res.data.message.orderid}`
              });
              //删除localstorage中已提交的商品
              const ids = this.$route.params.ids.split(",");
              this.$store.commit("deleteGoodsByIds", ids);
            } else {
              this.$message.error("订单提交失败，请稍候再试！");
            }
          });
        } else {
          this.$message.error("请将订单信息填写完整后再提交！");
          return false;
        }
      });
    }
  },
  computed: {
    //获取总数量
    getTotalCount() {
      let totalCount = 0;
      this.goodsList.forEach(item => {
        totalCount += item.buycount;
      });
      return totalCount;
    },
    getTotalAmount() {
      let totalAmount = 0;
      this.order.goodsAmount = 0;
      this.goodsList.forEach(item => {
        this.order.goodsAmount += item.buycount * item.sell_price;
      });
      totalAmount = this.order.goodsAmount + this.order.expressMoment;
      return totalAmount;
    }
  },
  components: {
    VDistpicker
  }
};
</script>
