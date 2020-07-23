<template>
  <div class="ques-dialog">
    <el-dialog title="添加题目" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-row>
        请选择题目:
        <el-select v-model="value" placeholder="请选择题目" size="small" popper-class="ques-popper">
          <el-option
            v-for="item in currentTypeQues"
            :key="item.value"
            :label="item.question"
            :value="item.questionId"
          ></el-option>
        </el-select>
      </el-row>
      <div class="question" v-if="value && quesType === 'select'">
        <div class="toptic-details">
          <p class="toptic-content">&nbsp;&nbsp;题目详情: {{currentTopic.question}}</p>
          <div class="options-content">
            选项:
            <div class="options">A：{{ currentTopic.a }}</div>
            <div class="options">B：{{ currentTopic.b }}</div>
            <div class="options">C：{{ currentTopic.c }}</div>
            <div class="options">D：{{ currentTopic.d }}</div>
          </div>
          <p>
            <span class="answer">正确答案: {{currentTopic.rightAnswer}}</span>
          </p>
        </div>
      </div>
      <div class="question" v-if="value && quesType === 'case'" >
        <div class="toptic-details">
          <p class="toptic-content">&nbsp;&nbsp;题目详情: {{currentTopic.question}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      currentTopic: {}
    };
  },
  watch: {
    value(newVal) {
      this.currentTopic = this.currentTypeQues.find(item => {
        return item.questionId === newVal;
      });
    }
  },
  props: {
    dialogVisible: Boolean,
    currentTypeQues: Array,
    quesType: String
  },
  methods: {
    handleClose() {
      this.value = '';
      this.currentTopic = {};
      this.$emit('update:dialogVisible', false);
    },
    confirm() {
      this.$emit('addTopic', this.currentTopic);
      this.handleClose();
    }
  }
};
</script>

<style lang="scss" scoped>
.ques-dialog {
  .el-dialog {
    .el-select {
      width: 400px;
    }
    .toptic-content {
      margin: 10px 0;
    }
    .options-content {
      margin: 0 0 10px 0;
      .options {
        margin: 5px;
      }
    }
  }
}
</style>

<style lang="scss">
.ques-popper {
  width: 400px;
}
</style>
