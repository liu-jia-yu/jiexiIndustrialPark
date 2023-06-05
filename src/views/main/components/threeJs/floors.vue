<template>
  <div id="sceneApp">
    <div v-show="!loaded" id="loadingCover">
      <div class="progress-container">
        <div class="progress-bar" :style="{width: LoadedPercent+'%'}"></div>
        <div class="progress-text">{{modelCount-loadingCount+"/"+modelCount+" "+loadingText}}</div>
      </div>
    </div>
    <room-info v-show="loaded&&roomInfoShow" :current-room="currentRoom" @closeInfoWindow="closeRoomInfo" style="position: absolute"/>
    <div v-show="loaded" id="threeContainer">
      <div class="select-container" @mouseenter="handleShowFloorOption" @mouseleave="handleShowFloorOption">
        <div class="selected">
          <div class="top-left-border"></div>
          <div class="top-right-border"></div>
          <div class="bottom-left-border"></div>
          <div class="bottom-right-border"></div>
          {{ currentFloorIndex }}楼
        </div>
        <div ref="floorOptions" :class="['options-container', {'show-options-container': isShowFloor}]">
          <div class="option" v-for="item in 3" :key="item" @click="handleChangeFloor(item)">{{ item }}楼</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import {computed, onActivated, onBeforeUnmount, onMounted, ref} from "vue";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import RoomInfo from './component/RoomInfo'
import {
  AmbientLight,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene, SpotLight, Vector2, Vector3,
  WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const currentRoom= {// 当前房间信息
  roomName: '101房',
  roomType: '办公用房',
  roomUser: '张三',
  roomSize: '100平方米',
  roomStatus: '在用',
  // roomPhoto: require('@/assets/icon-img.png'),
  enterpriseName: 'XXX科技有限公司',
  enterpriseAddress: 'xxx区xxxx大厦A座1009',
  enterprisePhone: '010-610086',
  enterpriseDesc: 'xxx科技有限公司成立于2014年3月，是室内三维地图云平台和可视化智能管理系统提供商。',
  enterprisePerson: '张三',
  enterprisePersonPhone: '186****6666',
}
const loaded=ref(<boolean>false);
const roomInfoShow=ref(<boolean>true);
function closeRoomInfo() {
  console.log(1)
  roomInfoShow.value=false
}
/** -------------- 常规函数 -------------- **/

/**
 * 数组求和
 * @param arr 数值数组
 */
function sum(arr:number[]) {
  return arr.reduce(function(prev, curr){
    return prev + curr;
  },0);
}
/**
 * 防抖工具类
 */
class Tools {
  static exeOnceAtTime(func, during_time) {
    let lastFlag: { need_exe: boolean; last_timer: number } = {
      last_timer: null,
      need_exe: true,
    }
    return (...arg) => {
      clearTimeout(lastFlag.last_timer)
      lastFlag.need_exe = false

      let flag = {
        need_exe: true,
        last_timer: setTimeout(() => {
          if (flag.need_exe === true) {
            func(...arg)
          }
        }, during_time)
      }
      lastFlag = flag
    }
  }
}

/** -------------- threeJs场景展示基本参数 -------------- **/
/**
 * 静态资源服务地址
 */
const urlPrefix: String = "http://192.168.0.110:80/3dtiles/"
const scene = new Scene();
let camera: PerspectiveCamera;
const renderer = new WebGLRenderer({antialias: true});
const gltfLoader = new GLTFLoader();
/**
 * 场景所属节点id
 */
const containerId="threeContainer"
/**
 * 背景颜色
 */
const backGroundColor="rgb(255,255,255)";
/**
 * 选中楼层对象
 */
let SelectedFloor: Object3D =null;
/**
 * 选中楼层索引
 */
const currentFloorIndex=ref(<number>1)
let handleId=<number>null;

/** -------------- threeJs场景展示基本函数 -------------- **/
let timeFlag=true;
/**
 * 加载gltf、glb模型
 * @param url 相对路径
 * @param index 批量加载索引
 * @param name 模型名
 * @param option x,y,z坐标
 */
function loadModel(url: String,index?:number,name?: String, option?: { x?: number, y?: number, z?: number, scale?: number }){
  let startLoad=false;
  gltfLoader.load(
      urlPrefix + url,
      function (gltf) {
        let scene0 = gltf.scene;
        scene0.name = name ? name : "";
        scene0.position.x = option && option.x ? option.x : 0;
        scene0.position.y = option && option.y ? option.y : 0;
        scene0.position.z = option && option.z ? option.z : 0;
        scene0.scale.addScalar(option&&option.scale?option.scale:0);
        scene0.receiveShadow=true;
        sceneList.push(scene0)
        scene.add(scene0)
        if (timeFlag&&loadingCount.value===0){
          timeFlag=false;
          console.timeEnd("time to load models")
          console.log("全部加载完成!",(modelSizeCount.value/1024/1024).toFixed(2)+"mb")
          showScene();
        }
      },
      function (xhr) {
        if (!startLoad){
          console.log(name,"开始加载!")
          console.time(name);
          startLoad=true
          modelSizeCount.value+=xhr.total;
        }
        loadedSizeCount.value[index]=xhr.loaded;
        if (xhr.loaded===xhr.total){
          loadingCount.value--;
          console.timeEnd(name);
          console.log(name,"加载完成!")
        }
        // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function () {
        console.log(name,"loadError")
      }
  )
}
/**
 * 加载静态资源
 */
async function load(){
  //初始化加载进度参数
  //总模型个数
  modelCount.value = 3;
  //未加载完成个数
  loadingCount.value = 3;
  //各个模型加载已加载大小
  loadedSizeCount.value=new Array(3).fill(0);
  console.time("time to load models")
  loadModel('cs/untitled.glb', 0,"floor1");
  console.log(1)
  loadModel('cs/untitled.glb', 1,"floor2", {y: 30});
  console.log(2)
  loadModel('cs/untitled.glb', 2,"floor3", {y: 60});
  console.log(3)
}
/**
 * 初始化three场景
 */
function initScene(): void {
  const content = document.getElementById(containerId)
  camera = new PerspectiveCamera(
      60,
      content.clientWidth / content.clientHeight,
      0.1,
      10000
  );
  // const arrowHelper = new ArrowHelper();
  // scene.add(arrowHelper)
  // const arrowHelper = new GridHelper();
  // scene.add(arrowHelper)
  //坐标轴
  // const axesHelper = new AxesHelper(500);
  // scene.add(axesHelper)

  renderer.setSize(content.clientWidth, content.clientHeight);

  renderer.setClearColor(backGroundColor, 0);
  const resizeObserver = new ResizeObserver(Tools.exeOnceAtTime(onResize, 16));
  resizeObserver.observe(content);

  function onResize() {
    let width = content.clientWidth;
    let height = content.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  content.appendChild(renderer.domElement);
  camera.position.set(100, 200, -200);
  camera.lookAt(0, 0, 0);
  // // 环境光
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
//
// // 点光源
//   const pointLight = new PointLight(0xffffff, 0.5);
//   pointLight.position.set(0,1000,1000)
//   scene.add(pointLight);
// 光源
  const spotLight = new SpotLight(0xFFFFFF)
  spotLight.position.set(0, 500, 0)
  scene.add(spotLight) // 将聚光灯添加到场景中
  /**
   * 初始化控制器
   */
  function initControls(): void {
    const controls = new OrbitControls(camera, renderer.domElement);
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    // controls2.enableDamping = true;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    //设置相机距离原点的最远距离
    controls.minDistance = 1;
    //设置相机距离原点的最远距离
    controls.maxDistance = 1000;
    //是否开启右键拖拽
    controls.enablePan = true;
  }
  initControls();
  addTouch(content);
}
function destroyScene() {
  cancelAnimationFrame(handleId);
  // 场景中的参数释放清理或者置空等
  renderer.forceContextLoss();
  renderer.dispose();
  scene.clear();
  console.log('destroyScene');
}
/**
 * 逐帧渲染
 */
function animate(): void {
  beforeRender();
  renderer.render(scene, camera);
  handleId=requestAnimationFrame(animate);
}
/**
 * 加载完成后开始展示场景
 */
function showScene(): void {
  loadingText.value="加载完成！"
  setTimeout(()=>{
    loaded.value=true
  },1000)
  /**
   * 开始渲染场景
   */
  handleChangeFloor(1);
  animate();
}
/**
 * 逐帧渲染之前
 */
function beforeRender(): void {
}
/**
 * 添加点击事件
 * @param content dom
 */
function addTouch(content): void {
  const offset=10;
  let beforeX, beforeY, afterX, afterY;
  function onMouseClick(event) {
    if (Math.abs(beforeX-afterX)>offset||Math.abs(beforeY-afterY)>offset)
    {
      return;
    }
    //声明射线和mouse变量
    let rayCaster = new Raycaster();
    let mouse = new Vector2();

    //通过鼠标点击的位置计算出射线所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
    mouse.x = (event.offsetX / content.clientWidth) * 2 - 1;
    mouse.y = -(event.offsetY / content.clientHeight) * 2 + 1;
    //根据在屏幕的二维位置以及相机的矩阵更新射线的位置
    rayCaster.setFromCamera(mouse, camera);
    // 获取射线直线和所有模型相交的数组集合
    let intersects = rayCaster.intersectObjects(scene.children, true); //增加第二个参数，可以遍历子子孙孙对象
    if ( intersects.length > 0 ) {
      // 遍历所有相交的对象，找到所属的场景
      let object = intersects[0].object;
      do{
        if (object.name.indexOf("floor")!==-1) {
          if (object===SelectedFloor){
            return
          }
          if (SelectedFloor){
            gsap.to(SelectedFloor.position,{z:0,duration:1})
          }
          currentFloorIndex.value=Number(object.name.replace("floor",""))
          SelectedFloor=object
          roomInfoShow.value=true;
          gsap.to(object.position,{z:-100,duration:1})
          break;
        }
        object = object.parent;
      }while (object)
    }
  }
  function onMouseDown(e) {
    [ beforeX, beforeY ] = [ e.offsetX, e.offsetY ];
  }
  function onMouseUp(e) {
    [ afterX, afterY ] = [ e.offsetX, e.offsetY ];
  }
  content.addEventListener("mousedown",onMouseDown)
  content.addEventListener("mouseup",onMouseUp)
  content.addEventListener("click", onMouseClick, false);
}
/**
 * 切换楼层
 * @param index 楼层索引
 */
function handleChangeFloor(index): void {
  currentFloorIndex.value = index;
  let object;
  sceneList.forEach(floor=>{
    if (Number(floor.name.replace("floor",""))===index){
      object=floor;
    }
  })
  if (object===SelectedFloor){
    return
  }
  if (SelectedFloor){
    gsap.to(SelectedFloor.position,{z:0,duration:1})
  }
  SelectedFloor=object
  gsap.to(object.position,{z:-100,duration:1})
}

const isShowFloor=ref(<boolean>false);
const floorOptions=ref(null);
// 显示隐藏选择楼层选项
function handleShowFloorOption() {
  isShowFloor.value = !isShowFloor.value;
  if (isShowFloor.value) {
    floorOptions.scrollTop = 0;
  }
}


/** -------------- 加载进度参数 -------------- **/

const LoadedPercent=computed(()=>{
  return modelCount.value>0?((modelCount.value-loadingCount.value)/modelCount.value*100).toFixed(1):0
})
const loadingText=ref(<String>'加载中...')
/**
 * 需加载模型总大小
 */
const modelSizeCount=ref(<number>0);
/**
 * 各个模型已经加载大小
 */
const loadedSizeCount=ref(<number[]>[]);
/**
 * 已加载总大小
 */
const totalLoadedSize=computed(()=>{
  return  sum(loadedSizeCount.value)
})
/**
 * 需模型加载总数
 */
const modelCount=ref(<number>0);
/**
 * 待加载数量
 */
const loadingCount=ref(<number>0);
/**
 * 已加载模型
 */
const sceneList: Object3D[] = <Object3D[]>[];

onMounted(() => {
  initScene();
  load();
})
onBeforeUnmount(()=>{
  destroyScene()
})

</script>

<style lang="scss" scoped>
#sceneApp {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#loadingCover {
  background-color: #1f1f1f;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .progress-container{
    width: 50%;
  }
  .progress-bar {
    width: 20px;
    height: 4px;
    background-color: #0fc5c5;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    transition: width 1s;
  }
  .progress-bar:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transform: translateX(-100%);
  }

  .progress-text {
    color: #fff;
    font-size: 0.15rem;
    margin-top: 0.1rem;
    text-align: center;
  }
}
#threeContainer {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  // 过渡动画
  @mixin transition($time: 0.3s, $way: all) {
    transition: $way $time;
  }
  // 房间信息弹窗
  .room-popup {
    z-index: 2;
    position: absolute;
    transition: all .3s;
  }
  // 绝对定位
  @mixin absolute($top: auto, $right: auto, $left: auto, $bottom: auto) {
    position: absolute !important;
    top: $top;
    left: $left;
    right: $right;
    bottom: $bottom;
  }
  // 边框背景样式
  @mixin bgBorderCorner($bg: rgba(0, 46, 91, 0.6), $borderColor: rgba(0, 190, 255, 0.3), $cornerSize: 0.1rem, $cornerWidth: 0.025rem, $cornerColor: rgb(0, 166, 255)) {

    border: 1px solid $borderColor;
    box-sizing: border-box;
    background: $bg;
    padding: 0.1rem;
    position: relative;
    backdrop-filter: blur(5px);

    .top-left-border {
      width: $cornerSize;
      height: $cornerSize;
      border-top: $cornerWidth solid $cornerColor;
      border-left: $cornerWidth solid $cornerColor;
      @include absolute($top: 0, $left: 0);
    }

    .top-right-border {
      width: $cornerSize;
      height: $cornerSize;
      border-top: $cornerWidth solid $cornerColor;
      border-right: $cornerWidth solid $cornerColor;
      @include absolute($top: 0, $right: 0);
    }

    .bottom-left-border {
      width: $cornerSize;
      height: $cornerSize;
      border-bottom: $cornerWidth solid $cornerColor;
      border-left: $cornerWidth solid $cornerColor;
      @include absolute($bottom: 0, $left: 0);
    }

    .bottom-right-border {
      width: $cornerSize;
      height: $cornerSize;
      border-bottom: $cornerWidth solid $cornerColor;
      border-right: $cornerWidth solid $cornerColor;
      @include absolute($bottom: 0, $right: 0);
    }

  }
  .select-container {
    $themeColor: rgb(0, 166, 255);
    $bg: rgba(0, 46, 91, 0.8);
    $borderColor: rgba(0, 190, 255, 0.3);
    @include absolute($top: 0.2rem, $right: 0.2rem);
    color: #ffffff;

    .selected {
      @include bgBorderCorner($cornerSize: 6px);
      width: 100px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
      user-select: none;
    }

    .options-container {
      $optionHeight: 35px;
      $maxHeight: 200px;
      $scrollWidth: 3px;
      border: 1px solid $borderColor;
      box-sizing: border-box;
      background: $bg;
      max-height: $maxHeight;
      font-size: 15px;
      overflow-y: auto;
      user-select: none;
      width: 100%;
      @include transition();
      @include absolute($left: 0, $bottom: 0);
      transform: translateY(100%);
      opacity: 0;
      visibility: hidden;

      &::-webkit-scrollbar {
        width: $scrollWidth;
      }

      &::-webkit-scrollbar-track {
        background: rgba(44, 62, 80, 0.8);
      }

      &::-webkit-scrollbar-thumb {
        background: rgba($themeColor, 0.5);
      }

      .option {
        $triangleSize: 8px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: $optionHeight;
        border-bottom: 1px solid $borderColor;
        cursor: pointer;

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            border-top: $triangleSize solid rgba($themeColor, 0);
            border-bottom: $triangleSize solid rgba($themeColor, 0);
            border-left: $triangleSize solid $themeColor;
          }

          &:after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            border-top: $triangleSize solid rgba($themeColor, 0);
            border-bottom: $triangleSize solid rgba($themeColor, 0);
            border-right: $triangleSize solid $themeColor;
          }
        }
      }
    }

    .show-options-container {
      opacity: 1;
      visibility: visible;
    }
  }

}

</style>
