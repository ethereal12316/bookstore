import request from "./request";

//获取用户信息接口
export const getBookInfo = (data) =>
  request.get("/getBookInfo", { params: data });
