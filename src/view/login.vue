<template>
  <div class="login">
    <div class="mask"></div>
    <div class="main-content">
      <div class="main-header">
        <h1 class="caption">考试查询系统登录</h1>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          size="large"
        >
          <el-form-item prop="phone" label-width="0">
            <el-input
              placeholder="请输入手机号"
              prefix-icon="el-icon-user"
              v-model="ruleForm.phone"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code" label-width="0">
            <div class="send-code">
              <el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-lock"
                type="code"
                v-model="ruleForm.code"
              ></el-input>
              <el-button
                size="small"
                type="primary"
                @click="sendCode"
                :disabled="sendDisable"
                >{{ sendText }}</el-button
              >
            </div>
          </el-form-item>
        </el-form>
        <el-button type="primary" round @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        phone: '',
        code: ''
      },
      sendText: '发送验证码',
      sendDisable: false,
      rules: {
        phone: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    login() {
      let postData = {
        phone: this.ruleForm.phone,
        code: this.ruleForm.code,
        mode: 'sms'
      };
      postData = JSON.stringify(postData);
      this.$ajax
        .post(`/hmu/user/login?param=${encodeURIComponent(postData)}`)
        .then(res => {
          if (res.result === 0) {
            if (res.data.isNew) {
              this.$router.push({
                name: 'resign',
                query: { phone: this.phone }
              });
              return;
            }
            console.log('sssss');
            sessionStorage.setItem('TOKEN', res.data.token);
            sessionStorage.setItem('stuId', res.data.stuId);
            this.$router.push({ name: 'defaultPage' });
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
    sendCode() {
      let reg = new RegExp(/^1\d{10}$/);
      if (!reg.test(this.ruleForm.phone)) {
        this.$message({
          type: 'error',
          message: '手机号格式错误'
        });
        return;
      }
      this.$ajax
        .post(`/hmu/user/sendsms?phone=${this.ruleForm.phone}`)
        .then(res => {
          if (res.result === 0) {
            this.changeSendText();
          } else {
            this.$message({
              type: 'error',
              message: res.errMsg
            });
          }
        });
    },
    changeSendText() {
      const that = this;
      let time = 60;
      this.sendDisable = true;
      let timeInt = setInterval(() => {
        that.sendText = time-- + '秒后重发';
        if (time === -1) {
          that.sendText = '发送验证码';
          that.sendDisable = false;
          window.clearInterval(timeInt);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-image: url('http://image.wjx.com/images/newimg/register-login/bacg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .main-content {
    width: 480px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -260px;
    margin-left: -240px;
    z-index: 2;
    border-radius: 14px;
    background-color: #fff;
    .main-header {
      padding: 0 50px 20px 50px;
      .caption {
        font-size: 24px;
        line-height: 24px;
        font-weight: bold;
        color: #fa9111;
        padding: 40px 0;
        text-align: left;
      }
      .el-button {
        width: 380px;
      }
      .send-code {
        .el-input {
          display: inline-block;
          width: 275px;
        }
        .el-button {
          display: inline-block;
          width: 100px;
        }
      }
    }
  }
}
</style>
