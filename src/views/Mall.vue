<template>
  <div>
    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <!-- 用户的表单信息 -->
        <el-form
          ref="bookform"
          :rules="rules"
          :inline="true"
          :model="bookform"
          label-width="80px"
        >
          <el-form-item label="书籍名称" prop="book_name">
            <el-input
              placeholder="请输入书籍名称"
              v-model="bookform.book_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="书籍单价" prop="price">
            <el-input
              placeholder="请输入书籍单价"
              v-model="bookform.price"
            ></el-input>
          </el-form-item>
          <el-form-item label="书籍分类" prop="book_variety">
            <el-select
              v-model="bookform.book_variety"
              placeholder="请选择图书种类"
            >
              <el-option label="历史" value="历史"></el-option>
              <el-option label="哲学" value="哲学"></el-option>
              <el-option label="艺术" value="艺术"></el-option>
              <el-option label="文学" value="文学"></el-option>
              <el-option label="地理" value="地理"></el-option>
              <el-option label="自然科学" value="自然科学"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="书籍作者" prop="book_writer">
            <el-input
              placeholder="请输入书籍作者"
              v-model="bookform.book_writer"
            ></el-input>
          </el-form-item>
          <el-form-item label="书籍库存" prop="stock">
            <el-input
              placeholder="请输入书籍库存"
              v-model="bookform.stock"
            ></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-button @click="handleAdd()" type="primary"> +新增 </el-button>
    <input v-model="book" placeholder="输入书名查询书籍信息" />
    <button @click="getBook">查询</button>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="book_id" label="书籍id" width="180">
        </el-table-column>
        <el-table-column prop="book_name" label="书籍名称" width="180">
        </el-table-column>
        <el-table-column prop="book_variety" label="书籍种类" width="180">
        </el-table-column>
        <el-table-column prop="book_writer" label="书籍作者" width="180">
        </el-table-column>
        <el-table-column prop="price" label="书籍单价" width="180">
        </el-table-column>
        <el-table-column prop="stock" label="书籍库存" width="180">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
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
  getBookInfo,
  getBook,
  addBookInfo,
  delBookInfo,
  editBookInfo,
} from "../utils/api";
export default {
  name: "bookInfor",
  data() {
    return {
      bookInfo: "",
      book: "",
      tableData: [],
      dialogVisible: false,
      bookform: {
        book_name: "",
        book_variety: "",
        price: 0,
        book_writer: "",
        stock: 0,
      },
      rules: {
        book_name: [
          {
            required: true,
            message: "请输入书籍名称",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入书籍单价",
          },
        ],
        book_variety: [
          {
            required: true,
            message: "请选择书籍种类",
          },
        ],
        book_writer: [
          {
            required: true,
            message: "请选择书籍作者",
          },
        ],
        stock: [
          {
            required: true,
            message: "请输入书籍库存",
          },
        ],
      },
      modalType: 0,
      total: 0,
      editBookid: 0,
    };
  },
  methods: {
    async getBook() {
      let res = await getBookInfo({ book_name: this.book });
      console.log(res, "/api", "查询的书籍信息");
      this.bookInfo = res.data;
      this.tableData = res.data.data;
    },
    async getBookList() {
      let res = await getBook();
      console.log(res, "/api", "获取的书籍信息");
      this.tableData = res.data;
      this.total = this.tableData.length;
    },
    async addBook() {
      console.log(this.bookform.book_name);
      let res = await addBookInfo({
        book_id: this.total + 1,
        book_name: this.bookform.book_name,
        price: this.bookform.price,
        book_variety: this.bookform.book_variety,
        book_writer: this.bookform.book_writer,
        stock: this.bookform.stock,
      });
      console.log(res, "/api", "添加的书籍信息");
    },

    //提交用户表单
    submit() {
      this.$refs.bookform.validate((valid) => {
        console.log(valid);
        if (valid) {
          //后续对表单数据的处理
          if (this.modalType === 0) {
            this.addBook();
            this.getBookList();
            this.$refs.bookform.resetFields();
          } else {
            // console.log(this.editBookid);
            editBookInfo({
              book_id: this.editBookid,
              book_name: this.bookform.book_name,
              price: this.bookform.price,
              book_variety: this.bookform.book_variety,
              book_writer: this.bookform.book_writer,
              stock: this.bookform.stock,
            }).then(() => {
              //重新获取列表的接口
              this.getBookList();
              this.$refs.bookform.resetFields();
            });
          }
          //清空表单的数据
          //this.$refs.bookform.resetFields();
          //关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    handleClose() {
      this.$refs.bookform.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
    },
    handleEdit(row) {
      // console.log(row.book_id);
      this.modalType = 1;
      this.dialogVisible = true;
      // //需要对当前行数据进行深拷贝，否则会出错
      this.bookform = JSON.parse(JSON.stringify(row));
      this.editBookid = row.book_id;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.book_id);
          delBookInfo({ book_id: row.book_id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //重新获取列表的接口
            this.getBookList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },

  created() {},
  mounted() {
    this.getBookList();
  },
};
</script>

<style>
</style>