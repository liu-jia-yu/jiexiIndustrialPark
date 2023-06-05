<template>
  <div id="CesiumContainer">
    <el-button style="position: absolute;z-index: 999" @click="clickButton">遮罩</el-button>
    <div class="slider-demo-block">
      <span class="demonstration">x</span>
      <el-slider v-model="x"  @input="gaibian" :min="-100" :max="100"/>
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">y</span>
      <el-slider v-model="y" @input="gaibian" :min="-100" :max="100"/>
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">z</span>
      <el-slider v-model="z" @input="gaibian" :min="-100" :max="100"/>
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">2</span>
      <el-slider v-model="w" @input="gaibian" :min="-100" :max="100"/>
    </div>
  </div>


</template>

<script setup lang="ts">
import * as Cesium from 'cesium'
import {onMounted, onUnmounted} from "vue";
import {WallDiffuseMaterialProperty} from './js/WallDiffuseMaterialProperty'
import { ref } from 'vue'
let urlPrefix = "http://192.168.0.110/3dtiles/";
let Viewer: Cesium.Viewer | null = null;

/**
 * 初始化定cesium场景
 */
async function initCesiumScene() {
  /**
   * 地形
   */
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNDNjMDE0OC04ZjIwLTQ2ZjAtYTY1NS0yNDkxZDk0MTA4YWMiLCJpZCI6MTI1NjI1LCJpYXQiOjE2NzY5NDM0NjN9.6sQTbAgN7iC8RAiMP91qokqXbcaQyA-173Xu_STvnY8'
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
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //   url:'http://192.168.0.136:999/d/影像2/{z}/{x}/{y}.png'
    // })
  });
  // Viewer.terrainProvider=await Cesium.CesiumTerrainProvider.fromUrl(urlPrefix + "terrain1")
  /**
   * 禁止自动刷新
   */
  Viewer.scene.requestRenderMode = false
  /**
   * 开启深度测试
   */
  Viewer.scene.globe.depthTestAgainstTerrain = true;
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
    // console.log(tiles)
  }
}

let region1Positions = [
  116.0520032, 23.4587691, 33.69,
  116.0515604, 23.4555918, 31.92,
  116.0549466, 23.4533204, 42.25,
  116.0561577, 23.4532598, 45.23,
  116.0568118, 23.4581908, 45.01,
  116.0520032, 23.4587691, 33.69,];

function blingWall() {
  let wall = Viewer.entities.add({
    name: "123",
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(region1Positions),
      material: new WallDiffuseMaterialProperty({
        color: new Cesium.Color.fromCssColorString("#2e434a")
      }),
      // material: new Cesium.PolylineGlowMaterialProperty({
      //   glowPower: .1,
      //   color: Cesium.Color.BLUE
      // }),
      // material: new Cesium.Color.fromCssColorString("#2e434a")
    },
  })

  let wall1 = Viewer.entities.add({
    name: "1233",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(region1Positions),
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.25,
        color: Cesium.Color.fromCssColorString("#17fa08"),
        taperPower:0.5
      }),
      width:20
      // material: new WallDiffuseMaterialProperty({
      //   color: new Cesium.Color.fromCssColorString("rgba(61,111,220,0.5)")
      // }),
      // minimumHeights: [45.0, 45.0, 54.0, 57.0, 57.0, 45.0]
      // material: new Cesium.PolylineGlowMaterialProperty({
      //   glowPower: .1,
      //   color: Cesium.Color.BLUE
      // }),
    },
  })

}

let shadowDataSource;

let buildDataSource;
/**
 * 创建并初始化反选遮罩层，挖空3dtiles区域！
 */
function shade() {
  // //新建dataSources
  shadowDataSource = new Cesium.CustomDataSource("dataSource1");
  Viewer.dataSources.add(shadowDataSource);

  shadowDataSource.entities.add({
    polygon: {
      //遮罩的半球
      hierarchy: new Cesium.PolygonHierarchy([
        new Cesium.Cartesian3(
            3197104.586923899,
            -0.5580000157243585,
            5500477.1339386385),
        new Cesium.Cartesian3(
            3197104.586923899,
            -0.5580000157243585,
            -5500477.1339386385),
        new Cesium.Cartesian3(
            -3197104.5869239476,
            -3.915323898915733,
            -5500477.1339386385,),
        new Cesium.Cartesian3(
            -3197104.5869239476,
            -3.915323898915733,
            5500477.1339386385,),
        new Cesium.Cartesian3(
            3197104.586923899,
            -0.5580000157243585,
            5500477.1339386385),
      ],),
      // 填充的颜色，withAlpha透明度
      material: Cesium.Color.BLACK.withAlpha(0.5),
      // 是否被提供的材质填充
      fill: true,
      // 是否显示
      show: true,
      // 顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
      zIndex: 10,
      classificationType: Cesium.ClassificationType.TERRAIN
    },
  });


  shadowDataSource.entities.add({
        polygon: {
          //遮罩的半球
          hierarchy: new Cesium.PolygonHierarchy(
              [
                new Cesium.Cartesian3(
                    3197104.586923899,
                    0.5580000157243585,
                    5500477.1339386385,),
                new Cesium.Cartesian3(
                    3197104.586923899,
                    0.5580000157243585,
                    -5500477.1339386385,),
                new Cesium.Cartesian3(
                    -3197104.5869239476,
                    3.915323898915733,
                    -5500477.1339386385,),
                new Cesium.Cartesian3(
                    -3197104.5869239476,
                    3.915323898915733,
                    5500477.1339386385,),
                new Cesium.Cartesian3(
                    3197104.586923899,
                    0.5580000157243585,
                    5500477.1339386385,),
              ],
              //需要挖空的区域
              [
                  new Cesium.PolygonHierarchy(
                  [
                    new Cesium.Cartesian3(
                        -2571536.598875671,
                        5259321.986657036,
                        2522850.9224899486),
                    new Cesium.Cartesian3(
                        -2571414.6655366365,
                        5259378.415555133,
                        2522861.3533502817),
                    new Cesium.Cartesian3(
                        -2571052.012747712,
                        5259429.078171825,
                        2523089.760691425),
                    new Cesium.Cartesian3(
                        -2571033.6594287916,
                        5259281.822310455,
                        2523415.954342915),
                    new Cesium.Cartesian3(
                        -2571495.702099487,
                        5259085.633027559,
                        2523362.1357399276),
                    new Cesium.Cartesian3(
                        -2571536.598875671,
                        5259321.986657036,
                        2522850.9224899486),
                  ]
              )
              ]
          ),
          // 填充的颜色，withAlpha透明度
          material: Cesium.Color.BLACK.withAlpha(0.5),
          // 是否被提供的材质填充
          fill: true,
          // 是否显示
          show: true,
          // 顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
          zIndex: 11,
          classificationType: Cesium.ClassificationType.TERRAIN
        },
      }
  );


  Cesium.GeoJsonDataSource.load( "http://192.168.0.136:999/d/jiexi/shadow2.json").then(function (dataSource) {
    buildDataSource =  new Cesium.CustomDataSource("DT");
    for (let entity of dataSource.entities.values) {
      buildDataSource.entities.add(
          {
            polygon:{
              hierarchy: entity.polygon.hierarchy,
              classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
              material: Cesium.Color.WHITE.withAlpha(0)
            }
          }
      );
    }
    Viewer.dataSources.add(buildDataSource);
    buildDataSource.show = false;
  })
}

/**
 * 点击切换显示建筑信息
 */
function clickButton(){
  buildDataSource.show = !buildDataSource.show
  Viewer.scene.invertClassification = !Viewer.scene.invertClassification
  Viewer.scene.invertClassificationColor = Cesium.Color.WHITE.withAlpha(.3)
}

const x = ref(1)
const y = ref(1)
const z = ref(1)
const w = ref(1)
let geometry;
let primitive;
let instance
function shizhuiti(){
  console.log(x.value)
  const frustum = new Cesium.PerspectiveFrustum(
      {
    fov : Cesium.Math.PI_OVER_FOUR,
    aspectRatio : 1,
    near : 100.0,
    far : 2000.0
  });
   geometry = new Cesium.FrustumGeometry({
    frustum: frustum,
    origin: new Cesium.Cartesian3(
        -2571536.598875671,
        5259321.986657036,
        2522850.9224899486),
    orientation: new Cesium.Quaternion(x.value,y.value,z.value,w.value),
    vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
  });
  instance = new Cesium.GeometryInstance({
    geometry: geometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.RED
      ),
    },
  });
   primitive = new Cesium.Primitive({
    geometryInstances: instance,
    appearance: new Cesium.PerInstanceColorAppearance({
      closed: true,
      flat: true,
    }),
    asynchronous: false,
  });
  Viewer.scene.primitives.add(primitive);
}

function gaibian(){
  Viewer.scene.primitives.remove(primitive);
  // primitive.destroy();
  geometry._orientation = new Cesium.Quaternion(x.value,y.value,z.value,w.value)
  instance.geometry = geometry;
  primitive = new Cesium.Primitive({
    geometryInstances: instance,
    appearance: new Cesium.PerInstanceColorAppearance({
      closed: true,
      flat: true,
    }),
    asynchronous: false,
  });
  //  primitive.update();
  // primitive.geometryInstances = geometry
  Viewer.scene.primitives.add(primitive);
}


onMounted(() => {
  initCesiumScene().then(() => {
    load3dtilesModel();
    blingWall();
    shizhuiti();
    // shade();
  });
})
onUnmounted(() => {
  Viewer && Viewer.destroy();
  Viewer = null;
})

</script>

<style scoped>
#CesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.slider-demo-block {
  display: flex;
  align-items: center;
  z-index: 999;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 30px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>