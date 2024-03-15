<template>
  <el-form
    ref="form"
    :inline="true"
    label-width="70px"
    class="login-container"
    :model="form"
    :rules="rules"
  >
    <h3 class="login_title" title="系统登录">Login</h3>
    <el-form-item
      label="用户名"
      prop="username"
      id="vue_item"
      title="也是你的账号id"
    >
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="submit"
        style="margin-left: 105px; margin-top: 10px"
        type="primary"
        title="点击登录"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  methods: {
    //登录
    submit() {
      // //token信息
      // const token = Mock.Random.guid();
      //校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            console.log(data);
            if (data.code === 20000) {
              //token信息存入cookie,用于不同页面间的通信
              Cookie.set("token", data.data.token);

              //获取菜单的数据，存入store中
              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("addMenu", this.$router);
              //跳转到页面
              this.$router.push("/home");
            } else {
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
body {
  background-image: url("../assets/images/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  // background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  background-color: rgba(41, 45, 62, 0.8);
  color: #fff;
  // border-radius: 2px;
}
.login_title {
  text-align: center;
  margin-bottom: 40px;
  // color: #505458;
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  line-height: 80px;
}
.el-input {
  width: 198px;
}
.login_submit {
  margin: 10px auto 0px auto;
}
.el-form-item__label {
  color: #e3e3e3;
}
</style>