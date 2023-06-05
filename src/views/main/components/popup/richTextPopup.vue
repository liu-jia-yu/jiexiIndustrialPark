<template>
  <div class="app">
    <div class="richTitle"><el-icon><DArrowRight style="color: #53b8d9; transform: translateY(5px)"/></el-icon>{{ richText.title }}</div>
    <div class="container">
      <div v-html="richText.richContent" ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref} from "vue";
//挂载父组件的richText，
defineProps(['richText']);
</script>

<style scoped lang="scss">

* {
  color: white;

  //video{
  //  text-align: center;
  //}
}

img{
  -webkit-user-drag: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
    margin-top: .2rem;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column-reverse;
  }
  img{
    -webkit-user-drag: none; /* 禁止拖拽 */
    user-select: none; /* 禁止选择文本 */
  }

  .richTitle{
    font-size: .25rem;
    font-weight: bold;
    color: #53b8d9;
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
