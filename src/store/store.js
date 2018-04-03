import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//Vuex 相关代码
import {
  getTotalCount,
  addLocalGoods,
  updateLocalGoods,
  deleteLocalGoodsById,
  deleteLocalGoodsByIds
} from '../commom/localStorageHelper.js';
const store = new Vuex.Store({
  //数据
  state: {
    buyCount: 0,
  },
  //取
  getters: {
    getBuyCount(state) {
      //如果大于0,说明没有刷新页面，直接从vuex中取
      if (state.buyCount > 0) {
        return state.buyCount;
      } else {
        //如果为0，说明已经刷新了页面，需要从localStorage中去取
        return getTotalCount();
      }
    },

  },
  //存
  mutations: {
    /**
     * 第一个参数state是固定的
     * 第二个参数是传过来的，称之为载荷
     */
    addGoods(state, goodsObj) {
      //更新localstorage和buyCounts
      state.buyCount = addLocalGoods(goodsObj);
    },
    updateGoods(state, goodsObj) {
      //更新localstorage和buyCounts
      state.buyCount = updateLocalGoods(goodsObj);
    },
    deleteGoodsById(state, id) {
      //更新localstorage和buyCounts
      state.buyCount = deleteLocalGoodsById(id);
    },
    deleteGoodsByIds(state, goodsId) {
      state.buyCount = deleteLocalGoodsByIds(goodsId);
    }
  }
})

export default store;