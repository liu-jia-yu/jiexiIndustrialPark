<template>

  <div class="toolbox">
    <button type="button" class="btn cube cube-hover" @click="clickTools">
      <div class="bg-top">
        <div class="bg-inner"></div>
      </div>
      <div class="bg-right">
        <div class="bg-inner"></div>
      </div>
      <div class="bg">
        <div class="bg-inner"></div>
      </div>
      <div class="text">工具箱</div>
    </button>
    <transition name="slide">
    <div class="buttons" v-show="toolShow" @click="toolShow = false">
      <button class="btn" @click="emit('add')">
        绘 制
      </button>
    </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";
const props = defineProps(['editConfirmShow','newEntity']);
const { proxy } = getCurrentInstance();
const emit = defineEmits(['add'])

const toolShow = ref(<boolean>false)

function init() {

}
function clickTools() {
  if (props.editConfirmShow == true || props.newEntity!=null) {
    //@ts-ignore
    proxy.$modal.msgWarning("请先结束绘制!");
  }
  else {
    toolShow.value = !toolShow.value
  }
}

onMounted(() => {
  init();
})
</script>

<style lang="scss" scoped>
$borderColor: #a9ffff;
.toolbox {
  display: flex;
  align-items: baseline;
  left: 0;
  bottom: 0;
  margin: 10px;
  font-size: 16px;
  position: absolute;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.buttons {
  transition: all 0.8s;

  .btn {
    position: relative;
    font-size: 17px;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1em 2.5em;
    display: inline-block;
    border-radius: 6em;
    transition: all .2s;
    border: none;
    font-family: inherit;
    font-weight: 500;
    color: black;
    background-color: white;
  }

  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .btn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  .btn::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
  }

  .btn::after {
    background-color: #fff;
  }

  .btn:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
  }
}
//显示时动画
@keyframes slide-enter {
  from {
    opacity:0;
    transform: translateX(-80%);
  }
  to {
    opacity:1;
    transform: translateX(0%);
  }
}
//隐藏时动画
@keyframes slide-leave {
  from {
    transform: translateX(0%);
  }
  to {
    opacity:0;
    transform: translateX(-80%);
  }
}

.buttons.slide-leave-active {
  animation: slide-leave 0.5s ease forwards;
}

.buttons.slide-enter-active {
  animation: slide-enter 0.5s ease forwards;
}


/**
工具箱
 */
$boxColor1: black;
$boxColor: white;
.btn {

  margin: 10px;
  cursor: pointer;
  display: inline-block;
  padding: 0.7em 1em;
  background: transparent;
  outline: none;
  border: 0;
  color: $boxColor;
  letter-spacing: 0.1em;
  font-family: monospace;
  font-size: 17px;
  font-weight: bold;
  z-index: 1;
}

.cube {
  position: relative;
  transition: all 0.5s;
}

.cube .bg-top {
  position: absolute;
  height: 10px;
  background: $boxColor;
  bottom: 100%;
  left: 5px;
  right: -5px;
  transform: skew(-45deg, 0);
  margin: 0;
  transition: all 0.4s;
}

.cube .bg-top .bg-inner {
  bottom: 0;
}

.cube .bg {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background: $boxColor;
  transition: all 0.4s;
}

.cube .bg-right {
  position: absolute;
  background: $boxColor;
  top: -5px;
  z-index: 0;
  bottom: 5px;
  width: 10px;
  left: 100%;
  transform: skew(0, -45deg);
  transition: all 0.4s;
}

.cube .bg-right .bg-inner {
  left: 0;
}

.cube .bg-inner {
  background: $boxColor1;
  position: absolute;
  left: 2px;
  right: 2px;
  top: 2px;
  bottom: 2px;
}

.cube .text {
  position: relative;
  transition: all 0.4s;
}

.cube:hover .bg-inner {
  background: $boxColor;
  transition: all 0.4s;
}

.cube:hover .text {
  color: $boxColor1;
  transition: all 0.4s;
}

.cube:hover .bg-right,
.cube:hover .bg,
.cube:hover .bg-top {
  background: $boxColor1;
}

.cube:active {
  z-index: 9999;
  animation: bounce .1s linear;
}

@keyframes bounce {
  50% {
    transform: scale(0.9);
  }
}

/**
工具按钮
 */
</style>
