<template>
  <div class="test-msg">
    <el-row class="test-option">
      <el-col :span="5">
        <el-select v-model="grade" placeholder="年级" clearable>
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select v-model="type" placeholder="请选择考试类别" clearable>
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select v-model="turn" placeholder="轮次" clearable>
          <el-option
            v-for="item in roundList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
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
        <el-button type="primary" size="small" @click="getPaperData"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <el-row class="test-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(235,244,248)' }"
        :row-style="{ background: 'rgb(240,248,250)' }"
        size="small"
        height="500px"
      >
        <el-table-column
          label="考试时间"
          width="200"
          prop="examTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="学生年级"
          width="140"
          prop="grade"
          align="center"
        ></el-table-column>
        <el-table-column
          label="考试类别"
          width="100"
          prop="type"
          align="center"
        ></el-table-column>
        <el-table-column
          label="考试科目"
          width="140"
          prop="department"
          align="center"
        ></el-table-column>
        <el-table-column
          label="试卷名称"
          width="280"
          prop="examName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="轮次"
          width="80"
          prop="turn"
          align="center"
        ></el-table-column>
        <el-table-column
          label="平均分"
          width="120"
          prop="averageScore"
          align="center"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="checkTest(scope.row)" type="primary"
              >查看</el-button
            >
            <el-button
              size="mini"
              @click="testAnalysis(scope.row)"
              type="primary"
              >试卷详情分析</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      department: null,
      grade: null,
      type: null,
      averageScore: '',
      turn: 0,
      currentPage: 1,
      tableData: []
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
    checkTest(row) {
      sessionStorage.setItem('examName', row.examName);
      this.$router.push({
        name: 'examiner'
      });
    },
    // 当前页改变触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    testAnalysis(row) {
      this.$router.push({
        name: 'testAnalysis',
        query: { examName: row.examName, type: row.type }
      });
    },
    getPaperData() {
      this.$ajax
        .post('/hmu/tea/getExams', {
          grade: this.grade,
          type: this.type,
          department: this.department,
          turn: this.turn
        })
        .then(res => {
          if (!res.result) {
            this.tableData = res.data;
          } else {
            this.$message({
              type: 'error',
              message: res.errMsg
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
  mounted() {
    this.grade = new Date().getFullYear();
    this.getPaperData();
  }
};
</script>

<style lang="scss" scoped>
.test-msg {
  margin: 0 10px;
  .test-option {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: rgb(229, 237, 239);
    border-radius: 10px;
    margin: 0 0 15px 0;
    .el-input {
      width: 330px;
    }
    .el-date-editor {
      width: 330px;
    }
  }
  .test-table {
    padding: 20px 0 0 0;
  }
}
</style>
