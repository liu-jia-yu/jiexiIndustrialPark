<template>
  <div class="app-container">
    <div id="CesiumContainer">
      <div v-show="buildingInfoShow" style="position: absolute;z-index: 2" id="buildingInfo">
        <div class="card">
          <div class="card-border-top">
          </div>
          <div class="content">
            <div class="item">
              <div class="wave-group">
                <input required="" v-model="form.name" type="text" class="input">
                <span class="bar"></span>
                <label class="label">
                  <span class="label-char" style="--index: 0">建</span>
                  <span class="label-char" style="--index: 1">筑</span>
                  <span class="label-char" style="--index: 2">名</span>
                </label>
              </div>
            </div>
            <div class="item">
              <div class="wave-group">
                <el-select
                    v-model="form.companyId"
                    filterable
                    remote
                    reserve-keyword
                    :teleported=false
                    placeholder="请输入企业名进行查询"
                    :remote-method="remoteMethod"
                    :loading="dictSearchLoading"
                    loading-text="加载中..." no-data-text="无数据" no-match-text="无匹配"
                >
                  <el-option
                      v-for="item in BuildingDict"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
                <span class="bar"></span>
                <label style="transform: translateY(-30px); color: #8c9ce5;" class="label">
                  所属企业
                </label>
              </div>
            </div>
            <div class="item">
              <div class="wave-group">
                <el-select v-model="form.type" loading-text="加载中..." no-data-text="无数据" no-match-text="无匹配" :teleported=false placeholder="建筑类型" clearable>
                  <el-option v-for="dict in building_type" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
                </el-select>
                <label style="transform: translateY(-30px); color: #8c9ce5;" class="label">
                  建筑类型
                </label>
              </div>

            </div>
            <div class="item">
              <div class="wave-group">
                <input required="" v-model="form.floorNumber" type="number" min=1 step=1 class="input">
                <span class="bar"></span>
                <label class="label">
                  <span class="label-char" style="--index: 0">层</span>
                  <span class="label-char" style="--index: 1">数</span>
                </label>
              </div>
            </div>
            <div class="item">
              <div class="wave-group">
                <input required="" type="number" class="input" min=0>
                <span class="bar"></span>
                <label class="label">
                  <span class="label-char" style="--index: 0">占</span>
                  <span class="label-char" style="--index: 1">地</span>
                  <span class="label-char" style="--index: 2">面</span>
                  <span class="label-char" style="--index: 3">积</span>
                </label>
              </div>
            </div>
          </div>
          <div class="footer">
            <button class="Btn save" @click="handleSave(form.id)">保存
              <svg class="svg" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
            </button>
            <button  class="Btn delete" @click="handleDelete(form.id)">{{form.id?"删除":"取消"}}
              <svg class="svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
            </button>
          </div>
        </div>
      </div>
      <div v-show="editConfirmShow" style="position: absolute;z-index: 2" id="editConfirm">
        <button class="Btn confirm" @click="editorY">确认
          <svg t="1684487128635" class="svg" viewBox="0 0 1500 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6085" width="200" height="200"><path d="M2.476482 537.450909 177.781392 341.35512C177.781392 341.35512 214.130463 328.753957 244.406708 347.49788L569.027929 605.966305C569.027929 605.966305 611.294369 629.197749 647.466245 599.823545L1256.544491 16.261378C1256.544491 16.261378 1295.414456-14.417926 1326.949967 11.063659L1491.386917 176.445649C1491.386917 176.445649 1509.828899 203.588141 1487.134237 227.950326L678.652563 1006.190722C678.652563 1006.190722 639.309605 1045.956113 578.950849 1003.355602L11.926881 568.164707C11.926881 568.164707-3.94979 552.015392 2.476482 537.450909Z" p-id="6086" fill="#ffffff"></path></svg>
        </button>
        <button class="Btn cancel" @click="editorN">取消
          <svg t="1684487874431" class="svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1809" width="200" height="200"><path d="M1023.035952 170.907721l-852.12806 852.128061L0.241225 852.730697l852.248588-852.12806z" p-id="1810" fill="#ffffff"></path><path d="M170.425782 0l852.128061 852.12806L852.248758 1022.794727l-852.12806-852.248588z" p-id="1811" fill="#ffffff"></path></svg>     </button>
      </div>
    </div>
    <div class="toolbox" >
      <toolbox @add="handleAdd" :editConfirmShow="editConfirmShow" :newEntity="newEntity"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as Cesium from 'cesium'
import {onMounted, onUnmounted, ref} from 'vue';
import {listBuilding,getBuilding,addBuilding,delBuilding,updateBuilding} from '../../../api/business/building'
import {getDict} from '../../../api/business/enterprise'
import Toolbox from "./components/toolbox.vue";
import {useDict} from '../../../utils/dict'
const { building_type } =useDict("building_type");
import { ElMessage, ElMessageBox } from 'element-plus'
import {PolygonEditor} from './ts/polygonEditor'
class Dict {
  value:number
  label:string
}
  const dictSearchLoading=ref(<boolean>false);
const BuildingDict=ref(<Dict[]>[])
function remoteMethod(name) {
  if (name){
    dictSearchLoading.value = true
    getDict({name:name}).then((res)=>{
      dictSearchLoading.value=false
      BuildingDict.value=res
    })
  }else {
    BuildingDict.value=[]
  }
}


class building {
  id:number
  name?:string
  companyId?:number
  floorNumber?:number
  geometry?: string
}
const form=ref(<building>{})
/** -------------- 常规函数 -------------- **/
/**
 * 判断嵌套属性是否存在
 * @param obj 判断对象
 * @param key 嵌套属性字符串
 */
function has(obj, key) {
  return key.split(".").every(function (x) {
    if (typeof obj != "object" || obj === null || !x in obj)
      return false;
    obj = obj[x];
    return true;
  });
}

/**
 * 获取嵌套对象属性
 * @param obj 根对象
 * @param key 嵌套属性字符串
 */
function get(obj, key) {
  return key.split(".").reduce(function (o, x) {
    return (typeof o == "undefined" || o === null) ? o : o[x];
  }, obj);
}


/**
 * 初始化一个emit组件（后续添加事件直接在[]中添加）
 * pageEmit事件，控制父组件的page的index
 */
const emit = defineEmits(['pageEmit'])

/**
 * nginx静态资源服务地址(3dtiles,terrain,gltf,glb)
 */
let urlPrefix = "http://192.168.0.110/3dtiles/";
let Viewer: Cesium.Viewer | null = null;
let buildingDataSource=()=>{
  return Viewer.dataSources.getByName("buildings")[0]
}

/**
 * 初始化定cesium场景
 */
async function initCesiumScene() {
  /**
   * 地形
   */
  // const terrain = await Cesium.CesiumTerrainProvider.fromUrl(urlPrefix + "terrain1")
  Viewer = new Cesium.Viewer("CesiumContainer", {
    animation: false,
    baseLayerPicker: false,
    geocoder: false,
    scene3DOnly: true,
    sceneModePicker: false,
    selectionIndicator: false,
    infoBox: false,
    homeButton: false,
    timeline: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    // terrainProvider: terrain
  });
  Viewer.terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(urlPrefix + "terrain1")
  /**
   * 禁止自动刷新
   */
  Viewer.scene.requestRenderMode = true
  /**
   * 开启深度测试
   */
  Viewer.scene.globe.depthTestAgainstTerrain = false;
  /**
   * 隐藏cesium官方logo
   */
  let logo = <HTMLElement>(Viewer.cesiumWidget.creditContainer);
  logo.style.display = 'none';
  /**
   * 注销双击事件
   */
  Viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  /**
   * 根据相机参数飞入指定位置和视角
   */
  Viewer.camera.flyTo({
        "destination": Cesium.Cartesian3.fromArray([
          -2571683.695366126,
          5260943.930343438,
          2523132.2301845034
        ]),
        "orientation": {
          "heading": 0.14243287840364793,
          "pitch": -1.0727624347380265,
          "roll": 0.000031442924727009824
        }
      }
  )
  // Viewer.camera.flyTo({
  //       "destination": Cesium.Cartesian3.fromArray([
  //         -2741123.7852160246,
  //         3696113.7285103416,
  //         4402967.005206368
  //       ]),
  //       "orientation": {
  //         "heading": 3.0769434884646847,
  //         "pitch": -0.7832129737310427,
  //         "roll": 0.000021176093489394532
  //       }
  //     }
  // )
}

//倾斜摄影模型
let tiles;

/**
 * 加载倾斜摄影模型
 */
async function load3dtilesModel() {
  tiles = await Cesium.Cesium3DTileset.fromUrl(urlPrefix + "lj/tileset.json", {
    maximumScreenSpaceError: 64,
    maximumMemoryUsage: 512,
    skipScreenSpaceErrorFactor: 16,
    skipLevels: 1,
    immediatelyLoadDesiredLevelOfDetail: false,
    cullRequestsWhileMovingMultiplier: 10
  });
  //设置倾斜摄影模型的偏移
  let boundingSphere = tiles.boundingSphere
  let cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
  let longitude = cartographic.longitude;
  let latitude = cartographic.latitude;
  let originHeight = cartographic.height;
  let oldPosition = Cesium.Cartesian3.fromRadians(longitude, latitude, originHeight);
  let newPosition = Cesium.Cartesian3.fromDegrees(116.0545002, 23.456098, 45.17);
  let resultV = Cesium.Cartesian3.subtract(newPosition, oldPosition, new Cesium.Cartesian3());
  let matrix4 = Cesium.Matrix4.fromTranslation(resultV);
  //旋转
  let mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(20));
  let my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(-10));
  let mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(105));
  //旋转矩阵Matrix3
  let rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
  let rotationY = Cesium.Matrix4.fromRotationTranslation(my);
  let rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
  Cesium.Matrix4.multiply(rotationX, rotationY, rotationY)
  Cesium.Matrix4.multiply(rotationY, rotationZ, rotationZ)
  Cesium.Matrix4.multiply(tiles.root.transform, rotationZ, tiles.root.transform)
  tiles.modelMatrix = matrix4;
  if (Viewer instanceof Cesium.Viewer) {
    Viewer.scene.primitives.add(tiles);
  }
}

/**
 * 封装倾斜摄影模型展示方法
 * @param show 是否展示 true|false
 */
function showTiles(show: boolean) {
  tiles && (tiles.show = show);
  if (show == true) {
    Viewer.camera.flyTo({
      "destination": Cesium.Cartesian3.fromArray([
        -2571683.695366126,
        5260943.930343438,
        2523132.2301845034
      ]),
      "orientation": {
        "heading": 0.14243287840364793,
        "pitch": -1.0727624347380265,
        "roll": 0.000031442924727009824
      }
    });
  }

}

/**
 * 添加地图点击事件
 * 获取经纬度和高程c
 */
function getCameraByClick() {
  if (Viewer instanceof Cesium.Viewer) {
    const ellipsoid = Viewer.scene.globe.ellipsoid;
    let canvas = Viewer.scene.canvas;
    let handler = new Cesium.ScreenSpaceEventHandler(canvas);
    handler.setInputAction(function (lclickment: { position: Cesium.Cartesian2; }) {
      if (Viewer instanceof Cesium.Viewer) {
        //var cartesian = LoadCesium.Viewer.camera.pickEllipsoid(lclickment.position, ellipsoid);
        let cartesian = Viewer.scene.pickPosition(lclickment.position);
        console.log("111",cartesian)
        let picked = Viewer.scene.pick(lclickment.position);
        /**
         * 点击各个图层实体事件
         */
        dealEntityByDataSource(picked, cartesian);
        if (cartesian) {
          console.log(Cesium.SceneTransforms.wgs84ToWindowCoordinates(Viewer.scene, cartesian));
          console.log('相机参数:',
              {
                destination: Viewer.camera.position,
                orientation: {
                  heading: Viewer.camera.heading,
                  pitch: Viewer.camera.pitch,
                  roll: Viewer.camera.roll
                }
              })
          let cartographic = ellipsoid.cartesianToCartographic(cartesian);
          let lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
          let lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
          //地理高度
          let height = (cartographic.height).toFixed(2);
          console.log("经纬度高程:", lon + "," + lat + "," + height);
        }
        else {
          const ray = Viewer.camera.getPickRay(lclickment.position);
          const intersection = Viewer.scene.globe.pick(ray, Viewer.scene);
          var cartographic = ellipsoid.cartesianToCartographic(intersection);
          var lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
          var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
          //地理高度
          var height = (cartographic.height).toFixed(2);
          console.log("经纬度高程:", lon + "," + lat + "," + height);
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
}

let SelectedBuilding = null;

/**
 * 判断点击对象所属图层,并触发对应方法
 * @param picked 点击对象
 * @param cartesian 点击位置
 */
function dealEntityByDataSource(picked, cartesian:Cesium.Cartesian3) {
  if(!form.value.id&&buildingInfoPosition){
    handleDelete(null);
  }

  buildingInfoPosition = null;
  buildingInfoShow.value = false
  if (SelectedBuilding) {
    SelectedBuilding.polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.CYAN.withAlpha(0.5))
    SelectedBuilding = null;
    requestRender();
  }
  switch (get(picked, "id.entityCollection.owner.name")) {
      //建筑白膜图层
    case "buildings": {
      showBuildingInfo(picked.id, cartesian)
      break;
    }
    default: {
      console.log("无此图层的操作方法!")
    }
  }


}

let buildingInfoShow = ref(<boolean>false);
let editConfirmShow = ref(<boolean>false);

/**
 * 展示建筑弹窗
 * @param entity
 * @param cartesian
 */
function showBuildingInfo(entity, cartesian) {
  if (has(entity,"properties.id")){
    getBuilding(entity.properties.id).then((res)=>{
      form.value=res.data;
      if (form.value.companyId){
        dictSearchLoading.value=true
        getDict({id:form.value.companyId}).then((res)=>{
          dictSearchLoading.value=false
          BuildingDict.value=res;
        })
      }
      SelectedBuilding = entity
      SelectedBuilding.polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString("rgba(196,48,48,0.68)"))
      buildingInfoPosition = cartesian
      requestRender();
    })
  }else {
    form.value={companyId: null, floorNumber: 1, id: null, name: ""};
    SelectedBuilding = entity
    SelectedBuilding.polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString("rgba(196,48,48,0.68)"))
    buildingInfoPosition = cartesian
    requestRender();
  }
}

let buildingInfoPosition = null;

function addBuildingInfoRender() {
  const domEle = document.getElementById("buildingInfo")

  Viewer.scene.postRender.addEventListener(function () {
    if (buildingInfoPosition) {
      let canvasHeight = Viewer.scene.canvas.height;
      let windowPosition = new Cesium.Cartesian2();
      Cesium.SceneTransforms.wgs84ToWindowCoordinates(Viewer.scene, buildingInfoPosition, windowPosition);
      domEle.style.bottom = (canvasHeight - windowPosition.y) + 'px';
      domEle.style.left = (windowPosition.x-330) + 'px';
      buildingInfoShow.value = true
    }
  })
}
let flag=true
function addEditConfirmRender() {
  const domEle = document.getElementById("editConfirm")
  Viewer.scene.postRender.addEventListener(function () {
    if (editor&&editConfirmShow.value) {
      let position=editor.polygon_point_arr1[editor.polygon_point_arr1.length-1]
      if (position){
        let canvasHeight = Viewer.scene.canvas.height;
        let windowPosition = new Cesium.Cartesian2();
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(Viewer.scene, position, windowPosition);
        domEle.style.bottom = (canvasHeight - windowPosition.y) + 'px';
        domEle.style.left = (windowPosition.x) + 'px';
      }
    }
  })
}


/**
 * 封装一个主动刷新的方法，供父组件使用
 */
function requestRender() {
  Viewer.scene.requestRender()
}

/**
 * 加载建筑数据
 */
function loadBuildingList() {
  listBuilding().then((response) => {
    drawBuildings(response.rows)
  })
}

function drawBuildings(data) {
  if (data && data.length >= 1) {
    let geoData = {
      'type': 'FeatureCollection', 'features': []
    }
    data.forEach((item) => {
      if (item.geometry) {
        geoData.features.push(
            {
              'type': 'Feature',
              'geometry': JSON.parse(item.geometry),
              'properties': <building>{
                id:item.id,
                name:item.name
              }
            }
        )
      }
    })
    let geoSource = Cesium.GeoJsonDataSource.load(geoData, {
      // fill: Cesium.Color.BLACK.withAlpha(0.5),
      // // strokeWidth: 0,
      // stroke: Cesium.Color.BLUEVIOLET.withAlpha(0.5),
      clampToGround: true //是否贴地
    })
    geoSource.then((res) => {
      res.name = "buildings"
      res.entities.values.forEach((entity) => {
        // entity.polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;  // 贴地
        // entity.polygon.extrudedHeightReference = Cesium.HeightReference.RELATIVE_TO_GROUND; //拉伸
        entity.polygon.outline = null;
        // // entity.polygon.outlineColor = Cesium.Color.BLACK;
        // entity.polygon.classificationType = Cesium.ClassificationType.CESIUM_3D_TILE
        // entity.polygon.zIndex = 99
        entity.polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.CYAN.withAlpha(0.5))
        // console.log(editor.geoJsonOfPolygonEntity(entity))
      })
      Viewer.dataSources.add(res)
    })

  }
}
/**
 * polygon编辑类
 */
let editor=null;

/**
 * 添加建筑数据
 */
function handleAdd() {
  form.value={
    id:null,
  }
  if (!editor){
    editor=new PolygonEditor(Viewer,()=>{
      editor.draw(
          onFinish,
          onCancel);
    },()=>{
      editConfirmShow.value=true;
    })
  }else {
    editor.draw(
        onFinish,
        onCancel);
  }
  buildingInfoPosition=null
  buildingInfoShow.value=false;
  buildingDataSource().show=false;
  requestRender();
}

function editorY() {
  editConfirmShow.value=false;
  editor&&editor.savePolygon();
  editor&&editor.destroy();
}
function editorN() {
  editConfirmShow.value=false;
  editor&&editor.onCancel();
  editor&&editor.destroy();
}

let newEntity = null;
function onFinish(polygon,geometry) {
  newEntity = polygon;
  console.log(geometry);
  if (polygon instanceof Cesium.Entity){
    buildingDataSource().entities.add(polygon)
    buildingInfoPosition = polygon.polygon.hierarchy._value.positions[0];
  }
  form.value.geometry = geometry;
  buildingDataSource().show=true;
  requestRender();
}

function onCancel() {
  buildingDataSource().show=true;
  editConfirmShow.value = false
  ElMessage({
    type: 'warning',
    message: '绘制未保存!',
  })
  requestRender();
}
function handleSave(id) {
  if (id){
    ElMessageBox.confirm(
        '确认保存修改此条数据?',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          center: true,
        }
    )
        .then(() => {
          updateBuilding(form.value).then((response)=>{
            if (response.code === 200){
            buildingInfoPosition=null;
            buildingInfoShow.value=false;
            ElMessage({
              type: 'success',
              message: '修改完成!',
            })
            }
          })
        })
  }else {
    addBuilding(form.value).then((response) => {
      if (response.code === 200){
        newEntity.properties = {id:response.data}
        ElMessage({
          type: 'success',
          message: '新增建筑成功!',
        })
        buildingInfoPosition = null;
        buildingInfoShow.value=false;
      }
      newEntity = null
    })
  }
}
function handleDelete(id) {
  if (id){
    ElMessageBox.confirm(
        '确认是否删除此条数据?',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          center: true,
        }
    )
        .then(() => {
          /**
           * 删除面数据
           */
          delBuilding(id).then((response) => {
            if (response.code === 200){
              buildingDataSource().entities.remove(SelectedBuilding)
              SelectedBuilding=null;
              requestRender();
              buildingInfoPosition=null;
              buildingInfoShow.value=false;
              ElMessage({
                type: 'success',
                message: '删除建筑成功!',
              })
            }
          })
        })
  }
  else {
    buildingInfoPosition = null;
    buildingInfoShow.value = false;
    buildingDataSource().entities.remove(newEntity);
    ElMessage({
      type: 'info',
      message: '绘制未保存!',
    })
    requestRender();
  }
  newEntity = null;
}
onMounted(() => {
  initCesiumScene().then(() => {
    addBuildingInfoRender();
    addEditConfirmRender();
    loadBuildingList();
    load3dtilesModel();
    getCameraByClick();
  });
})
onUnmounted(() => {
  editor&&editor.destroy();
  Viewer && Viewer.destroy();
  Viewer = null;
  console.log("Viewer of Cesium 已销毁!")
})
/**
 * 子组件向父组件暴露的方法，供父组件调用
 */
defineExpose({
  showTiles,
  requestRender,
})


</script>

<style lang="scss" scoped>
.app-container {
  //position: relative;
  width: 100%;
  //height: 500px;
  margin: 0;
  padding: 0;
}
input[type=number] {

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  -moz-appearance: textfield;

}
#CesiumContainer {
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
#buildingInfo{
  .card {
    position: relative;
    width: 50vw;
    height: 40vh;
    background: #3405a3;
    border-radius: 15px;
    box-shadow: 1px 5px 60px 0 #100a886b;
    .content{
      height: 90%;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      align-content: flex-start;
      position: relative;
      .item{
        width: 1rem;
        padding-top: 20px;
        margin: 10px;
        flex: 1;
        .wave-group {
          position: relative;
        }
        .wave-group .input {
          font-size: 16px;
          padding: 10px 10px 10px 5px;
          display: block;
          width: 200px;
          border: none;
          color: white;
          border-bottom: 1px solid #515151;
          background: transparent;
        }

        .wave-group .input:focus {
          outline: none;
        }

        .wave-group .label {
          color: rgb(150, 157, 153);
          font-size: 14px;
          font-weight: normal;
          position: absolute;
          pointer-events: none;
          left: 5px;
          top: 10px;
          display: flex;
        }

        .wave-group .label-char {
          transition: 0.2s ease all;
          transition-delay: calc(var(--index) * .05s);
        }

        .wave-group .input:focus ~ label .label-char,
        .wave-group .input:valid ~ label .label-char {
          transform: translateY(-20px);
          //font-size: 14px;
          color: #8c9ce5;
        }

        .wave-group .bar {
          position: relative;
          display: block;
          width: 200px;
        }

        .wave-group .bar:before,.wave-group .bar:after {
          content: '';
          height: 2px;
          width: 0;
          bottom: 1px;
          position: absolute;
          background: #5264AE;
          transition: 0.2s ease all;
          -moz-transition: 0.2s ease all;
          -webkit-transition: 0.2s ease all;
        }

        .wave-group .bar:before {
          left: 50%;
        }

        .wave-group .bar:after {
          right: 50%;
        }

        .wave-group .input:focus ~ .bar:before,
        .wave-group .input:focus ~ .bar:after {
          width: 50%;
        }

      }
    }
    .footer{
      position: absolute;
      width: 100%;
      bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      .delete{
        background-color: rgb(182 74 111);
        box-shadow: 5px 5px 0 rgb(148, 60, 90);
      }
      .delete:active{
        box-shadow: 2px 2px 0 rgb(148, 60, 90);
      }
      .save{
        background-color: rgb(168, 38, 255);
        box-shadow: 5px 5px 0 rgb(140, 32, 212);
      }
      .save:active{
        box-shadow: 2px 2px 0 rgb(140, 32, 212);
      }

      .Btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100px;
        height: 40px;
        border: none;
        padding: 0 20px;

        color: white;
        font-weight: 500;
        cursor: pointer;
        border-radius: 10px;
        transition-duration: .3s;
      }
      .svg {
        width: 13px;
        position: absolute;
        right: 0;
        margin-right: 20px;
        fill: white;
        transition-duration: .3s;
      }

      .Btn:hover {
        color: transparent;
      }

      .Btn:hover svg {
        right: 43%;
        margin: 0;
        padding: 0;
        border: none;
        transition-duration: .3s;
      }

      .Btn:active {
        transform: translate(3px , 3px);
        transition-duration: .3s;
      }
    }
  }
  .card .card-border-top {
    width: 60%;
    height: 3%;
    background: #6b64f3;
    margin: auto;
    border-radius: 0 0 15px 15px;
  }
}
  #editConfirm{
    display: flex;
    .cancel{
      background-color: rgb(182 74 111);
      box-shadow: 5px 5px 0 rgb(148, 60, 90);
    }
    .cancel:active{
      box-shadow: 2px 2px 0 rgb(148, 60, 90);
    }
    .confirm{
      background-color: rgb(168, 38, 255);
      box-shadow: 5px 5px 0 rgb(140, 32, 212);
    }
    .confirm:active{
      box-shadow: 2px 2px 0 rgb(140, 32, 212);
    }
    .Btn {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100px;
      height: 40px;
      border: none;
      padding: 0 20px;
      margin: 0 10px;
      color: white;
      font-weight: 500;
      cursor:pointer;
      border-radius: 10px;
      transition-duration: .3s;
    }
    .svg {
      width: 13px;
      position: absolute;
      right: 0;
      margin-right: 20px;
      fill: white;
      transition-duration: .3s;
    }
    //
    //.Btn:hover svg {
    //  right: 43%;
    //  margin: 0;
    //  padding: 0;
    //  border: none;
    //  transition-duration: .3s;
    //}

    .Btn:active {
      transform: translate(3px , 3px);
      transition-duration: .3s;
    }
  }
}

</style>
