import {
    Viewer,
    CustomDataSource,
    CallbackProperty,
    PolygonHierarchy,
    Color,
    Cartesian3,
    ScreenSpaceEventType, ScreenSpaceEventHandler, defined, Math
} from "cesium";
import * as Cesium from "cesium";

/** 面编辑类 */
export class PolygonEditor {
    /**
     *
     * @private
     */
    private readonly viewer:Viewer;
    /**
     * 初始化成功回调
     * @private
     */
    private readonly onInit:Function=()=>{};
    /**
     * 绘制完成回调
     * @private
     */
    private readonly afterDraw:Function=()=>{};

    private readonly tempPolygon:CustomDataSource;
    // 多边形全部点的数组
    private polygon_point_arr:Cartesian3[]
    // 多边形全部点的数组
    private polygon_point_arr1:Cartesian3[]
    // 临时多边形entity
    private temporary_polygon_entity = null;
    private handler = null;
    //存储onkeydown监听的对象，因为onkeydown用了bind，若不保存对象，则无法销毁此监听事件，需要保存以供后面销毁
    private listenHandler = null;
    onFinish: Function;
    private onCancel: Function;
    /**
     *
     * @param viewer
     * @param onInit 初始化成功回调
     * @param afterDraw 绘制完成回调
     */
    constructor(viewer:Viewer,onInit?:Function,afterDraw?:Function){
        this.viewer=viewer;
        this.onInit=onInit;
        this.afterDraw=afterDraw;
        this.tempPolygon = new CustomDataSource('tempPolygon');
        viewer.dataSources.add(this.tempPolygon).then(r => this.onInit(r));
    }
    /**
     * 开始绘制
     * @param onFinish 绘制完成回调
     * @param onCancel 取消绘制回调
     */
    draw(onFinish?:Function,onCancel?:Function){
        this.onFinish=onFinish;
        this.onCancel=onCancel;
        this.polygon_point_arr=[]
        this.polygon_point_arr1=[]
        this.click_draw_polygon();
    }

    // 开启绘制的方法
    click_draw_polygon() {
        let _this=this;
        let viewer=this.viewer
        const ellipsoid = viewer.scene.globe.ellipsoid;
        // 清除可能会用到的监听事件
        if (this.handler) {
            this.destroy();
        }
        this.handler = new ScreenSpaceEventHandler(viewer.canvas);
        viewer.canvas.style.cursor="crosshair"
        //鼠标左键--确定选中点
        this.handler.setInputAction((event) => {
            // 屏幕坐标转为空间坐标
            // let cartesian = viewer.camera.pickEllipsoid(event.position);
            let cartesian = viewer.scene.pickPosition(event.position);
            // 判断是否定义（是否可以获取到空间坐标）
            if (!defined(cartesian)) {
                const ray = viewer.camera.getPickRay(event.position);
                cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            }
            // 将点添加进保存多边形点的数组中，鼠标停止移动的时添加的点和，点击时候添加的点，坐标一样
            if (defined(cartesian)) {
                this.polygon_point_arr.push(cartesian);
                this.polygon_point_arr1.push(cartesian.clone());
                // 判断是否开始绘制动态多边形，没有的话则开始绘制
                if (this.temporary_polygon_entity == null) {
                    // 绘制动态多边形
                    this.temporary_polygon_entity = this.tempPolygon.entities.add({
                        polygon: {
                            // 这个方法上面有重点说明
                            hierarchy: new CallbackProperty(() => {
                                // PolygonHierarchy 定义多边形及其孔的线性环的层次结构（空间坐标数组）
                                return new PolygonHierarchy(this.polygon_point_arr);
                            }, false),
                            material: Color.YELLOWGREEN.withAlpha(0.5),
                        },
                    });
                }
            }
        }, ScreenSpaceEventType.LEFT_CLICK);

        //鼠标移动--实时绘制多边形
        this.handler.setInputAction((event) => {
            // 屏幕坐标转为空间坐标
            // let cartesian = viewer.camera.pickEllipsoid(event.endPosition);
            let cartesian = viewer.scene.pickPosition(event.endPosition);
            // 判断是否定义（是否可以获取到空间坐标）
            if (!defined(cartesian)) {
                const ray = viewer.camera.getPickRay(event.endPosition);
                cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            }
            if (defined(cartesian)&&this.temporary_polygon_entity) {
                // 只要元素点大于一，每次就删除一个点，因为实时动态的点是添加上去的
                if (this.polygon_point_arr.length > 1) {
                    // 删除数组最后一个元素（鼠标移动添加进去的点）
                    this.polygon_point_arr.pop();
                    this.polygon_point_arr1.pop();
                }
                // 将新的点添加进动态多边形点的数组中，用于实时变化，注意：这里是先添加了一个点，然后再删除点，再添加，这样重复的
                this.polygon_point_arr.push(cartesian);
                this.polygon_point_arr1.push(cartesian.clone());
            }
        }, ScreenSpaceEventType.MOUSE_MOVE);

        //鼠标右键--完成绘制
        this.handler.setInputAction((event) => {
            if (this.polygon_point_arr.length>3){
                this.finishDraw();
                this.afterDraw();
            }else {
                this.destroy();
                this.onCancel();
            }
        }, ScreenSpaceEventType.RIGHT_CLICK);
         this.listenHandler = this.onKeyDown.bind(this);
        document.addEventListener('keydown',this.listenHandler );


    }

    /**
     * cesium坐标转geojson标准坐标数组
     * @param positions
     * @param holes
     */
        positions2Array(positions:Cartesian3[],holes?:Cartesian3[][]) {
        let viewer=this.viewer
        const ellipsoid = viewer.scene.globe.ellipsoid;
        console.log("传入的position：",positions)
        let resultArray = [];
        let lnglatArray = [];
        for (let i = 0; i < positions.length; i++) {
            let lntlat = ellipsoid.cartesianToCartographic(positions[i]);
            lnglatArray.push([Math.toDegrees(lntlat.longitude), Math.toDegrees(lntlat.latitude)])
        }
        if (lnglatArray[0].toString() !== [...lnglatArray].pop().toString()) {
            let lntlat = ellipsoid.cartesianToCartographic(positions[0]);
            lnglatArray.push([Math.toDegrees(lntlat.longitude), Math.toDegrees(lntlat.latitude)])
        }
        resultArray.push(lnglatArray)
        //多边形孔洞
        holes&&holes.forEach(hole => {
            let tmpArray = [];
            for (let i = 0; i < hole.length; i++) {
                let lntlat = ellipsoid.cartesianToCartographic(hole[i]);
                tmpArray.push([Math.toDegrees(lntlat.longitude), Math.toDegrees(lntlat.latitude)])
            }
            let lntlat = ellipsoid.cartesianToCartographic(hole[0]);
            tmpArray.push([Math.toDegrees(lntlat.longitude), Math.toDegrees(lntlat.latitude)])
            resultArray.push(tmpArray)
        })
        return resultArray
    }

    destroy(){
        this.stopDraw()
        document.removeEventListener('keydown',this.listenHandler);
        this.listenHandler = null;
        console.log("销毁事件完成")
    }
    //结束绘制
    finishDraw(){
        this.deleteHandlerEvent();
        this.polygon_point_arr.pop();
        this.polygon_point_arr1.pop();
    }
    //
    savePolygon(){
        let geometry;
       let entity = new Cesium.Entity({
            polygon: new Cesium.PolygonGraphics({
                hierarchy: new Cesium.PolygonHierarchy(this.polygon_point_arr),
                material: new Cesium.ColorMaterialProperty(Cesium.Color.CYAN.withAlpha(0.5))
            })
        })
        if (entity instanceof Cesium.Entity) {
            geometry =  {"type": "Polygon", "coordinates": this.positions2Array(entity.polygon.hierarchy._value.positions)};
        }
        this.onFinish && this.onFinish(entity,JSON.stringify(geometry))
    }
    //清除绘制内容和事件
    stopDraw() {
        this.deleteHandlerEvent();
        this.deletePolygon();
    }
    //注销鼠标事件
    deleteHandlerEvent(){
        if (this.handler) {
            this.handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
            this.handler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
            this.handler.removeInputAction(ScreenSpaceEventType.RIGHT_CLICK);
            this.handler.destroy();
            this.handler=null;
        }
        this.viewer.canvas.style.cursor="default"
    }
    //清除所绘制多边形
    deletePolygon(){
        // 清除动态绘制的多边形
        this.tempPolygon.entities.remove(this.temporary_polygon_entity);
        // 删除保存的临时多边形的entity
        this.temporary_polygon_entity = null;
        // 清空多边形点数组，用于下次绘制
        this.polygon_point_arr = [];
        this.polygon_point_arr1 = [];
    }
    onKeyDown(e) {
        if (e.keyCode===27){
            this.stopDraw()
            this.onCancel&&this.onCancel();
            document.removeEventListener('keydown', this.listenHandler);
            this.listenHandler = null;
        }
    }
}
