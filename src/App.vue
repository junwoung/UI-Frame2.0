<template>
  <div id="app">
    <!-- <v-frame></v-frame> -->
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router/index'
export default {
  name: 'App',
  router
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
