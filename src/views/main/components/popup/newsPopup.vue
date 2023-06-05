<template>
  <div class="app">
    <h1 style="color: white; text-align: center">{{news.title}}</h1>
    <div class="newsHead">
      <div class="subtitle">{{news.author}}</div>
      <div class="subtitle">发布时间：{{news.publishTime}}</div>
    </div>
    <div class="container">
      <div v-html="news.content"></div>
    </div>
 </div>
</template>
<script setup lang="ts">
import { ref} from "vue";
//挂载父组件的richText，
defineProps(['news']);
</script>

<style scoped lang="scss">
* {
  color:white;
}
.img{
  text-indent: 0
}
.app {
  position: relative;
  //display: block;
  font-size: 0.15rem;
  margin-top: .4rem;
  padding: 0;
  width: 100%;
  height: 95%;

  overflow-y: auto;

  .container {
    //width: 100%;
    position: absolute;
    font-size: 16px;
  }
  .newsHead{
    display: flex;
  }
  .subtitle{
    flex: 1;
    text-align: center;
    color: white;
  }
}


</style>
