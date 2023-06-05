<template>
  <div id="CesiumContainer">
    <div v-show="buildingInfoShow" style="position: absolute;z-index: 2" id="buildingInfo">
      <building-popup ref="buildingP" @hideCard="hideCard"/>
    </div>
    <div v-show="northwestShow" class="MerchantsPopup" id="northwestMerchants">
      <MerchantsPopup :Merchants="northwestMerchants"/>
    </div>
    <div v-show="westShow" class="MerchantsPopup" id="westMerchants">
      <MerchantsPopup :Merchants="westMerchants"/>
    </div>
    <div v-show="eastShow" class="MerchantsPopup" id="eastMerchants">
      <MerchantsPopup :Merchants="eastMerchants"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as Cesium from 'cesium'
import {onMounted, onUnmounted, ref} from 'vue';
import {CircleWave} from './js/CircleWaveMaterial'
import {Spriteline1MaterialProperty} from './js/Spriteline1Material.js';
import {listBuilding} from '../../../api/business/building'
import BuildingPopup from "./popup/buildingPopup.vue";
import MerchantsPopup from "./popup/merchantsPopup.vue";

/**
 * 建筑弹窗组件
 */
const buildingP = ref<InstanceType<typeof BuildingPopup>>();

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
const emit = defineEmits(['pageEmit', 'hideCard','clickMonitor'])

/**
 * nginx静态资源服务地址(3dtiles,terrain,gltf,glb)
 */
let urlPrefix = "http://192.168.0.110/3dtiles/";
let Viewer: Cesium.Viewer | null = null;
let monitorsLayer = null;

/**
 * 初始化定cesium场景
 */
async function initCesiumScene() {
  /**
   * 地形
   */
  // const terrain = await Cesium.CesiumTerrainProvider.fromUrl(urlPrefix + "terrain1")
  Viewer = new Cesium.Viewer("CesiumContainer", {
    imageryProvider:
        new Cesium.UrlTemplateImageryProvider({
          url: urlPrefix + 'baseLayer/{z}/{x}/{y}.png',
          maximumLevel: 5
        }),
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
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //   url:'http://192.168.0.136:999/d/影像2/{z}/{x}/{y}.png',
    //   maximumLevel: 18
    // })
  });
  /**
   * 替换token
   */
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNDNjMDE0OC04ZjIwLTQ2ZjAtYTY1NS0yNDkxZDk0MTA4YWMiLCJpZCI6MTI1NjI1LCJpYXQiOjE2NzY5NDM0NjN9.6sQTbAgN7iC8RAiMP91qokqXbcaQyA-173Xu_STvnY8'

  Viewer.terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(urlPrefix + "terrain1")
  Viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
    url: urlPrefix + 'baseLayer/{z}/{x}/{y}.png',
    minimumLevel: 6,
    maximumLevel: 10,
    rectangle: Cesium.Rectangle.fromDegrees(107.6, 21.59, 121.1, 29.5)
  }))
  Viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
    url: urlPrefix + 'baseLayer/{z}/{x}/{y}.png',
    minimumLevel: 10,
    maximumLevel: 12,
    rectangle: Cesium.Rectangle.fromDegrees(115.08, 23.06, 116.65, 23.97)
  }))
  Viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
    url: urlPrefix + 'baseLayer/{z}/{x}/{y}.png',
    // minimumLevel : 15,
    maximumLevel: 18,
    rectangle: Cesium.Rectangle.fromDegrees(115.9, 23.41, 116.2, 23.53)
  }))
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
}

/**
 * 加载监控数据
 */
function loadMonitors() {
  monitorsLayer = Viewer.scene.primitives.add(new Cesium.BillboardCollection());
  monitorsLayer.name = "monitor"
  for (let i = 0; i < 1; i++) {
    monitorsLayer.add({
      image: '/img/map/monitor.png',  // 图片地址
      width: 100,
      height: 100,
      // scale: 1.0,
      // sizeInMeters : true, //图像的尺寸被指定成图像实际的尺寸
      scaleByDistance: new Cesium.NearFarScalar(0.1, 1.5, 1000, 0.1),
      position: Cesium.Cartesian3.fromDegrees(116.0538589, 23.4570889, 37.03),  // 点图标的位置
      // collection: properties,  // 什么方法？
      id: 1
    });
  }
  monitorsLayer.add({
    image: '/img/map/monitor.png',  // 图片地址
    width: 100,
    height: 100,
    // scale: 1.0,
    // sizeInMeters : true, //图像的尺寸被指定成图像实际的尺寸
    scaleByDistance: new Cesium.NearFarScalar(0.1, 1.5, 1000, 0.1),
    position: Cesium.Cartesian3.fromDegrees(116.0552602,23.4570976,38.46),  // 点图标的位置
    // collection: properties,  // 什么方法？
    id: 3
  });
}

let monitorsCamera = new Map()

/**
 * 飞入primitive中的实体
 * @param id 实体id
 * @param type 图层类型
 */
function flyTo(id, type) {
  const ellipsoid = Viewer.scene.globe.ellipsoid;
  switch (type) {
    case 1: {
      if (monitorsLayer) {
        for (let i = monitorsLayer.length - 1; i >= 0; i--) {
          if (id === monitorsLayer.get(i).id) {
            let cartographic = ellipsoid.cartesianToCartographic(monitorsLayer.get(i).position)
            let camera = monitorsCamera.get(id)
            /**
             * 已缓存
             */
            if (camera) {
              Viewer.camera.flyTo(
                  camera
              )
            }
            /**
             * 未缓存
             */
            else {
              camera = {
                destination: Cesium.Cartesian3.fromRadians(cartographic.longitude + 0.0000018571, cartographic.latitude - 0.0000016466, cartographic.height + 9.2),
                orientation: {
                  "heading": 5.4557155612379375,
                  "pitch": -0.5761709516976969,
                  "roll": 6.283185255825974
                }
              }
              monitorsCamera.set(id, camera)
              Viewer.camera.flyTo(
                  camera
              )
            }
            return
          }
        }
      }
      break
    }
  }
}

function showMonitors() {
  if (!monitorsLayer) {
    loadMonitors();
  } else {
    monitorsLayer.show = true
  }
}

function hiddenMonitors() {
  monitorsLayer && (monitorsLayer.show = false);
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
    showRoad(false);
    showTraffic(false);
    showLandExp(false)
    showPlotPlan(false)
    showMerchants(false)
  }

}

/**
 * 添加地图点击事件
 * 获取经纬度和高程c
 */
function getCameraByClick() {
  if (Viewer instanceof Cesium.Viewer) {
    const ellipsoid = Viewer.scene.globe.ellipsoid;
    var canvas = Viewer.scene.canvas;
    var handler = new Cesium.ScreenSpaceEventHandler(canvas);
    handler.setInputAction(function (lclickment: { position: Cesium.Cartesian2; }) {
      if (Viewer instanceof Cesium.Viewer) {
        //var cartesian = LoadCesium.Viewer.camera.pickEllipsoid(lclickment.position, ellipsoid);

        let cartesian = Viewer.scene.pickPosition(lclickment.position);
        let picked = Viewer.scene.pick(lclickment.position);

        /**
         * 点击各个图层实体事件
         */
        dealEntityByDataSource(picked, cartesian);

        if (cartesian) {
          console.log('相机参数:',
              {
                destination: Viewer.camera.position,
                orientation: {
                  heading: Viewer.camera.heading,
                  pitch: Viewer.camera.pitch,
                  roll: Viewer.camera.roll
                }
              })
          var cartographic = ellipsoid.cartesianToCartographic(cartesian);
          var lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
          var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
          //地理高度
          var height = (cartographic.height).toFixed(2);
          console.log("经纬度高程:", lon + "," + lat + "," + height);
          //相机高度
          // // var height=viewer.camera.positionCartographic.height.toFixed(0);
          // //方向   围绕Z轴旋转
          // var heading = Cesium.Math.toDegrees(viewer.camera.heading).toFixed(2);
          // //倾斜角度   围绕Y轴旋转
          // var pitch = Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(2);
          // //围绕X轴旋转
          // var roll = Cesium.Math.toDegrees(viewer.camera.roll).toFixed(2);
          // console.log('heading:'+heading+';'+'pitch:'+pitch + ';'+'roll:' + roll)


          if (Cesium.defined(picked)) {
            if (picked.primitive.isCesium3DTileset == undefined) {
              if (picked.id && (picked.id.id === "jiexi" || picked.id.id === "jiexi2")) {
                Viewer.camera.flyTo({
                  //倾斜摄影模型位置
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
                })
                showTraffic(false);
                showRoad(false);
                showLandExp(false)
                showPlotPlan(false)
                showMerchants(false)
                showTiles(true)
                //将父组件的currentPage设置为1（园区概览）
                emit('pageEmit')
              }
            }
          }
        } else {
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
 */
function dealEntityByDataSource(picked, cartesian) {
  buildingInfoPosition = null;
  buildingInfoShow.value = false
  buildingP.value.sceneLoad = false
  if (SelectedBuilding) {
    SelectedBuilding.polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.WHITE.withAlpha(0))
    SelectedBuilding = null;
    requestRender();
  }
  //用于存储所选实体的name
  let pickName;
  if (picked !== undefined) {
    if (picked.primitive instanceof Cesium.GroundPrimitive) {
      pickName = get(picked, "id.entityCollection.owner.name")
    }else if (picked.primitive instanceof Cesium.Billboard) {
      pickName = get(picked, "collection.name")
    }
  }
  switch (pickName) {
      //建筑白膜图层
    case "buildings": {
      showBuildingInfo(picked.id, cartesian)
      break;
    }
    case "monitor": {
      emit('clickMonitor',picked.id)
      break;
    }
    case undefined: {
      console.log("未关联图层")
      break
    }
    case null: {
      console.log("图层名属性为空")
      break
    }
    default: {
      console.log("无此图层的操作方法!")
    }
  }



}

let buildingInfoShow = ref(<boolean>false);

/**
 * 展示建筑弹窗
 * @param entity
 * @param cartesian
 */
function showBuildingInfo(entity, cartesian) {
  SelectedBuilding = entity
  SelectedBuilding.polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.fromBytes(0, 136, 255).withAlpha(0.3))
  buildingInfoPosition = cartesian
  requestRender();
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
      domEle.style.left = (windowPosition.x) + 'px';
      buildingInfoShow.value = true
    }
  })
}

/**
 * 展示招商地块弹窗
 */
function addMerchantsRender() {
  const northwestMerchants = document.getElementById("northwestMerchants")
  const westMerchants = document.getElementById("westMerchants")
  const eastMerchants = document.getElementById("eastMerchants")
  Viewer.scene.postRender.addEventListener(function () {
    if (MerchantsDatasource && MerchantsDatasource.show) {
      let canvasHeight = Viewer.scene.canvas.height;
      let windowPosition = new Cesium.Cartesian2();
      Cesium.SceneTransforms.wgs84ToWindowCoordinates(Viewer.scene, new Cesium.Cartesian3(-2570057.5923759965, 5259446.089385612, 2524279.97613476), windowPosition);
      northwestMerchants.style.bottom = (canvasHeight - windowPosition.y) + 'px';
      northwestMerchants.style.left = (windowPosition.x) + 'px';
      Cesium.SceneTransforms.wgs84ToWindowCoordinates(Viewer.scene, new Cesium.Cartesian3(-2570633.5984311835, 5259622.385078575, 2523332.8925166363), windowPosition);
      westMerchants.style.bottom = (canvasHeight - windowPosition.y) + 'px';
      westMerchants.style.left = (windowPosition.x) + 'px';
      Cesium.SceneTransforms.wgs84ToWindowCoordinates(Viewer.scene, new Cesium.Cartesian3(-2571427.6890649004, 5259260.631353611, 2523278.1686810385), windowPosition);
      eastMerchants.style.bottom = (canvasHeight - windowPosition.y) + 'px';
      eastMerchants.style.left = (windowPosition.x) + 'px';
      merchantsDialogShow(true);
    }
  })
}


/**
 * 交通优势展示
 * @param show 是否展示交通优势true or false
 */
function showRoad(show: boolean) {
  //道路展示根据show来判断是否展示
  roadDataSources && (roadDataSources.show = show)
  roadLabelCollection && (roadLabelCollection.show = show)
  circleWave && (circleWave.show(show))
}


//道路实体数据
let roadDataSources;
//道路名称数据
let roadLabelCollection;
//水波纹
let circleWave;

/**
 * 交通优势图层展示
 */
function clickRoad() {
  //将区位优势隐藏
  showTraffic(false)
  //将征地优势隐藏
  showLandExp(false)
  //将生态工业隐藏
  showPlotPlan(false)
  //招商地块隐藏
  showMerchants(false)
  Viewer.camera.flyTo(
      //交通优势位置
      {
        "destination": Cesium.Cartesian3.fromArray([
          -2585033.2824852583,
          5316715.401829224,
          2535671.1942265225
        ]),
        "orientation": {
          "heading": 6.24607421211219,
          "pitch": -1.3220475261771623,
          "roll": 6.283183764126042
        }
      }
  )
  if (typeof roadDataSources == 'undefined') {
    // 道路穿梭线
    let ellipsoid = Viewer.scene.globe.ellipsoid;
    Cesium.GeoJsonDataSource.load(urlPrefix + "jiexi/dwdad.json").then(function (dataSource) {

      roadDataSources = dataSource;
      roadLabelCollection = new Cesium.LabelCollection();
      Viewer.scene.primitives.add(roadLabelCollection);
      Viewer.dataSources.add(roadDataSources);
      const entities = roadDataSources.entities.values;
      for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];


        if (typeof entity._name !== 'undefined') {
          let cartographic = ellipsoid.cartesianToCartographic(entity.polyline.positions._value[0]);
          // 弧度转换为经纬度
          let lon = Cesium.Math.toDegrees(cartographic.longitude);  // 经度
          let lat = Cesium.Math.toDegrees(cartographic.latitude);   // 纬度

          var label1 = roadLabelCollection.add({
            id: entity._name,
            text: entity._name,
            font: 'bold 32px MicroSoft YaHei',
            fillColor: Cesium.Color.fromBytes(0, 0, 0),

            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1,
            scale: 0.5,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            // position: entity.polyline.positions._value[4],
            position: Cesium.Cartesian3.fromDegrees(lon, lat, 300),
            pixelOffset: new Cesium.Cartesian2(0, -10),
            scaleByDistance: new Cesium.NearFarScalar(1000, 2.2, 400000, 0),
          });
          entity.polyline.width = 3;
          entity.polyline.material = new Spriteline1MaterialProperty(1000, '/img/spriteline1.png');
          entity.label = label1;
        } else {
          entity.polyline.width = 1.7;
          entity.polyline.material = new Spriteline1MaterialProperty(1000, '/img/spriteline3.png');
        }

        entity.polyline.clampToGround = true;

      }
    });
    // 让园区有水波纹扩散，展示道路优势
    circleWave = new CircleWave(Viewer, "jiexi2");
    circleWave.add([116.0519543, 23.4590299, 260.0], '#1FA8E3', 5000, 3000);
  } else {
    showRoad(true)
  }
}

//区位优势entity数据
let areaDatasource;

/**
 * 区位优势展示
 */
function areaAdvantage() {
  //将其他图层隐藏
  showRoad(false)
  showLandExp(false)
  showPlotPlan(false)
  showMerchants(false)
  Viewer.camera.flyTo(
      //区位优势位置
      {
        "destination": Cesium.Cartesian3.fromArray([
          -2642825.2372667873,
          5330875.332255637,
          2559223.1490342496
        ]),
        "orientation": {
          "heading": 5.858174432378705,
          "pitch": -1.4636545052918755,
          "roll": 0.0001902947759981899
        }
      }
  )
  if (typeof areaDatasource == 'undefined') {

    areaDatasource = new Cesium.CustomDataSource('areaDatasource');
    Viewer.dataSources.add(areaDatasource);

    let graphical = areaDatasource.entities.add({
      position: Cesium.Cartesian3.fromDegrees(116.340975, 23.614982, 1000.0),
      label: {
        id: '揭阳站',
        text: '揭阳站',
        eyeOffset: new Cesium.Cartesian3(0, 5600, 0),
        scaleByDistance: new Cesium.NearFarScalar(1000, 2.5, 40000, 0.6),
      },
      ellipse: {
        semiMinorAxis: 5000.0,
        semiMajorAxis: 5000.0,
        height: 500.0,
        extrudedHeight: 510,
        material: new Cesium.ImageMaterialProperty({
          transparent: true,
          image: '/img/circle10.png',
        })
      },
    });

    let graphical2 = areaDatasource.entities.add({
      position: Cesium.Cartesian3.fromDegrees(116.515619, 23.552627, 1000.0),
      label: {
        id: '揭阳潮汕国际机场',
        text: '揭阳潮汕国际机场',
        eyeOffset: new Cesium.Cartesian3(0, 5600, 0),
        scaleByDistance: new Cesium.NearFarScalar(500, 2.5, 40000, 0.6),
      },
      ellipse: {
        semiMinorAxis: 5000.0,
        semiMajorAxis: 5000.0,
        height: 500.0,
        extrudedHeight: 510,
        material: new Cesium.ImageMaterialProperty({
          color: Cesium.Color.LIME,
          transparent: true,
          image: '/img/circle2.png'
        })
      },
    });

    let graphical3 = areaDatasource.entities.add({
      id: "jiexi",
      position: Cesium.Cartesian3.fromDegrees(116.062907, 23.462201, 1000.0),
      label: {
        id: '揭西县产业园',
        text: '揭西县产业园',
        eyeOffset: new Cesium.Cartesian3(0, 5600, 0),
        scaleByDistance: new Cesium.NearFarScalar(500, 2.5, 40000, 0.6),
      },
      ellipse: {
        semiMinorAxis: 6000.0,
        semiMajorAxis: 6000.0,
        height: 500.0,
        extrudedHeight: 510,
        material: new Cesium.ImageMaterialProperty({
          transparent: true,
          image: '/img/circle8.png'
        })
      },
    });

    let graphical4 = areaDatasource.entities.add({
      position: Cesium.Cartesian3.fromDegrees(116.20556, 23.272876, 1000.0),
      label: {
        id: '普宁站',
        text: '普宁站',
        eyeOffset: new Cesium.Cartesian3(0, 5600, 0),
        scaleByDistance: new Cesium.NearFarScalar(500, 2.5, 40000, 0.6),
      },
      ellipse: {
        semiMinorAxis: 5000.0,
        semiMajorAxis: 5000.0,
        height: 500.0,
        extrudedHeight: 510,
        material: new Cesium.ImageMaterialProperty({
          // color: new Cesium.Color(1,1,1,0.99),
          transparent: true,
          image: '/img/circle10.png'
        })
      },
    });

    let graphical5 = areaDatasource.entities.add({
      position: Cesium.Cartesian3.fromDegrees(116.594779, 23.545378, 1000.0),
      label: {
        id: '潮汕站',
        text: '潮汕站',
        eyeOffset: new Cesium.Cartesian3(500, 5600, 0),
        scaleByDistance: new Cesium.NearFarScalar(500, 2.5, 40000, 0.6),
      },
      ellipse: {
        semiMinorAxis: 5000.0,
        semiMajorAxis: 5000.0,
        height: 500.0,
        extrudedHeight: 510,
        material: new Cesium.ImageMaterialProperty({
          transparent: true,
          image: '/img/circle10.png'
        })
      },
    });
    //遍历areaDatasource里的graphical，让其调用rotateMaterial转动起来
    for (const graphical of areaDatasource.entities.values) {
      //判断此次遍历对象是否是ellipse
      if (graphical.ellipse) {
        rotateMaterial(graphical.ellipse, 0, 1);
      }
    }

    //添加三条区位路径线路展示
    areaDatasource.entities.add({
      name: "机场线路",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          116.062907, 23.462201,
          116.515619, 23.552627,
        ]),
        clampToGround: true,
        width: 10,
        material: new Spriteline1MaterialProperty(1000, '/img/spriteline2.png')
      }
    })

    areaDatasource.entities.add({
      name: "潮汕站路",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          116.062907, 23.462201,
          116.594779, 23.545378,
        ]),
        clampToGround: true,
        width: 10,
        material: new Spriteline1MaterialProperty(1000, '/img/redline.png')
      }
    })

    areaDatasource.entities.add({
      name: "普宁站线路",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          116.062907, 23.462201,
          116.20556, 23.272876
        ]),
        clampToGround: true,
        width: 10,
        material: new Spriteline1MaterialProperty(1000, '/img/redline.png')
      }
    })

    areaDatasource.entities.add({
      name: "揭阳站线1路",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          116.062907, 23.462201,
          116.340975, 23.614982,
        ]),
        clampToGround: true,
        width: 10,
        material: new Spriteline1MaterialProperty(1000, '/img/redline.png')
      }
    })
  } else {
    showTraffic(true)
  }
}

/**
 * 抽象区位优势展示方法
 * @param show 是否展示区位优势 true or false
 */
function showTraffic(show: boolean) {
  //区位优势展示根据show来判断是否展示
  areaDatasource && (areaDatasource.show = show);
}

/**
 * entity转动方法封装
 * @param instance entity实体
 * @param _stRotation 旋转角度
 * @param _amount 旋转速度
 */
function rotateMaterial(instance: Cesium, _stRotation: number, _amount: number) {
  instance.stRotation = new Cesium.CallbackProperty(function () {
    _stRotation += _amount;
    if (_stRotation >= 360 || _stRotation <= -360) {
      _stRotation = 0;
    }
    return Cesium.Math.toRadians(_stRotation);
  }, false)
}

//征地计划实体数据
let LandExpropriationDatasource;

/**
 * 征地计划展示
 */
function clickLand(position) {
  let ellipsoid = Viewer.scene.globe.ellipsoid;
  if (position == 1) {
    Viewer.camera.flyTo({
      "destination": Cesium.Cartesian3.fromArray([
        -2571384.877507592,
        5259247.113876226,
        2524216.761369217
      ]),
      "orientation": {
        "heading": 3.7813048326844365,
        "pitch": -0.767133507574913,
        "roll": 0.000007289069820615168
      }
    })
  } else if (position == 2) {
    Viewer.camera.flyTo({
      "destination": Cesium.Cartesian3.fromArray([
        -2570319.066359756,
        5259893.024232269,
        2523401.2248049113
      ]),
      "orientation": {
        "heading": 0.8792449427375528,
        "pitch": -0.508911541340713,
        "roll": 0.000013859491676093683
      }
    })
  } else {
    Viewer.camera.flyTo(
        //揭西产业园位置
        {
          "destination": Cesium.Cartesian3.fromArray([
            -2572418.034205747,
            5262819.324390315,
            2524582.127101226
          ]),
          "orientation": {
            "heading": 0.13714896160071888,
            "pitch": -1.4418868398026539,
            "roll": 0.00032016405442814033
          }
        }
    )
  }
  if (typeof LandExpropriationDatasource == 'undefined') {
    // 加载征地计划geojson数据
    Cesium.GeoJsonDataSource.load(urlPrefix + "/jiexi/zhengdi.json").then(function (dataSource) {

      LandExpropriationDatasource = dataSource;
      Viewer.dataSources.add(LandExpropriationDatasource);
      let entities = LandExpropriationDatasource.entities.values;
      let length = entities.length - 1;
      for (let i = length; i >= 0; i--) {
        let geoEntity = entities[i]
        //将墨卡托坐标转成经纬度，方便设置label固定高度。
        var center = Cesium.BoundingSphere.fromPoints(geoEntity.polygon.hierarchy._value.positions).center;
        var centergraphic = ellipsoid.cartesianToCartographic(center);
        var lon = Cesium.Math.toDegrees(centergraphic.longitude).toFixed(7);
        var lat = Cesium.Math.toDegrees(centergraphic.latitude).toFixed(7);
        //判断该区域是否存有文本需要展示
        if (geoEntity.properties._legend_id._value !== " ") {
          LandExpropriationDatasource.entities.add({
            position: Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat), 150),
            label: {
              fillColor: Cesium.Color.WHITE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 5,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              text: geoEntity.properties._legend_id._value,
              font: "bold 18px sans-serif",
              //文本标签相对于其位置的水平对齐方式
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              //文本标签相对于其位置的垂直对齐方式
              verticalOrigin: Cesium.VerticalOrigin.TOP,
              scaleByDistance: new Cesium.NearFarScalar(1000, 1.7, 40000, 0),
            }
          });
        }
        geoEntity.polygon.extrudedHeight = 100
        switch (geoEntity.properties.land_type._value) {
          case "1":
            geoEntity.polygon.material = Cesium.Color.GOLDENROD.withAlpha(0.7)
            geoEntity.polygon.outlineColor = Cesium.Color.GOLDENROD
            break;
          case "2":
            geoEntity.polygon.material = Cesium.Color.RED.withAlpha(0.7)
            geoEntity.polygon.outlineColor = Cesium.Color.RED
            break
          case "3":
            geoEntity.polygon.material = Cesium.Color.BLUE.withAlpha(0.7)
            geoEntity.polygon.outlineColor = Cesium.Color.BLUE
            break
          case "4":
            geoEntity.polygon.material = Cesium.Color.GREEN.withAlpha(0.7)
            geoEntity.polygon.outlineColor = Cesium.Color.GREEN
            break
          case "5":
            //将外圈polygon转换为polyline，销毁polygon，节省性能
            LandExpropriationDatasource.entities.add({
              polyline: {
                positions: geoEntity.polygon.hierarchy._value.positions,
                width: 6,
                clampToGround: true,
                material: Cesium.Color.SKYBLUE,
              }
            })
            LandExpropriationDatasource.entities.remove(geoEntity)
            break
          case "6":
            geoEntity.polygon.material = Cesium.Color.PURPLE.withAlpha(0.7)
            geoEntity.polygon.outlineColor = Cesium.Color.PURPLE
            break
        }
      }
    });
  }
  //显示征地计划展示
  showLandExp(true)
  //隐藏其他
  showRoad(false)
  showTraffic(false)
  showTiles(false)
  showPlotPlan(false)
  showMerchants(false)

}

/**
 * 抽象征地计划展示方法
 * @param show 是否展示 true | false
 */
function showLandExp(show: boolean) {
  LandExpropriationDatasource && (LandExpropriationDatasource.show = show)
}

//地块规划数据
let plotPlanDatasource;

/**
 * 地块规划展示
 */
function clickPlotPlan() {
  let ellipsoid = Viewer.scene.globe.ellipsoid;
  Viewer.camera.flyTo(
      //揭西产业园位置
      {
        "destination": Cesium.Cartesian3.fromArray([
          -2572418.034205747,
          5262819.324390315,
          2524582.127101226
        ]),
        "orientation": {
          "heading": 0.13714896160071888,
          "pitch": -1.4418868398026539,
          "roll": 0.00032016405442814033
        }
      }
  )
  if (typeof plotPlanDatasource == 'undefined') {
    // 加载地块规划geoJson数据
    Cesium.GeoJsonDataSource.load(urlPrefix + "/jiexi/ecology.json").then(function (dataSource) {
      plotPlanDatasource = dataSource;
      plotPlanDatasource.name = "plotPlan";
      Viewer.dataSources.add(plotPlanDatasource);
      let entities = plotPlanDatasource.entities.values;
      let length = entities.length - 1;
      for (let i = length; i >= 0; i--) {
        let geoEntity = entities[i]
        //将墨卡托坐标转成经纬度，方便设置label固定高度。
        var center = Cesium.BoundingSphere.fromPoints(geoEntity.polygon.hierarchy._value.positions).center;
        var centergraphic = ellipsoid.cartesianToCartographic(center);
        var lon = Cesium.Math.toDegrees(centergraphic.longitude).toFixed(7);
        var lat = Cesium.Math.toDegrees(centergraphic.latitude).toFixed(7);
        //判断该区域是否存有文本需要展示
        if (geoEntity.properties.type._value !== " " && geoEntity.properties.type._value !== "规划范围") {
          plotPlanDatasource.entities.add({
            position: Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat), 150),
            label: {
              fillColor: Cesium.Color.WHITE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 5,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              text: geoEntity.properties.type._value,
              font: "bold 16px sans-serif",
              //文本标签相对于其位置的水平对齐方式
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              //文本标签相对于其位置的垂直对齐方式
              verticalOrigin: Cesium.VerticalOrigin.TOP,
              scaleByDistance: new Cesium.NearFarScalar(1000, 1.6, 40000, 0),
            }
          });
        }
        geoEntity.polygon.extrudedHeight = 100
        switch (geoEntity.properties.type._value) {
          case "M2":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#846449").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#846449")
            break;
          case "W2":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#786abb").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#786abb")
            break
          case "R2":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#e3ea31").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#e3ea31")
            break
          case "U21":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#4394c4").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#4394c4")
            break
          case "U22":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#b96f20").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#b96f20")
            break
          case "B41":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#f28374").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#f28374")
            break
          case "U31":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#0004e8").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#0004e8")
            break
          case "B1":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#ed1b49").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#ed1b49")
            break
          case "G1":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#3eff00").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#3eff00")
            break
          case "A1":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#e75992").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#e75992")
            break
          case "G2":
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#00810b").withAlpha(0.9)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#00810b")
            break
          case "规划范围":
            //将外圈polygon转换为polyline，销毁polygon，节省性能
            plotPlanDatasource.entities.add({
              polyline: {
                positions: geoEntity.polygon.hierarchy._value.positions,
                width: 6,
                clampToGround: true,
                material: new Cesium.PolylineDashMaterialProperty({
                  color: Cesium.Color.fromCssColorString("#b61515")
                })
              }
            })
            plotPlanDatasource.entities.remove(geoEntity)
            break
        }
      }
    });
  }
  //显示征地计划展示
  showPlotPlan(true)
  //隐藏其他
  showLandExp(false)
  showRoad(false)
  showTraffic(false)
  showTiles(false)
  showMerchants(false)
}

/**
 * 封装地块规划展示方法
 */
function showPlotPlan(show: boolean) {
  //生态工业展示根据show来判断是否展示
  plotPlanDatasource && (plotPlanDatasource.show = show);
}

//近期招商地块数据
let MerchantsDatasource;
//招商地块弹窗展示
let northwestShow = ref(<boolean>false);
let westShow = ref(<boolean>false);
let eastShow = ref(<boolean>false);

/**
 * 封装招商地块弹窗显示方法
 * @param show
 */
function merchantsDialogShow(show) {
  northwestShow && (northwestShow.value = show)
  westShow && (westShow.value = show)
  eastShow && (eastShow.value = show)
}

//招商地块弹框数据
let northwestMerchants = <object>{
  title: '西北部先进制造业片区',
  scale: '806.1亩',
  dominantFunction: '先进制造业'
};
let westMerchants = <object>{
  title: '西部产业片区',
  scale: '58.7亩',
  dominantFunction: '制造业',
};
let eastMerchants = <object>{
  title: '东部产业片区',
  scale: '255.8亩',
  dominantFunction: '电线电缆制造业'
};

/**
 * 近期招商地块展示
 */
function clickMerchants() {
  let ellipsoid = Viewer.scene.globe.ellipsoid;
  Viewer.camera.flyTo(
      //揭西产业园位置
      {
        "destination": Cesium.Cartesian3.fromArray([
          -2572706.100624229,
          5262600.364207941,
          2523773.6622733017
        ]),
        "orientation": {
          "heading": 0.19947441326197257,
          "pitch": -1.143647019769778,
          "roll": 0.00010822389082143502
        }
      }
  )
  if (typeof MerchantsDatasource == 'undefined') {
    // 加载地块规划geoJson数据
    Cesium.GeoJsonDataSource.load(urlPrefix + "/jiexi/zhaoshang3.json").then(function (dataSource) {
      MerchantsDatasource = dataSource;
      MerchantsDatasource.name = "merchants";
      Viewer.dataSources.add(MerchantsDatasource);
      let entities = MerchantsDatasource.entities.values;
      let length = entities.length - 1;
      for (let i = length; i >= 0; i--) {
        let geoEntity = entities[i]
        geoEntity.polygon.extrudedHeight = 100
        switch (geoEntity.properties.areaType._value) {
          case 0:
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#59aada").withAlpha(0.6)
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#59aada")
            geoEntity.polygon.extrudedHeight = 0;
            break;
          case 1:
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#846449")
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#846449")
            break;
          case 2:
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#786abb")
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#786abb")
            break
          case 3:
            geoEntity.polygon.material = Cesium.Color.fromCssColorString("#30e833")
            geoEntity.polygon.outlineColor = Cesium.Color.fromCssColorString("#30e833")
            break
        }
      }
    });
  }
  showMerchants(true);
  //隐藏其他
  showPlotPlan(false)
  showLandExp(false)
  showRoad(false)
  showTraffic(false)
  showTiles(false)
}

/**
 * 封装地块规划展示方法
 */
function showMerchants(show: boolean) {
  //生态工业展示根据show来判断是否展示
  MerchantsDatasource && (MerchantsDatasource.show = show);
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
    data.forEach((item, index) => {
      if (item.geometry) {
        geoData.features.push(
            {
              'type': 'Feature',
              'geometry': JSON.parse(item.geometry),
              'properties': item
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
      res.entities.values.forEach((entity, index) => {
        // entity.polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;  // 贴地
        // entity.polygon.extrudedHeightReference = Cesium.HeightReference.RELATIVE_TO_GROUND; //拉伸
        entity.polygon.outline = null;
        // // entity.polygon.outlineColor = Cesium.Color.BLACK;
        // entity.polygon.classificationType = Cesium.ClassificationType.CESIUM_3D_TILE
        // entity.polygon.zIndex = 99
        entity.polygon.material = new Cesium.ColorMaterialProperty(Cesium.Color.WHITE.withAlpha(0))
        // console.log(editor.geoJsonOfPolygonEntity(entity))
      })
      Viewer.dataSources.add(res)
    })

  }
};

/**
 * 隐藏所有侧边栏card
 */
function hideCard(index) {
  emit('hideCard', index)
}

onMounted(() => {
  initCesiumScene().then(() => {
    addBuildingInfoRender();
    addMerchantsRender();
    loadBuildingList();
    load3dtilesModel();
    getCameraByClick();
  });
})
onUnmounted(() => {
  Viewer && Viewer.destroy();
  Viewer = null;
  console.log("Viewer of Cesium 已销毁!")
})
/**
 * 子组件向父组件暴露的方法，供父组件调用
 */
defineExpose({
  clickRoad,
  areaAdvantage,
  clickLand,
  showTiles,
  requestRender,
  clickPlotPlan,
  clickMerchants,
  merchantsDialogShow,
  showMerchants,
  showLandExp,
  showPlotPlan,
  showMonitors,
  hiddenMonitors,
  flyTo
})


</script>

<style scoped>
#CesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#buildingInfo {
  height: 4rem;
  width: 4rem;
}

.MerchantsPopup {
  position: absolute;
  z-index: 2;
  height: 3rem;
  width: 3.5rem;
}
</style>
