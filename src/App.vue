<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
.el-table {
  .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-table__body-wrapper {
    background: rgb(240, 248, 250);
  }
}
</style>
