<!-- created by wangjun on 2019-07-25 -->
<template>
  <div>
    <v-row class="row" :height='80' style="opacity: 0.75;" flex='center space-around'>
      <v-col>
        <label class="label label-require">姓名</label>
        <v-input placeholder="姓名"></v-input>
      </v-col>
      <v-col>2222</v-col>
      <v-col>3333</v-col>
    </v-row>
    <v-row :colWidth='300' :height='50' style="margin-top: 50px;">
      <v-col>444</v-col>
      <v-col>555</v-col>
      <v-col>666</v-col>
    </v-row>
    <v-row :width='"300px"' :top='30' :left='0' :right='30' :bottom='20'>
      <v-col :width='"33%"' :top='30'>777</v-col>
      <v-col :width='"33%"'>888</v-col>
      <v-col :width='"33%"'>999</v-col>
    </v-row>
    <v-row :width='"80%"'>
      <v-col flex='none space-around' :width='700'>
        <label class="label label-require">姓名</label>
        <v-input placeholder="姓名"></v-input>
      </v-col>
      <v-col>bbb</v-col>
      <v-col>ccc</v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  methods: {
    init: function () {

    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.row {
  width: 90%;
  /* justify-content: space-around; */
}
.v-row {
  background-color: #e5e9f2;
}
</style>
