<template>
  <div class="box">
    <div class="logo">
      <img :src="logoPath" width="120"/>
    </div>

    <div class="project">
      <p class="titles"> Project directory</p>
      <input class="pathInput" v-show="showPathInput" type="text" v-model="path"/>
    </div>

    <div class="drag" v-show="!showPathInput">
      <span class="dragBox" @drop="onDrop" @dragover.prevent >Drag your project here.</span>
    </div>

    <div>
      <p class="titles"> File types </p>
      <label><input v-model="jpgEnabled" type="checkbox"/>jpg</label> 
      <label><input v-model="jpegEnabled" type="checkbox"/>jpeg</label> 
      <label><input v-model="pngEnabled" type="checkbox"/>png</label> 
      <label><input v-model="gifEnabled" type="checkbox"/>gif</label> 
      <label><input v-model="svgEnabled" type="checkbox"/>svg</label>
    </div>

    <div>
      <p class="titles"> Size (KB)</p>
      <input class="sizeInput" v-model="miniSize" type="text" placeholder="100" oninput = "value=value.replace(/[^\d]/g,'')">
      -
      <input class="sizeInput" v-model="maxSize" type="text" placeholder="Infinite" oninput = "value=value.replace(/[^\d]/g,'')">
    </div>

    <div>
    <p class="titles"> Compression type </p>
		<label><input type="radio" v-model="compression" value="imageOptim">ImageOptim</label>
		<label><input type="radio" v-model="compression" value="tinyPng">TinyPng</label>
    <input class="tinyPngInput" v-show="compression=='tinyPng'" v-model="key" type="text" placeholder="TinyPng key">
    </div>

    <p></p>
    <div class="buttons">
      <button class="button" v-on:click="onStartButtonClicked">start</button>
    </div>

    <loading :active.sync="isLoading" color="#1E90FF"
        :is-full-page="fullPage">
    </loading>
  </div>
</template>

<script>
import { getStatic, showToast, ToastType} from '../utils'
import appthinning from 'appthinning'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import open from 'open'

export default {  
  data: function () {
      return {
        path: undefined,
        pngEnabled: true,
        jpgEnabled: true,
        jpegEnabled: true,
        gifEnabled: true,
        svgEnabled: true,
        miniSize: "",
        maxSize: "",
        compression: 'imageOptim',
        key: undefined,
        showPathInput: false,
        isLoading: false,
        fullPage: true,
        logoPath: getStatic("/icon.png")
      }
  },
  components: {
    Loading
  },
  methods: {
    onDrop: function(event) {
      console.log('drop')
      event.preventDefault();
      event.stopPropagation();

      for (let f of event.dataTransfer.files) {
        console.log('The file(s) you dragged: ', f)
        this.path = f.path
        this.showPathInput = true
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

      this.isLoading = true
      var that = this

      appthinning(this.path, types, miniSize, maxSize, this.compression, this.key)
      .then(function(data){
        that.isLoading = false
        showToast(ToastType.Success, data, 3000)
      })
      .catch(function(err){
        that.isLoading = false
        showToast(ToastType.Failed, err.message, 3000)
        if (err.code && err.code == 8) {
          setTimeout( function(){
            open("https://imageoptim.com/mac")
          }, 3*1000);
        }
        if (err.code && err.code == 6) {
          setTimeout( function(){
            open("https://tinypng.com/developers")
          }, 3*1000);
        }
      })
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
.box {
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.project {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.titles {
  font-size: 1.0em;
  text-align: left;
  color: gray;
  margin-right: 10px;
}

.pathInput {
  margin-right: 10px;
  margin-left: 10px;
  height: 48px;
  border: 1px solid #f2f2f2;
  background: #f6f6f6;
  color: #202124;
  font-size: 16px;
  line-height: 48px;
  border-radius: 8px;
}

.drag {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.dragBox {
    display: inline-block;
    width: 300px;
    height: 100px;
    border: 2px dashed #ccc;
    text-align: center;
    line-height: 100px;
}

.sizeInput {
  height: 35px;
  border: 1px solid #f2f2f2;
  background: #f6f6f6;
  color: #202124;
  font-size: 14px;
  border-radius: 4px;
}

.tinyPngInput {
  width: 40%;
  height: 35px;
  border: 1px solid #f2f2f2;
  background: #f6f6f6;
  color: #202124;
  font-size: 14px;
  border-radius: 4px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.button {
    width: 300px;
    outline:none;
    background-color: cornflowerblue;
    border-radius: 4px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

input[type=text]:focus { 
    outline: none;
    border-color: cornflowerblue;
    background-color: #fff;
 }
input[type=text]::selection{
    background:transparent;
    background-color: #fff;
}
input[type=text]::-moz-selection{
    background:transparent;
    background-color: #fff;
}

</style>