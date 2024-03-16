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

export const addOrderInfo = (data) =>
  request.post("/addOrderInfo", { params: data });

export const getOrderInfo = (data) =>
  request.get("/getOrderInfo", { params: data });

export const getOrder = (data) => request.get("/getOrder", { params: data });

export const delOrderInfo = (data) =>
  request.post("/delOrderInfo", { params: data });

export const editOrderInfo = (data) =>
  request.post("/editOrderInfo", { params: data });
