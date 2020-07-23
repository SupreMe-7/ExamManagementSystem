<template>
  <div class="left-bar">
    <div
      :class="item.message === currentBar ? 'item active' : 'item'"
      v-for="(item, index) in leftBarList"
      :key="index"
      @click="toMsgPage(item.pathName, item.message)"
    >
      <i :class="item.icon"></i>
      <p class="nav">{{item.message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftBarList: [
        {
          icon: 'el-icon-user-solid',
          message: '学生信息',
          pathName: 'studentMsg'
        },
        {
          icon: 'el-icon-document',
          message: '试卷分析',
          pathName: 'testMsg'
        },
        {
          icon: 'el-icon-edit-outline',
          message: '试卷管理',
          pathName: 'paperMaintenance'
        },
        {
          icon: 'el-icon-folder',
          message: '题库维护',
          pathName: 'questionsMaintenance'
        },
        {
          icon: 'el-icon-s-order',
          message: '课程管理',
          pathName: 'courseManagement'
        }
      ]
    };
  },
  props: ['currentBar'],
  methods: {
    toMsgPage(pathName, message) {
      this.$emit('changeCurrent', message);
      sessionStorage.setItem('currentBar', message);
      this.$router.push({ name: pathName });
    }
  }
};
</script>

<style lang="scss" scoped>
.left-bar {
  margin-top: 80px;
  .item {
    text-align: center;
    color: #fff;
    margin: 20px 0;
    &:hover {
      cursor: pointer;
      color: aqua;
    }
    i {
      font-size: 40px;
    }
    .nav {
      text-align: center;
      padding: 10px;
    }
    &.active {
      color: aqua;
    }
  }
}
</style>
