<template>
  <div id="main1"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {onBeforeUnmount, onMounted} from "vue";

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
    TooltipComponentOption | LegendComponentOption | PieSeriesOption
    >;
const app: any = {};
var myChart;
function initChart(chartDom) {
  echarts.dispose(chartDom)
  if (!chartDom.clientWidth||!chartDom.clientHeight)
    return
  myChart = echarts.init(chartDom);
  let option = {
    title: {
      textStyle: {
        fontSize:fontSize(16),
        color: '#00bbcc'
      },
      text: '各类企业面积占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}亩 ({d}%)'
    },
    legend: {
      bottom: 10,
      left: 'center',
      textStyle: {
        fontSize:fontSize(12),
        color: '#ffffff'
      },
      data: [
        '民营',
        '私营',
        '三资',
        '国营',
        '电线电缆',
        '生物制药',
        '高端装备制造',
        '新能源',
        '高新制造',
      ]
    },
    series: [
      {
        name: '面积占比',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        label: {
          position: 'inner',
          color: '#ffffff',
          fontSize: fontSize(14)
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1548, name: '三资' },
          { value: 775, name: '民营' },
          { value: 679, name: '私营'},
          { value: 679, name: '国营', selected: true }
        ]
      },
      {
        name: '面积占比',
        type: 'pie',
        radius: ['45%', '60%'],
        labelLine: {
          length: 30
        },
        label: {
          position: 'inner',
          color: '#ffffff',
          fontSize: fontSize(14)
        },
        selectedMode: 'single',
        data: [
          { value: 255, name: '电线电缆'},
          { value: 335, name: '生物制药' },
          { value: 310, name: '高端装备制造'},
          { value: 255, name: '其他'},
          { value: 480, name: '新能源' },
          { value: 506, name: '高新制造', selected: true },

        ]
      }
    ]
  };

  option && myChart.setOption(option);
}

function fontSize(res){
  const clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
  if (!clientWidth) return;
  let fontSize = clientWidth / 1920;
  return res*fontSize;
}
onBeforeUnmount(()=>{
  myChart&&(myChart=null)
})
onMounted(() => {
  const chartDom = document.getElementById('main1')!;
  initChart(chartDom);
  const resizeObserver = new ResizeObserver(() => {
    initChart(chartDom);
  });
  resizeObserver.observe(chartDom);
})

</script>

<style scoped>
#main1 {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
