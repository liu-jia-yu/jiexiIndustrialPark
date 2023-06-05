<template>
  <div id="app">
    <div class="header">{{ Merchants.title }}</div>
    <table class="table">
      <tbody>
      <tr>
        <td class="label">用地规模:</td>
        <td>{{ Merchants.scale }}</td>
      </tr>
      <tr>
        <td class="label">主导功能:</td>
        <td>{{Merchants.dominantFunction}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref} from "vue";
defineProps(['Merchants']);

</script>

<style lang="scss" scoped>
#app {
  font-size: 0.15rem;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: #3d798fad;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header{
    //cursor: pointer;
    border-radius: 5px;
    margin: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    font-family: 华文楷体;
    //letter-spacing:0.2rem;
    //background: rgba(16, 83, 133, 0.8);
    flex: 1;
    color: #c0e5ff;
  }
  //.header:hover{
  //  background: #3c7ba8;
  //}
  .table {
    margin: 0.1rem;
    padding: 0.1rem;
    flex: 4;
    border-collapse: collapse;

  }

  .table td {
    text-align: center;
    vertical-align: middle;
    border-top: 1px solid #68bbee;
    background: rgba(2, 67, 134, 0.8);
    color: #50f4e5;
    //line-height: .5rem;
  }

  .table td.label {
    font-weight: bold;
    color: #ffffff;
    width: 30%;
    background-color: rgba(46, 70, 112, 0.8);
  }

}

</style>
