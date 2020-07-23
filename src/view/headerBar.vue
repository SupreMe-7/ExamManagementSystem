<template>
  <div class="header-bar">{{currentBar}}</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['currentBar']
};
</script>

<style lang="scss" scoped>
.header-bar {
  min-width: 864px;
  height: 60px;
  line-height: 60px;
  padding: 0 30px;
  background-color: rgb(242, 242, 242);
  font-size: 26px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}
</style>
