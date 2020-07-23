<template>
  <div class="questions-maintenance">
    <el-row class="questions-option">
      <el-col :span="5">
        <el-select v-model="department" placeholder="考试部门">
          <el-option
            v-for="item in courseNameList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select v-model="questionType" placeholder="题型" clearable>
          <el-option
            v-for="item in questionTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="5">
        <el-select v-model="score" placeholder="分值" clearable>
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col> -->
      <!-- <el-col :span="5">
        <el-select v-model="targetPoint" placeholder="考核目标点" clearable>
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col> -->
      <el-col :span="4">
        <el-button type="primary" size="small" @click="searchQuestion"
          >搜索</el-button
        >
        <el-button type="primary" size="small" @click="addQuestion"
          >添加试题</el-button
        >
      </el-col>
    </el-row>
    <el-row class="questions-table select" v-if="selectData.length">
      <h1>选择题</h1>
      <el-table
        :data="selectData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(235,244,248)' }"
        :row-style="{ background: 'rgb(240,248,250)' }"
        size="small"
        max-height="500px"
      >
        <!-- <el-table-column
          label="目标点"
          width="200"
          prop="targetPoint"
          align="center"
        ></el-table-column> -->
        <el-table-column label="试题内容" prop="question"></el-table-column>
        <el-table-column
          label="正确答案"
          prop="rightAnswer"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="checkQuestion(scope.row)"
              type="primary"
              >查看</el-button
            >
            <el-button size="mini" @click="handleEdit('select', scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="handleDelete(scope.row, 'select')"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="questions-table case" v-if="caseData.length">
      <h1>案例题</h1>
      <div class="case-title" v-for="(item, index) in caseData" :key="index">
        <span>&nbsp;&nbsp;题目{{ index + 1 }}： {{ item.question }}</span>
        <!-- <el-button
          type="danger"
          size="mini"
          @click="handleDelete('caseData', item)"
          >删除</el-button
        > -->
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
                @click="checkQuestion(scope.row)"
                >查看</el-button
              >
              <!-- <el-button size="mini" @click="handleEdit('case', scope.row)"
                >编辑</el-button
              > -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <el-row class="questions-table video" v-show="videoData.length">
      <h1>视频题</h1>
      <div class="video-title" v-for="(item, index) in videoData" :key="index">
        <video
          :id="'player-container-id' + index"
          width="414"
          height="270"
          preload="auto"
          playsinline
          webkit-playsinline
        ></video>
        <!-- <el-button
          type="danger"
          size="mini"
          @click="handleDelete('videoData', item)"
          >删除</el-button
        > -->
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
                @click="checkQuestion(scope.row)"
                >查看</el-button
              >
              <el-button size="mini" @click="handleEdit('video', scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <check-ques
      :dialogVisible.sync="dialogVisible"
      :currentTopic="currentTopic"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      dialogVisible: false,
      department: '',
      questionType: '',
      // score: '',
      targetPoint: '',
      selectData: [],
      caseData: [],
      videoData: [
        {
          options: {
            fileID: '5285890797318031214',
            appID: '1300414804'
          }
        }
      ],
      currentTopic: {},
      player: []
    };
  },
  components: {
    checkQues: resolve => require(['../../components/checkQues'], resolve)
  },
  computed: {
    ...mapState({
      courseNameList: 'courseNameList',
      questionTypeList: 'questionTypeList'
    })
  },
  methods: {
    checkQuestion(row) {
      this.currentTopic = row;
      this.dialogVisible = true;
    },
    addQuestion() {
      this.$router.push({ name: 'aeQuestion', params: { title: '添加试题' } });
    },
    handleEdit(type, row) {
      this.$router.push({
        name: 'aeQuestion',
        params: {
          title: '编辑试题',
          row: {
            ...row,
            department: this.department,
            questionType: type
          }
        }
      });
    },
    searchQuestion() {
      // this.player.dispose();
      this.$ajax
        .post('/hmu/tea/getQuestionByDepartment', {
          department: this.department,
          questionType: this.questionType !== '' ? this.questionType : null
        })
        .then(res => {
          if (!res.result) {
            this.selectData = res.data.select;
            this.caseData = res.data.caseQusetion;
            this.videoData = res.data.videoQueston;
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          });
        });
    },
    handleDelete(row, questionType) {
      console.log(row);
      this.$confirm('此操作将永久删除该试题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax
            .delete(`/hmu/tea/deleteQuestion/${questionType}/${row.questionId}`)
            .then(res => {
              if (!res.result) {
                this.$message({
                  type: 'success',
                  message: '删除试题成功！'
                });
                this.searchQuestion();
              } else {
                this.$message({
                  type: 'error',
                  message: '删除试题失败！'
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
  watch: {
    // TODO:  题库中含视频题， 再次搜索视频题不会加载，  修改后视频题再次搜索含有视频题时会报Cannot read property 'nodeName' of null"，   id相同是一种可能，
    videoData() {
      // ++++
      if (this.player.length) {
        console.log('aaaa');
        this.player.forEach(item => {
          console.log('sss');
          item.dispose();
        });
        this.player = [];
      }
      this.$nextTick(() => {
        if (this.videoData.length) {
          this.videoData.forEach((item, i) => {
            // TCPlayer(`player-container-id${i}`, {
            //   appID: '1300414804',
            //   fileID: item.question
            // });
            this.player.push(
              TCPlayer(`player-container-id${i}`, {
                appID: '1300414804',
                fileID: item.question
              })
            );
          });
        }
      });
    }
  },
  mounted() {
    this.department = '呼吸内';
    this.searchQuestion();
  }
};
</script>

<style lang="scss" scoped>
.questions-maintenance {
  margin: 0 10px;
  .tcplayer {
    display: inline-block;
  }
  .questions-option {
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
  .questions-table {
    padding: 20px 0 0 0;
  }
}
</style>
