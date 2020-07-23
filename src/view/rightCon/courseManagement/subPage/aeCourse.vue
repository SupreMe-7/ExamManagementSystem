<template>
  <div class="ae-course">
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <div class="formsub">
      <el-form :model="form" ref="form" label-width="100px" class="demo-dynamic">
        <el-form-item
          prop="name"
          label="课程名称"
          :rules="{ required: true, message: '请输入课程名称', trigger: 'blur' }"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          prop="type"
          label="课程类型"
          :rules="{ required: true, message: '请输入课程类型', trigger: 'change' }"
        >
          <el-select v-model="form.type" placeholder="请选择课程类型">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="leader"
          label="负责人"
          :rules="{ required: true, message: '请输入负责人', trigger: 'blur' }"
        >
          <el-input v-model="form.leader"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in form.targetPoint"
          :label="'目标点' + index"
          :key="item.key"
          :prop="'targetPoint.' + index + '.value'"
          :rules="{
      required: true, message: '目标点不能为空', trigger: 'blur'
    }"
        >
          <el-input v-model="item.value"></el-input>
          <el-button
            v-if="form.targetPoint[form.targetPoint.length - 1] === item"
            type="primary"
            @click="addDomain"
            icon="el-icon-plus"
            size="mini"
            circle
          ></el-button>
          <el-button
            v-if="form.targetPoint[0] !== item"
            type="danger"
            icon="el-icon-minus"
            @click.prevent="removeDomain(item)"
            size="mini"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
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
        name: '',
        type: '',
        leader: '',
        targetPoint: [
          {
            value: ''
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      typeList: 'typeList'
    })
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'courseManagement' });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过, 发送请求存数据TODO:
          this.$router.push({
            name: 'courseManagement'
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    removeDomain(item) {
      var index = this.form.targetPoint.indexOf(item);
      if (index !== -1) {
        this.form.targetPoint.splice(index, 1);
      }
    },
    addDomain() {
      this.form.targetPoint.push({
        value: '',
        key: Date.now()
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._data.title = to.params.title;
      if (to.params.formData) {
        vm._data.form = to.params.formData;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.ae-course {
  .formsub {
    margin: 30px 20px;
    .el-input {
      width: 260px;
    }
    .el-select {
      width: 260px;
    }
  }
}
</style>
