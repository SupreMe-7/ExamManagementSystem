<template>
  <div class="set-stu">
    <el-page-header
      @back="goBack"
      :content="row.examName + '安排考试学生'"
    ></el-page-header>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()" size="small">清空选择</el-button>
      <el-button @click="setStu" size="small" type="primary">保存</el-button>
    </div>
    <el-row class="student-table" v-loading="allLoading">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(235,244,248)' }"
        :row-style="{ background: 'rgb(240,248,250)' }"
        size="small"
        height="500px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
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
        <el-table-column label="联系方式" prop="phone"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allLoading: false,
      tableData: [],
      checkedStu: [],
      row: {}
    };
  },
  watch: {
    row() {
      this.getStudentMsg();
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'paperMaintenance' });
    },
    getStudentMsg() {
      this.allLoading = true;
      this.$ajax
        .post('/hmu/tea/getStudents', {
          grade: this.row.grade,
          type: this.row.type
        })
        .then(res => {
          if (!res.result) {
            this.tableData = res.data;
            this.getCheckedStu();
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
    getCheckedStu() {
      this.allLoading = true;
      this.$ajax
        .get(`/hmu/tea/getGradeByExam/${this.row.examName}`)
        .then(res => {
          if (!res.result) {
            this.tableData.forEach(item => {
              for (let i = 0; i < res.data.length; i++) {
                if (item.stuId === res.data[i].stuId) {
                  this.checkedStu.push(item);
                }
              }
            });
            this.toggleSelection(this.checkedStu);
            this.allLoading = false;
          } else {
            this.$message({
              type: 'error',
              message: '获取考试学生失败！'
            });
            this.allLoading = false;
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          });
        });
    },
    handleSelectionChange(val) {
      this.checkedStu = val;
      console.log(this.checkedStu);
    },
    // 标记已选学生
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    setStu() {
      let postData = [];
      this.checkedStu.forEach(item => {
        let obj = {
          stuId: item.stuId,
          examName: this.row.examName
        };
        postData.push(obj);
      });
      this.$ajax
        .post('/hmu/tea/insertStuToExam', postData)
        .then(res => {
          if (!res.result) {
            this.$message({
              type: 'success',
              message: '安排考试学生成功！'
            });
            this.goBack();
          } else {
            this.$message({
              type: 'error',
              message: '安排考试学生失败！'
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.row) {
        vm._data.row = to.params.row;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.set-stu {
  .student-table {
    padding: 20px 0 0 0;
    .pagination {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
