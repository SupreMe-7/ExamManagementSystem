<template>
  <div class="stu-paper">
    <el-page-header
      @back="goBack"
      :content="stuMsg.examName + stuMsg.name + '的试卷'"
    ></el-page-header>
    <div class="toptic">
      <div class="select-question" v-if="topicList.selectQues.length">
        <h1>选择题</h1>
        <div
          class="toptic-details"
          v-for="(item, index) in topicList.selectQues"
          :key="index"
        >
          <p class="toptic-content">{{ index + 1 }}.{{ item.question }}</p>
          <div class="options-content">
            <span class="options">A：{{ item.a }}</span>
            <span class="options">B：{{ item.b }}</span>
            <span class="options">C：{{ item.c }}</span>
            <span class="options">D：{{ item.d }}</span>
          </div>
          <p>
            <span class="answer" :class="item.isRight ? '' : 'error'"
              >学生答案: {{ item.stuAnswer }}</span
            >
            <span class="answer">正确答案: {{ item.rightAnswer }}</span>
          </p>
        </div>
      </div>
      <div class="case-question" v-if="topicList.caseQues.length">
        <h1>案例题</h1>
        <div
          class="toptic-details"
          v-for="(item, index) in topicList.caseQues"
          :key="index"
        >
          <p class="toptic-content">{{ index + 1 }}.{{ item.question }}</p>
          <div
            class="options-content"
            v-for="(v, k) in item.questions"
            :key="k"
          >
            <p class="toptic-content">题目{{ k + 1 }}.{{ v.question }}</p>
            <span class="options">A：{{ v.a }}</span>
            <span class="options">B：{{ v.b }}</span>
            <span class="options">C：{{ v.c }}</span>
            <span class="options">D：{{ v.d }}</span>
            <p>
              <span class="answer" :class="item.isRight ? '' : 'error'"
                >学生答案: {{ v.stuAnswer }}</span
              >
              <span class="answer">正确答案: {{ v.rightAnswer }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="video-question" v-if="topicList.videoQues.length">
        <h1>视频题</h1>
        <div
          class="toptic-details"
          v-for="(item, index) in topicList.videoQues"
          :key="index"
        >
          <p class="toptic-content">{{ index + 1 }}.{{ item.totalTopic }}</p>
          <!-- TODO: -->
          <video
            id="player-container-id"
            width="414"
            height="270"
            preload="auto"
            playsinline
            webkit-playsinline
          ></video>
          <div
            class="options-content"
            v-for="(v, k) in item.selectQues"
            :key="k"
          >
            <p class="toptic-content">题目{{ k + 1 }}.{{ v.topic }}</p>
            <span
              class="options"
              v-for="(value, key, index) in v.options"
              :key="index"
              >{{ key }}.{{ value }}</span
            >
            <p>
              <span class="answer">学生答案: {{ v.stuAnswer }}</span>
              <span class="answer">正确答案: {{ v.rightAnswer }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="//imgcache.qq.com/open/qcloud/video/tcplayer/ie8/videojs-ie8.js"></script>
<script src="//imgcache.qq.com/open/qcloud/video/tcplayer/libs/hls.min.0.12.4.js"></script>
<script src="//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.min.js"></script>
<script>
export default {
  data() {
    return {
      stuMsg: {},
      topicList: {
        selectQues: [],
        caseQues: [],
        videoQues: []
      }
    };
  },
  computed: {},
  watch: {
    stuMsg() {
      this.$ajax
        .get(`/hmu/tea/getPaperByExam/${this.stuMsg.examName}`)
        .then(res => {
          if (!res.result) {
            this.topicList.selectQues = res.data.select.questions || [];
            this.topicList.caseQues = res.data.caseQuestions || [];
            this.topicList.videoQues = res.data.videoQues || [];
            this.$ajax
              .post('/hmu/tea/getAnswerByStuExam', {
                stuId: this.stuMsg.stuId,
                examName: this.stuMsg.examName
              })
              .then(res => {
                const resData = res.data;
                for (let i = 0; i < resData.length; i++) {
                  this.topicList.selectQues.forEach(item => {
                    if (item.questionId === resData[i].questionId) {
                      this.$set(item, 'stuAnswer', resData[i].answer);
                      this.$set(item, 'isRight', resData[i].isRight);
                    }
                  });
                  this.topicList.caseQues.forEach(item => {
                    item.questions.forEach(ele => {
                      if (ele.questionId === resData[i].questionId) {
                        this.$set(ele, 'stuAnswer', resData[i].answer);
                        this.$set(ele, 'isRight', resData[i].isRight);
                      }
                    });
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
      this.$router.push({ name: 'examiner' });
    }
  },
  // mounted() {
  //   var player = TCPlayer('player-container-id', {
  //     // player-container-id 为播放器容器 ID，必须与 html 中一致
  //     fileID: '4564972818956091133', // 请传入需要播放的视频 filID（必须）
  //     appID: '1253668508' // 请传入点播账号的 appID（必须）
  //   });
  // },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._data.stuMsg = to.params.stuMsg;
    });
  }
};
</script>

<style lang="scss" scoped>
.stu-paper {
  .toptic {
    margin: 20px 0 0 50px;
    width: 1000px;
    .select-question {
      .toptic-details {
        margin: 0 0 10px 30px;
        .options-content {
          margin: 5px 20px;
          .options {
            margin-right: 40px;
          }
        }
        .answer {
          margin: 0 20px 0 20px;
        }
        .error {
          color: #ff0000;
        }
      }
    }
    .case-question {
      .toptic-details {
        margin: 0 0 10px 30px;
        .options-content {
          margin: 5px 30px;
          .options {
            margin: 40px;
          }
        }
        .answer {
          margin: 0 20px 0 20px;
        }
        .error {
          color: #ff0000;
        }
      }
    }
    .video-question {
      .toptic-details {
        margin: 0 0 10px 30px;
        .options-content {
          margin: 5px 30px;
          .options {
            margin: 40px;
          }
        }
        .answer {
          margin: 0 20px 0 20px;
        }
        .error {
          color: #ff0000;
        }
      }
    }
  }
}
</style>
