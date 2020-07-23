<template>
  <div class="ae-paper">
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <el-row>
      <el-col :span="18" class="paper-name">
        <span
          >{{ examMsg.grade }}{{ examMsg.type }}{{ examMsg.department }}第{{
            examMsg.turn
          }}轮考试</span
        >
      </el-col>
      <el-col :span="6" v-if="paperType">
        <el-button type="primary" size="small" @click="addTypeDialog"
          >添加题型</el-button
        >
        <el-button type="primary" size="small" @click="savePaper"
          >保存试卷</el-button
        >
      </el-col>
    </el-row>
    <div class="paper-table" v-if="questionType.select">
      <h1 class="ques-type">
        题型一: 选择题
        <div v-if="paperType">
          <el-button type="primary" size="small" @click="openTopic('select')"
            >添加试题</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="randomAddTopic('select')"
            >随机出题</el-button
          >
        </div>
      </h1>
      <el-table
        :data="selectData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(235,244,248)' }"
        :row-style="{ background: 'rgb(240,248,250)' }"
        size="small"
      >
        <el-table-column
          type="index"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column prop="question" label="题目"></el-table-column>
        <el-table-column
          prop="rightAnswer"
          label="正确答案"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="accuracy"
          label="准确率"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleCheck(scope.row)"
              >查看</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete('selectData', scope.row)"
              v-if="paperType"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paper-table" v-if="questionType.case">
      <h1 class="ques-type">
        题型二: 案例题
        <div v-if="paperType">
          <el-button type="primary" size="small" @click="openTopic('case')"
            >添加试题</el-button
          >
          <el-button type="primary" size="small" @click="randomAddTopic('case')"
            >随机出题</el-button
          >
        </div>
      </h1>
      <div class="case-title" v-for="(item, index) in caseData" :key="index">
        <span>&nbsp;&nbsp;案例{{ index + 1 }}： {{ item.question }}</span>
        <el-button
          type="danger"
          size="mini"
          @click="handleDelete('caseData', item)"
          v-if="paperType"
          >删除</el-button
        >
        <el-table
          :data="item.questions"
          style="width: 100%"
          :header-cell-style="{ background: 'rgb(235,244,248)' }"
          :row-style="{ background: 'rgb(240,248,250)' }"
          size="small"
        >
          <el-table-column type="index" width="50" align="center">
          </el-table-column>
          <el-table-column prop="question" label="题目"></el-table-column>
          <el-table-column
            prop="rightAnswer"
            label="正确答案"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleCheck(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="paper-table" v-if="questionType.video">
      <h1 class="ques-type">
        题型三: 视频题
        <div v-if="paperType">
          <el-button type="primary" size="small" @click="openTopic('video')"
            >添加试题</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="randomAddTopic('video')"
            >随机出题</el-button
          >
        </div>
      </h1>
      <el-table
        :data="videoData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(235,244,248)' }"
        :row-style="{ background: 'rgb(240,248,250)' }"
        size="small"
      >
        <el-table-column prop="topic" label="题目"></el-table-column>
        <el-table-column
          prop="rightAnswer"
          label="正确答案"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleCheck(scope.row)"
              >查看</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete('videoData', scope.row)"
              v-if="paperType"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加题型"
      :visible.sync="addTypeVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-select v-model="addType" placeholder="请选择要添加的题型">
        <el-option
          v-for="item in questionTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTypeSure" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="随机出题"
      :visible.sync="randomVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        v-model="randonNum"
        placeholder="请输入随机出题的数目"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="randomTopic" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <ques-dialog
      :dialogVisible.sync="quesDialogVisible"
      :currentTypeQues="currentTypeQues"
      :quesType="quesType"
      @addTopic="addTopic"
    ></ques-dialog>
    <check-ques
      :dialogVisible.sync="dialogVisibleCheck"
      :currentTopic="currentTopic"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      dialogVisibleCheck: false,
      paperType: false,
      addType: '',
      quesType: '',
      addTypeVisible: false,
      quesDialogVisible: false,
      randomVisible: false,
      randonNum: '',
      title: '',
      question: '',
      selectData: [],
      caseData: [],
      videoData: [],
      questionType: {
        select: false,
        case: false,
        video: false
      },
      questionLibrary: {},
      currentTypeQues: [],
      examMsg: {},
      currentTopic: {}
    };
  },
  computed: {
    ...mapState({
      questionTypeList: 'questionTypeList'
    })
  },
  watch: {
    examMsg() {
      this.$ajax
        .get(`/hmu/tea/getPaperByExam/${this.examMsg.examName}`)
        .then(res => {
          if (!res.result) {
            this.selectData = res.data.select.questions || [];
            this.selectData.forEach(item => {
              item.accuracy = (item.accuracy * 100).toFixed(2) + '%';
            });
            this.caseData = res.data.caseQuestions || [];
            if (this.selectData.length !== 0) {
              this.questionType.select = true;
            }
            if (this.caseData.length !== 0) {
              this.questionType.case = true;
            }
          } else {
            this.$message({
              type: 'error',
              message: '获取试卷信息失败！'
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
  methods: {
    goBack() {
      this.$router.push({ name: 'paperMaintenance' });
    },
    addTypeDialog() {
      this.addTypeVisible = true;
    },
    handleClose() {
      this.addType = '';
      this.randonNum = '';
      this.randomVisible = false;
      this.addTypeVisible = false;
    },
    addTypeSure() {
      this.questionType[this.addType] = true;
      this.getQuestions(this.addType);
      this.handleClose();
    },
    openTopic(type) {
      this.quesType = type;
      this.currentTypeQues = this.questionLibrary[type];
      this.quesDialogVisible = true;
    },
    getQuestions(type) {
      this.$ajax
        .post('/hmu/tea/getQuestionByDepartment', {
          department: this.examMsg.department,
          questionType: type
        })
        .then(res => {
          if (!res.result) {
            this.questionLibrary[type] = res.data;
          } else {
            this.$message({
              type: 'error',
              message: '获取题库试题失败！'
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
    addTopic(queObj) {
      if (this.quesType === 'select') {
        if (
          this.selectData.some(item => item.questionId === queObj.questionId)
        ) {
          this.exisMessage();
          return;
        }
        this.selectData.push(queObj);
      }
      if (this.quesType === 'case') {
        if (this.caseData.some(item => item.questionId === queObj.questionId)) {
          this.exisMessage();
          return;
        }
        this.caseData.push(queObj);
      }
      if (this.quesType === 'video') {
        if (
          this.videoData.some(item => item.questionId === queObj.questionId)
        ) {
          this.exisMessage();
          return;
        }
        this.videoData.push(queObj);
      }
    },
    randomAddTopic(type) {
      this.currentTypeQues = this.questionLibrary[type];
      this.randomVisible = true;
    },
    randomTopic() {
      let num = +this.randonNum;
      console.log(num);
      this.handleClose();
    },
    handleCheck(row) {
      this.currentTopic = row;
      this.dialogVisibleCheck = true;
    },
    handleDelete(type, row) {
      this[type] = this[type].filter(item => {
        return item.questionId !== row.questionId;
      });
    },
    exisMessage() {
      this.$message({
        type: 'error',
        message: '您选择的题目已经存在'
      });
    },
    savePaper() {
      let postData = [];
      let allScore = 0;
      this.selectData.forEach(item => {
        allScore += 5;
        let obj = {
          questionId: item.questionId,
          questionType: 'select',
          examName: this.examMsg.examName
        };
        postData.push(obj);
      });
      this.caseData.forEach(item => {
        allScore += item.questions.length * 5;
        let obj = {
          questionId: item.questionId,
          questionType: 'case',
          examName: this.examMsg.examName
        };
        postData.push(obj);
      });
      if (allScore !== 100) {
        this.$message({
          type: 'error',
          message: `试卷总分数应为100分， 现在试卷总分数为${allScore}分`
        });
        return;
      }
      this.$ajax
        .put('/hmu/tea/updatePaper', postData)
        .then(res => {
          if (!res.result) {
            this.$message({
              type: 'success',
              message: '保存试题成功！'
            });
            this.goBack();
          } else {
            this.$message({
              type: 'error',
              message: '保存试题失败！'
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
  components: {
    quesDialog: resolve => require(['../../../components/QuesDialog'], resolve),
    checkQues: resolve => require(['../../../components/checkQues'], resolve)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.examMsg) {
        vm._data.examMsg = to.params.examMsg;
        vm._data.paperType = to.params.paperType;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.ae-paper {
  margin: 0 10px;
  .paper-name {
    text-align: center;
  }
  .paper-table {
    .ques-type {
      display: flex;
      justify-content: space-between;
      margin: 0 0 10px 0;
    }
    padding: 20px 0 0 0;
    border-radius: 10px;
  }
}
</style>
