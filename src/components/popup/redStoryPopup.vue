<template>
  <div class="popBox">
    <div class="headNav" >
          <span class="tips"></span>
      <span class="tips1"></span>
      <div>
        <div class="population-card">
          <div class="xiaosu-5">
            <span style="padding-left: 10px;font-size: 18px;color: white ; font-weight: bolder">红色故事</span>
            <span
                style="padding-left: 20px;color: #59666B;font-size: 14px;padding-top: 5px;">RED STORY</span>
            <span style="padding-left: 150px;"><button class="btn">返回上层</button></span>
          </div>
        </div>
      </div>
    </div>
      <div class="bkx">
        <div>
          <p class="storyTitle">金岭红色秘密交通线</p>
          <p class="storyContent">
            这是一条长约2.5公里的山路，从缙云县双溪口乡金岭脚村到大源镇江西山后村，沿途荒草丛生，树木遮蔽。80年前，就是这段不长的金岭红色秘密交通线，成为了缙云地下党员传递革命信息的重要秘密交通线，像是一条生生不息的“红色血脉”。</p>
          <p class="storyContent">
            早期的缙云县委在1936年7月解体，全县性的党组织活动一度停顿。1939年5月，处属特委委员周源到缙云南乡视察时指出：“就是要到天高皇帝远的地方发展党组织”，从而形成了把党的工作重心从县城转向农村的指导思想。
            从此，党在缙云的工作就以南乡为重点，开始了重建党组织、建立根据地的新征程。</p>
          <p class="storyContent">
            1939年9月4日，中共党员雷克坚以“浙江省战时特产合作工作总队缙云工作组”组长的身份，传达上级指示，决定建立中共缙云县特别支部，隶属处属特委领导，雷克坚任书记，陶疆任组织委员，樊康平任宣传委员。
            第二天，雷克坚书记就以“合工队”队长身份到缙云南乡开展工作。</p>
          <p class="storyContent">
            因为双溪口乡一带盛产桐油，开展合作事业，名正言顺。缙云县特别支部还选择了双溪口村有威望、思想比较进步的教书先生丁文升家作为合作工作组的驻地。中共缙云县特别支部的建立，在中共缙云党史上具有重要意义，它是抗日战争时期缙云党组织重建后建立的第一个县级党组织。
            从此以后，缙云的县级党组织再也没有中断、停顿。党员的队伍从无到有，从弱到强，不断壮大。</p>
          <p class="storyContent">
            缙云县特别支部白天以思想教育、张贴标语、口头宣传等多种形式向农民宣传“有钱出钱、有力出力，支援抗战”思想，组织发动农民发展特产经济作物，出口换取外汇，支援抗战；晚上，党员们就走金岭红色秘密交通线去往大源镇方向，
            开办民众剧团、民众夜校，开展地下工作，在农民中秘密发展党员，建立农村党组织。</p>
          <p class="storyContent">
            由于处属特委“向浙东靠拢”的指导思想和中共缙云县特别支部在南乡打下的革命工作基础，1940年6月成立了中共缙云县工作委员会，1941年初成立中共缙云县委，机关设在大源镇江西山后村。
            县级党组织领导机关从双溪口村转移到江西山后村，往来通讯依靠的就是金岭红色秘密交通线。</p>
          <p class="storyContent">1944年处属特委机关驻地转移到江西山后村。金岭红色秘密交通线相对比较隐秘，在深山老林中来往人少比较安全，
            便成了处属各县党的负责同志、交通员常到驻地开会和请示汇报工作的重要通道，也是处属特委指示向外传递的重要秘密通道。
            直至丽水解放，缙云县大源镇江西山后村作为丽水地区革命斗争的指挥中枢长达6年，1947年和1948年连续两年的春节期间， 分别在双溪口乡越王山村和鲤鱼孔村召开了由处属特委委员和各县县委书记参加的特委扩大会议，
            丽水各地革命骨干力量都曾在这条秘密交通上往来。</p>
          <p class="storyContent">今年4月28日，“金岭红色秘密交通线”被正式命名，一场徒步远足活动吸引了200多名户外运动爱好者重走红军路，弘扬践行浙西南革命精神。 如今，追寻红色足迹、弘扬革命精神，
            徒步重走红色秘密交通线吸引着越来越多的游客，已然成为了新时尚。</p>
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
.popBox {
  position: absolute;
  right: 2vw;
  top: 8vh;
  height: 90%;
  width: 24%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
.headNav{
  position:absolute;
  top: 0;
  bottom: 8%;
  width: 100%;
  background-color: rgba(40, 26, 26);
}
.bkx {
  position: absolute;

  top: 8%;
  bottom:0%;
  width: 100%;
  overflow-y: scroll;
  background-color: rgba(40, 26, 26);
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
  top: -18px;
  position: relative;
  background-color:#fdc612
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
  background-color: #fdc612;
}

.tips:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 3px;
  border-radius: 2px;
  background-color: #fdc612;
}

// 2
.tips1 {
  top: -31px;
  display: inline-block;
  width: 100%;
  background-color: #fdc612;
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
  background-color: #fdc612;
}

.tips1:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 3px;
  border-radius: 2px;
  background-color: #fdc612;
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
.xiaosu-5 {
  margin-top: -27px;
}

.population-card {
  display: flex;
  padding-top: 10px;
}

.btn {
  border: 1px solid #fdc612;
  border-radius: 5px;
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.4);
  // background-color: #349cab;
  color: white;
  padding: 3px 8px;
  //border-color: #fdc612;
  cursor: pointer;
}

.storyTitle {
  color: #f9ffff;
  font-size: 1.1rem;
  //padding: .1rem;
  text-align: center;
}

.storyContent {
  color: #9ba5a6;
  font-size: 1rem;
  text-indent: 2em;
  padding-left: 15px;
  padding-right: 10px;
}
</style>