// 导入Vue
import Vue from 'vue';
// 导入根组件
import App from './App.vue';

import lazyload from 'vue-lazyload';
import vueMoment from 'vue-moment';

Vue.use(lazyload, {
  loading: require('./statics/site/images/01.gif') //注意要用require引入占位图
});
Vue.use(vueMoment);

//按需导入element-ui
//按需导入我们的element-ui
import {
  Button,
  Pagination,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem
} from 'element-ui'

Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

//全局样式
import 'element-ui/lib/theme-chalk/index.css';
import './statics/site/css/style.css';

import router from './router'; //路由模块
import store from './store/store.js'; //vuex模块

// //全局过滤器
// Vue.filter('formateDate', (input, formateString) => {
//   return moment(input).format(formateString);
// })

//项目根实例
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  // render: function (createElement) { //render函数 用来渲染根组件
  //   return createElement(App)
  // }
})