<template>
  <div class="app">

    <div class="container">
      <div class="column" v-for="(item,index) in historyList">
        <div class="item">
          <div  v-if="index&1" class="content">
            <img :src=item.picture class="picture"/>
            <div class="right">
              <div class="title">{{item.title}}</div>
              <div class="date">{{item.date}}</div>
            </div>
          </div>
        </div>
        <div class="timeLine"></div>
        <div class="item">
          <div  v-if="!(index&1)" class="content">
            <img :src=item.picture class="picture"/>
            <div class="right">
              <div class="title">{{item.title}}</div>
              <div class="date">{{item.date}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
class History {
  title?: string;
  date?: string;
  picture?:string;
}
const historyList=ref(<History[]>[])
onMounted(()=>{
  historyList.value=[
    {
      title:"2013年9月筹建，由广东省城乡规划设计研究院规划设计，计划总投资100亿元",
      date:"2013-9-1",
      picture:"/img/historyP1.jpg"
    },
    {
      title:"2015年9月被省认定为依托揭阳产业转移园产业发展集聚地",
      date:"2015-9-1",
      picture:"/img/historyP2.jpg"
    },
    {
      title:"2018年3月作为揭阳产业转移园南片区纳入国家《中国开发区审核公告目录》",
      date:"2018-3-1",
      picture:"/img/historyP3.jpg"
    }   , {
      title:"2013年9月筹建，由广东省城乡规划设计研究院规划设计，计划总投资100亿元",
      date:"2013-9-1",
      picture:"/img/historyP1.jpg"
    },
    {
      title:"2015年9月被省认定为依托揭阳产业转移园产业发展集聚地",
      date:"2015-9-1",
      picture:"/img/historyP2.jpg"
    },
    {
      title:"2018年3月作为揭阳产业转移园南片区纳入国家《中国开发区审核公告目录》",
      date:"2018-3-1",
      picture:"/img/historyP3.jpg"
    }
  ]
})
</script>

<style scoped lang="scss">
img {
  -webkit-user-drag: none;
}
.app {
  position: relative;
  //display: block;
  font-size: 0.15rem;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .container {
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column-reverse;
    //background: #00bbcc;
    .column {
      display: flex;
      align-items: center;
      flex: 1;

      .timeLine {
        width: 0.1rem;
        background: #7cb900;
        height: 4rem;
      }
      .item {
        flex: 1;
        .content{
          border-radius: 10px;
          margin: 0 10px;
          padding: 10px;
          height: 4rem;
          background: rgb(255 255 255 / 80%);

          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          .picture{
            height: 100%;
            width: 100%;
            border-radius: 5px;
            background: #01d5d9;
            flex:3;
            .img{
              height: 100px;
              width: 100px;
            }
          }
          .right{
            margin: 0.1rem;
            font-size: 0.12rem;
            flex:2;
            display: flex;
            flex-direction: column;
            .title{
              color: #040131;
              text-indent:0.3rem;
              flex: 5;
              word-wrap:  break-word;
              word-break:  normal;
            }
            .date{
              color: #014d83;
              flex:1;
            }
          }
        }
        .content:hover{
          margin: 0;
          background: rgba(212, 236, 176, 0.8);
        }
      }
    }
  }
}
</style>
