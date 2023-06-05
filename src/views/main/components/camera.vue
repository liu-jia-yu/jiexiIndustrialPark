<template>
  <video @click="" id='video' style='object-fit:fill' controls autoplay autobuffer muted preload='auto'></video>
</template>
<script>
import * as webrtcstreamer from '../api/webrtcstreamer'
var webRtcServer = null;
</script>
<script setup>
import {onBeforeUnmount, onMounted} from "vue";
onMounted(()=>{
  webRtcServer = new WebRtcStreamer('video','http://127.0.0.1:8000/');
  webRtcServer.connect("rtsp://admin:147258369Q@192.168.0.116")
})


onBeforeUnmount(()=>{
  webRtcServer.disconnect();
  console.log("closed")
})
//页面退出时销毁
window.onbeforeunload = function() {
  webRtcServer.disconnect();
}
</script>
<style scoped>

</style>
