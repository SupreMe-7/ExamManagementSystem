<template>
  <div class="ae-question">
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <div class="formsub">
      <el-row>
        题目类别：
        <el-select v-model="form.department" placeholder="请选择题目类别">
          <el-option
            v-for="item in courseNameList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-row>
      <el-row>
        题目题型：
        <el-select v-model="form.questionType" placeholder="请选择题型">
          <el-option
            v-for="item in questionTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-row>
      <!-- <el-row
        >
          <el-select v-model="form.score" placeholder="请选择分值">
            <el-option
              v-for="item in scoreList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-row> -->
      <!-- 目标点， 暂时不做 -->
      <!-- <el-row
        >
          <el-select v-model="form.targetPoint" placeholder="请选择目标点">
            <el-option
              v-for="item in targetList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-row> -->
      <div class="add-select" v-if="form.questionType === 'select'">
        <el-row type="flex" align="top">
          试题内容：
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入内容"
            v-model="form.questionCon"
          ></el-input>
        </el-row>
        <el-row>
          选项A：
          <el-input placeholder="请输入内容" v-model="form.a"></el-input>
        </el-row>
        <el-row>
          选项B：
          <el-input placeholder="请输入内容" v-model="form.b"></el-input>
        </el-row>
        <el-row>
          选项C：
          <el-input placeholder="请输入内容" v-model="form.c"></el-input>
        </el-row>
        <el-row>
          选项D：
          <el-input placeholder="请输入内容" v-model="form.d"></el-input>
        </el-row>
        <el-row
          >正确答案：
          <el-radio-group v-model="form.rightAnswer">
            <el-radio label="A">A</el-radio>
            <el-radio label="B">B</el-radio>
            <el-radio label="C">C</el-radio>
            <el-radio label="D">D</el-radio>
          </el-radio-group>
        </el-row>
      </div>
      <div class="add-case" v-if="form.questionType === 'case'">
        <el-row type="flex" align="top">
          试题内容：
          <el-col :span="8">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5 }"
              placeholder="请输入内容"
              v-model="form.questionCon"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-button @click="addCaseQues">添加选择题</el-button>
          </el-col>
        </el-row>
        <div
          class="case-questions"
          v-for="(item, index) in form.caseQuestions"
          :key="index"
        >
          <el-row>
            题目{{ ++index }}：
            <el-input
              placeholder="请输入内容"
              v-model="item.questionCon"
            ></el-input>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="removeCaseQues(item)"
            ></el-button>
          </el-row>
          <el-row>
            选项A：
            <el-input placeholder="请输入内容" v-model="item.a"></el-input>
          </el-row>
          <el-row>
            选项B：
            <el-input placeholder="请输入内容" v-model="item.b"></el-input>
          </el-row>
          <el-row>
            选项C：
            <el-input placeholder="请输入内容" v-model="item.c"></el-input>
          </el-row>
          <el-row>
            选项D：
            <el-input placeholder="请输入内容" v-model="item.d"></el-input>
          </el-row>
          <el-row
            >正确答案：
            <el-radio-group v-model="item.rightAnswer">
              <el-radio label="A">A</el-radio>
              <el-radio label="B">B</el-radio>
              <el-radio label="C">C</el-radio>
              <el-radio label="D">D</el-radio>
            </el-radio-group>
          </el-row>
        </div>
      </div>
      <el-row>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      title: '',
      form: {
        department: '',
        questionType: '',
        // targetPoint: '',
        questionCon: '',
        a: '',
        b: '',
        c: '',
        d: '',
        rightAnswer: '',
        caseQuestions: [],
        videoQuestions: []
      },
      row: {},
      type: 'add'
    };
  },
  computed: {
    ...mapState({
      typeList: 'typeList',
      questionTypeList: 'questionTypeList',
      courseNameList: 'courseNameList'
    })
  },
  watch: {
    row() {
      this.form.department = this.row.department;
      this.form.questionType = this.row.questionType;
      this.form.questionCon = this.row.question;
      this.form.a = this.row.a;
      this.form.b = this.row.b;
      this.form.c = this.row.c;
      this.form.d = this.row.d;
      this.form.rightAnswer = this.row.rightAnswer;
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'questionsMaintenance' });
    },
    submitForm() {
      if (this.type === 'add') {
        this.$ajax
          .post('/hmu/tea/insertSelectQuestion', {
            questionId: 1,
            question: this.form.questionCon,
            a: this.form.a,
            b: this.form.b,
            c: this.form.c,
            d: this.form.d,
            rightAnswer: this.form.rightAnswer,
            department: this.form.department
          })
          .then(res => {
            if (!res.result) {
              this.$message({
                type: 'success',
                message: '添加试题信息成功！'
              });
              this.goBack();
            } else {
              this.$message({
                type: 'error',
                message: '添加试题信息失败！'
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
        this.$ajax
          .put('/hmu/tea/updateSelectQuestion', {
            questionId: this.row.questionId,
            question: this.form.questionCon,
            a: this.form.a,
            b: this.form.b,
            c: this.form.c,
            d: this.form.d,
            rightAnswer: this.form.rightAnswer,
            department: this.form.department
          })
          .then(res => {
            if (!res.result) {
              this.$message({
                type: 'success',
                message: '更新试题信息成功！'
              });
              this.goBack();
            } else {
              this.$message({
                type: 'error',
                message: '更新试题信息失败！'
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

      // this.$router.push({
      //   name: 'questionsMaintenance'
      // });
    },
    // 添加案例题的选择题
    addCaseQues() {
      let obj = {
        questionCon: '',
        a: '',
        b: '',
        c: '',
        d: '',
        rightAnswer: ''
      };
      this.form.caseQuestions.push(obj);
    },
    removeCaseQues(item) {
      this.form.caseQuestions = this.form.caseQuestions.filter(ele => {
        return ele !== item;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._data.title = to.params.title;
      if (to.params.row) {
        vm._data.type = 'edit';
        vm._data.row = to.params.row;
      } else {
        vm._data.type = 'add';
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.ae-question {
  .formsub {
    margin: 30px 50px;
    .el-row {
      margin-bottom: 20px;
    }
    .el-input {
      width: 260px;
    }
    .el-select {
      width: 260px;
    }
    .el-textarea {
      width: 400px;
    }
    .case-questions {
      margin-left: 40px;
      margin-bottom: 40px;
    }
  }
}
</style>
