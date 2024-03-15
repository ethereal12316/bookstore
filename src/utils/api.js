import request from "./request";

//获取书籍信息接口
export const getBookInfo = (data) =>
  request.get("/getBookInfo", { params: data });
export const getBook = (data) => request.get("/getBook", { params: data });

export const addBookInfo = (data) =>
  request.post("/addBookInfo", { params: data });

export const delBookInfo = (data) =>
  request.post("/delBookInfo", { params: data });

export const editBookInfo = (data) =>
  request.post("/editBookInfo", { params: data });
