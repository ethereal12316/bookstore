<template>
  <div>
    <input v-model="book" placeholder="输入用户名查询用户信息" />
    <button @click="getBook">点击获取用户信息</button>
  </div>
</template>
 
<script>
import { getBookInfo } from "../utils/api";
export default {
  name: "bookInfor",
  data() {
    return {
      bookInfo: "",
      book: "",
    };
  },
  methods: {
    async getBook() {
      let res = await getBookInfo({ book_name: "《理想国》" });
      console.log(res, "/api", "获取的书籍信息");
      this.userInfo = res.data;
    },
  },
  created() {},
};
</script>
 
<style>
</style>