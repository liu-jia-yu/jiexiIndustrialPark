<template>
  <button class="float-btn-container">
    <div class="open-btn">
      按钮
    </div>
    <div class="tool-container">
      <div class="tool">第一个按钮</div>
      <div class="tool">第二个按钮</div>
      <div class="tool">第三个按钮</div>
      <div class="tool">第三个按钮</div>
      <div class="tool">第三个按钮</div>
      <div class="tool">第三个按钮</div>
      <div class="tool">第三个按钮</div>
    </div>

  </button>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.float-btn-container {
  //position: fixed;
  //left: 20px;
  //bottom: 20px;
  display: flex;
  position: relative;



  .open-btn {
    width: 100px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    z-index: 1;
  }

  .tool-container {
    width: 0;
    height: 100%;
    //transform: translateX(0);
    transition: all 0.3s;
    //position: absolute;
    left: 0;
    overflow: hidden;
    display: flex;

    .tool {
      display: inline-block;
      word-break: keep-all;
      width: 100px;
      height: 30px;
      cursor: pointer;

      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 5px;
      text-align: center;
      line-height: 30px;
    }
  }

  &:active {
    .tool-container {
      width: 100%;
      //transform: translateX(-100%);
    }
  }
}
</style>
