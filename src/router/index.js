import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/view/login'], resolve)
    },
    {
      path: '/defaultPage',
      name: 'defaultPage',
      component: resolve => require(['@/view/defaultPage'], resolve),
      redirect: '/defaultPage/studentMsg',
      children: [
        {
          path: 'studentMsg',
          name: 'studentMsg',
          component: resolve =>
            require(['@/view/rightCon/stuMsg/studentMsg'], resolve)
        },
        {
          path: 'testMsg',
          name: 'testMsg',
          component: resolve =>
            require(['@/view/rightCon/testMsg/testMsg'], resolve)
        },
        {
          path: 'testAnalysis',
          name: 'testAnalysis',
          component: resolve =>
            require(['@/view/rightCon/testMsg/subPage/testAnalysis'], resolve)
        },
        {
          path: 'examiner',
          name: 'examiner',
          component: resolve =>
            require(['@/view/rightCon/testMsg/subPage/examiner'], resolve)
        },
        {
          path: 'stuPaper',
          name: 'stuPaper',
          component: resolve =>
            require(['@/view/rightCon/testMsg/subPage/stuPaper'], resolve)
        },
        {
          path: 'paperMaintenance',
          name: 'paperMaintenance',
          component: resolve =>
            require([
              '@/view/rightCon/paperMaintenance/paperMaintenance'
            ], resolve)
        },
        {
          path: 'questionsMaintenance',
          name: 'questionsMaintenance',
          component: resolve =>
            require([
              '@/view/rightCon/questionsMaintenance/questionsMaintenance'
            ], resolve)
        },
        {
          path: 'courseManagement',
          name: 'courseManagement',
          component: resolve =>
            require([
              '@/view/rightCon/courseManagement/courseManagement'
            ], resolve)
        },
        {
          path: 'aeCourse',
          name: 'aeCourse',
          component: resolve =>
            require([
              '@/view/rightCon/courseManagement/subPage/aeCourse'
            ], resolve)
        },
        {
          path: 'aeQuestion',
          name: 'aeQuestion',
          component: resolve =>
            require([
              '@/view/rightCon/questionsMaintenance/subPage/aeQuestion'
            ], resolve)
        },
        {
          path: 'aePaper',
          name: 'aePaper',
          component: resolve =>
            require([
              '@/view/rightCon/paperMaintenance/subPage/aePaper'
            ], resolve)
        },
        {
          path: 'setStu',
          name: 'setStu',
          component: resolve =>
            require([
              '@/view/rightCon/paperMaintenance/subPage/setStudent'
            ], resolve)
        }
      ]
    }
  ]
});
