<template>
  <div class="popBox">
  <div class="bkx">
    <span style="backgroundColor:#349cab"
          class="tips"></span>
    <span class="tips1"></span>
    <div>
      <div class="population-card">
        <div class="xiaosu-5">
          <span style="padding-left: 10px;font-size: 18px;color: white">人员信息</span>
          <span style="padding-left: 20px;color: #59666B;font-size: 14px;padding-top: 5px;">PERSONNEL INFORMATION</span>
          <span style="padding-left: 40px;"><button class="btn">返回上层</button></span>
        </div>
      </div>
      <div class="container">
        <button class="accordion" @click="clickButton">基本信息</button>
        <div class="panel">
          <div class="infoItem">
            <div style="flex: .5">负责人：</div>
            <div style="flex: 1">李学来</div>
          </div>
          <div class="infoItem">
            <div style="flex: .5">联系电话：</div>
            <div style="flex: 1">177448393828</div>
          </div>
          <div class="infoItem">
            <div style="flex: .5">性别：</div>
            <div style="flex: 1">男</div>
          </div>
          <div class="infoItem">
            <div style="flex: .5">身份类型：</div>
            <div style="flex: 1">常驻</div>
          </div>
        </div>
      </div>
      <div class="container">
        <button class="accordion" @click="clickButton">房屋信息</button>
        <div class="panel">
          <div class="infoItem">
            <div style="flex: .5">土地性质：</div>
            <div style="flex: 1">未知</div>
          </div>
        </div>
      </div>
      <div class="container">
        <button class="accordion" @click="clickButton">帮扶情况</button>
        <div class="panel">
          <div class="infoItem">
            <div style="flex: .5">帮扶干部：</div>
            <div style="flex: 1">李成功</div>
          </div>
        </div>
      </div>
      <div class="container">
        <button class="accordion" @click="clickButton">走访记录</button>
        <div class="panel">
          <div class="infoItem">
            <div style="flex: .5">2022.05.20</div>
            <div style="flex: 1">李成功</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import {
  useStore,
  mapState
} from 'vuex'
import {
  reactive,
  watch,
  computed
} from 'vue'

const store = useStore()
const data = reactive({
  content: 1,
})
const getShowTask = computed(() => {
  //返回的是ref对象
  return store.state.currentContent
})
// 监听
watch(getShowTask, (newValue, oldValue) => {
  // upNewData()
  data.content = newValue
});

function clickButton(event) {
  // 获取所有按钮元素
  const acc = event.target
  acc.classList.toggle("active")
  const panel = acc.nextElementSibling;
  // 切换面板展开/隐藏状态
  if (panel.style.maxHeight) {
    // 如果面板在展开状态，就将maxHeight属性设置为0，隐藏面板
    panel.style.maxHeight = null;
  } else {
    // 如果面板在隐藏状态，就获取面板内容的实际高度，然后将maxHeight属性设置为该高度，展开面板
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}
</script>

<style lang="scss" scoped>
.popBox{
  position: absolute;
  right: 2vw;
  top: 8vh;
  height: 90%;
  width: 24%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
.bkx {
  position: absolute;
  right: -0.1vw;
  top: -3.2vh;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
/* 隐藏Webkit浏览器中的滚动条 */
::-webkit-scrollbar {
  display: none;
}

// 1
.tips {
  display: inline-block;
  width: 100%;
  height: 0.5px;
  background-color: #349cab;
  position: relative;
}


.tips :after {
  left: 0;
  top: -1rem;
}

.tips :before {
  right: 0;
  top: -1rem;
}

.tips:after {
  content: "";
  position: absolute;
  right: 0;
  width: 16px;
  height: 3px;
  border-radius: 2px;
  background-color: #45efff;
}

.tips:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 3px;
  border-radius: 2px;
  background-color: #45efff;
}

// 2
.tips1 {
  top: -13px;
  display: inline-block;
  width: 100%;
  background-color: #349cab;
  position: relative;
}


.tips1 :after {
  left: 0;
  top: -1rem;
}

.tips1 :before {
  right: 0;
  top: -1rem;
}

.tips1:after {
  content: "";
  position: absolute;
  right: 0;
  width: 16px;
  height: 3px;
  border-radius: 2px;
  background-color: #45efff;
}

.tips1:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 3px;
  border-radius: 2px;
  background-color: #45efff;
}

// 类型1
.tipsH {
  background-color: #fdc612;
}

.tipsH:after {
  background-color: #fdc612;
}

.tipsH:before {
  background-color: #fdc612;
}

.population-card {
  display: flex;
  padding-top: 10px;
}

.btn {
  border: 1px solid;
  border-radius: 5px;
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.4);
  // background-color: #349cab;
  color: white;
  padding: 3px 8px;
  border-color: #349cab;
  cursor: pointer;
}

.xiaosu-5 {
  position: relative;
  overflow: hidden;

  //&:before {
  //  content: ' ';
  //  //width: 3px;
  //  //height: 22px;
  //  //background-color: #349cab;
  //  position: absolute;
  //  //left: 0;
  //  //top: 47%;
  //  transform: translateY(-50%);
  //}
}


.container {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.accordion {
  background-color: rgba(100, 130, 141, 0.24);

  /* 设置按钮样式 */
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
  text-align: left;

  /* 设置按钮展开/collapse的图标 */
  transition: all 0.3s ease;
  color: #ffffff;
}

/* 改变展开状态下按钮的背景颜色 */
.active, .accordion:hover {
  background-color: rgb(71, 107, 134);
}

.panel {
  padding: 0 10px;
  background-color: rgba(53, 57, 59, 0.75);
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  max-height: 0;
  color: rgb(195, 197, 199);

  .infoItem {
    padding: 9px;
    display: flex;
    color: white;
  }
}


/* 设置展开面板的最大高度 */
.panel.show {
  max-height: 500px;
}
</style>