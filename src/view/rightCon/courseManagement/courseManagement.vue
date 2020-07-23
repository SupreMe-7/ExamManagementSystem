<template>
  <div class="course-management">
    <div class="search-bar">
      <el-select v-model="type" placeholder="专业类别" clearable>
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="courseName" placeholder="课程名称" clearable>
        <el-option
          v-for="item in courseNameList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="headName" placeholder="负责人" clearable>
        <el-option
          v-for="item in headNameList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" size="small">搜索</el-button>
      <el-button type="primary" size="small" @click="addCourse">添加课程</el-button>
    </div>
    <div class="content-bar">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background: 'rgb(235,244,248)'}"
        :row-style="{background: 'rgb(240,248,250)'}"
        size="small"
        height="500px"
      >
        <el-table-column prop="date" label="课程类别" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="课程名称" width="180" align="center"></el-table-column>
        <el-table-column prop="address" label="负责人" align="center"></el-table-column>
        <el-table-column prop="target" label="目标点" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      currentPage: 1,
      headNameList: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      type: '',
      courseName: '',
      headName: '',
      tableData: [
        {
          date: '物联网',
          name: 'Java',
          address: '崔老师',
          target: '1. Java与程序 2. Java的特点'
        }
      ],
      formData: {
        name: '课程设计',
        type: '高sss',
        leader: '崔晓萌',
        targetPoint: [
          {
            value: '2'
          },
          {
            value: '士大夫'
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      typeList: 'typeList',
      gradeList: 'gradeList',
      courseNameList: 'courseNameList'
    })
  },
  methods: {
    handleEdit(row) {
      // TODO: 从接口获取课程信息或者直接拿信息
      this.$router.push({
        name: 'aeCourse',
        params: { title: '编辑课程', formData: this.formData }
      });
    },
    addCourse() {
      this.$router.push({
        name: 'aeCourse',
        params: { title: '添加课程' }
      });
    },
    // 当前页改变触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.course-management {
  margin: 0 10px;
  .search-bar {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #e5edef;
    border-radius: 10px;
    margin: 0 0 15px 0;
    .el-select {
      margin: 0 60px 0 0;
    }
  }
  .content-bar {
    padding: 20px 0 0 0;
  }
}
</style>
