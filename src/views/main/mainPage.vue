<template>
  <div id="container">
    <div id="header" class="header">
      <div class="side">
        <div class="item">
          <div style="flex:2">
          </div>
          <button class="button" :class="{'selected': currentPage === 1 }" @click="changePage(1)">
            园 区 概 览
          </button>
          <div style="flex:1">
          </div>
        </div>
        <div class="item">
          <div style="flex:2">
          </div>
          <button class="button" :class="{'selected': currentPage === 2 }" @click="changePage(2)">
            近 期 招 商
          </button>
          <div style="flex:1">
          </div>
        </div>
        <div class="item">
          <div style="flex:2">
          </div>
          <button class="button" :class="{'selected': currentPage === 3 }" @click="changePage(3)">
            园 区 运 营
          </button>
          <div style="flex:1">
          </div>
        </div>
      </div>
      <div class="mid">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="点击跳转后台"
            placement="bottom"
        >
          <router-link to="/" class="text">三维园区可视化平台</router-link>
        </el-tooltip>

      </div>
      <div class="side">
        <div class="item">
          <div style="flex:2">
          </div>
          <button class="button" :class="{'selected': currentPage === 4 }" @click="changePage(4)">
            企 业 入 驻
          </button>
          <div style="flex:1">
          </div>
        </div>
        <div class="item">
          <div style="flex:2">
          </div>
          <button class="button" :class="{'selected': currentPage === 5 }" @click="changePage(5)">
            视 频 感 知
          </button>
          <div style="flex:1">
          </div>
        </div>
        <div class="item">
          <div style="flex:2">
          </div>
          <button class="button" :class="{'selected': currentPage === 6 }" @click="changePage(6)">
            发 展 前 景
          </button>
          <div style="flex:1">
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div id="leftPane" v-show="currentPage===1" class="left">
        <div class="card" style="flex:1" @click="richText[8].richContent!=null && richText[8].richContent!='' && openRichText(8)">
          <h2 class="card-title">{{cardLoaded ? richText[8].title : "加载数据失败，刷新页面后重试"}}</h2>
          <div class="cover">
            <p class="card-text">{{cardLoaded ? richText[8].content  : ""}}</p>
          </div>
          <!--          <button class="card-button">历史沿革>></button>-->
        </div>
        <div class="card" style="flex:1;">
          <h2 class="card-title">荣誉简介</h2>
          <div class="cover">
            <div class="list">
              <div v-for="item in achievementList" class="column">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="leftPane2" v-show="currentPage===2" class="left" style="z-index: -1"></div>
      <div id="leftPane3" v-show="currentPage===3" class="left">
        <div class="card" style="flex:1" @click="openRichText(0)">
          <h2 class="card-title">{{ cardLoaded ? richText[0].title : "" }}</h2>
          <div class="cover">
            <p class="card-text">{{ cardLoaded ? richText[0].content : "" }}</p>
          </div>
        </div>
        <div class="card" style="flex:.7" @click="openRichText(1)">
          <h2 class="card-title">{{ cardLoaded ? richText[1].title : "" }}</h2>
          <div class="cover">
            <p class="card-text">{{ cardLoaded ? richText[1].content : "" }}</p>
          </div>

        </div>
        <div class="card" style="flex:1;">
          <h2 class="card-title">税收政策</h2>
          <div class="cover">
            <div class="list">
              <div v-for="item in policy">
                <div v-if="item.policyType===1" @click="clickPolicy(item.id)" class="listColumn">
                  <div style="flex: 1;" class="listTitle"><p> {{ item.title }}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="leftPane4" v-show="currentPage===4" class="left">
        <div class="card" style="flex:1" @click="openRichText(3)">
          <h2 class="card-title">{{ cardLoaded ? richText[3].title : "" }}</h2>
          <div class="cover">
            <p class="card-text">{{ cardLoaded ? richText[3].content : "" }}</p>
          </div>
        </div>
        <div class="card" style="flex:1" @click="openRichText(4)">
          <h2 class="card-title">{{ cardLoaded ? richText[4].title : "" }}</h2>
          <div class="cover">
            <p class="card-text">{{ cardLoaded ? richText[4].content : "" }}</p>
          </div>

        </div>
        <div class="card" style="flex:1;" @click="openRichText(5)">
          <h2 class="card-title">{{ cardLoaded ? richText[5].title : "" }}</h2>
          <div class="cover">
            <p class="card-text" style="position: absolute">{{ cardLoaded ? richText[5].content : "" }}</p>
          </div>
        </div>
      </div>
      <div id="leftPane5" v-show="currentPage===5" class="left">
        <div class="card" style="flex:1">
          <h2 class="card-title" style="font-size: 0.3rem">监控设备</h2>
          <div style="display: flex">
            <div class="monitor" style="flex: 1.3; ">监控设备数量</div>
            <div class="monitor">在线设备</div>
            <div class="monitor">离线设备</div>
          </div>
          <div style="display: flex">
            <div class="monitor monitorNum" style="color:#2de9db;">2</div>
            <div class="monitor monitorNum" style="color:#2de956;">1</div>
            <div class="monitor monitorNum" style="color:#d9001b;">1</div>
          </div>
          <div style="display:flex;;">
            <select name="selectBox" id="selectBox">
              <option value="0">全部</option>
              <option value="1">在线</option>
              <option value="2">离线</option>
            </select>
            <input placeholder="请输入" id="monitorInput">
          </div>
          <table style="  border-collapse: collapse;font-size: 0.15rem;text-align: center; border-radius: 16px">
            <thead style="background:  rgba(108,188,241,0.5);border: solid .03rem rgba(17, 123, 173,1)">
            <th style="  font-size: 0.2rem ">设备名称</th>
            <th style="  font-size: 0.2rem">编号</th>
            <th style="  font-size: 0.2rem">工作状态</th>
            </thead>
            <tbody style="background:  rgba(1, 75, 122, 0);color: white">
            <tr v-for="item in monitorList" @click="clickSvg(item.id,1)"  style="cursor: pointer;">
              <td style="padding: 12px ; width: 2rem"><p style="width: 100%; overflow: hidden">{{ item.monitorName }}</p></td>
              <td style="padding: 12px; width: 1.5rem"><div>{{ item.number }}</div></td>
              <td style="padding: 12px;width: 1.5rem"><div>{{ item.status }}</div></td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>
      <div id="leftPane6" v-show="currentPage===6" class="left">
        <div class="card" v-show="developmentPage ===1">
          <!--          <img style="position: absolute;width: 90%" src="/img/legend2.png" draggable="false">-->
          <div style=" position: absolute ; overflow-y: scroll ; height: 90% ; width: 94%">
            <table class="legendTable">
              <thead style="background:  rgba(108,188,241,0.5);">
              <th style="  font-size: 0.2rem ">序号</th>
              <th style="  font-size: 0.2rem">企业名称</th>
              </thead>
              <tbody style="background:  rgba(1, 75, 122, 0);color: white" v-for="item in enterpriseLegendList">
              <tr>
                <td style=" padding: 12px;">{{ item.number }}</td>
                <td style=" padding: 12px;">{{ item.name }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card" v-show="developmentPage ===1">
          <!--          <img style="position: absolute;width: 90% ; height: 93%" src="/img/legend.png" draggable="false" >-->
          <div class="legend" style=" position: absolute ;  height: 90% ; width: 94%">
            <div class="legendItem" v-for="item in landLegend">
              <div :style="{'background-color':item.color}" class="legendKu"></div>
              <div class="legendKuText">{{ item.text }}</div>
            </div>
          </div>
        </div>
        <div class="card" v-show="developmentPage ===3">
          <!--          <img style="position: absolute;width: 90% ; height: 93%" src="/img/legend.png" draggable="false" >-->
          <div class="legend" style=" position: absolute ;  height: 100% ; width: 100%">
            <div class="legendItem" v-for="item in plotLegend">
              <div :style="{'background-color':item.color}" class="legendKu">{{ item.code }}</div>
              <div class="legendKuText">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mid">
        <div class="up">
          <div v-show="dialogShow&&currentPage===1" class="dialog">
            <el-icon size="30px" color="#1f6fa7" class="iconClose" @click="dialogShow=false">
              <CircleClose/>
            </el-icon>
            <HistoryPopup></HistoryPopup>
          </div>

          <div v-if="richTextDialogShow" class="dialog">
            <el-icon size="30px" color="#1f6fa7" class="iconClose" @click="richTextDialogShow=false"
                     style="margin-right: 30px">
              <CircleClose/>
            </el-icon>
            <RichTextPopup :richText="richTextSelect"></RichTextPopup>
          </div>

          <div v-if="newsDialogShow" class="dialog">
            <el-icon size="30px" color="#1f6fa7" class="iconClose" @click="newsDialogShow=false"
                     style="margin-right: 10px">
              <CircleClose/>
            </el-icon>
            <NewsPopup :news="newsSelect"></NewsPopup>
          </div>

          <div v-if="monitorDialogShow" class="dialog">
            <el-icon size="30px" color="#1f6fa7" class="iconClose" @click="monitorDialogShow=false"
                     style="margin-right: 10px">
              <CircleClose/>
            </el-icon>
            <MonitorPopup :monitor="videoSelect"></MonitorPopup>
          </div>
        </div>
        <div class="bottom" v-show="currentPage===1">
          <button class="button" @click="clickRoad">交通优势</button>
          <button class="button" @click="clickArea">区位优势</button>
          <button class="button" @click="showDialog('history')">历史沿革</button>
          <button class="button" @click="openRichText(9)">人力资源</button>
        </div>
        <div class="bottom" v-show="currentPage===6">
          <button class="button button6" @click="changeDevelopmentPage(1)">征地储备</button>
          <button class="button button6" @click="changeDevelopmentPage(2)">打造融合区</button>
          <button class="button button6" @click="changeDevelopmentPage(3)">地块规划</button>
          <button class="button button6" @click="changeDevelopmentPage(4)">智慧园区</button>
        </div>
      </div>
      <div v-show="currentPage===1" id="rightPane" class="right">
        <div class="first" v-if="currentPage===1">
          <overview-chart/>
        </div>
        <div class="first" v-if="currentPage===1">
          <overview-chart2/>
        </div>
      </div>
      <div v-show="currentPage===2" id="rightPane2" class="right">
        <div class="card" style="flex:1">
          <h2 class="card-title">新闻资讯</h2>
          <div class="cover">
            <div class="list">
              <div v-for="item in newsList" class="listColumn" @click="clickNews(item)">
                <div style="flex: 1;" class="listTitle"><p>{{ item.title }}</p></div>
                <div style="flex: 1;">{{ item.publishTime }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="currentPage===3" id="rightPane3" class="right">
        <div class="card" style="flex:1" @click="openRichText(2)">
          <h2 class="card-title">{{ cardLoaded ? richText[2].title : "" }}</h2>
          <div class="cover">
            <p class="card-text">{{ cardLoaded ? richText[2].content : "" }}</p>
          </div>
        </div>
        <div class="card" style="flex:1">
          <h2 class="card-title">优惠政策</h2>
          <div class="cover">
            <div class="list">
              <div v-for="item in policy">
                <div v-if="item.policyType===2" @click="clickPolicy(item.id)" class="listColumn">
                  <div style="flex: 1;" class="listTitle"><p> {{ item.title }}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="currentPage===4" id="rightPane4" class="right">

        <div class="card" style="flex:1">
          <h2 class="card-title">高新技术企业</h2>
          <div class="cover">
            <div class="list">
              <div v-for="item in Enterprise" class="companyColumn">
                <div v-if="item.type === 1" @click="clickEnterprise(1)">{{ item.company }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card" style="flex:1">
          <h2 class="card-title">规上企业</h2>
          <div class="cover">
            <div class="list">
              <div v-for="item in Enterprise" class="companyColumn"><div v-if="item.type === 2" @click="clickEnterprise(2)">{{ item.company }}</div></div>
            </div>
          </div>
        </div>
        <div class="card" style="flex:1">
          <h2 class="card-title">规下企业</h2>
          <div class="cover">
            <div class="list">
              <div v-for="item in Enterprise" class="companyColumn"><div v-if="item.type === 3" @click="clickEnterprise(1)">{{ item.company }}</div></div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="currentPage===5" id="rightPane5" class="right">
        <div class="card" style="flex:1">
          <h2 class="card-title">监控列表</h2>
          <div class="cover">
            <div class="list">
              <div v-for="item in monitorList" class="companyColumn" @click="clickMonitor(item.id);">
                <div class="monitorTitle">{{ item.monitorName }}</div>
                <img class="monitorImage" :src=item.image draggable="false">
              </div>
            </div>

          </div>
        </div>
      </div>
      <div v-show="currentPage===6" id="rightPane6" style="z-index: -1;" class="right">
      </div>
    </div>
    <myMap style="position: fixed;" ref="childMap" @pageEmit="currentPage=1" @hideCard="changePage" @clickMonitor="clickMapMonitor"></myMap>
    <!--    <div class="footer"></div>-->
  </div>
</template>

<script setup lang="ts">
import {listBulletin} from "../../api/business/bulletin";
import {onMounted, onUnmounted, ref} from "vue";
import myMap from './components/map.vue'
import OverviewChart from "./components/charts/overviewChart.vue";
import OverviewChart2 from "./components/charts/overviewChart2.vue";
import HistoryPopup from "./components/popup/historyPopup.vue";
import RichTextPopup from "./components/popup/richTextPopup.vue";
import NewsPopup from "./components/popup/newsPopup.vue";
import MonitorPopup from "./components/popup/monitorPopup.vue";
import {listCard} from "../../api/business/card";

class achievement {
  title?: string;
}

class newsData {
  title?: string;
  content?: string;
  richContent?: string;
}

const childMap = ref<InstanceType<typeof myMap>>();
//发展前景页面按钮索引
let developmentPage = ref(<number>-1);
//历史沿革弹窗show
let dialogShow = ref(<boolean>false);
//发展前景弹窗show
let richTextDialogShow = ref(<boolean>false);
//新闻弹窗show
let newsDialogShow = ref(<boolean>false);
//监控弹窗show
let monitorDialogShow = ref(<boolean>false);
//所选弹窗
let videoSelect = ref(<object><unknown>null);
//所选富文本，弹窗展示数据
let richTextSelect = ref(<object>{
  title: <string>'',
  content: <string>'',
  richContent: <string>'',
});


// 弹窗富文本数据
let richText: newsData[] = [];
//判断是否加载完成数据
const cardLoaded = ref(<boolean>false);

/**
 * 获取卡片数据和弹窗富文本数据
 */
function getCard() {
  listCard().then(res => {
    richText = res.rows
    cardLoaded.value = true;
  })
}

//所选新闻内容
let newsSelect = ref(<object><unknown>null)
/**
 * 当前页面索引
 */
let currentPage = ref(<number>1);
const achievementList: achievement[] = [
  {
    title: '2013年9月筹建，由广东省城乡规划设计研究院规划设计，计划总投资100亿元'
  },
  {
    title: '2015年9月被省认定为依托揭阳产业转移园产业发展集聚地'
  },
  {
    title: '2018年3月作为揭阳产业转移园南片区纳入国家《中国开发区审核公告目录》'
  },
  {
    title: '全市十个重点园区之一，揭西县内唯一位列揭阳市十二大重点产业平台'
  },
  {
    title: '2013年9月筹建，由广东省城乡规划设计研究院规划设计，计划总投资100亿元'
  },
  {
    title: '2015年9月被省认定为依托揭阳产业转移园产业发展集聚地'
  },
  {
    title: '2018年3月作为揭阳产业转移园南片区纳入国家《中国开发区审核公告目录》'
  },
]
/**
 * 企业，type为企业类型，1为高新技术企业，2为规上企业，3为规下企业
 */
let Enterprise = [
  {
    type: <number>1,
    company: <string>'广东程通电线电缆厂有限公司（意向）'
  }, {
    type: <number>1,
    company: <string>'揭阳市福川精密工业有限公司'
  },
  {
    type: <number>2,
    company: <string>'广东众亿食品工业有限公司'
  }, {
    type: <number>2,
    company: <string>'广东雅都包装印刷有限公司'
  }, {
    type: <number>2,
    company: <string>'揭西盈讯电线电缆有限公司'
  }, {
    type: <number>2,
    company: <string>'雅的科技有限公司'
  }, {
    type: <number>2,
    company: <string>'揭西盈讯电线电缆有限公司'
  }, {
    type: <number>2,
    company: <string>'广东维巧食品科技有限公司'
  },
  {
    type: <number>3,
    company: <string>'广东祥达丽电线电缆有限公司（意向）'
  }, {
    type: <number>3,
    company: <string>'广东蓝宇塑料制品有限公司'
  }, {
    type: <number>3,
    company: <string>'揭阳市华南职业技术发展有限公司'
  }, {
    type: <number>3,
    company: <string>'广东佳盈锋智能科技有限公司'
  },
]
/**
 * 政策列表 ，type是类型，1是税收政策，2是优惠政策
 */
let policy = [
  {
    id: <number>1,
    policyType: <number>1,
    title: <string>'小微利企业减免企业所得税',
    richContent: <string>'<span style="color: white ;white-space: pre-wrap; line-height: 2">近日，市委常委、揭西县委书记刘端雄带队到该县产业园、棉湖镇等地开展调研，现场协调解决问题，提出要深入贯彻落实党的二十大精神，全面加快推进产业园区建设，加大招商引资力度，高站位、高标准、高效率推动重点项目建设，助推揭西经济社会实现高质量发展。\n' +
        '　　刘端雄一行先后到揭西县产业园、棉湖镇上浦村、棉湖大道、棉湖水稻产业园等地，实地了解县产业园总体规划、扩园征地、招商引资项目开工等方面情况，了解棉湖镇上浦村项目用地规划、服务对接、前期准备工作等，以及棉湖大道外立面景观提升改造工程和棉湖水稻产业园灌溉工程建设相关情况，同时听取情况汇报，并现场协调解决项目推进过程中遇到的困难和问题。\n' +
        '　　刘端雄提出，全县各级各部门要提高思想认识，切实把揭西县产业园扩园征地、招商引资项目建设摆在更加突出的位置，全力以赴抓企业入驻、抓开工建设、抓投产达效，更好地发挥产业园区对推动经济高质量发展的支撑性作用；要进一步完善园区基础设施，持续提供用地保障，提升税收服务水平，健全“企业服务官”制度，为企业提供贴心服务，简化办事流程；要及时协调解决企业发展过程中遇到的各种困难和问题，把利企惠企的各项扶持政策宣传到位、执行到位、落实到位，在政策、资金、用地等方面为企业提供更多支持，用实际行动帮助企业做大做强。\n' +
        '　　刘端雄要求，各有关部门必须各司其职、主动作为，统筹调度项目用地规模指标，制定切实可行的处置方案，全力以赴促进项目落地。同时全面加快推进棉湖大道外立面景观提升改造工程建设以及棉湖水稻产业园灌溉工程建设，积极调动各方资源和力量，压紧压实各方责任，因地制宜、实事求是，有力有序推动工程建设取得突破性进展；要加快推进项目建设，紧盯时间节点，抢抓当前有利时机，加大施工力度，集中力量，倒排工期，高站位、高标准、高效率推动重点项目建设，争取早日竣工投入使用，让民心工程更好地惠及广大老百姓，为揭西县实现高质量发展筑牢坚实基础。</span>'
  },
  {
    id: <number>2,
    policyType: <number>2,
    title: <string>'优惠政策1',
    richContent: <string>'<span style="color: white ;white-space: pre-wrap; line-height: 2">优惠政策富文本数据测试！！！！优惠政策富文本数据测试！！！！优惠政策富文本数据测试！！！！优惠政策富文本数据测试！！！！优惠政策富文本数据测试！！！！</span>'
  },
]
/**
 * 企业图例列表
 */
const enterpriseLegendList = [
  {
    number: 1,
    name: "广东程通电线电缆厂有限公司（意向）"
  },
  {
    number: 2,
    name: "广东祥达丽电线电缆有限公司（意向）"
  },
  {
    number: 3,
    name: "管委会大楼"
  },
  {
    number: 4,
    name: "产业园污水处理厂"
  },
  {
    number: 5,
    name: "广东蓝宇塑料制品有限公司"
  },
  {
    number: 6,
    name: "广东众亿食品工业有限公司"
  },
  {
    number: 7,
    name: "广东雅都包装印刷有限公司"
  },
  {
    number: 8,
    name: "揭西盈讯电线电缆有限公司"
  },
  {
    number: 9,
    name: "雅的科技有限公司"
  },
  {
    number: 10,
    name: "揭西盈讯电线电缆有限公司"
  },
  {
    number: 11,
    name: "广东蓝宇塑料制品有限公司"
  },
  {
    number: 12,
    name: "揭阳市华南职业技术发展有限公司"
  },
  {
    number: 13,
    name: "广东维巧食品科技有限公司"
  },
  {
    number: 14,
    name: "揭阳市福川精密工业有限公司"
  },
  {
    number: 15,
    name: "广东佳盈锋智能科技有限公司"
  },
  {
    number: 16,
    name: "揭西县园区建设投资有限公司"
  }
]

/**
 * 征地储备图例数据
 */
const landLegend = [
  {
    color: "#e5c063",
    text: "拟批报范围",
  },
  {
    color: "#ff4c4c",
    text: "存量土地",
  },
  {
    color: "#4c4cff",
    text: "已出让土地",
  },
  {
    color: "#4ca64c",
    text: "正在招拍挂",
  },
  {
    color: "#a64ca6",
    text: "已征用地",
  },
]

/**
 * 地块规划图例数据
 */
const plotLegend = [
  {
    color: "#e4eb31",
    code: "R2",
    text: "二类居住用地",
  },
  {
    color: "#ed1b49",
    code: "B1",
    text: "商业用地",
  },
  {
    color: "#f47f73",
    code: "B41",
    text: "加油加气站用地",
  },
  {
    color: "#f25c98",
    code: "A1",
    text: "行政办公用地",
  },
  {
    color: "#866649",
    code: "M2",
    text: "二类工业用地",
  },
  {
    color: "#7d70bf",
    code: "W2",
    text: "二类物流仓储用地",
  },
  {
    color: "#459ecf",
    code: "U21",
    text: "排水用地",
  },
  {
    color: "#469ecf",
    code: "U22",
    text: "环卫用地",
  },
  {
    color: "#3d84b0",
    code: "U31",
    text: "消防用地",
  },
  {
    color: "#62c43f",
    code: "G1",
    text: "公园绿地",
  },
  {
    color: "#39953d",
    code: "G2",
    text: "防护绿地",
  },
  {
    color: "#71d0d3",
    code: "E1",
    text: "自然水域",
  },
]

/**
 * 新闻列表数据，从后台读取!
 */
let news = [
  {
    id: <number>1,
    title: <string>'共商高质量发展大计 汇聚新征程奋进合力 ——揭西县产业园管委会举办新春企业家座谈会',
    date: <string>'2022-07-29',
    newsType: <number>1,
    author: <string>'记者：曾海青 刘少斌 编辑：曾海青 审核：王虹',
    content: <string>'<p><span style="font-size:16px">&nbsp;</span></p>\n' +
        '\n' +
        '<hr />\n' +
        '<p><span style="font-size:16px;color: white">2月2日，县产业园管委会举办新春企业家座谈会，畅叙高质量发展大计，倾听企业家心声，汇聚新征程奋进合力，引导企业提振信心、稳扎稳打、做大做强，全力以赴推动揭西经济社会高质量发展</span></p>\n' +
        '\n' +
        '<hr />\n' +
        '<p><img alt="" src="/img/newsImage/new2.png" style="height:584px; width:850px" /></p>\n' +
        '\n' +
        '<p><strong><span style="font-size:16px"><span style="color:white;">县委常委林惠生和县产业园管委会班子成员以及相关企业家代表等参加了座谈会。</span></span></strong></p>\n' +
        '\n' +
        '<p><img alt="" src="/img/newsImage/new3.png" style="height:561px; width:843px" /></p>\n' +
        '\n' +
        '<p><strong><span style="color:#ffffff"><span style="font-size:16px">座谈会氛围热烈浓厚，县产业园管委会负责人介绍了园区基础设施建设、土地储备、入驻企业等方面情况，并对新一年推进招商引资计划实施、优化完善政务服务环境、服务企业做强做大等方面工作进行了具体布置。企业家代表纷纷畅所欲言，认真分析当前经济高质量发展形势，分享企业壮大发展的规划设想，谈经验、出点子、谋思路，表示将以解放思想为先导，以推动高质量发展为主题，以改革创新为根本动力，争先创优、勇毅前行，齐心协力谱写揭西现代化高质量发展新篇章。</span></span></strong></p>\n' +
        '\n' +
        '<p><img alt="" src="/img/newsImage/news4.png" style="height:562px; width:845px" /></p>\n' +
        '\n' +
        '<p><span style="color:#ffffff"><span style="font-size:16px"><strong>林惠生在座谈会上作了讲话，指出：新的一年，各项工作正在紧锣密鼓推进中，广大乡贤、企业家长期扎根揭西，带领企业奋力拼搏、稳健发展，为揭西经济社会发展实现&ldquo;稳中有进、持续向好&rdquo;目标作出了积极贡献。林惠生强调：县委、县政府高度重视经济工作，始终把优化营商环境作为重中之重，坚持园区聚集，加强园区平台建设，推进入园发展，实现企业聚集抱团，降低生产成本，提高产品价值，增强市场竞争力和影响力。同时，希望广大乡贤、企业家要坚定发展信心，大力推进技术创新、人才引育和科技研发，抢抓发展机遇；要持续做大园区企业增量，完善基础设施功能配套，加快推进企业转型升级，打造优质品牌，促进县域工业经济提质增效；要加强政企间的沟通协调，党委、政府必须当好企业发展的&ldquo;坚强后盾&rdquo;，设身处地为企业着想、帮企业解难、助企业发展，全力以赴推动企业做大做强，推动揭西经济社会各项事业实现高质量发展。</strong></span></span></p>\n' +
        '\n' +
        '<p>&nbsp;</p>\n'
  }, {
    id: <number>2,
    title: <string>'揭西县主要领导到县产业园、棉湖镇开展调研',
    date: <string>'2022-07-29 15:45:23',
    newsType: <number>1,
    author: <string>'记者：张秀川 许佳曼 特约通讯员：温佳涛 通讯员：邹 彬',
    content: <string>'<span style="color: white ;white-space: pre-wrap; line-height: 2">近日，市委常委、揭西县委书记刘端雄带队到该县产业园、棉湖镇等地开展调研，现场协调解决问题，提出要深入贯彻落实党的二十大精神，全面加快推进产业园区建设，加大招商引资力度，高站位、高标准、高效率推动重点项目建设，助推揭西经济社会实现高质量发展。\n' +
        '　　刘端雄一行先后到揭西县产业园、棉湖镇上浦村、棉湖大道、棉湖水稻产业园等地，实地了解县产业园总体规划、扩园征地、招商引资项目开工等方面情况，了解棉湖镇上浦村项目用地规划、服务对接、前期准备工作等，以及棉湖大道外立面景观提升改造工程和棉湖水稻产业园灌溉工程建设相关情况，同时听取情况汇报，并现场协调解决项目推进过程中遇到的困难和问题。\n' +
        '　　刘端雄提出，全县各级各部门要提高思想认识，切实把揭西县产业园扩园征地、招商引资项目建设摆在更加突出的位置，全力以赴抓企业入驻、抓开工建设、抓投产达效，更好地发挥产业园区对推动经济高质量发展的支撑性作用；要进一步完善园区基础设施，持续提供用地保障，提升税收服务水平，健全“企业服务官”制度，为企业提供贴心服务，简化办事流程；要及时协调解决企业发展过程中遇到的各种困难和问题，把利企惠企的各项扶持政策宣传到位、执行到位、落实到位，在政策、资金、用地等方面为企业提供更多支持，用实际行动帮助企业做大做强。\n' +
        '　　刘端雄要求，各有关部门必须各司其职、主动作为，统筹调度项目用地规模指标，制定切实可行的处置方案，全力以赴促进项目落地。同时全面加快推进棉湖大道外立面景观提升改造工程建设以及棉湖水稻产业园灌溉工程建设，积极调动各方资源和力量，压紧压实各方责任，因地制宜、实事求是，有力有序推动工程建设取得突破性进展；要加快推进项目建设，紧盯时间节点，抢抓当前有利时机，加大施工力度，集中力量，倒排工期，高站位、高标准、高效率推动重点项目建设，争取早日竣工投入使用，让民心工程更好地惠及广大老百姓，为揭西县实现高质量发展筑牢坚实基础。</span>'
  }, {
    id: <number>3,
    title: <string>'新闻标题3',
    date: <string>'2022-07-29 15:45:23',
    newsType: <number>1,
    author: <string>'张桂花',
    content: <string>'<p><span style="font-size:16px">&nbsp;</span></p>\n' +
        '\n' +
        '<hr />\n' +
        '<p><span style="font-size:16px">2月2日，县产业园管委会举办新春企业家座谈会，畅叙高质量发展大计，倾听企业家心声，汇聚新征程奋进合力，引导企业提振信心、稳扎稳打、做大做强，全力以赴推动揭西经济社会高质量发展</span></p>\n' +
        '\n' +
        '<hr />\n' +
        '<p><img alt="" src="/img/newsImage/new2.png" style="height:584px; width:1037px" /></p>\n' +
        '\n' +
        '<p><strong><span style="font-size:16px"><span style="background-color:#ffffff">县委常委林惠生和县产业园管委会班子成员以及相关企业家代表等参加了座谈会。</span></span></strong></p>\n' +
        '\n' +
        '<p><img alt="" src="/img/newsImage/new3.png" style="height:561px; width:843px" /></p>\n' +
        '\n' +
        '<p><strong><span style="color:#ffffff"><span style="font-size:16px">座谈会氛围热烈浓厚，县产业园管委会负责人介绍了园区基础设施建设、土地储备、入驻企业等方面情况，并对新一年推进招商引资计划实施、优化完善政务服务环境、服务企业做强做大等方面工作进行了具体布置。企业家代表纷纷畅所欲言，认真分析当前经济高质量发展形势，分享企业壮大发展的规划设想，谈经验、出点子、谋思路，表示将以解放思想为先导，以推动高质量发展为主题，以改革创新为根本动力，争先创优、勇毅前行，齐心协力谱写揭西现代化高质量发展新篇章。</span></span></strong></p>\n' +
        '\n' +
        '<p><img alt="" src="/img/newsImage/news4.png" style="height:562px; width:845px" /></p>\n' +
        '\n' +
        '<p><span style="color:#ffffff"><span style="font-size:16px"><strong>林惠生在座谈会上作了讲话，指出：新的一年，各项工作正在紧锣密鼓推进中，广大乡贤、企业家长期扎根揭西，带领企业奋力拼搏、稳健发展，为揭西经济社会发展实现&ldquo;稳中有进、持续向好&rdquo;目标作出了积极贡献。林惠生强调：县委、县政府高度重视经济工作，始终把优化营商环境作为重中之重，坚持园区聚集，加强园区平台建设，推进入园发展，实现企业聚集抱团，降低生产成本，提高产品价值，增强市场竞争力和影响力。同时，希望广大乡贤、企业家要坚定发展信心，大力推进技术创新、人才引育和科技研发，抢抓发展机遇；要持续做大园区企业增量，完善基础设施功能配套，加快推进企业转型升级，打造优质品牌，促进县域工业经济提质增效；要加强政企间的沟通协调，党委、政府必须当好企业发展的&ldquo;坚强后盾&rdquo;，设身处地为企业着想、帮企业解难、助企业发展，全力以赴推动企业做大做强，推动揭西经济社会各项事业实现高质量发展。</strong></span></span></p>\n' +
        '\n' +
        '<p>&nbsp;</p>\n'
  },
]

let newsList = ref([])

let docEle = document.documentElement;

function getNews() {
  listBulletin().then(response => {
    function getAuthor(people) {
      let label = "";
      people.forEach((group) => {
        label += group["job"] + ":"
        group["names"].forEach((name) => {
          label += name + " "
        })
        label += "| ";
      })
      return label;
    }

    response.rows.forEach((item) => {
      item.author = getAuthor(JSON.parse(item.contributePeople))
    })
    newsList.value = response.rows;
  });
}

/**
 * 监控列表数据，后期从后台读取
 */
let monitorList = [
  {
    id: <number>1,
    number:<string>'JK101',
    monitorName: <string>'管委会大楼(rtsp流)',
    image: <string>'/img/historyP1.jpg',
    url: <string>'ws://192.168.0.136:2888',
    status:<string>'离线'
  },
  {
    id: <number>3,
    number:<string>'JK102',
    monitorName: <string>'演示监控（mp4）',
    image: <string>'/img/historyP1.jpg',
    url: <string>'/img/video/jt.mp4',
    status:<string>'在线'
  }
]


//用于判断是拖拽card还是点击card，避免误触
let clickFlag = true;

/**
 * 添加按手势拖动展开收起事件
 * @param elementId 标签id
 * @param direction 上：1 下：2 左：3 右：4
 */
function addTouch(elementId: string, direction: number): void {
  const offset = 20;
  let beforeX, beforeY, afterX, afterY;
  let show = true;
  const element = <HTMLElement>document.getElementById(elementId);
  element.addEventListener("mousedown", onMouseDown)
  element.addEventListener("mouseup", onMouseUp)
  element.addEventListener("click", onMouseClick)
  element.addEventListener("mouseover", onMouseMove)
  element.addEventListener("mouseout", onMouseOut)

  function onMouseOut(e) {
    if (!beforeX || !beforeY) {
      return
    }
    if (!element.contains(e.toElement)) {
      onMouseUp(e);
      onMouseClick(e);
    }
  }

  function onMouseDown(e) {
    clickFlag = true;
    [beforeX, beforeY] = [e.offsetX, e.offsetY];
  }

  function onMouseUp(e) {
    [afterX, afterY] = [e.offsetX, e.offsetY];
    //如果x轴拖拽小于预设值，则判定为点击，可弹出弹窗！
    if (Math.abs(afterX - beforeX) <= offset) {
      clickFlag = true;
    } else {
      clickFlag = false;
    }

  }

  function onMouseClick(e) {
    if (show) {
      switch (direction) {
        case 1: {
          if (beforeY - afterY > offset) {
            element.animate(
                [{
                  transform: 'translateY(-90%)'
                }],
                {
                  duration: 500,
                  fill: "forwards",
                  easing: 'linear'
                })
            setTimeout(() => {
              show = false;
            }, 500)
          }
          break;
        }
        case 2: {
          if (afterY - beforeY > offset) {
            element.animate(
                [{
                  transform: 'translateY(+100%)'
                }],
                {
                  duration: 500,
                  fill: "forwards",
                  easing: 'linear'
                })
            setTimeout(() => {
              show = false;
            }, 500)
          }
          break;
        }
        case 3: {
          if (beforeX - afterX > offset) {
            element.animate(
                [{
                  transform: 'translateX(-100%)'
                }],
                {
                  duration: 500,
                  fill: "forwards",
                  easing: 'linear'
                })
            setTimeout(() => {
              show = false;
            }, 500)
          }
          break;
        }
        case 4: {
          if (afterX - beforeX > offset) {
            element.animate(
                [{
                  transform: 'translateX(100%)'
                }],
                {
                  duration: 500,
                  fill: "forwards",
                  easing: 'linear'
                })
            setTimeout(() => {
              show = false;
            }, 500)
          }
          break;
        }
      }
    }
    [beforeX, beforeY] = [null, null];
  }

  function onMouseMove(e) {
    if (!show) {
      if (!(direction ^ 1) || !(direction ^ 2)) {
        element.animate(
            [{
              transform: 'translateY(0%)'
            }],
            {
              duration: 500,
              fill: "forwards",
              easing: 'linear',
            })
      } else if (!(direction ^ 3) || !(direction ^ 4)) {
        element.animate(
            [{
              transform: 'translateX(0%)'
            }],
            {
              duration: 500,
              fill: "forwards",
              easing: 'linear',
            })
      }

      show = true;
    }
  }
}

//用于记录新闻点击事件索引，切换新闻时只需点击一次
let oldId = null;

/**
 * 新闻点击
 */
function clickNews(item) {
  if (!clickFlag) {
    return
  }
  if (oldId == item.id) {
    newsDialogShow.value = !newsDialogShow.value;
  } else {
    newsDialogShow.value = true;
  }
  oldId = item.id;
  newsSelect.value = item;
}

//
let oldPolicyId = -1;

/**
 * 点击政策弹窗
 */
function clickPolicy(id) {
  if (!clickFlag) {
    return
  }
  for (let i = 0; i < policy.length; i++) {
    if (policy[i].id === id) {
      richTextSelect.value = policy[i];
    }
  }
  if (oldPolicyId == id) {
    richTextDialogShow.value = !richTextDialogShow.value;
  } else {
    richTextDialogShow.value = true;
  }
  oldPolicyId = id;
  oldIndex = -1
}

/**
 * 地图监控图标点,此方法为防止拖动侧边栏后造成的点击图标无效！
 */
function clickMapMonitor(id){
  clickFlag = true;
  clickMonitor(id);
}
/**
 * 监控点击
 */
function clickMonitor(id) {
  if (!clickFlag) {
    return
  }
  let video ;
  for (let monitor of monitorList) {
    if (id == monitor.id) {
      video = monitor;
    }
  }
  monitorDialogShow.value = !monitorDialogShow.value
  videoSelect.value = video
}
//存储旧弹窗索引，用于判断是否点击不同弹窗，提升操作体验
let oldIndex = -1;

/**
 * 点击跳转地图图标
 * @param id id判断哪个图标
 * @param type 图标类型，1为监控,后续可根据需求判断type
 */
function clickSvg(id,type){
  childMap.value.flyTo(id,type)
}
/**
 * 打开富文本弹窗
 * @param index 传入唯一索引来控制弹窗显示内容
 */
function openRichText(index) {
  if (!clickFlag) {
    return
  }
  if (oldIndex == index) {
    richTextDialogShow.value = !richTextDialogShow.value;
  } else {
    richTextDialogShow.value = true;
  }
  if (dialogShow.value) {
    dialogShow.value = false
  }
  oldIndex = index;
  oldPolicyId = -1;
  richTextSelect.value = richText[index];
}

/**
 * 切换页面
 * @param index 更新索引
 */
function changePage(index) {
  //判断是否是发展前景页面，不是则重置发展页面按钮索引
  if (index != 6) {
    developmentPage.value = -1;
    childMap.value?.showPlotPlan(false);
    childMap.value?.showLandExp(false);
  }
  if (index != 2) {
    childMap.value?.showMerchants(false);
    childMap.value?.merchantsDialogShow(false);
  }
  //切换页面收回弹窗
  richTextDialogShow.value = false;
  dialogShow.value = false
  newsDialogShow.value = false
  monitorDialogShow.value = false
  currentPage.value = index;
  childMap.value?.hiddenMonitors();
  switch (currentPage.value) {
    case 1:
      childMap.value?.showTiles(true);
      break;
    case 2:
      childMap.value?.clickMerchants();
      break;
    case 3:
      childMap.value?.showTiles(true);
      break;
    case 4:
      childMap.value?.showTiles(true);
      break;
    case 5:
      childMap.value?.showTiles(true);
      childMap.value?.showMonitors();
      break;
    case 6:
      childMap.value?.showTiles(true);
      break;
  }
  childMap.value?.requestRender();
}

/**
 * 监听window变化设置根节点字体大小
 */
function adaptionFontSize() {

  window.addEventListener("resize", onResize)
}


function onResize() {
  let clientWidth = docEle.clientWidth > 1200 ? docEle.clientWidth : 1200;
  docEle.style.fontSize = 100 * (clientWidth / 1920) + 'px';
}

/**
 *调用map组件，展示道路数据图层
 */
function clickRoad() {
  childMap.value?.clickRoad()
}

/**
 * 调用map组件，展示地块数据图层
 */
function clickArea() {
  childMap.value?.areaAdvantage()
}

/**
 * 点击企业,
 */
function clickEnterprise(position){
  childMap.value?.clickLand(position);
}

/**
 * 切换发展前景页面按钮索引，触发不同事件
 * @param index 传入按钮索引
 */
function changeDevelopmentPage(index) {
  developmentPage.value = index;
  switch (developmentPage.value) {
    case 1:
      childMap.value?.clickLand(undefined);
      break;
    case 2:
      openRichText(6)
      break;
    case 3:
      childMap.value?.clickPlotPlan();
      break;
    case 4:
      openRichText(7)
      break;
  }
  //因为关闭了画面自渲染来提高性能，所以图层切换时需主动渲染一次！
  childMap.value?.requestRender();
}

/**
 * 显示弹窗
 * @param key 弹窗类型
 */
function showDialog(key: String) {
  if (richTextDialogShow.value) {
    richTextDialogShow.value = false
  }
  dialogShow.value = !dialogShow.value;
}

onResize();

onMounted(async () => {
  adaptionFontSize();
  addTouch("header", 1)
  addTouch("leftPane", 3)
  addTouch("leftPane3", 3)
  addTouch("leftPane4", 3)
  addTouch("leftPane5", 3)
  addTouch("leftPane6", 3)

  addTouch("rightPane", 4)
  addTouch("rightPane2", 4)
  addTouch("rightPane3", 4)
  addTouch("rightPane4", 4)
  addTouch("rightPane5", 4)
  getCard();
  getNews();
})

onUnmounted(() => {
  docEle.style.fontSize = 16 + 'px'
  window.removeEventListener("resize", onResize)
})

</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    /**/
  }

  ::-webkit-scrollbar-thumb {
    //display: none;
    background: #30689a;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #0ab7b7;
  }

  ::-webkit-scrollbar-corner {
    background: rgba(255, 255, 255, 0);
  }

  scrollbar-width: thin;
  scrollbar-color: #13c7c7 rgb(45, 90, 100);
}

#container {
  min-height: 800px;
  min-width: 1200px;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  //页面头部样式
  .header {
    z-index: 2;
    min-height: 80px;
    max-height: 100px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    flex: 1;
    align-items: center;
    text-align: center;
    background-color: rgba(9, 41, 65, 0.5);
    background-image: url('../../assets/logo/header.png');
    background-size: 100% 100%;

    .side {
      height: 100%;
      display: flex;
      flex: 3;

      .item {
        flex: 1;
        flex-direction: column;
        display: flex;
        align-items: center;

        .button {
          margin: 5px;
          //font-weight: bolder;
          font-family: "华文隶书";
          font-size: .2rem;
          color: #d8f2f5;
          cursor: pointer;
          border-width: 0;
          border-radius: 10px;
          background-color: rgba(21, 90, 140, 0.9);
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease-in-out;
          width: 60%;
          flex: 2;
        }

        .button:hover {
          margin: 0px;
          background: #0684a2;
        }

        .button.selected {
          margin: 0px;
          background: #898905;
        }
      }
    }

    .mid {
      height: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      flex: 2;

      .text {
        flex: 1;
        color: #e6e6e6;
        font-family: "楷体";
        font-weight: bolder;
        font-size: 0.25rem;
        position: relative;
      }

      //.text:hover::before{
      //  content: attr(title);
      //  position: absolute;
      //  top: 100%;
      //  left: 0;
      //  padding: 5px;
      //  //background-color: #ccc;
      //  color: #000;
      //  font-size: 14px;
      //  border-radius: 5px;
      //}
    }
  }

  .content {
    display: flex;
    flex-direction: row;
    flex: 10;
    //background: #50bed5;
    //左侧栏样式
    .left {
      z-index: 2;
      margin: 24px 12px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0);
      transition: all 0.2s ease-in-out;
      //transform: translateX(-100%);
      flex: 1;
      display: flex;
      flex-direction: column;

      //左侧栏里每个卡片部分的样式
      .card {
        margin: 10px;
        flex: 1;
        background-color: rgba(1, 75, 122, 0.5);
        border-radius: 5px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
        padding: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        //卡片的标题
        .card-title {
          font-size: 0.2rem;
          margin-bottom: 10px;
          color: #00bbcc;
          text-transform: uppercase;
          text-align: center;
          letter-spacing: 2px;
        }

        //嵌套一层做滚动条样式
        .cover {
          position: relative;
          //display: block;
          font-size: 0.15rem;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-y: auto;

          .list {
            width: 100%;
            position: absolute;
            display: flex;
            flex-direction: column;

            .column {
              cursor: pointer;
              display: flex;
              flex: 1;
              border: 1px #1ab394;
              color: #fdcb61;
              font-size: 0.14rem;
              line-height: 3;
            }
          }
        }

        //监控页面选择器样式
        #selectBox {
          flex: .2;
          padding: 5px 20px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
          background-color: #fff;
          appearance: none;
          -webkit-appearance: none;
          background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
          background-repeat: no-repeat;
          background-position: right -4px center;
          cursor: pointer;
          margin: 2px;
        }

        //选择器点击样式
        #selectBox:focus {
          outline: none;
          border-color: #37a0f4;
          box-shadow: 0 0 0 2px #d9eefa;
        }

        //监控页面搜索输入框样式
        #monitorInput {
          flex: 1;
          width: 100%;
          height: 40px;
          padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
          margin: 2px;
        }

        //监控页面搜索输入框点击样式
        #monitorInput:focus {
          outline: none;
          border-color: #37a0f4;
          box-shadow: 0 0 0 2px #d9eefa;
        }

        //表格图例样式
        .legendTable {
          border-collapse: collapse;
          font-size: 0.15rem;
          text-align: center;
          border-radius: 8px;
          width: 99%;
          overflow: scroll;
        }

        .legendTable th, table td {
          border: 0.025rem solid rgba(0, 166, 255, 0.5);
        }

        .legendTable::-webkit-scrollbar {
          display: none;
        }

        //图例样式
        .legend {
          display: flex;
          flex-direction: column;

          .legendItem {
            flex: 1;
            display: flex;

            .legendKu {
              flex: .23;
              margin-left: .45rem;
              height: .3rem;
              font-size: .13rem;
              text-align: center;
              line-height: .28rem;
            }

            .legendKuText {
              font-size: .15rem;
              flex: 1;
              color: white;
              margin-left: 1rem
            }
          }
        }
      }


      .card-text {
        font-size: 0.15rem;
        line-height: 1.5;
        margin-bottom: 20px;
        color: #ffffff;
        overflow: auto;
        white-space: pre-wrap;
        text-indent: 2em
      }

      .card-text::-webkit-scrollbar {
        display: none;
      }

      //.card-button {
      //  position: absolute;
      //  bottom: 20px;
      //  right: 20px;
      //  padding: 10px 20px;
      //  background-color: rgba(14, 65, 110, 0.8);
      //  color: #fff;
      //  border: none;
      //  border-radius: 5px;
      //  font-size: 0.15rem;
      //  cursor: pointer;
      //  transition: all 0.3s ease-in-out;
      //}
      //
      //.card-button:hover {
      //  background-color: rgb(75 190 165 / 80%);
      //}

      .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #194a85, #419de0);
        z-index: -1;
        transition: all 0.3s ease-in-out;
        transform: translateX(-100%);
      }

      .card:hover::before {
        transform: translateX(0);
      }

      .monitor {
        flex: 1;
        font-size: 0.2rem;
        text-align: center;
        color: white;
      }

      .monitorNum {
        margin: 5px;
        font-size: 0.25rem;
      }
    }

    .mid {
      margin: 24px 12px;
      border-radius: 16px;
      flex: 2;
      transition: all 0.2s ease-in-out;
      display: flex;
      flex-direction: column;

      .up {
        position: relative;
        flex: 8;
        display: flex;

        .dialog {
          flex: 1;
          border-radius: 10px;
          padding: 10px;
          margin: 10px;
          background-color: rgba(1, 75, 122, 0.5);
          z-index: 2;
        }

        .iconClose {
          position: absolute;
          right: 0;
          margin-right: 40px;
          z-index: 999;
          cursor: pointer;
        }
      }

      .bottom {
        border-radius: 16px;
        //background: rgba(255, 255, 255, 0.47);
        display: flex;
        flex: 1;

        .button {
          font-family: 楷体;
          font-size: 0.2rem;
          margin: 10px;
          flex: 1;
          z-index: 2;
          display: inline-block;
          position: relative;
          padding: 20px 35px;
          border: none;
          border-radius: 50px;
          color: #f2f2f2;
          text-transform: uppercase;
          text-align: center;
          text-decoration: none;
          overflow: hidden;
          cursor: pointer;
          background: linear-gradient(to right, #5b59e0, #4b82cc, #33b5d2);
          box-shadow: 0px 5px 0px 0px rgba(35, 31, 150, 0.7);
          transition: all 0.3s ease;
        }

        .button:before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50px;
          background: rgba(0, 0, 0, 0.1);
          z-index: -1;
          transform: scale(0.8);
          transition: all 0.3s ease;
        }

        .button:hover:before {
          transform: scale(1);
        }

        .button:hover {
          //box-shadow: 0px 15px 0px 0px rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
        }
      }
    }

    .right {
      max-width: 25%;
      z-index: 2;
      margin: 24px 12px;
      border-radius: 16px;
      transition: all 0.2s ease-in-out;
      background: rgba(255, 255, 255, 0);
      flex: 1;
      display: flex;
      flex-direction: column;

      .first {
        display: flex;
        padding: 20px;
        border-radius: 5px;
        margin: 10px;
        max-height: 60%;
        background-color: rgba(1, 75, 122, 0.5);
        flex: 1;
      }

      .card {
        margin: 10px;
        flex: 1;
        background-color: rgba(1, 75, 122, 0.5);
        border-radius: 5px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
        padding: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .cover {
          position: relative;
          //display: block;
          font-size: 0.15rem;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-y: auto;

          .list {
            width: 100%;
            position: absolute;
            display: flex;
            flex-direction: column;


          }

          .column {
            cursor: pointer;
            display: flex;
            flex: 1;
            border: 1px #1ab394;
            color: #fdcb61;
            font-size: 0.14rem;
            line-height: 2;
          }

          .companyColumn {
            line-height: 3;
            cursor: pointer;
            text-align: center;
            border: 1px #1ab394;
            color: #ffffff;
            font-size: 0.14rem;
            padding: 2px;

          }

          .companyColumn:hover {
            color: #00bbcc;
          }

        }
      }


      .card-title {
        font-size: 0.2rem;
        margin-bottom: 10px;
        color: #00bbcc;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 2px;
      }

      .card-text {
        font-size: 0.15rem;
        line-height: 1.5;
        margin-bottom: 20px;
        color: #ffffff;
        overflow: auto;
        white-space: pre-wrap;
        text-indent: 2em
      }

      .card-text::-webkit-scrollbar {
        display: none;
      }


      .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #194a85, #419de0);
        z-index: -1;
        transition: all 0.3s ease-in-out;
        transform: translateX(100%);
      }

      .card:hover::before {
        transform: translateX(0);
      }

      .monitorTitle {
        font-size: .15rem;
      }

      .monitorImage {
        width: 100%;
      }

    }
  }

  tr:hover {
    color: #e2e2e2;
  }

  .footer {
    flex: 1;
    background: #02203b;
  }

  //列表样式，如新闻，政策等列表
  .listColumn {
    display: flex;
    line-height: 3;
    cursor: pointer;
    text-align: center;
    border-bottom: solid 1px rgba(153, 169, 191, 0.42);
    color: #ffffff;
    font-size: 0.14rem;
    padding: 2px;

    @keyframes marquee {
      0% {
        transform: translateX(10%);
      }
      100% {
        transform: translateX(-80%);
      }
    }

    .listTitle {
      display: flex;
      overflow: hidden;
      //text-overflow: ellipsis;
      line-height: 3;
      white-space: nowrap;
      max-width: 100%;
      align-items: center;

      p {
        color: #fdcb61;
        margin: auto;
        animation: marquee 10s linear infinite;
      }
    }


  }

  .listColumn:hover {
    color: #00bbcc;
  }

}
</style>
