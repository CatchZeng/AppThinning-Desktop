<template>
  <div class="box">
    <p class="title"> AppThinning </p>
    <p class="path"> Your project path </p>
    <input type="text" v-model="path"/>
    <div class="button">
      <button class="start" v-on:click="onStartButtonClicked">start</button>
    </div>
  </div>
</template>

<script>
import appthinning from '../appthinning'

export default {  
  data: function () {
      return {
        path: ""
      }
  },
  methods: {
    onStartButtonClicked: function (event) {
      console.log("on start button clicked")
      console.log("path: "+ this.path)
      appthinning(this.path)
    }
  },
}
</script>

<style scoped>

</style>