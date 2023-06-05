<template>
  <!--  窗口开始  -->
  <div class="info-container">
    <div class="top-left-border"></div>
    <div class="top-right-border"></div>
    <div class="bottom-left-border"></div>
    <div class="bottom-right-border"></div>
    <div class="head-container">
      <div class="change-btn">
        <span :class="['btn', {'btn-active': isShowInfo == 'left'}]" @click="handleShowInfo">房间信息</span>
        <span class="gap">|</span>
        <span :class="['btn', {'btn-active': isShowInfo == 'right'}]" @click="handleShowInfo">企业信息</span>
      </div>
      <div class="close-btn" @click="handleCloseInfoWindow">x</div>
    </div>
    <div class="content-container">
      <div :class="['item-container', {'show-info': isShowInfo == 'left'}]">
        <div class="item">
          <div class="label">房间信息</div>
          <div class="value">{{currentRoom.roomName}}</div>
        </div>
        <div class="item">
          <div class="label">房间类型</div>
          <div class="value">{{currentRoom.roomType}}</div>
        </div>
        <div class="item">
          <div class="label">使用人</div>
          <div class="value">{{currentRoom.roomUser}}</div>
        </div>
        <div class="item">
          <div class="label">房间面积</div>
          <div class="value">{{currentRoom.roomSize}}</div>
        </div>
        <div class="item">
          <div class="label">房间状态</div>
          <div class="value">{{currentRoom.roomStatus}}</div>
        </div>
        <div class="item">
          <div class="label">房间照片</div>
          <div class="value">
            <img :src="currentRoom.roomPhoto" alt="图片" @click="handleGetImg(currentRoom.roomPhoto)">
          </div>
        </div>
      </div>
      <div :class="['item-container', {'show-info': isShowInfo == 'right'}]">
        <div class="item">
          <div class="label">公司名称</div>
          <div class="value">{{ currentRoom.enterpriseName }}</div>
        </div>
        <div class="item">
          <div class="label">公司地址</div>
          <div class="value">{{currentRoom.enterpriseAddress}}</div>
        </div>
        <div class="item">
          <div class="label">联系电话</div>
          <div class="value">{{ currentRoom.enterprisePhone}}</div>
        </div>
        <div class="item item-desc">
          <div class="label">公司介绍</div>
          <div class="value">
            <span class="text">{{currentRoom.enterpriseDesc}}</span>
          </div>
        </div>
        <div class="item">
          <div class="label">法人姓名</div>
          <div class="value">{{currentRoom.enterprisePerson}}</div>
        </div>
        <div class="item">
          <div class="label">法人电话</div>
          <div class="value">{{currentRoom.enterprisePersonPhone}}</div>
        </div>
      </div>
    </div>
  </div>
  <!--  窗口结束  -->
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'dialogPop',
  props: {
    currentRoom: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const isShowInfo=ref(<'left' | 'right'>'left');

    // 显示隐藏弹窗
    const handleShowInfo = () => {
      isShowInfo.value = isShowInfo.value === 'left' ? 'right' : 'left';
    };

    // 点击获取图片
    const handleGetImg = (img: string) => {
      emit('getImg', img);
    };

    // 点击关闭房间信息窗口
    const handleCloseInfoWindow = () => {
      emit('closeInfoWindow');
    };

    return {
      isShowInfo,
      handleShowInfo,
      handleGetImg,
      handleCloseInfoWindow,
    };
  },
});
</script>

<style lang="scss" scoped>
// 绝对定位
@mixin absolute($top: auto, $right: auto, $left: auto, $bottom: auto) {
  position: absolute !important;
  top: $top;
  left: $left;
  right: $right;
  bottom: $bottom;
}

// 边框背景样式
@mixin bgBorderCorner($bg: rgba(0, 46, 91, 0.6), $borderColor: rgba(0, 190, 255, 0.3),$cornerSize: 0.1rem, $cornerWidth: 0.025rem, $cornerColor: rgb(0, 166, 255), $blur: 6px) {

  border: 1px solid $borderColor;
  box-sizing: border-box;
  background: $bg;
  position: relative;
  backdrop-filter: blur($blur);

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

// 弹窗样式
.info-container {
  width: 30%;
  height: 40%;
  min-width: 350px;
  min-height: 300px;
  color: #ffffff;
  //margin: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  @include bgBorderCorner();

  $borderColor: rgba(0, 166, 255, .5);

  .head-container {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid $borderColor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;

    .change-btn {
      font-size: 0.15rem;

      .btn {
        cursor: pointer;
      }

      .btn-active {
        color: rgb(134 213 255);
        font-weight: bold;
        font-size: 0.18rem;
      }

      .gap {
        margin: 0 10px;
        color: $borderColor;
      }
    }

    .close-btn {
      font-size: 0.2rem;
      cursor: pointer;
    }
  }

  .content-container {
    width: 100%;
    flex: 1;
    font-size: 0.12rem;
    display: flex;
    overflow: hidden;

    .item-container {
      width: 0;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      word-break: keep-all;
      transition: all .3s;

      .item {
        flex: 1;
        height: 100%;
        display: flex;
        border: 1px solid $borderColor;
        border-bottom: none;
        overflow: hidden;

        &:last-child {
          border-bottom: 1px solid $borderColor;
        }

        .label {
          width: 120px;
          height: 100%;
          padding-left: 15px;
          display: flex;
          align-items: center;
          background: rgba(24, 144, 255, 0.2);
          border-right: 1px solid $borderColor;
        }

        .value {
          flex: 1;
          height: 100%;
          //padding: 5px 0;
          padding-left: 15px;
          display: flex;
          align-items: center;
          word-break: break-word;
          overflow-y: hidden;

          .text {
            width: 100%;
            height: 100%;
            overflow-y: auto;

            &::-webkit-scrollbar {
              width: 5px;
            }

            &::-webkit-scrollbar-track {
              background: rgba(44, 62, 80, 0.8);
            }

            &::-webkit-scrollbar-thumb {
              background: rgba(0, 166, 255, 0.5);
            }
          }

          img {
            cursor: pointer;
            height: 100%;
          }
        }
      }

      .item-desc {
        flex: 2;

        .value {
          box-sizing: border-box;
          padding: 10px 0;
          //padding-left: 15px;
          .text {
            padding: 0 15px;
          }
        }
      }
    }

    .show-info {
      width: 100%;
    }
  }

}


</style>
