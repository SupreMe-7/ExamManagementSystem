<template>
  <div class="examiner">
    <el-page-header @back="goBack" content="考试学生概览"></el-page-header>
    <div class="examiner-content" v-loading="loading">
      <el-table
        :data="examinerData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(235,244,248)' }"
        :row-style="{ background: 'rgb(240,248,250)' }"
        size="mini"
      >
        <el-table-column
          prop="examTime"
          label="考试时间"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="stuId"
          label="学号"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="examName"
          label="试卷名称"
          align="center"
          width="240"
        ></el-table-column>
        <el-table-column
          prop="score"
          label="学生成绩"
          align="center"
          width="160"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="checkStuTest(scope.row)"
              type="primary"
              >查看该生试卷</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      examinerData: []
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'testMsg' });
    },
    checkStuTest(row) {
      this.$router.push({
        name: 'stuPaper',
        params: { stuMsg: row }
      });
    }
  },
  mounted() {
    let examName = sessionStorage.getItem('examName');
    this.$ajax
      .get(`/hmu/tea/getGradeByExam/${examName}`)
      .then(res => {
        if (!res.result) {
          this.examinerData = res.data;
          this.loading = false;
        } else {
          this.$message({
            type: 'error',
            message: '获取考试学生失败！'
          });
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
};
</script>

<style lang="scss" scoped>
.examiner {
  .examiner-content {
    margin: 15px;
  }
}
</style>
