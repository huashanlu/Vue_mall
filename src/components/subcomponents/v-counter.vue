<template>
  <div class="v-counter">
    <span class="v-counter-button v-counter-button-decrease" @click="decrease">
      <i class="el-icon-minus"></i>
    </span>
    <span class="v-counter-button v-counter-button-increase" @click="increase">
      <i class="el-icon-plus"></i>
    </span>
    <div class="v-counter-input">
      <input type="text" class="v-counter-input-inner" v-model="count">
    </div>
  </div>
</template>

<style scoped>
.v-counter {
  position: relative;
  display: inline-block;
  width: 130px;
  line-height: 38px;
}
.v-counter-button {
  position: absolute;
  z-index: 1;
  top: 1px;
  width: 40px;
  height: auto;
  text-align: center;
  background: #f5f7fa;
  /* color: #606266;
  cursor: pointer; */
  font-size: 13px;
}
.v-counter-button-decrease {
  left: 1px;
  border-radius: 4px 0 0 4px;
  border-right: 1px solid #dcdfe6;
}
.v-counter-button-increase {
  right: 1px;
  border-radius: 0 4px 4px 0;
  border-left: 1px solid #dcdfe6;
}
.v-counter-input {
  display: block;
  position: relative;
  font-size: 14px;
  width: 100%;
}
.v-counter-input-inner {
  -webkit-appearance: none;
  padding-left: 50px;
  padding-right: 50px;
  text-align: center;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  props: ["initCount", "goodsId"],
  created() {
    this.count = this.initCount;
  },
  methods: {
    increase() {
      this.count++;
      this.notify();
    },
    decrease() {
      if (this.count > 1) this.count--;
      this.notify();
    },
    notify(){
      //将更改后的goodsObj传递给父组件
      this.$emit("countChange", { goodsId: this.goodsId, count: this.count });
    }
  }
};
</script>