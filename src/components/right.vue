<template>
  <div v-if="data.content == '1'" :class="data.content == '1' ? 'act':''">
    <div class="card">
      <div class="card-content">
        <!-- 在这里添加您的内容 -->
        <div class="displayflex" style="padding-top: 10px;">
          <div class="xiaosu-6">
            <span style="padding-left: 15px;">党组织</span>
            <span style="padding-left: 30px;">Party Organization</span>
            <span style="padding-left: 50px;"><button class="btn-1">查看更多</button></span>
          </div>
        </div>
        <div>
          <div class="ul-li">
            <ul class="tabs">
              <li class="left" @click="data.selectedTab = 'option1'"
                :class="{ active: data.selectedTab === 'option1' }">党员信息</li>
              <li class="right" @click="data.selectedTab = 'option2'"
                :class="{ active: data.selectedTab === 'option2' }">乡贤信息</li>
            </ul>
          </div>
          <p></p>
          <div v-if="data.selectedTab === 'option1'">
            <!-- Option 1 content -->
            <!-- 党组织数量-->
            <div class="dzz">
              <div v-for="organiza in data.Organization" :key="organiza" class="dzz_flex_box">
                <img :src="organiza.imgUrl" alt="人员" class="img1" />
                <ul>
                  <li>{{organiza.number}}</li>
                  <li>党组织数量</li>
                </ul>
              </div>
            </div>
            <p></p>
            <div class="boxx">
              <div v-for="posit in data.Position" :key="posit">
                <ul style="display: flex;">
                  <img :src="posit.imgUrl" alt="人员" class="img1" />
                  <li class="boox">
                    <span>姓名：{{posit.name}}</span>
                    <span>职务：{{posit.duties}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 二十大专题 -->
            <div style="padding-bottom: 10px;">
              <div class="xiaosu-7">
                <div class="displayflex" style="padding-top: 10px;">

                  <div style="padding-left: 15px;">二十大专题</div>
                  <div style="padding-left: 30px;">Special report</div>
                </div>

              </div>
              <!-- 两个图片 -->
              <div class="displayflex" style="padding-top: 10px;">
                <!-- 这里是弹窗 -->
                <div class="pop-up" v-cloak>
                  <div style="margin: 5px;">
                    <img @click="data.showModal = true" src="/src/assets/pic1-023.5fb11783.jpg" class="img3" />
                    <div class="mask" v-if="data.showModal" @click="data.showModal = false"></div>
                    <div class="pop" v-if="data.showModal">
                      <!-- 内容区域 -->
                      <iframe src="http://cpc.people.com.cn/20th/n1/2022/1023/c448334-32550083.html"></iframe>
                    </div>
                  </div>
                </div>
                <!-- 这里是弹窗 -->
                <div class="pop-up" v-cloak>
                  <div style="margin: 5px;">
                    <img @click="data.showMod = true" src="/src//assets/pic1-021.8d843f04.jpg" class="img3" />
                    <div class="mask" v-if="data.showMod" @click="data.showMod = false"></div>
                    <div class="pop" v-if="data.showMod">
                      <!-- 内容区域 -->
                      <iframe src="http://cpc.people.com.cn/20th/n1/2022/1023/c448334-32550083-2.html"></iframe>
                    </div>
                  </div>
                </div>
              </div>
              <div class="displayflex divv">
                <div class="textslv">习近平等二十届中共中央政治局常委同中外记者见面</div>
                <div class="textslv" style="padding-left: 23px;">习近平等二十届中共中央政治局常委同中外记者见面</div>
              </div>
            </div>
            <table class="my-table-1">
              <tbody>
                <tr v-for="news in data.News" :key="news">
                  <td>{{ news.text }}</td>
                  <td>{{ news.time }}</td>
                </tr>
              </tbody>
            </table>
            <!-- 党建工作 -->
            <div>
              <div class="xiaosu-7">
                <div style="display: flex;padding-top: 10px;">
                  <div style="padding-left: 15px;">党建工作</div>
                  <div style="padding-left: 15px;">PARTY BUILDING WORK</div>
                </div>
              </div>
              <div class="displayflex" style="padding-top: 10px;">
                <!--  -->
                <div class="pop-up" v-cloak>
                  <div>
                    <img @click="data.showNew=true" src="/src/assets/1676598375118976.e61cd19a.jpg" class="img3" />
                    <div class="mask" v-if="data.showNew" @click="data.showNew=false"></div>
                    <div class="pop" v-if="data.showNew">
                      <iframe src="http://cpc.people.com.cn/20th/n1/2022/1023/c448334-32550083-2.html"></iframe>
                    </div>
                  </div>
                </div>
                <!--  -->
                <div class="pop-up" v-cloak>
                  <div>
                    <img @click="data.showNews=true" src="/src/assets/1676598375118976.e61cd19a.jpg"
                      class="img2 img3" />
                    <div class="mask" v-if="data.showNews" @click="data.showNews=false"></div>
                    <div class="pop" v-if="data.showNews">
                      <iframe src="http://cpc.people.com.cn/20th/n1/2022/1023/c448334-32550083-2.html"></iframe>
                    </div>
                  </div>
                </div>

              </div>
              <div class="displayflex divv">
                <div class="textslv">党建带团建 共赴杏花节｜南乡团建联盟到姓潘村开展学雷锋志愿服务活动</div>
                <div class="textslv" style="padding-left: 23px;">我们的节日｜双溪口乡文化礼堂新春活动精彩回顾</div>
              </div>
              <div v-for="newsone in data.Newsone" :key="newsone" class="title2 divv">
                <div class="textslv1">{{newsone.text}}</div>
                <div>{{ newsone.time }}</div>
              </div>
            </div>
          </div>
          <div v-else-if="data.selectedTab === 'option2'">
            <!-- Option 2 content 这里是放乡贤信息的内容-->2
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 网格治理内容 -->
  <div v-if="data.content == '2'" :class="data.content === '2' ? 'activi':''">
    <div class="card-2">
      <!-- 人员统计 -->
      <div class="text-color">
        <div class="population-card">
          <div class="xiaosu-5">
            <span style="padding-left: 10px;font-size: 18px;">人员统计</span>
            <span style="padding-left: 20px;color: #59666B;font-size: 14px;padding-top: 5px;">PERSONNEL
              STATISTICS</span>
            <span style="padding-left: 38px;"><button class="btn">查看更多</button></span>
          </div>
        </div>
        <ul class="population-header">
          <li class="population-item">
            <span :class="{ animated: data.counter }">{{ data.counter }}</span>
            <span>常住人口</span>
          </li>
          <li class="population-item">
            <span>27</span>
            <span>流动人口</span>
          </li>
        </ul>

        <!-- echart -->
        <div class="xiaosu-5">
          <span style="padding-left: 10px;">重点人员</span>
        </div>

        <!-- 放echart的地方-->
        <div id="oil-discount"></div>

        <!-- 视频监控 -->
        <div class="xiaosu-4">
          <span style="padding-left: 10px;">视频监控</span>


          <span style="padding-left: 30px;">VIDEO SURVEILLANCE</span>
        </div>
        <div>
          <div class="T-Bmargin-2">
            <img src="/src/assets/video/v1.8b945820.png" class="img3 img2" />
            <img src="/src/assets/video/v2.aa5dbe69.png" class="img3 img2" />
          </div>
          <div class="T-Bmargin-2">
            <img src="/src/assets//video/v3.5446d2b3.png" class="img3 img2" />
            <img src="/src/assets/video/v4.6414704a.png" class="img3 img2" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 强村发展内容 -->
  <div v-if="data.content == '3'" :class="data.content === '3' ? 'activi':''">
    <div class="card-3">
      <!-- 双溪口乡 -->
      <div class="text-color-3">
        <div class="xiaosu-3">
          <span style="font-size: 18px;">双溪口乡</span>
          <span style="padding-left: 20px;color: #59666B;font-size: 14px;">VILLAGE PROFILE</span>
          <span style="padding-left: 20%;"><button class="btn">查看更多</button></span>
        </div>
        <div class="textt">
          双溪口乡是缙云县东大门，与仙居县交界，因贞溪、上周两溪在此汇合而得名。下辖8个行政村，21个自然村，32平方公里，1.2万人，常住人口6285人，598名党员，是国家级生态乡、
          省级卫生乡、省级体育强乡、市精品农业示范乡，县级书法之乡。同时还是革命老区。全乡21个自然村中有15个是革命老区村，是有名的革命老区堡垒乡。
        </div>
        <div class="resource">
          <div class="xiaosu-2">
            <span style="font-size: 18px;">资源统计</span>
            <span style="padding-left: 30px;color: #59666B;font-size: 14px;">RESOURCE STATISTICS</span>
            <h5>村庄资产</h5>
          </div>
        </div>
        <!-- 村庄资产 -->
        <div class="box2">
          <ul class="box2-ull">
            <div v-for="Village in data.Villageassets" :key="Village">
              <li class="li-item li-1">
                <span>{{Village.num}}</span>
                <span>{{Village.type}}（亩）</span>
              </li>
            </div>
          </ul>
          <ul class="box2-ul">
            <div v-for="Vill in data.Villageasset" :key="Vill">
              <li class="li-item li-1">
                <span>{{Vill.num}}</span>
                <span>{{Vill.type}}（亩）</span>
              </li>
            </div>
          </ul>
          <ul class="box2-ul">
            <div v-for="Villl in data.Villll" :key="Villl">
              <li class="li-item li-2">
                <span>{{Villl.num}}</span>
                <span>{{Villl.type}}（亩）</span>
              </li>
            </div>
          </ul>
        </div>

        <!-- echart -->
        <div class="resource">
          <h5>村庄资产</h5>
        </div>
        <!-- 放echart的地方-->
        <div id="echart-cav"></div>

        <!-- 资源统计 -->
        <div class="xiaosu-1">
          <span style="font-size: 18px;">强村事件</span>
          <span style="padding-left: 30px;color: #59666B;font-size: 14px;">STRONG VILLAGE INCIDENT</span>
        </div>
        <div>
          <div class="T-margin">
            <div class="pop-up" v-cloak>
              <div>
                <img @click="data.showNewss=true" src="/src/assets/1676598375118976.e61cd19a.jpg" class="img3 img2" />
                <div class="mask" v-if="data.showNewss" @click="data.showNewss=false"></div>
                <div class="pop" v-if="data.showNewss">
                  <iframe src="http://cpc.people.com.cn/20th/n1/2022/1023/c448334-32550083-2.html"></iframe>
                </div>
              </div>
            </div>
            <div class="pop-up" v-cloak>
              <div>
                <img @click="data.showNewsss = true" src="/src/assets/1676598375118976.e61cd19a.jpg"
                  class="img3 img2" />
                <div class="mask" v-if="data.showNewsss" @click="data.showNewsss = false"></div>
                <div class="pop" v-if="data.showNewsss">
                  <iframe src="http://cpc.people.com.cn/20th/n1/2022/1023/c448334-32550083-2.html"></iframe>
                </div>
              </div>
            </div>
          </div>
          <div class="displayflex-3 qiang">
            <div class="textslv">党建带团建 共赴杏花节｜南乡团建联盟到姓潘村开展学雷锋志愿服务活动</div>
            <div class="textslv" style="padding-left: 23px;">我们的节日｜双溪口乡文化礼堂新春活动精彩回顾</div>
            <span></span>
          </div>
          <div class="T-margin qiang">
            <div class="textslv1">省级荣誉！双溪口乡周扎村成功入选2022年浙江省乡村振兴示范村创建名单</div>
            <div style="padding-left: 15px;">2023.10.01</div>
          </div>
          <div class="T-margin qiang">
            <div class="textslv1">争当“排头兵” 建功共富路丨双溪口乡青年干部热议县干部大会讲话精神</div>
            <div style="padding-left: 15px;">2023.10.01</div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!-- 暖心服务 -->
  <div v-if="data.content == '4'" :class="data.content === '4' ? 'activi':''">
    <div class="card-4">
      <div class="text-color-4">
        <!-- 积分排行 -->
        <div class="displayflex-4">
          <div class="xiaosu">
            <span style="padding-left: 12px;font-size: 18px;">积分排行</span>
          </div>

          <span style="padding-left: 30px;color: #59666B;font-size: 14px;padding-top: 5px;">POINTS RANKING</span>
          <span style="padding-left: 15%;"><button class="btn">查看更多</button></span>
        </div>
        <div class="displayflex-4">
          <div v-for="integr in data.integ" :key="integr">
            <ul class="displayflex-4">
              <img src="/src/assets/perpo.png" alt="人员" class="img1">
              <li class="integral-3">
                <span>{{integr.num}}</span>
                <span>{{integr.name}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 积分排行列表 -->
        <table class="my-table">
          <tbody>
            <tr v-for="row in data.localData1" :key="row">
              <td>{{ row.col1 }}</td>
              <td>{{ row.col2 }}</td>
              <td>{{ row.col3 }}</td>
              <td>{{ row.col4 }}</td>
            </tr>
          </tbody>
        </table>
        <!-- 志愿服务 -->
        <div class="displayflex-4 T-Bmargin">
          <div class="xiaosu"><span style="padding-left: 10px;font-size: 18px;">志愿服务</span></div>
          <span style="padding-left: 30px;color: #59666B;font-size: 14px;padding-top: 5px;">VOLUNTEER SERVICE</span>
          <span style="padding-left: 10%;"><button class="btn">查看更多</button></span>
        </div>
        <table class="my-table">
          <tbody>
            <tr v-for="row in data.localData2" :key="row">
              <td>{{ row.col1 }}</td>
              <td>{{ row.col2 }}</td>
              <td>{{ row.col3 }}</td>
            </tr>
          </tbody>
        </table>
        <!-- 居家养老 -->
        <div class="displayflex-4 T-Bmargin">
          <div class="xiaosu"><span style="padding-left: 10px;font-size: 18px;">居家养老</span></div>

          <span style="padding-left: 30px;color: #59666B;font-size: 14px;padding-top: 5px;">HOME CARE</span>
          <span style="padding-left: 25%;"><button class="btn">查看更多</button></span>
        </div>
        <table class="my-table">
          <tbody>
            <tr v-for="row in data.localData3" :key="row">
              <td>{{ row.col1 }}</td>
              <td>{{ row.col2 }}</td>
              <td>{{ row.col3 }}</td>
              <td>{{ row.col4 }}</td>
            </tr>
          </tbody>
        </table>
        <!-- 邻里帮扶 -->
        <div class="B-margin">
          <div class="xiaosu"> <span style="padding-left: 10px;font-size: 18px;">邻里帮扶</span>
            <span style="padding-left: 30px;color: #59666B;font-size: 14px;padding-top: 5px;">NEIGHBORHOOD HELP</span>
            <span style="padding-left: 7%;"><button class="btn">查看更多</button></span>
          </div>
        </div>
        <div class="resource1">
          <h5>帮扶对象</h5>
        </div>
        <div class="displayflex-4">
          <div v-for="neighbor in data.neighborh" :key="neighbor">
            <div class="integral-2">
              <ul class="displayflex-4">
                <li class="integral-1">
                  <span><img :src="neighbor.imgUrl" alt="人员" class="img1" /></span>
                  <span>{{neighbor.num}}</span>
                  <span>{{neighbor.types}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="resource1">
          <h5>帮扶记录</h5>
        </div>
        <table class="my-table">
          <tbody>
            <tr v-for="row in data.localData4" :key="row">
              <td>{{ row.col1 }}</td>
              <td>{{ row.col2 }}</td>
              <td>{{ row.col3 }}</td>
              <td>{{ row.col4 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  // 引入echart
  import * as echarts from "echarts";
  // 数据引入
  import {
    position,
    organization,
    news,
    newone,
    tableData1,
    tableData2,
    tableData3,
    tableData4,
    integral,
    neighborhood,
    VillageAssets,
    VillageAsset,
    Villageass,
    refresh
  } from "/src/data/tabledata.js"
  // 引入vuex
  import {
    useStore,
  } from 'vuex'

  // 引入生命周期
  import {
    reactive,
    watch,
    computed,
    onMounted
  } from 'vue'
  // veux储存状态
  const store = useStore()
  // 响应式数据
  const data = reactive({
    content: '',
    selectedTab: "option1",
    localData1: tableData1,
    localData2: tableData2,
    localData3: tableData3,
    localData4: tableData4,
    integ: integral,
    neighborh: neighborhood,
    Villageassets: VillageAssets,
    Villageasset: VillageAsset,
    Villll: Villageass,
    Position: position,
    Organization: organization,
    News: news,
    Newsone: newone,
    showModal: false,
    showMod: false,
    showNew: false,
    showNews: false,
    showNewss: false,
    showNewsss: false,
    counter: 0,
  })
  // 加载定时器
  onMounted(() => {
    startCounter();
  })
  // 动态数字
  const startCounter = () => {
    let intervalId = setInterval(() => {
      if (data.counter >= 2000) {
        clearInterval(intervalId);
      } else {
        data.counter++;
      }
    }, 2);
  }
  // 2页面的Echart
  const changeBar = () => {
    const myChart = echarts.init(document.getElementById("oil-discount"));
    let title = '总数'
    let total = 1198
    let num = '人'
    let echartData = [{
        name: "重点监管",
        value: "35"
      },
      {
        name: "低保户",
        value: "374"
      },
      {
        name: "残障人士",
        value: "760"
      },
      {
        name: "留守儿童",
        value: "124"
      },
      {
        name: "独居老人",
        value: "111"
      }
    ]
    myChart.setOption({
      tooltip: {

      },
      color: ['#34c85a', '#32ade6', '#007aff', '#00c7bd', '#007aff'],
      legend: {
        orient: 'vertical',
        right: '0%',
        itemWidth: 20, //宽
        itemHeight: 20, //高
        itemGap: 30,
        icon: 'circle',
        top: '10%',
        y: "center",
        padding: [10, 10, 20, 0], //例 距上⽅距离，距右⽅距离，距下⽅距离，距左⽅距离
        data: [{
            name: '重点监管',
            icon: 'circle',
          },
          {
            name: '低保户',
            icon: 'circle',
          },
          {
            name: '\n',
          },
          {
            name: '残障人士',
            icon: 'circle',
          },
          {
            name: '留守儿童',
            icon: 'circle',
          },
          {
            name: '\n',
          },
          {
            name: '独居老人',
            icon: 'circle',
          }
        ],
        textStyle: {
          color: '#A3B4CC',
        }
      },
      title: [{
        text: '{name|' + title + '}\n{val|' + total + '}\n{num|' + num + '}',
        top: '15%',
        left: '30%',
        textStyle: {
          rich: {
            name: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#ffffff',
              padding: [20, -22]
            },
            num: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#ffffff',
              padding: [5, -18]
            },
            val: {
              padding: [4, -32],
              fontSize: 20,
              fontWeight: 'bold',
              color: '#ffffff',
            }
          }
        }
      }],
      series: [{
        type: 'pie',
        radius: ['50%', '60%'],
        center: ['30%', '40%'],
        data: echartData,
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        itemStyle: {
          borderWidth: 3,
          borderColor: '#fff'
        }
      }]
    })
  }

  // 3页面的Echart
  const changePay = () => {
    const myChart = echarts.init(document.getElementById("echart-cav"));
    const m2R2Data = [{
        value: 335,
        legendname: '葡萄',
        name: "葡萄  335",
        itemStyle: {
          color: "#8d7fec"
        }
      },
      {
        value: 310,
        legendname: '水稻',
        name: "水稻  310",
        itemStyle: {
          color: "#5085f2"
        }
      },
      {
        value: 234,
        legendname: '茶叶',
        name: "茶叶  234",
        itemStyle: {
          color: "#e75fc3"
        }
      },
      {
        value: 154,
        legendname: '米仁',
        name: "米仁  154",
        itemStyle: {
          color: "#f87be2"
        }
      },
      {
        value: 335,
        legendname: '杨梅',
        name: "杨梅  335",
        itemStyle: {
          color: "#f2719a"
        }
      },
      {
        value: 335,
        legendname: '樱桃',
        name: "樱桃  335",
        itemStyle: {
          color: "#fca4bb"
        }
      },
      {
        value: 335,
        legendname: '香菇',
        name: "香菇  335",
        itemStyle: {
          color: "#f59a8f"
        }
      },
      {
        value: 335,
        legendname: '布朗李',
        name: "布朗李  335",
        itemStyle: {
          color: "#fdb301"
        }
      },
    ]
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: function(parms) {
          var str =
            parms.marker + "" + parms.data.legendname + "</br>" +
            "数量：" + parms.data.value + "</br>";
          return str;
        }
      },
      legend: {
        orient: 'vertical',
        left: '70%',
        align: 'left',
        top: 'middle',
        textStyle: {
          color: '#ffffff'
        },
        height: 250
      },
      title: [{
        text: '总数',
        subtext: 2708 + '亩',
        textStyle: {
          fontSize: 18,
          color: "white"
        },
        subtextStyle: {
          fontSize: 18,
          color: 'white'
        },
        textAlign: "center",
        x: '34.5%',
        y: '33%',
      }],
      series: [{
        type: 'pie',
        center: ['35%', '50%'],
        radius: ['60%', '90%'],
        clockwise: false, //饼图的扇区是否是顺时针排布
        avoidLabelOverlap: false,
        label: {
            show: true,
            position: 'outter',
            formatter: function(parms) {
              return parms.data.legendname
            }
        },
        labelLine: {
          show: false,
            length: 5,
            length2: 3,
            smooth: false,
        },
        data: m2R2Data
      }],
    })
  }
  // 获取vuex
  const getShowTask = computed(() => {
    //返回的是ref对象
    return store.state.currentContent
  })
  // 监听状态
  watch(getShowTask, (newValue, oldValue) => {
    // upNewData()
    data.content = newValue;
    if( data.content == 2 ){
      setTimeout(() => {
      changeBar();
    }, 1000)
}
    if ( data.content == 3){
      setTimeout(() => {
      changePay();
    }, 1000)
    }
  });
  // 获取接口
  // const upNewData = ()=>{
  // 	require 
  // }
  // console.log(store)
</script>

<style lang="scss" scoped>

img{
  -webkit-user-drag: none;
}
  // 1
  .xiaosu-6 {
    position: relative;

    &:before {
      content: ' ';
      width: 3px;
      height: 22px;
      background-color: red;
      position: absolute;
      left: 0;
      top: 47%;
      transform: translateY(-50%);
    }
  }

  .xiaosu-7 {
    position: relative;

    &:before {
      content: ' ';
      width: 3px;
      height: 22px;
      background-color: red;
      position: absolute;
      left: 0;
      top: 67%;
      transform: translateY(-50%);
    }
  }

  .act {
    background-color: #281a1a;
    height: 100%;
  }

  .card {
    margin: 10px;
  }

  .activi {
    background-color: rgba(30, 42, 44, .6);
    height: 100%;
  }

  .btn-1 {
    border: 1px solid;
    border-radius: 5px;
    white-space: nowrap;
    background-color: #231616;
    color: white;
    padding: 3px 8px;
    border-color: red;
    cursor: pointer;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  [v-cloak] {
    display: none;
  }

  .pop-up {
    display: flex;
    flex-direction: column;
  }

  .mask {
    background-color: rgb(233, 16, 16);
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1
  }

  .pop {
    position: fixed;
    // background-color: rgba(0, 0, 0, 0.4);
    width: 80%;
    height: 85%;
    display: flex;
    left: 12%;
    top: 10%;
    bottom: 0;
    z-index: 90;
    margin-left: -20px;
    box-shadow: -20px 0 20px 0 rgb(0 0 0 / 10%);
    flex-direction: column;
    color: #fff;
  }

  .divv div:hover {
    background-color: #918A8A;
  }

  .card-content {
    color: white;
  }

  .displayflex {
    display: flex;
  }

  .displayflex-4 {
    display: flex;
  }

  .ul-li ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    padding-top: 10px;
  }

  .ul-li li {
    cursor: pointer;
    padding: 5px;
    text-align: center;
    font-weight: bold;

  }

  .ul-li li.left {
    border-radius: 2.5px 0 0 2.5px;
  }

  .ul-li li.right {
    border-radius: 0 2.5px 2.5px 0;
  }

  .ul-li li.active {
    background-color: #fdc612;
    color: black;
  }

  .dzz {
    width: 100%;
    display: flex;
    padding-top: 10px;
    justify-content: center;
    align-items: center;
  }

  .dzz_flex_box {
    display: flex;
    margin: 0 1% 0 1%;
    width: 48%;
    padding: 2% 0 2% 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(9, 14, 24, .34901960784313724);
  }

  .dzz ul li {
    list-style: none;
  }

  .dzz ul {
    padding-left: 20px;
    padding-right: 20px;
    margin: 0;
  }

  .tabs {
    padding-top: 10px;
    display: flex;
    width: 100%;

    li {
      width: 50%;
      border: 1px solid #fdc612;
    }

  }

  .img1 {
    width: 30px;
    height: 30px;
    padding-top: 6px;
  }

  .img2 {
    margin-left: 5px;
  }

  .img3 {
    width: 100%;
    height: 120px;
    cursor: pointer;
  }

  .my-table-1 {
    background-color: rgba(9, 14, 24, .34901960784313724);
    border-collapse: collapse;
    width: 100%;

    td {
      padding: 2px;
      border-bottom: silver 1px solid;
    }
  }

  .my-table-1 tr:hover {
    background-color: #918A8A;
  }

  .title2 {
    padding: 3px;
    background-color: rgba(9, 14, 24, .34901960784313724);
    border-bottom: silver 1px solid;
    display: flex;
    padding-top: 10px;
  }

  .contain {
    width: 100%;
  }

  .photo {
    float: left;
    width: 40%;
  }

  .conten {
    float: right;
    width: 40%;
    padding-left: 10px;
  }

  .boox {
    display: flex;
    padding-left: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .boxx {
    padding-left: 20px;
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
    height: 100px;
    overflow-y: scroll;
    background-color: rgba(9, 14, 24, .34901960784313724);
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: #99a9bf;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color: #d3dce6;
  }

  .boxx ul {
    padding-left: 30px;
  }

  .box {
    width: 40%;
    height: 50px;
    margin-left: 6px;
  }

  .textslv {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 210px;
  }

  .textslv1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 330px;
  }

  .big-box {
    display: flex;
    justify-content: space-between;
  }

  .small-box {
    display: flex;
    align-items: center;
  }

  .small-box p {
    font-size: 16px;
  }

  //         2样式
  .card-2 {
    margin: 10px;
  }

  .xiaosu-4 {
    position: relative;

    &:before {
      content: ' ';
      width: 3px;
      height: 22px;
      background-color: #349cab;
      position: absolute;
      left: 0;
      top: 47%;
      transform: translateY(-50%);
    }
  }

  .xiaosu-5 {
    position: relative;

    &:before {
      content: ' ';
      width: 3px;
      height: 22px;
      background-color: #349cab;
      position: absolute;
      left: 0;
      top: 47%;
      transform: translateY(-50%);
    }
  }

  .text-color {
    color: white;
  }

  .T-Bmargin-2 {
    padding-top: 10px;
    display: flex;
  }

  .population-card {
    display: flex;
    padding-top: 10px;
  }

  .population-header {
    display: flex;
    max-width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    margin: 10px;
    height: 50px;
  }

  .population-item {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  #oil-discount {
    width: 100%;
    height: 250px;
  }


  // 3样式
  .card-3 {
    margin: 10px;
  }

  .xiaosu-1 {
    padding-left: 10px;
    position: relative;

    &:before {
      content: ' ';
      width: 3px;
      height: 22px;
      background-color: #349cab;
      position: absolute;
      left: 0;
      top: 60%;
      transform: translateY(-50%);
    }
  }

  .xiaosu-2 {
    padding-left: 10px;
    position: relative;

    &:before {
      content: ' ';
      width: 3px;
      height: 22px;
      background-color: #349cab;
      position: absolute;
      left: 0;
      top: 31%;
      transform: translateY(-50%);
    }
  }

  .xiaosu-3 {
    padding-left: 10px;
    padding-bottom: 10px;
    padding-top: 5px;
    position: relative;

    &:before {
      content: ' ';
      width: 3px;
      height: 22px;
      background-color: #349cab;
      position: absolute;
      left: 0;
      top: 55%;
      transform: translateY(-50%);
    }
  }

  .text-color-3 {
    color: white;
  }

  .displayflex-3 {
    display: flex;
  }

  .textt {
    text-indent: 2em;
    font-size: 13px;
    padding-left: 10px;
  }

  .resource {
    margin: 4px;
  }

  .resource h5 {
    padding: 5px;
    margin: 0;
    color: #45efff;
  }

  .li-item {
    width: 70px;
    height: 55px;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: white 1px solid;
  }

  .box2 {
    width: 100%;
    font-size: 14px;
  }

  .box2 ul li {
    list-style: none;
    flex: 1;
  }

  .box2 li {
    padding: 0;
    margin-right: 5px;
  }

  .box2-ull {
    display: flex;
    padding-left: 15px;
    margin: 0;
    flex-direction: row;
  }



  .box2-ul {
    display: flex;
    padding-left: 15px;
    margin: 0;
    flex-direction: row;
    padding-top: 5px;
  }

  .li-1 {
    width: 90px;
  }

  .li-2 {
    width: 70.7px;
  }

  .T-margin {
    padding-top: 12px;
    display: flex;
  }

  #echart-cav {
    width: 100%;
    height: 150px;
    padding-bottom: 10px;
  }

  .qiang div:hover {
    background-color: #918A8A;
  }

  // 4样式
  .card-4 {
    margin: 10px;
  }

  .xiaosu {
    padding-top: 5px;
    position: relative;

    &:before {
      content: ' ';
      width: 3px;
      height: 22px;
      background-color: #349cab;
      position: absolute;
      left: 0;
      top: 60%;
      transform: translateY(-50%);
    }
  }

  .text-color-4 {
    color: white;
  }

  .btn {
    border: 1px solid;
    border-radius: 5px;
    white-space: nowrap;
    background-color: rgba(0, 0, 0, 0.4);
    // background-color: #349cab;
    color: white;
    padding: 3px 8px;
    border-color: #349cab;
    cursor: pointer;
  }

  .my-table {
    border-collapse: collapse;
    background-color: rgba(9, 14, 24, .34901960784313724);
    width: 101%;
  }

  .my-table tr:hover {
    background-color: #918A8A;
  }

  .my-table td {
    padding: 2px;
    text-align: center;
  }

  .T-Bmargin {
    padding-top: 20px;
    padding-bottom: 10px;
  }

  .B-margin {
    padding-top: 15px;
  }

  .integral {
    display: flex;
  }

  .integral ul li {
    list-style: none;
    margin: 0;
  }

  .integral-1 {
    width: 90%;
    background-color: rgba(9, 14, 24, .34901960784313724);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .integral-2 ul {
    width: 100%;
    padding: 20px;
    margin: 0;
    padding-top: 0;
    padding-bottom: 5px;
    display: flex;
  }

  .integral-3 {
    padding-left: 15px;
    background-color: rgba(9, 14, 24, .34901960784313724);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .resource1 {
    margin: 4px;
    color: #45efff;
  }

  .resource1 h5 {
    padding: 5px;
    margin: 0;
  }
</style>