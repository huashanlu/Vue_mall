import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter); //Vue.prototype.$route  Vue.prototype.$router

//路由相关，导入组件
// import goodsList from '../components/goods/goodsList.vue';
// import shoppingCart from '../components/shoppingCart/shoppingCart.vue';
// import goodsInfo from '../components/goods/goodsinfo.vue';
// import order from '../components/order/order.vue';
// import login from '../components/account/login.vue';
// import payOrder from '../components/pay/payOrder.vue';
// import paySuccess from '../components/pay/paySuccess.vue';
// import vipCenter from '../components/vip/vipCenter.vue';
// import myOrders from '../components/vip/myOrders.vue';
// import orderInfo from '../components/vip/orderInfo.vue';

const goodsList = () => import('../components/goods/goodsList.vue');
const shoppingCart = () => import('../components/shoppingCart/shoppingCart.vue');
const goodsInfo = () => import('../components/goods/goodsinfo.vue');
const order = () => import('../components/order/order.vue');
const login = () => import('../components/account/login.vue');
const payOrder = () => import('../components/pay/payOrder.vue');
const paySuccess = () => import('../components/pay/paySuccess.vue');
const vipCenter = () => import('../components/vip/vipCenter.vue');
const myOrders = () => import('../components/vip/myOrders.vue');
const orderInfo = () => import('../components/vip/orderInfo.vue');


//axios
import axios from 'axios';
axios.defaults.baseURL = 'http://120.79.187.175:8899/'; //生产环境api服务器地址，axios发送请求时会自动将此地址加上
axios.defaults.withCredentials = true; //可以设置cookie，比如登录状态等
Vue.prototype.$axios = axios; //将axios挂载到vue原型上，方便全局访问

const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/site/goodsList'
    },
    {
      path: '/site/goodsList',
      component: goodsList
    },
    {
      path: '/site/shopping-cart',
      component: shoppingCart
    },
    {
      path: '/site/goodsinfo/:goodsId',
      component: goodsInfo
    },
    {
      path: '/site/order/:ids',
      component: order,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/site/login',
      component: login,
      meta: {
        isAccount: true
      }
    },
    {
      path: '/site/payOrder/:orderId',
      component: payOrder,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/site/paySuccess',
      component: paySuccess,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/site/vipCenter',
      component: vipCenter,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/site/myOrders',
      component: myOrders,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/site/orderInfo/:orderId',
      component: orderInfo,
      meta: {
        needLogin: true
      }
    },
  ]
})
//导航守卫
router.beforeEach((to, from, next) => {
  //记录最后一次访问的页面地址（登录页面不记录）
  // console.log(to.path,'---------',from.path);
  if (!to.meta.isAccount) {
    localStorage.setItem('lastVisitPath', to.path);
  }
  //判断目标地址是否需要验证登录状态
  if (to.meta.needLogin) {
    // console.log('需要判断是否登录');
    const url = 'site/account/islogin';
    axios.get(url).then(res => {
      // console.log(res.data.code);
      if (res.data.code == 'nologin') {
        router.push({
          path: '/site/login'
        })
      } else {
        next();
      }
    })
  } else {
    next();
  }
})

export default router;