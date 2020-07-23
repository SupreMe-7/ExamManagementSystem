<template>
  <div class="default-page">
    <div class="msg-title">
      <div class="my-header">
        <div class="title-logo">
          <span class="logo">Logo</span>
          <span class="logo-name">考试信息后台管理系统</span>
        </div>
        <div class="user-name">
          <i class="el-icon-user"></i>
          <span>{{ user }}</span>
          <el-button type="text">退出</el-button>
        </div>
      </div>
    </div>
    <el-container :style="{ padding: '56px 0 0 0' }">
      <el-aside width="100px">
        <left-bar
          @changeCurrent="changeCurrent"
          :currentBar="currentBar"
        ></left-bar>
      </el-aside>
      <el-container>
        <el-header :style="{ padding: '0' }">
          <header-bar :currentBar="currentBar"></header-bar>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      currentBar: '学生信息',
      user: ''
    };
  },
  methods: {
    ...mapMutations(['setTypeList', 'setAllDepartment']),
    changeCurrent(data) {
      this.currentBar = data;
    },
    getAllData() {
      this.$ajax
        .get('/hmu/tea/getType')
        .then(res => {
          if (!res.result) {
            this.setTypeList(res.data);
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          });
        });
      this.$ajax
        .get('/hmu/tea/getAllDepartment')
        .then(res => {
          if (!res.result) {
            this.setAllDepartment(res.data);
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
    leftBar: resolve => require(['./leftBar'], resolve),
    headerBar: resolve => require(['./headerBar'], resolve)
  },
  created() {
    if (sessionStorage.getItem('currentBar') !== null) {
      this.currentBar = sessionStorage.getItem('currentBar');
    }
    if (sessionStorage.getItem('user') !== null) {
      this.user = sessionStorage.getItem('user');
    }
  },
  mounted() {
    this.getAllData();
  }
};
</script>

<style lang="scss" scoped>
.default-page {
  height: 100%;
  .msg-title {
    position: fixed !important;
    top: 0;
    background-color: #ffffff;
    width: 100%;
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #262626;
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12),
      0px 1px 0px 0px rgba(232, 232, 232, 1);
    .my-header {
      display: flex;
      justify-content: space-between;
      margin: 0 50px;
    }
    .title-logo {
      font-size: 20px;
    }
    .user-name {
      span {
        margin: 0 10px 0 0;
      }
    }
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    height: 100%;
    background-color: #0e2b47;
  }
  .el-main {
    height: 100%;
    background: #f0f8fa;
  }
}
</style>
