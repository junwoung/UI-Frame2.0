<template>
  <div id="app">
    <v-frame></v-frame>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
/**  引入重置样式/公共样式  **/
@import "./frame/common/reset.css";
@import "./frame/common/common.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
