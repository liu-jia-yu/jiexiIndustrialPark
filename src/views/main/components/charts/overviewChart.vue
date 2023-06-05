<template>
  <div id="main"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import {
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {onBeforeUnmount, onMounted} from "vue";

echarts.use([
    TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<| ToolboxComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    | BarSeriesOption
    | LineSeriesOption>;
const app: any = {};
var myChart;
function initChart(chartDom) {
  echarts.dispose(chartDom)
  if (!chartDom.clientWidth||!chartDom.clientHeight)
    return
  myChart = echarts.init(chartDom);
  let option = {
    title: {
      text: '产业园规划面积进度',
      textStyle: {
        fontSize:fontSize(16),
        color: '#00bbcc'
      },
      left: 'center'
    },
    textStyle: {
      fontSize:fontSize(12),
      color: '#ffffff'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    // toolbox: {
    //   color: '#ffffff',
    //   feature: {
    //     // dataView: { show: true, readOnly: false },
    //     magicType: {show: true, type: ['line', 'bar']},
    //     restore: {show: true},
    //     // saveAsImage: { show: true }
    //   }
    // },
    legend: {
      bottom: 10,
      textStyle: {
        fontSize:fontSize(12),
        color: '#ffffff'
      },
      data: ['实际', '计划', '完成率']
    },
    xAxis: [
      {
        type: 'category',
        data: ['一季度', '二季度', '三季度', '四季度'],
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          fontSize:fontSize(12)
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '面积(亩)',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          fontSize:fontSize(12),
          formatter: '{value} 亩'
        }
      },
      {
        type: 'value',
        name: '完成率(%)',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          fontSize:fontSize(12),
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '实际',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + ' 亩';
          }
        },
        data: [
          2.0, 4.9, 7.0, 23.2
        ]
      },
      {
        name: '计划',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + ' 亩';
          }
        },
        data: [
          2.6, 5.9, 9.0, 26.4
        ]
      },
      {
        name: '完成率',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + ' %';
          }
        },
        data: [70, 80, 85, 90]
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
  const chartDom = document.getElementById('main')!;
  initChart(chartDom);
  const resizeObserver = new ResizeObserver(() => {
    initChart(chartDom);
  });
  resizeObserver.observe(chartDom);
})

</script>

<style scoped>
#main {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
