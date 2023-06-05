<template>
  <div className="headerNav">
    <HeaderNav @clickHidden="clickHidden" v-show="bodyShow" @hiddenInvertClassification="hiddenInvertClassification"
               @hiddenPopup="hiddenPopup"/>
    <div title="点击隐藏"
         style="cursor: pointer; color: #fdc612;position: absolute;right: 2rem; top: 1.5rem ; font-size: 1.5rem"
         @click="clickHidden">
      <el-icon>
        <Fold/>
      </el-icon>
    </div>
  </div>

  <div id="cesiumContainer"></div>
  <div className="leftt" v-show="bodyShow">
    <Left/>
  </div>
  <transition name="slide" v-show="bodyShow">
    <div className="rightt" v-show="data.isBShow">
      <Bkx/>
      <Right/>
    </div>
  </transition>
  <div className="bottomm" v-show="bodyShow">
    <Bottom @showAllHouse="showAllHouse" @showRedStory="showRedStory"/>
  </div>
<!--  <div className="rightt" >-->
    <BuildingPopup v-show="bodyShow && !data.isBShow && BuildingPopupShow && (store.state.currentContent == 2)" v-drag></BuildingPopup>
  <RedStoryPopup v-show="bodyShow && !data.isBShow && redStoryPopupShow && (store.state.currentContent == 1)" v-drag></RedStoryPopup>
<!--  </div>-->
</template>

<script setup lang="ts">
import HeaderNav from '../components/headerNav.vue'
import Left from '../components/left.vue'
import Right from '../components/right.vue'
import Bottom from '../components/bottom.vue'
import Bkx from '../components/bkx.vue'
import BuildingPopup from '../components/popup/buildingPopup.vue'
import RedStoryPopup from '../components/popup/redStoryPopup.vue'
import * as Cesium from 'cesium';
import {ElNotification} from 'element-plus'
import {
  onMounted,
  computed,
  watch,
  reactive,
  ref
} from 'vue';
import {
  useStore,
  mapState
} from 'vuex'

const BuildingPopupShow = ref(<boolean>false)
const redStoryPopupShow = ref(<boolean>false)
const store = useStore()
const data = reactive({
  isBShow: true
})
// 获取vuex
const getShowTask = computed(() => {
  //返回的是ref对象
  return store.state.isBShow
})
// 监听
watch(getShowTask, (newValue, oldValue) => {
  // upNewData()
  data.isBShow = newValue
});
import {WallDiffuseMaterialProperty} from './js/WallDiffuseMaterialProperty'
import {CallbackProperty, ImageMaterialProperty} from "cesium";

let urlPrefix = "http://43.139.55.45:999/d/";
let Viewer: Cesium.Viewer | null = null;

/**
 * 初始化定cesium场景
 */
async function initCesiumScene() {
  /**
   * 地形
   */
  // const terrain = await Cesium.CesiumTerrainProvider.fromUrl(urlPrefix + "terrain1")
  Viewer = new Cesium.Viewer("cesiumContainer", {
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
    // imageryProvider:
    //     new Cesium.UrlTemplateImageryProvider({
    //       url: urlPrefix + 'baseLayer/{z}/{x}/{y}.png',
    //       maximumLevel: 5
    //     }),
  });
  Viewer.imageryLayers.get(0).brightness = 0.3
  // Viewer.imageryLayers = new Cesium.UrlTemplateImageryProvider({
  //   url:'http://192.168.0.136:999/d/影像2/{z}/{x}/{y}.png',
  //   defaultBrightness: 0.5,
  // })
  // let imgp = new Cesium.UrlTemplateImageryProvider({
  //   url: urlPrefix + 'baseLayer/{z}/{x}/{y}.png',
  //   minimumLevel: 6,
  //   maximumLevel: 18,
  //   rectangle: Cesium.Rectangle.fromDegrees(107.6, 21.59, 121.1, 29.5)
  // })
  // imgp.defaultBrightness = 0.2;
  // Viewer.imageryLayers.addImageryProvider(imgp)
  // Viewer.terrainProvider=await Cesium.CesiumTerrainProvider.fromUrl(urlPrefix + "terrain1")
  /**
   * 禁止自动刷新
   */
  Viewer.scene.requestRenderMode = false
  /**
   * 开启深度测试
   */
  Viewer.scene.globe.depthTestAgainstTerrain = true;
  // Viewer.scene.invertClassificationColor
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
          -2741123.7852160246,
          3696113.7285103416,
          4402967.005206368
        ]),
        "orientation": {
          "heading": 3.0769434884646847,
          "pitch": -0.7832129737310427,
          "roll": 0.000021176093489394532
        }
      }
  )
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

  if (Viewer instanceof Cesium.Viewer) {
    Viewer.scene.primitives.add(tiles);
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

        console.log("picked:::",picked)
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
 * 判断点击对象所属图层,并触发对应方法
 * @param picked 点击对象
 * @param cartesian 点击位置
 */
function dealEntityByDataSource(picked, cartesian: Cesium.Cartesian3) {
  switch (get(picked, "id.type")) {
      //建筑白膜图层
    case "buildings": {
      const pickPositions = picked.primitive._primitiveOptions.geometryInstances[0].geometry._polygonHierarchy.positions;
      flyTo(pickPositions);
      BuildingPopupShow.value = !BuildingPopupShow.value
      if (picked.id.buildingCode != 1) {
        BuildingPopupShow.value = false
        // @ts-ignore
        ElNotification({
          title: '名称',
          message: picked.id.name ? picked.id.name : "暂无该建筑信息",
          duration: 5000,
          showClose: false,
        });
      }
      break;
    }
    case "redBuildings": {
      if (picked.id.buildingCode == 4) {
        redStoryPopupShow.value = true
      }
    else {
        redStoryPopupShow.value = false
        // @ts-ignore
        ElNotification({
          title: '名称',
          message: picked.id.name ? picked.id.name : "暂无该建筑信息",
          duration: 5000,
          showClose: false,
        });
      }
      break;
    }
    default: {
      console.log("无此图层的操作方法!")
    }
  }
}

let wallEntity;
/**
 * 飞到选中的实体中，并创建选中墙体.
 */
function flyTo(positions) {
  const miniArray = new Array(positions.length).fill(200)
  const maxArray = new Array(positions.length).fill(250)

  if (wallEntity) {
    //更新点位wall墙体点位，使用CallbackProperty不会有闪烁！
    wallEntity.wall.positions = new CallbackProperty(function () {
      return positions
    }, false);
    wallEntity.wall.minimumHeights = new CallbackProperty(function () {
      return miniArray;
    }, false);
    wallEntity.wall.maximumHeights = new CallbackProperty(function () {
      return maxArray;
    }, false);
    wallEntity.show = true
  }
else {
    wallEntity = Viewer.entities.add({
      wall: {
        positions: positions,
        minimumHeights: miniArray,
        maximumHeights: maxArray,
        material: new WallDiffuseMaterialProperty({
          color: new Cesium.Color.fromCssColorString("#e3ea31")
        }),
      },
    })
  }
  //获取建筑的中心点位
  const centerPosition = Cesium.BoundingSphere.fromPoints(positions).center;
  const ellipsoid = Viewer.scene.globe.ellipsoid;
          let cartographic = ellipsoid.cartesianToCartographic(centerPosition)
          const cameraPosition = {
            destination: Cesium.Cartesian3.fromRadians(cartographic.longitude - 0.000015 , cartographic.latitude - 0.0000215466, cartographic.height + 350),
            orientation: {
              "heading":  0.4416581908035546,
              "pitch":  -0.7087031856623716,
              "roll":  0.000006356215710212609
            }
          }
          Viewer.camera.flyTo(
              cameraPosition
          )
}

let region1Positions = [
  126.5584287, 43.9216216, 207.19,
  126.5646290, 43.9194528, 218.05,
  126.5673752, 43.9234460, 207.36,
  126.5634578, 43.9248749, 206.04,
  126.5590774, 43.9226694, 213.82,
  126.5584287, 43.9216216, 207.19,];

function blingWall() {
  let wall = Viewer.entities.add({
    name: "地形墙",
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(region1Positions),
      material: new ImageMaterialProperty({
        image: "/src/assets/color234.png",
        color: Cesium.Color.fromCssColorString('#8cc4b5')
        // color: Cesium.Color.fromCssColorString('#009ad2')
      })
      // material: new WallDiffuseMaterialProperty({
      //   color: new Cesium.Color.fromCssColorString("#0b8aaf")
      // }),
      // material: new Cesium.PolylineGlowMaterialProperty({
      //   glowPower: .1,
      //   color: Cesium.Color.BLUE
      // }),
      // material: new Cesium.Color.fromCssColorString("#2e434a")
    },
  })

  Viewer.entities.add({
    name: "地形墙",
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(region1Positions),
      material: new WallDiffuseMaterialProperty({
        color: new Cesium.Color.fromCssColorString("#a7ff6a")
      }),
      minimumHeights: [207.19, 218.05, 207.36, 206.04, 213.82, 207.19],
      maximumHeights: [240, 240, 240, 240, 240, 240],
    },
  })

  //   Viewer.entities.add({
  //   name: "发光线",
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArrayHeights(region1Positions),
  //     material: new Cesium.PolylineGlowMaterialProperty({
  //       glowPower: 0.5,
  //       color: Cesium.Color.fromCssColorString("#17fa08"),
  //       taperPower: 0.8
  //     }),
  //     width: 30,
  //     // material: new WallDiffuseMaterialProperty({
  //     //   color: new Cesium.Color.fromCssColorString("rgba(61,111,220,0.5)")
  //     // }),
  //     // minimumHeights: [45.0, 45.0, 54.0, 57.0, 57.0, 45.0]
  //     // material: new Cesium.PolylineGlowMaterialProperty({
  //     //   glowPower: .1,
  //     //   color: Cesium.Color.BLUE
  //     // }),
  //   },
  // })

}

let redDataSource;

let buildDataSource;

/**
 * 创建并初始化红色故事实体
 */
function redStory() {
  let redPositionArray = [
    new Cesium.Cartesian3(-2741003.076556234, 3696003.663520596, 4401874.914970367),
    new Cesium.Cartesian3(-2741002.830713981, 3696027.0054862113, 4401855.599208691),
    new Cesium.Cartesian3(-2740948.5716887238, 3696047.047172735, 4401872.443921039),
    new Cesium.Cartesian3(-2740911.2410457865, 3696094.657019673, 4401855.824675799),
    new Cesium.Cartesian3(-2740909.800057699, 3696140.188040664, 4401818.740561485),
    new Cesium.Cartesian3(-2740877.623422511, 3696146.0803305535, 4401833.727384281),
    new Cesium.Cartesian3(-2740881.1961815055, 3696086.669687103, 4401881.069148572),
    new Cesium.Cartesian3(-2740921.0176953436, 3696032.6112838173, 4401901.526119854),
  ];
  redDataSource = new Cesium.PrimitiveCollection();
  Cesium.GeoJsonDataSource.load(urlPrefix + "beihua/red.json").then(function (dataSource) {
    for (let jsonEntity of dataSource.entities.values) {
      //@ts-ignore
      redDataSource.add(new Cesium.ClassificationPrimitive({
        geometryInstances: [
          new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry(
                {
                  polygonHierarchy: new Cesium.PolygonHierarchy(
                      jsonEntity.polygon.hierarchy._value.positions
                  ),
                  extrudedHeight: 1000
                }
            ),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED.withAlpha(0.4)),
            },
            id: {
              type: "redBuildings",
              buildingCode: jsonEntity.id,
              name: jsonEntity.name
            },
          }),
        ],
        classificationType: Cesium.ClassificationType.BOTH,

      }))
    }
  })
  Viewer.scene.primitives.add(redDataSource)
  redDataSource.show = true;
}

/**
 * 创建并初始化反选遮罩层，挖空3dtiles区域！
 */
function allHouse() {
  let positionArray1 = [
    new Cesium.Cartesian3(-2741083.7073359974, 3695837.6950815287, 4401963.4597324915),
    new Cesium.Cartesian3(-2741082.747622602, 3695878.0986003787, 4401930.3577935565),
    new Cesium.Cartesian3(-2741220.2359387954, 3695834.5665098527, 4401881.619350314),
    new Cesium.Cartesian3(-2741221.6131474487, 3695795.24714281, 4401913.55883363)
  ];
  let positionArray2 = [
    new Cesium.Cartesian3(-2741273.6079713632, 3695865.6185686393, 4401822.707336664),
    new Cesium.Cartesian3(-2741228.4003304318, 3695877.7772571817, 4401840.531680193),
    new Cesium.Cartesian3(-2741230.052212841, 3695918.1990857404, 4401805.797726225),
    new Cesium.Cartesian3(-2741276.221258389, 3695903.582182781, 4401789.428806597)
  ];

  buildDataSource = new Cesium.PrimitiveCollection();
  Cesium.GeoJsonDataSource.load(urlPrefix + "/beihua/buildings.json").then(function (dataSource) {
    for (let jsonEntity of dataSource.entities.values) {
      //@ts-ignore
      buildDataSource.add(new Cesium.ClassificationPrimitive({
        geometryInstances: [
          new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry(
                {
                  polygonHierarchy: new Cesium.PolygonHierarchy(
                      jsonEntity.polygon.hierarchy._value.positions
                  ),
                  extrudedHeight: 1000
                }
            ),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.WHITE.withAlpha(0)),
            },
            id: {
              type: "buildings",
              buildingCode: jsonEntity.id,
              name: jsonEntity.name,
            },
          }),
        ],
        classificationType: Cesium.ClassificationType.BOTH,

      }))
    }
  })
  Viewer.scene.primitives.add(buildDataSource)
  buildDataSource.show = true;
  // console.log(buildDataSource._primitives[0]._primitiveOptions.geometryInstances[0].id)//_primitiveOptions.geometryInstances[0].id
}

/**
 * 点击切换显示建筑信息
 */
function showAllHouse() {
  if (typeof buildDataSource == 'undefined') {
    allHouse();
  } else {
    buildDataSource.show = !buildDataSource.show;
  }
  hidden3dTiles();
}

function showRedStory() {
  if (typeof redDataSource == 'undefined') {
    redStory();
  } else {
    redDataSource.show = !redDataSource.show;
  }
  hidden3dTiles();
}

function hidden3dTiles() {
  Viewer.scene.invertClassification = !Viewer.scene.invertClassification
  Viewer.scene.invertClassificationColor = Cesium.Color.WHITE.withAlpha(0.3)
}

/**
 * 切换页面索引时清除页面实体,默认将所有DataSource的show为false
 */
function hiddenInvertClassification() {
  Viewer && (Viewer.scene.invertClassification = false);
  redDataSource && (redDataSource.show = false);
  buildDataSource && (buildDataSource.show = false);
}

/**
 * 切换页面时隐藏所有弹窗组件和点击图层
 */
function hiddenPopup() {
  BuildingPopupShow.value = false;
  redStoryPopupShow.value = false
  wallEntity && (wallEntity.show = false)
}

let bodyShow = ref(<boolean>true);

/**
 * 隐藏页面内容
 */
function clickHidden() {
  bodyShow.value = !bodyShow.value;
  hiddenPopup();
}

onMounted(() => {
  initCesiumScene().then(() => {
    load3dtilesModel();
    blingWall();

    getCameraByClick();
  });
});
</script>

<style lang="scss" scoped>
.headerNav {
  position: absolute;
  top: 0;
  height: 80px;
  width: 100%;
  margin-bottom: 10px;
  z-index: 999999;
}

.leftt {
  position: absolute;
  left: 2vw;
  top: 12vh;
  height: 600px;
  width: 10%;
}

.rightt {
  position: absolute;
  right: 2vw;
  top: 8vh;
  height: 90%;
  width: 24%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(110%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}


.bottomm {
  position: absolute;
  bottom: 2vw;
  top: 82vh;
  left: 2%;
  height: 15%;
  width: 65%;
}

#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>