<template>
  <div class="test-analysis">
    <el-page-header @back="goBack" content="试卷详情概览"></el-page-header>
    <div class="all-msg">
      <el-table
        :data="msgData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(235,244,248)' }"
        :row-style="{ background: 'rgb(240,248,250)' }"
        border
        size="mini"
      >
        <el-table-column
          prop="examName"
          label="试卷名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="试卷类别"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="examTime"
          label="考试时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="topScore"
          label="最高分"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="downScore"
          label="最低分"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="avgScore"
          label="平均分"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="allExaminer"
          label="考试总人数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="questioner"
          label="出题人"
          align="center"
        ></el-table-column>
      </el-table>
      <p class="target-completion">
        目标点完成度: 目标点1: 0 目标点2: 0 目标点3: 0
      </p>
    </div>
    <div class="bar-chart">
      <div id="bar-chart" :style="{ width: '500px', height: '300px' }"></div>
      <div>
        <p v-for="(value, key, index) in percentList" :key="index">
          {{ key }} : {{ value }}
        </p>
      </div>
    </div>
    <div class="topic">
      <el-table
        :data="topicData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(235,244,248)' }"
        :row-style="{ background: 'rgb(240,248,250)' }"
        size="mini"
      >
        <el-table-column
          prop="testId"
          label="题号"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="topicType"
          label="题目类型"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="topicScore"
          label="分值"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="knowledgePoint"
          label="目标知识点"
        ></el-table-column>
        <el-table-column
          prop="correctRate"
          label="正确率"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="checkTopic(scope.row)" type="primary"
              >查看题目</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
  data() {
    return {
      examName: null,
      msgData: [
        {
          examName: '',
          type: '',
          examTime: '',
          topScore: '',
          downScore: '',
          avgScore: '',
          allExaminer: null,
          questioner: '暂无'
        }
      ],
      percentList: {
        '60分以下': null,
        '60分-70分': null,
        '70分-80分': null,
        '80分-90分': null,
        '90分-100分': null
      },
      topicData: [
        {
          testId: 1,
          correctRate: '暂无',
          topicType: '选择题',
          topicScore: '100',
          knowledgePoint: '知识点1, 知识点2, 知识点3'
        }
      ],
      topicMsg: `你的赛车起始停留在位置 0，速度为 +1，正行驶在一个无限长的数轴上。（车也可以向负数方向行驶.`,
      dialogVisible: false,
      scoreChartList: []
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'testMsg' });
    },
    createBarChart() {
      let myChart = echarts.init(document.getElementById('bar-chart'));
      myChart.setOption({
        title: { text: '考试成绩分布' },
        tooltip: {},
        xAxis: {
          data: [
            '60分以下',
            '60分-70分',
            '70分-80分',
            '80分-90分',
            '90分-100分'
          ]
        },
        yAxis: {},
        series: [
          {
            name: '人数',
            type: 'bar',
            data: this.scoreChartList
          }
        ]
      });
    },
    checkTopic(row) {
      this.dialogVisible = true;
      // TODO: 请求接口获取题目数据
    },
    getExamScore() {
      this.$ajax
        .get(`/hmu/tea/getGradeByExam/${this.examName}`)
        .then(res => {
          if (!res.result) {
            this.handleScoreData(res.data);
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
    },
    handleScoreData(list) {
      let topScore = 0;
      let downScore = 100;
      let allScore = 0;
      let scoreChartList = [0, 0, 0, 0, 0];
      list.forEach(item => {
        allScore += item.score;
        if (item.score > topScore) {
          topScore = item.score;
        }
        if (item.score < downScore) {
          downScore = item.score;
        }
        if (item.score < 60) {
          scoreChartList[0]++;
        }
        if (item.score >= 60 && item.score < 70) {
          scoreChartList[1]++;
        }
        if (item.score >= 70 && item.score < 80) {
          scoreChartList[2]++;
        }
        if (item.score >= 80 && item.score < 90) {
          scoreChartList[3]++;
        }
        if (item.score >= 90 && item.score <= 100) {
          scoreChartList[4]++;
        }
      });
      this.scoreChartList = scoreChartList;
      this.createBarChart();
      this.msgData[0].allExaminer = list.length;
      this.msgData[0].topScore = topScore;
      this.msgData[0].downScore = downScore;
      this.msgData[0].avgScore = (allScore / list.length).toFixed(2);
      this.msgData[0].examTime = list[0] && list[0].examTime;
      this.msgData[0].examName = list[0] && list[0].examName;
      this.msgData[0].type = this.$route.query.type;
      this.percentList = {
        '60分以下': (scoreChartList[0] / list.length * 100).toFixed(2) + '%',
        '60分-70分': (scoreChartList[1] / list.length * 100).toFixed(2) + '%',
        '70分-80分': (scoreChartList[2] / list.length * 100).toFixed(2) + '%',
        '80分-90分': (scoreChartList[3] / list.length * 100).toFixed(2) + '%',
        '90分-100分': (scoreChartList[4] / list.length * 100).toFixed(2) + '%'
      };
    }
  },

  mounted() {
    this.examName = this.$route.query.examName;
    this.getExamScore();
  }
};
</script>

<style lang="scss" scoped>
.test-analysis {
  .all-msg {
    margin: 15px;
    text-align: center;
    .target-completion {
      margin: 10px;
    }
  }
  .bar-chart {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin: 20px;
    }
  }
  .el-dialog {
    span {
      display: inline-block;
      width: 100px;
      text-align: center;
    }
  }
}
</style>
