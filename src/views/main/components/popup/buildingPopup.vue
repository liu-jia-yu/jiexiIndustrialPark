<template>
  <div id="app">
    <div class="header" @click="showModal">明理楼</div>
    <table class="table">
      <tbody>
      <tr>
        <td class="label">类型:</td>
        <td>厂房</td>
      </tr>
      <tr>
        <td class="label">面积:</td>
        <td>560㎡</td>
      </tr>
      <tr>
        <td class="label">所属企业:</td>
        <td>无</td>
      </tr>
      <tr>
        <td class="label">状态:</td>
        <td>待租</td>
      </tr>
      </tbody>
    </table>
    <!--    <button class="btn" >内部展示</button>-->
    <div class="modal-container">
      <div class="modal">
        <div class="modal-header">
          <h3>楼宇内部模型展示</h3>
          <button class="close-btn" @click="hideModal">X</button>
        </div>
        <div class="modal-content">
          <floorsScene class="scene" v-if="sceneLoad"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import floorsScene from '../threeJs/floors'
import {ref} from "vue";

const sceneLoad = ref(<boolean>false);

/**
 * 初始化一个emit组件（后续添加事件直接在[]中添加）
 * pageEmit事件，控制父组件的page的index
 */
const emit = defineEmits(['hideCard'])

function showModal() {
  let index = 0;
  emit('hideCard',index)
  const modalContainer = document.querySelector(".modal-container");
  const modal = document.querySelector(".modal");
  modalContainer.classList.add("active");
  modal.classList.add("active");
  sceneLoad.value = true;
}

function hideModal() {
  let index = 1;
  emit('hideCard',index)
  const modalContainer = document.querySelector(".modal-container");
  const modal = document.querySelector(".modal");
  modalContainer.classList.remove("active");
  modal.classList.remove("active");
}

defineExpose({
  sceneLoad
});
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

  .header {
    cursor: pointer;
    border-radius: 5px;
    margin: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    font-family: 华文行楷;
    letter-spacing: 0.2rem;
    background: rgba(16, 83, 133, 0.8);
    flex: 1;
    color: #c0e5ff;
  }

  .header:hover {
    background: #3c7ba8;
  }

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
    background: rgb(1 43 86 / 80%);
    color: #50f4e5;
  }

  .table td.label {
    font-weight: bold;
    color: #ffffff;
    width: 30%;
    background-color: rgba(46, 70, 112, 0.8);
  }

}

.btn {
  display: block;
  padding: 10px 20px;
  font-size: 0.15rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  opacity: 0;
  z-index: 9999;
  transition: opacity 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px;
  background-color: #446e89;
  width: 76vw;
  height: 68vh;
  border-radius: 10px;
  transform: perspective(1000px) rotateY(-40deg) rotateX(20deg) scale(0.5);
  transition: transform 1s ease;
}

.modal-header {
  color: white;
  font-size: 0.2rem;
  font-family: 楷体;
  margin: 0.1rem;
  letter-spacing: 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #024d7c;
}

.modal-header h3 {
  margin: 0;
}

.close-btn {
  background-color: transparent;
  border: none;
  font-size: 0.2rem;
  cursor: pointer;
}

.modal-content {
  background: #cdece8;
  position: relative;
  flex: 1;
  margin: 0.1rem;

  .scene {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}

.modal-container.active {
  visibility: visible;
  opacity: 1;
}

.modal.active {
  transform: perspective(1000px) rotateY(0) rotateX(0) scale(1);
}
</style>
