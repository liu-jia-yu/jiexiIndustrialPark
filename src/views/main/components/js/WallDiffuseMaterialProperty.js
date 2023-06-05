/*
 * @Description: 动态扩散墙的墙体效果（参考开源代码）（不同高度透明度不同）
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-03-07 19:50:46
 * @LastEditors: Julian
 * @LastEditTime: 2022-03-08 13:34:04
 */
//精灵穿梭路线材质。
import * as Cesium from "cesium";

class WallDiffuseMaterialProperty {
    constructor(options) {
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this.color = options.color;
    };

    get isConstant() {
        return false;
    }

    get definitionChanged() {
        return this._definitionChanged;
    }

    getType(time) {
        return "WallDiffuseMaterialType";
    }

    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }

        result.color = Cesium.Property.getValueOrDefault(this._color, time, Cesium.Color.RED, result.color);
        return result
    }

    equals(other) {
        return (this === other ||
            (other instanceof WallDiffuseMaterialProperty &&
                Cesium.Property.equals(this._color, other._color))
        )
    }
}

Object.defineProperties(WallDiffuseMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
})


const WallDiffuseMaterialSource =
//     `
//     uniform vec4 color;
//     vec3 color1 = vec3(1.0,0.0,0.0);
// vec3 u_lightColor = vec3(1.0, 1.0, 1.0); // 光源颜色
// vec3 u_lightPosition = vec3(-5000.0, 5000.0, 5000.0); // 光源位置
//
// czm_material czm_getMaterial(czm_materialInput materialInput)
// {
//     czm_material material = czm_getDefaultMaterial(materialInput); // 获取默认材质
//     material.emission = color.rgb; // 设置材质的emission属性为自定义颜色
//
//     vec2 st = materialInput.st; // 获取墙体贴图的st坐标
//
//     if(st.t >= 0.0 && st.t <= 0.2){
//         material.diffuse = vec3(color1 + vec3(0.1, 0.1, 0.1)) * 0.5;
//     }
//     else if(st.t >= 0.8 && st.t <= 1.0){
//         material.diffuse = vec3(color1 + vec3(0.1, 0.1, 0.1)) * 0.5;
//     }else{
//         material.diffuse = vec3(color.rgb);
//     }
//
//     // 计算顶点法向量
//     vec3 normal = normalize(materialInput.normalEC);
//
//     // 计算光线向量和镜面反射向量
//     vec3 lightVector = normalize(u_lightPosition - materialInput.positionToEyeEC);
//     vec3 viewVector = normalize(materialInput.positionToEyeEC);
//     vec3 halfVector = normalize(lightVector + viewVector);
//
//     // 计算漫反射和镜面反射强度
//     float diffuse = max(dot(normal, lightVector), 0.0);
//     float specular = pow(max(dot(normal, halfVector), 0.0), 32.0);
//
//     // 计算入射光颜色
//     vec3 lightColor = u_lightColor * diffuse + u_lightColor * specular;
//
//     // 设置材质的颜色和透明度
//     // material.diffuse *= lightColor;
//     material.alpha = color.a;
//
//     return material;
// }
//     `

    `
    uniform vec4 color;
    vec3 color1 = vec3(1.0,1.0,0.0);
    czm_material czm_getMaterial(czm_materialInput materialInput){
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st;
    material.diffuse = color1 ;
     material.diffuse = color.rgb * st.t + 0.5;
    // material.specular = 1.0;
    //     material.emission = color.rgb;
    // if(st.t>=0.0 && st.t <= 0.2){
    //   material.diffuse = color.rgb / (st.t+0.8);
    // }
    // else if(st.t>=0.8 && st.t <= 1.0){
    //   material.diffuse = color.rgb * st.t;
    // }else{
    //    material.diffuse = color.rgb;
    // }
    material.alpha = color.a;
    return material;
    }

    `

Cesium.Material._materialCache.addMaterial('WallDiffuseMaterialType', {
    fabric: {
        type: "WallDiffuseMaterialType",
        uniforms: {
            color: new Cesium.Color(0.0, 0.0, 0.0, 1.0),
        },
        source: WallDiffuseMaterialSource
    },
    translucent: function(material) {
        return true;
    }
})
export {
    WallDiffuseMaterialProperty
}