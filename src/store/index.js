import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  typeList: [],
  gradeList: [
    {
      value: '2017',
      label: '2017'
    },
    {
      value: '2018',
      label: '2018'
    },
    {
      value: '2019',
      label: '2019'
    },
    {
      value: '2020',
      label: '2020'
    },
    {
      value: '2021',
      label: '2021'
    },
    {
      value: '2022',
      label: '2022'
    },
    {
      value: '2023',
      label: '2023'
    },
    {
      value: '2024',
      label: '2024'
    },
    {
      value: '2025',
      label: '2025'
    },
    {
      value: '2026',
      label: '2026'
    },
    {
      value: '2027',
      label: '2027'
    },
    {
      value: '2028',
      label: '2028'
    }
  ],
  courseNameList: [],
  roundList: [
    {
      label: '1',
      value: '1'
    },
    {
      label: '2',
      value: '2'
    },
    {
      label: '3',
      value: '3'
    },
    {
      label: '4',
      value: '4'
    },
    {
      label: '5',
      value: '5'
    }
  ],
  questionTypeList: [
    {
      label: '选择题',
      value: 'select'
    },
    {
      label: '案例题',
      value: 'case'
    },
    {
      label: '视频题',
      value: 'video'
    }
  ],
  scoreList: [
    {
      label: '1分',
      value: '1分'
    },
    {
      label: '3分',
      value: '3分'
    },
    {
      label: '5分',
      value: '5分'
    }
  ]
};
const mutations = {
  setTypeList(state, obj) {
    obj.forEach(item => {
      let obj = {
        label: item,
        value: item
      };
      state.typeList.push(obj);
    });
  },
  setAllDepartment(state, obj) {
    obj.forEach(item => {
      let obj = {
        label: item,
        value: item
      };
      state.courseNameList.push(obj);
    });
  }
};

const store = new Vuex.Store({
  state,
  mutations
});

export default store;
