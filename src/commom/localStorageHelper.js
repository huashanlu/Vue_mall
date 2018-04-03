/**
 * 把我们加入购物车的数据存储到localStroage中
 * 
 * 把我们购物车中的数据从localStorage中删除
 * 
 * 把购物车中的商品的数量进行更改
 * 
 * 上面每一步操作完了之后，需要重新统计总数，返回给Vuex的buycount
 * 
 * 说明：最终存储到本地的数据格式应该是 {87:3,88:5,89:3}
 */

const KEY = 'GOODS';

//去localStorage中获取原先保存的数据
export const getLocalGoods = () => {
  return JSON.parse(localStorage.getItem(KEY) || '{}');
}

//计算购买总数
export const getTotalCount = () => {
  //先查询
  const goodsObj = getLocalGoods();
  //遍历累加
  let totalCount = 0;
  for (let key in goodsObj) {
    totalCount += goodsObj[key];
  }
  //返回总数
  return totalCount;
}

/**
 * 增加商品
 * 参数:goods商品对象，里面有id和count  例如 {goodsId:87,count:3}
 * goodsObj: {87:2,88:3}
 */
export const addLocalGoods = goods => {
  //先获取
  const goodsObj = getLocalGoods();
  //进行商品数量的累加，如果原先有数量累加，如果没有，新加一个
  if (goodsObj[goods.goodsId]) {
    goodsObj[goods.goodsId] += goods.count;
  } else {
    goodsObj[goods.goodsId] = goods.count;
  }
  //把上面更新好的数据，设置回localStorage中
  localStorage.setItem(KEY, JSON.stringify(goodsObj));
  //添加完返回新的总数
  return getTotalCount();
}

/**
 * 修改商品数量
 * goods商品对象，里面有id和count  例如 {goodsId:87,count:3}
 * goodsObj: {87:2,88:3}
 */
export const updateLocalGoods = goods => {
  const goodsObj = getLocalGoods();
  goodsObj[goods.goodsId] = goods.count;
  localStorage.setItem(KEY, JSON.stringify(goodsObj));
  return getTotalCount();
}

/**
 * 删除商品
 * id 要删除的商品的id
 * goodsObj: {87:2,88:3}
 */
export const deleteLocalGoodsById = id => {
  const goodsObj = getLocalGoods();
  delete goodsObj[id]; //delete方法可以直接删除对象中的某个属性
  // console.log(goodsObj)
  localStorage.setItem(KEY, JSON.stringify(goodsObj));
  return getTotalCount();
}

/**
 * 删除多个商品
 * ids [89, 90]
 */
export const deleteLocalGoodsByIds = ids => {
  const goodsObj = getLocalGoods();
  ids.forEach(item => {
    delete goodsObj[item];
  });
  localStorage.setItem(KEY, JSON.stringify(goodsObj));
  return getTotalCount();
}