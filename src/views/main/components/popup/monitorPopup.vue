<template>
  <div class="app">
    <h1 style="color: white; text-align: center">{{monitor.monitorName}}</h1>
    <div class="container" v-if="monitor.id!=3">
      <h1 style="position:absolute;color: white;left: 0.6rem;top: .3rem;margin: 1.7rem;" v-show="connectFlag">监控连接失败，请联系管理员！</h1>
<!--      color:white;transform: translateY(-2.6rem) translateX(2.9rem)-->
      <canvas id="video1"></canvas>
    </div>
    <div class="container" v-if="monitor.id==3">
      <video id="video" src="/img/video/jt.mp4" autoplay  loop  preload  ></video>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
//挂载父组件的richText，
let props = defineProps(['monitor']);
let canvas;
let player = null;
let showMonitor = ref(<boolean>false);
let connectFlag = ref(<boolean>false);

onMounted(()=>{
  if (props.monitor.id != 3) {
      //@ts-ignore
      const JSMpeg = window.JSMpeg;
      canvas = document.getElementById("video1");
      player = new JSMpeg.Player(props.monitor.url, {canvas: canvas,onSourceEstablished:test},onError)
  }
})

function test(){
  console.log("连接成功")
}
function onError(){
  connectFlag.value = true;
}
onBeforeUnmount(()=>{
  if (player) {
    player.destroy();
    const ctx = canvas.getContext('webgl');
    ctx.getExtension('WEBGL_lose_context').loseContext();
    player = null;

  }
})
</script>

<style scoped lang="scss">
img {
  -webkit-user-drag: none;
}

.app {
  position: relative;
  //display: block;
  font-size: 0.15rem;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .container {
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column-reverse;
  }
  #video{
    margin-top: 50px;
    width: 100%;
  }
}

.app::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  /**/
}

.app::-webkit-scrollbar-track {
  background: rgb(45, 90, 100);
  border-radius: 2px;
}

.app::-webkit-scrollbar-thumb {
  background: #13c7c7;
  border-radius: 10px;
}

.app::-webkit-scrollbar-thumb:hover {
  background: #0ab7b7;
}

.app::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>
