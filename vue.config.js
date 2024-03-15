const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭eslint校验
  devServer: {
    proxy: {
      "/api": {
        //target 我们要连接的后端地址
        target: "http://localhost:3000",
        changeOrigin: true, //是否跨域
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
