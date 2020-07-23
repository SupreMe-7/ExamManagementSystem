<template>
  <div class="student-msg">
    <el-row class="student-option">
      <el-col :span="6">
        <el-input v-model="stuId" placeholder="请输入所查询学生学号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="type" placeholder="请选择学生类别" clearable>
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="grade" placeholder="请选择实习年份">
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" @click="searchStudent"
          >搜索</el-button
        >
        <el-button type="primary" size="small" @click="addStudent"
          >添加学生</el-button
        >
      </el-col>
    </el-row>
    <el-row class="student-table" v-loading="allLoading">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(235,244,248)' }"
        :row-style="{ background: 'rgb(240,248,250)' }"
        size="small"
        height="500px"
      >
        <el-table-column
          label="学号"
          width="200"
          prop="stuId"
          align="center"
        ></el-table-column>
        <el-table-column
          label="姓名"
          width="200"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="类别"
          width="200"
          prop="type"
          align="center"
        ></el-table-column>
        <el-table-column
          label="入学年份"
          width="200"
          prop="grade"
          align="center"
        ></el-table-column>
        <el-table-column
          label="联系方式"
          width="200"
          prop="phone"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="checkStudent(scope.row)"
              type="primary"
              >查看</el-button
            >
            <el-button size="mini" @click="editStudent(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="removeStudent(scope.row)"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="50"
        ></el-pagination>
      </div>
    </el-row>
    <el-dialog
      title="学生详细考试成绩"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div class="score-table" v-loading="loading">
        <el-table :data="scoreData" border style="width: 100%">
          <el-table-column
            prop="examTime"
            label="考试时间"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="examName"
            label="科目"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="score"
            label="成绩"
            width="100"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog
      :title="dialogType === 'add' ? '添加学生' : '编辑学生'"
      :visible.sync="addVisible"
      width="30%"
      @close="handleClose"
    >
      <p class="chose-method" v-if="dialogType === 'add'">
        请选择添加学生方式:
        <el-radio v-model="radio" label="1">直接添加</el-radio>
        <el-radio v-model="radio" label="2">通过excel导入</el-radio>
      </p>
      <div class="add-in" v-if="radio === '1'">
        <el-row>
          学生类别:
          <el-select v-model="stuAddMsg.type" placeholder="请选择学生类别">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-row>
        <el-row>
          入学年份:
          <el-select v-model="stuAddMsg.grade" placeholder="请选择学生入学年份">
            <el-option
              v-for="item in gradeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-row>
        <el-row>
          学生学号:
          <el-input
            v-model="stuAddMsg.stuId"
            placeholder="请输入所添加学生学号"
            :disabled="dialogType === 'edit'"
          ></el-input>
        </el-row>
        <el-row>
          学生姓名:
          <el-input
            v-model="stuAddMsg.name"
            placeholder="请输入所添加学生姓名"
          ></el-input>
        </el-row>
        <el-row>
          联系方式:
          <el-input
            v-model="stuAddMsg.phone"
            placeholder="请输入所添加学生联系方式"
          ></el-input>
        </el-row>
        <el-row type="flex" justify="end">
          <el-button
            type="primary"
            size="small"
            @click="addStu"
            v-if="dialogType === 'add'"
            >添加</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="updateStu"
            v-if="dialogType === 'edit'"
            >更新</el-button
          >
        </el-row>
      </div>
      <div class="excel-in" v-else>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-select v-model="stuAddMsg.type" placeholder="请选择学生类别">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-select
              v-model="stuAddMsg.grade"
              placeholder="请选择学生入学年份"
            >
              <el-option
                v-for="item in gradeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="upload">
          <input type="file" id="fileupload" ref="input" />
          <el-button
            type="primary"
            @click="uploadExcel"
            :disabled="stuAddMsg.grade === '' || stuAddMsg.type === ''"
            size="mini"
            >上传</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      allLoading: true,
      loading: true,
      radio: '1',
      addVisible: false,
      dialogType: '',
      dialogVisible: false,
      stuId: '',
      grade: '',
      type: null,
      currentPage: 1,
      tableData: [],
      scoreData: [],
      stuAddMsg: {
        stuId: '',
        name: '',
        phone: '',
        grade: '',
        type: ''
      }
    };
  },
  computed: {
    ...mapState({
      typeList: 'typeList',
      gradeList: 'gradeList'
    })
  },
  methods: {
    handleClose() {
      this.stuAddMsg = {
        stuId: '',
        name: '',
        phone: '',
        grade: '',
        type: ''
      };
      let obj = document.getElementById('fileupload');
      if (obj) {
        obj.outerHTML = obj.outerHTML;
      }
    },
    searchStudent() {
      if (this.stuId && this.stuId.length === 10) {
        this.$ajax
          .get(`/hmu/tea/getStudentByStuId/${this.stuId}`)
          .then(res => {
            if (res.result === 0) {
              this.tableData = [res.data];
            } else {
              this.$message({
                type: 'error',
                message: '查询失败'
              });
            }
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: err
            });
          });
      } else {
        this.getStudentMsg();
      }
    },
    checkStudent(row) {
      this.loading = true;
      this.dialogVisible = true;
      this.$ajax
        .get(`/hmu/tea/getGradeByStuId/${row.stuId}`)
        .then(res => {
          if (!res.result) {
            this.scoreData = res.data;
            this.loading = false;
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          });
        });
    },
    // 当前页改变触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getStudentMsg() {
      this.$ajax
        .post('/hmu/tea/getStudents', {
          grade: this.grade,
          type: this.type === '' ? null : this.type
        })
        .then(res => {
          if (res.result === 0) {
            this.tableData = res.data;
            this.allLoading = false;
          } else {
            this.$message({
              type: 'error',
              message: '获取学生列表失败, 请刷新重试'
            });
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          });
        });
    },
    addStudent() {
      this.dialogType = 'add';
      this.addVisible = true;
    },
    // 通过excel表格导入
    uploadExcel() {
      let files = this.$refs.input.files;
      let type = files[0].name.substring(files[0].name.lastIndexOf('.'));
      if (type !== '.xls' && type !== '.xlsx') {
        this.$message({
          type: 'error',
          message: '导入数据格式必须是xls格式文件，请您调整格式后重新上传'
        });
        return;
      }
      if (files.length > 0) {
        let form = new FormData();
        form.append('file', files[0]);
        form.append('type', this.stuAddMsg.type);
        form.append('grade', this.stuAddMsg.grade);
        this.$ajax({
          url: '/hmu/tea/uploadStu',
          method: 'post',
          data: form
        })
          .then(res => {
            if (!res.result) {
              this.$message({
                type: 'success',
                message: '通过excel表格导入学生成功'
              });
              this.addVisible = false;
            } else {
              this.$message({
                type: 'error',
                message: res.data.errMsg
              });
            }
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: err
            });
          });
      }
    },
    addStu() {
      for (let prop in this.stuAddMsg) {
        if (this.stuAddMsg[prop] === '') {
          this.$message({
            type: 'error',
            message: '学生信息不完整, 请填写完整'
          });
          return;
        }
      }
      this.$ajax
        .post('/hmu/tea/insertStu', this.stuAddMsg)
        .then(res => {
          if (!res.result) {
            this.addVisible = false;
            this.$message({
              type: 'success',
              message: '添加学生信息成功!'
            });
            this.getStudentMsg();
          } else {
            this.$message({
              type: 'error',
              message: '添加学生信息失败!'
            });
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          });
        });
    },
    editStudent(row) {
      this.dialogType = 'edit';
      this.radio = '1';
      this.addVisible = true;
      this.stuAddMsg = {
        stuId: row.stuId,
        name: row.name,
        phone: row.phone,
        grade: row.grade,
        type: row.type
      };
    },
    updateStu() {
      this.$ajax
        .put('/hmu/tea/updateStu', this.stuAddMsg)
        .then(res => {
          if (!res.result) {
            this.addVisible = false;
            this.$message({
              type: 'success',
              message: '更新学生信息成功'
            });
            this.getStudentMsg();
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          });
        });
    },
    removeStudent(row) {
      this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax
            .delete(`/hmu/tea/deleteStu/${row.stuId}`)
            .then(res => {
              if (!res.result) {
                this.tableData = this.tableData.filter(item => {
                  return item.stuId !== row.stuId;
                });
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  },
  mounted() {
    this.grade = new Date().getFullYear();
    this.allLoading = true;
    this.getStudentMsg();
  }
};
</script>

<style lang="scss" scoped>
.student-msg {
  margin: 0 10px;
  .student-option {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: rgb(229, 237, 239);
    border-radius: 10px;
    margin: 0 0 15px 0;
    .el-input {
      width: 240px;
    }
  }
  .student-table {
    padding: 20px 0 0 0;
    .pagination {
      margin-top: 30px;
      text-align: center;
    }
  }
  .el-dialog {
    .add-in {
      margin: 0 0 0 15px;
      .el-select {
        margin: 0 0 10px 10px;
      }
      .el-input {
        margin: 0 0 10px 10px;
        width: 217.5px;
      }
    }
    .upload {
      text-align: center;
      margin: 30px 0 0 0;
    }
    .score-table {
      padding: 0 20px;
    }
    .chose-method {
      margin: 10px 0 20px 0;
    }
  }
}
</style>

<style lang="scss">
.el-table__empty-block {
  background: #fff;
}
</style>
