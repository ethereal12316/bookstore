<template>
  <div class="manage">
    <input v-model="book" placeholder="输入订单编号查询订单信息" style="float: left;height:35px;padding-bottom: 2px;"/>
    <button class="green_btn" @click="getBook" style="float: inline-start"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" style="margin-right: 2px;padding-right: 2px;" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>查询</button>
    <div class="common-table">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="orderid" label="订单号"> </el-table-column>
        <el-table-column prop="book_name" label="书籍名称"> </el-table-column>
        <el-table-column prop="number" label="购买数量"> </el-table-column>
        <el-table-column prop="date" label="购买日期" :formatter="formatDate">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <!--<el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >-->
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getOrderInfo,
  getOrder,
  delOrderInfo,
  editOrderInfo,
} from "../utils/api";
/*import moment from 'moment'
import Vue from "vue";
Vue.filter('dateFormat', function (dateStr,pattern = "YYYY-MM-DD") {
  return moment(dateStr).format(pattern);
})*/
export default {
  name: "orderInfor",
  data() {
    return {
      orderInfo: "",
      orders: "",
      dialogVisible: false,
      orderform: {
        orderid: "",
        book_name: "",
        number: "",
        date: "",
      },
      tableData: [],
      modalType: 0, //0表示新增的弹窗，1表示编辑
      total: 0, // 当前总条数
      editOrderid: 0,
    };
  },
  methods: {
    async getOrder() {
      let res = await getOrderInfo({ orderid: this.orders });
      console.log(res, "/api", "查询的订单信息");
      this.orderInfo = res.data;
      this.tableData = res.data.data;
    },
    async getOrderList() {
      let res = await getOrder();
      console.log(res, "/api", "获取的订单信息");
      this.tableData = res.data;
      this.total = this.tableData.length;
    },
    submit() {
      this.$refs.orderform.validate((valid) => {
        console.log(valid);
        if (valid) {
          //后续对表单数据的处理
          if (this.modalType === 0) {
            this.getOrderList();
            this.$refs.orderform.resetFields();
          } else {
            // console.log(this.editBookid);
            editOrderInfo({
              orderid: this.editOrderid,
              book_name: this.orderform.book_name,
              number: this.orderform.number,
              date: this.orderform.date,
            }).then(() => {
              //重新获取列表的接口
              this.getOrderList();
              this.$refs.orderform.resetFields();
            });
          }
          this.dialogVisible = false;
        }
      });
    },
    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property];
      if (data == null) {
        return null;
      }
      let dt = new Date(data);
      return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    },

    //弹窗关闭的时候
    handleClose() {
      this.$refs.orderform.resetFields();
      this.dialogVisible = false;
    },
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    cancel() {
      this.handleClose();
    },
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      //需要对当前行数据进行深拷贝，否则会出错
      this.orderform = JSON.parse(JSON.stringify(row));
      this.editOrderid = row.orderid;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.orderid);
          delOrderInfo({ orderid: row.orderid }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //重新获取列表的接口
            this.getOrderList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //选择页码的回调函数
    handlePage(val) {
      //console.log(val);
      this.pageData.page = val;
      this.getList();
    },
    //列表的查询
    onSubmit() {
      this.getList();
    },
  },
  mounted() {
    this.getOrderList();
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>
