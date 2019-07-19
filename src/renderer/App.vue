<template>
  <div class="box">
    <p class="title"> AppThinning </p>

    <p class="path"> Your project path </p>
    <div>
      <p class="alert alert-info" id="drag-file" v-show="path =='Drag your project here.'" @drop="onDrop" @dragover.prevent >{{path}}</p>
      <input type="text" id="projectPath" v-show="path !='Drag your project here.'" v-model="path"/>
    </div>

    <p> Support types </p>
    <label><input v-model="jpgEnabled" type="checkbox"/>jpg</label> 
    <label><input v-model="jpegEnabled" type="checkbox"/>jpeg</label> 
    <label><input v-model="pngEnabled" type="checkbox"/>png</label> 
    <label><input v-model="gifEnabled" type="checkbox"/>gif</label> 
    <label><input v-model="svgEnabled" type="checkbox"/>svg</label>

    <p> Size </p>
     <input v-model="miniSize" type="text" placeholder="mini" oninput = "value=value.replace(/[^\d]/g,'')">
    -
    <input v-model="maxSize" type="text" placeholder="max" oninput = "value=value.replace(/[^\d]/g,'')">
    Kb

    <p> Compression type </p>
		<label><input type="radio" v-model="compression" value="imageOptim">ImageOptim</label>
		<label><input type="radio" v-model="compression" value="tinyPng">TinyPng</label>
    <input v-show="compression=='tinyPng'" v-model="key" type="text" placeholder="TinyPng key">

    <p></p>
    <div class="button">
      <button class="start" v-on:click="onStartButtonClicked">start</button>
    </div>
  </div>
</template>

<script>
import appthinning from '../appthinning'
import { type, constants } from 'os';

export default {  
  data: function () {
      return {
        path: "Drag your project here.",
        pngEnabled: true,
        jpgEnabled: true,
        jpegEnabled: true,
        gifEnabled: true,
        svgEnabled: true,
        miniSize: "",
        maxSize: "",
        compression: 'imageOptim',
        key: undefined
      }
  },
  methods: {
    onDrop: function(event) {
      console.log('drop')
      event.preventDefault();
      event.stopPropagation();

      for (let f of event.dataTransfer.files) {
        console.log('The file(s) you dragged: ', f)
        this.path = f.path
      }
    },
    onStartButtonClicked: function (event) {
      const types = this.getTypes()
      const miniSize = this.getMiniSize()
      const maxSize = this.getMaxSize()
      console.log("path: "+ this.path)
      console.log("types: "+ types)
      console.log("miniSize: "+ miniSize)
      console.log("maxSize: "+ maxSize)
      console.log("compression: "+ this.compression)
      console.log("key: "+ this.key)
      appthinning(this.path, types, miniSize, maxSize, this.compression, this.key)
    },
    getMiniSize: function() {
      if (this.miniSize.length > 0) {
        return this.miniSize
      } else {
        return undefined
      }
    },
    getMaxSize: function() {
      if (this.maxSize.length > 0) {
        return this.maxSize
      } else {
        return undefined
      }
    },
    getTypes: function() {
      var types = ""
      if(this.pngEnabled){
        types += "png|"
      }
      if(this.jpgEnabled){
        types += "jpg|"
      }
      if(this.jpegEnabled){
        types += "jpeg|"
      }
      if(this.gifEnabled){
        types += "gif|"
      }
      if(this.svgEnabled){
        types += "svg|"
      }
      if (types.length < 1) {
        return undefined
      }
      if (types[types.length-1] === "|"){
        types = types.substring(0, types.length - 1)
      }
      return types
    }
  },
}
</script>

<style scoped>
</style>