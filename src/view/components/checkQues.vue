<template>
  <div class="ques-dialog">
    <el-dialog
      title="题目信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="question">
        <div class="toptic-details">
          <p class="toptic-content">
            题目详情: <br />
            &nbsp;&nbsp;{{ currentTopic.question }}
          </p>
          <div class="options-content">
            选项: <br />
            <span class="options">A：{{ currentTopic.a }}</span>
            <span class="options">B：{{ currentTopic.b }}</span>
            <span class="options">C：{{ currentTopic.c }}</span>
            <span class="options">D：{{ currentTopic.d }}</span>
          </div>
          <p>
            <span class="answer">正确答案: {{ currentTopic.rightAnswer }}</span>
          </p>
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
      value: ''
    };
  },
  props: {
    dialogVisible: Boolean,
    currentTopic: Object
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false);
    },
    confirm() {
      this.handleClose();
    }
  }
};
</script>

<style lang="scss" scoped>
.ques-dialog {
  .el-dialog {
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

<style lang="scss"></style>
