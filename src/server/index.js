const express = require("express");
const app = express();

const cors = require("cors"); //解决跨域问题
app.use(cors());
const bodyParser = require("body-parser");
const multiparty = require("connect-multiparty");
// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// 处理 mutipart/form-data
app.use(multiparty());
// 处理 application/json
app.use(bodyParser.json());
//导入我们上一步写的连接数据库的函数
const { conMysql } = require("./mysql");
//创建统一的返回报文对象
class Response {
  constructor(isSucceed, msg, code, data) {
    this.isSucceed = isSucceed;
    this.msg = msg;
    this.code = code;
    this.data = data;
  }
}

//一个简单的接口，查询数据库中的信息
app.get("/getBook", (req, res) => {
  let sql = "select * from book";
  conMysql(sql).then((result) => {
    res.send(result);
  });
});

app.get("/getOrder", (req, res) => {
  let sql = "select * from orders";
  conMysql(sql).then((result) => {
    res.send(result);
  });
});

//根据前端传过来的id查询数据库中对应的id的信息
app.get("/getBookInfo", (req, res) => {
  let name = "%" + req.query.book_name + "%";
  let sql = `select * from book where book_name like '${name}'`;
  conMysql(sql)
    .then((result) => {
      console.log(sql);
      let response = new Response(true, "获取成功", 200, result);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("数据库连接出错!");
    });
});

app.get("/getOrderInfo", (req, res) => {
  let sql = `select * from orders where orderid = '${req.query.orderid}'`;
  conMysql(sql)
    .then((result) => {
      console.log(sql);
      let response = new Response(true, "获取成功", 200, result);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("数据库连接出错!");
    });
});

//新增
app.post("/addBookInfo", (req, res) => {
  let sql = `insert into book values('${req.body.params.book_id}','${req.body.params.book_name}','${req.body.params.price}','${req.body.params.book_writer}','${req.body.params.book_variety}','${req.body.params.stock}')`;
  console.log(sql);
  conMysql(sql)
    .then((result) => {
      let response = new Response(true, "获取成功", 200, result);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("数据库连接出错!");
    });
});

//删除
app.post("/delBookInfo", (req, res) => {
  let sql = `delete from book where book_id = '${req.body.params.book_id}'`;
  console.log(sql);
  conMysql(sql)
    .then((result) => {
      let response = new Response(true, "获取成功", 200, result);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("数据库连接出错!");
    });
});

app.post("/delOrderInfo", (req, res) => {
  let sql = `delete from orders where orderid = '${req.body.params.orderid}'`;
  console.log(sql);
  conMysql(sql)
    .then((result) => {
      let response = new Response(true, "获取成功", 200, result);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("数据库连接出错!");
    });
});

//查询
app.post("/editBookInfo", (req, res) => {
  let sql = `update book set book_name='${req.body.params.book_name}',price='${req.body.params.price}',book_writer='${req.body.params.book_writer}',book_variety='${req.body.params.book_variety}',stock='${req.body.params.stock}' where book_id = '${req.body.params.book_id}' `;
  console.log(sql);
  conMysql(sql)
    .then((result) => {
      let response = new Response(true, "获取成功", 200, result);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("数据库连接出错!");
    });
});

app.post("/editOrderInfo", (req, res) => {
  let sql = `update orders set book_name='${req.body.book_name}',number='${req.body.params.number}',date='${req.body.params.date}',where orderid = '${req.body.params.orderid}' `;
  console.log(sql);
  conMysql(sql)
    .then((result) => {
      let response = new Response(true, "获取成功", 200, result);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send("数据库连接出错!");
    });
});
//监听node服务器的端口号
app.listen(3000, () => {
  console.log("恭喜你，服务器启动成功");
});
