<template>
  <div class="paper-maintenance">
    <el-row class="search-bar">
      <el-col :span="4">
        <el-select v-model="type" placeholder="专业类别" clearable>
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="grade" placeholder="年级">
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="turn" placeholder="轮次" clearable>
          <el-option
            v-for="item in roundList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="department" placeholder="课程名称" clearable>
          <el-option
            v-for="item in courseNameList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="testStatus" placeholder="试卷状态" clearable>
          <el-option label="未考" value="未考"></el-option>
          <el-option label="已考" value="已考"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" @click="getPaperData"
          >搜索</el-button
        >
        <el-button type="primary" size="small" @click="addPaperDialog"
          >添加试卷</el-button
        >
      </el-col>
    </el-row>
    <el-row class="paper-table" v-loading="loading">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(235,244,248)' }"
        :row-style="{ background: 'rgb(240,248,250)' }"
        size="small"
        height="500px"
      >
        <el-table-column
          label="年级"
          width="150"
          prop="grade"
          align="center"
        ></el-table-column>
        <el-table-column
          label="考试类别"
          width="150"
          prop="type"
          align="center"
        ></el-table-column>
        <el-table-column
          label="课程名称"
          width="150"
          prop="department"
          align="center"
        ></el-table-column>
        <el-table-column
          label="试卷名称"
          width="200"
          prop="examName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="考试时间"
          width="200"
          prop="examTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="试卷状态"
          width="200"
          prop="testStatus"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="checkTest(scope.row)"
              >查看</el-button
            >
            <el-button
              size="mini"
              :disabled="scope.row.testStatus === '已考'"
              @click="editTest(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="checkPaper(false, scope.row)"
              type="primary"
              >查看试卷</el-button
            >
            <el-button
              size="mini"
              @click="checkPaper(true, scope.row)"
              :disabled="scope.row.testStatus === '已考'"
              >编辑试卷</el-button
            >
            <el-button
              size="mini"
              @click="setExamStu(scope.row)"
              :disabled="scope.row.testStatus === '已考'"
              >安排考试学生</el-button
            >
            <el-button size="mini" @click="deleteTest(scope.row)" type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      title="试卷信息"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false"
      :show-close="false"
      @close="canelAdd"
    >
      <el-row>
        考试年级:
        <el-select
          v-model="addPaperData.grade"
          placeholder="考试年级"
          clearable
          :disabled="dialogType !== 'add'"
        >
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-row>
      <el-row>
        专业类别:
        <el-select
          v-model="addPaperData.type"
          placeholder="专业类别"
          clearable
          :disabled="dialogType !== 'add'"
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-row>
      <el-row>
        课程名称:
        <el-select
          v-model="addPaperData.department"
          placeholder="课程名称"
          clearable
          :disabled="dialogType !== 'add'"
        >
          <el-option
            v-for="item in courseNameList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-row>
      <el-row>
        考试轮次:
        <el-select
          v-model="addPaperData.turn"
          placeholder="考试轮次"
          clearable
          :disabled="dialogType !== 'add'"
        >
          <el-option
            v-for="item in roundList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-row>
      <el-row>
        考试时间:
        <el-date-picker
          v-model="addPaperData.examTime"
          type="datetime"
          placeholder="选择考试日期时间"
          :disabled="dialogType === 'check'"
        >
        </el-date-picker>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" @click="addPaper" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      dialogType: '',
      type: '',
      grade: '',
      department: '',
      turn: '',
      testStatus: '',
      currentPage: 1,
      tableData: [],
      addPaperData: {
        grade: '',
        type: '',
        department: '',
        turn: '',
        examTime: ''
      }
    };
  },
  computed: {
    ...mapState({
      typeList: 'typeList',
      gradeList: 'gradeList',
      courseNameList: 'courseNameList',
      roundList: 'roundList'
    })
  },
  methods: {
    // 查看 编辑试卷内容
    checkPaper(paperType, row) {
      if (paperType && row.testStatus === '已考') {
        return;
      }
      this.$router.push({
        name: 'aePaper',
        params: { examMsg: row, paperType: paperType }
      });
    },
    addPaperDialog() {
      this.dialogType = 'add';
      this.dialogVisible = true;
    },
    canelAdd() {
      this.addPaperData = {
        grade: '',
        type: '',
        department: '',
        turn: '',
        examTime: ''
      };
    },
    // 创建考试 修改考试
    addPaper() {
      if (this.dialogType === 'check') {
        this.dialogVisible = false;
        return;
      }
      if (typeof this.addPaperData.examTime !== 'number') {
        this.addPaperData.examTime = new Date(this.addPaperData.examTime);
        this.addPaperData.examTime = this.addPaperData.examTime.getTime();
      }
      if (new Date().getTime() > this.addPaperData.examTime) {
        this.$message({
          type: 'error',
          message: '考试时间请选择在当前时间之后！'
        });
        return;
      }
      if (this.dialogType === 'edit') {
        this.$ajax
          .put('/hmu/tea/updateExam', this.addPaperData)
          .then(res => {
            if (!res.result) {
              this.$message({
                type: 'success',
                message: '更新考试时间成功！'
              });
              this.dialogVisible = false;
              this.getPaperData();
            } else {
              this.$message({
                type: 'error',
                message: '更新考试时间失败！'
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
      if (this.dialogType === 'add') {
        this.$ajax
          .post('/hmu/tea/insertExam', this.addPaperData)
          .then(res => {
            if (!res.result) {
              this.$message({
                type: 'success',
                message: '创建考试成功！'
              });
              this.dialogVisible = false;
              this.getPaperData();
            } else {
              this.$message({
                type: 'error',
                message: '创建考试失败！'
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
    // 查看考试信息
    checkTest(row) {
      this.dialogType = 'check';
      this.addPaperData = row;
      this.dialogVisible = true;
    },
    editTest(row) {
      if (row.testStatus === '已考') {
        return;
      }
      this.dialogType = 'edit';
      this.addPaperData = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    deleteTest(row) {
      this.$confirm('此操作将永久删除该考试, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax
            .delete(`/hmu/tea/deleteExam/${row.examName}`)
            .then(res => {
              if (!res.result) {
                this.$message({
                  type: 'success',
                  message: '删除考试成功!'
                });
                this.getPaperData();
              } else {
                this.$message({
                  type: 'error',
                  message: '删除考试失败！'
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
    },
    // 去设置考试学生
    setExamStu(row) {
      if (row.testStatus === '已考') {
        return;
      }
      this.$router.push({
        name: 'setStu',
        params: { row: row }
      });
    },
    // 获取or查询 试卷
    getPaperData() {
      this.loading = true;
      this.$ajax
        .post('/hmu/tea/getExams', {
          grade: this.grade,
          type: this.type === '' ? null : this.type,
          department: this.department === '' ? null : this.department,
          turn: this.turn === '' ? 0 : this.turn
        })
        .then(res => {
          if (!res.result) {
            res.data.forEach(item => {
              let date = new Date(item.examTime).getTime();
              if (date < new Date().getTime()) {
                this.$set(item, 'testStatus', '已考');
              } else {
                this.$set(item, 'testStatus', '未考');
              }
            });
            this.tableData = res.data;
            this.loading = false;
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
  mounted() {
    this.grade = new Date().getFullYear();
    this.getPaperData();
  }
};
</script>

<style lang="scss" scoped>
.paper-maintenance {
  margin: 0 10px;
  .search-bar {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #e5edef;
    border-radius: 10px;
    margin: 0 0 15px 0;
    .el-select {
      margin: 0 30px 0 10px;
    }
  }
  .paper-table {
    padding: 20px 0 0 0;
  }
  .el-dialog {
    .el-row {
      margin: 0 0 20px 30px;
    }
  }
}
</style>
