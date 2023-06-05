<template>
<div class="appContainer">
  <div class="item" v-for="(item,index) in peopleList">
    <div class="job">
      <div class="text">{{item.job}}</div>
      <div class="deleteButton" @click="deleteJob(item,index)"><el-icon><Close /></el-icon></div>
    </div>
    <div class="names">
      <div v-for="(name,indexN) in item.names" class="name">
        <div class="text">{{name}}</div>
        <div class="deleteButton" @click="deleteName(item,indexN)"><el-icon><Close /></el-icon></div>
      </div>
      <div  class="add">
        <input placeholder="请输入姓名" v-model="inputValue" class="input"  v-on:keyup.enter="addName(item)">
        <div class="plus" @click="addName(item)"><el-icon><Plus /></el-icon></div>
      </div>
    </div>
  </div>
  <div class="footer">
    <input placeholder="请输入工作类型" v-model="inputValue" class="input"  v-on:keyup.enter="addJob">
    <button class="jobAdd" type=button @click="addJob"><el-icon><Plus /></el-icon></button>
  </div>

</div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps({
  value: {
    type: String,
    default: '[]'
  }
})
class people{
  job?:string;
  names?:string[]
}
const peopleList=ref(<people[]>JSON.parse(props.value))
const inputValue=ref(<string>"");
watch(() => props.value, (v) => valueChange(v))

function valueChange(v) {
  if (v){
    peopleList.value=JSON.parse(v)
  }else {
    peopleList.value=[]
  }
}

function addJob() {
  if (inputValue.value!==""){
    peopleList.value.push({job:inputValue.value,names:[]})
    inputValue.value=""
    listChange()
  }
}

function addName(item) {
  if (inputValue.value!==""){
    item.names.push(inputValue.value)
    inputValue.value=""
    listChange()
  }
}

function deleteJob(item,index) {
  peopleList.value.splice(index,1);
  listChange()
}
function deleteName(item,index) {
  item.names.splice(index,1);
  listChange()
}


const emit = defineEmits();
function listChange() {
  emit('update:value', JSON.stringify(peopleList.value))
}

</script>

<style lang="scss" scoped>
.appContainer{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .item{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .job{
      flex: 1;
      display: flex;
      flex-direction: row;
      .text{
        margin-left: .4rem;
        padding:.5rem;
        color: white;
        border-radius: .8rem;
        background: #6d9873;
      }
      .deleteButton{
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 5px solid transparent;
        background-color: #04aae0;
        border-radius: 1.25em;
        cursor: pointer;
        z-index: 2;
        right: -10px;
        font-size: 10px;
        color: black;
        display: none;
      }
    }
    .job:hover {
      .text{
        background: #124d3d;
      }
      .deleteButton{
        display: block;
      }
    }
    .names{
      flex: 1;
      display: flex;
      flex-direction: row;
      .name{
        position: relative;
        display: flex;
        flex-direction: row;
        font-size: 0.8em;
        margin: 5px 5px 5px 2px;
        padding:0 5px 0 5px;
        .text{
          border-radius: 1.25em;
          font-weight: 1000;
          font-size: 12px;
          padding:0 5px;
          color: #212121;

          background: #b1dae7;
          line-height: 3rem;
        }
        .deleteButton{
          flex-direction: column;
          margin-top: .2rem;
          justify-content: center;
          align-items: center;
          border: 5px solid transparent;
          background-color: #04aae0;
          border-radius: 1.25em;
          cursor: pointer;
          z-index: 2;
          right: -15px;
          position: absolute;
          font-size: 10px;
          color: black;
          display: none;
        }
      }
      .name:hover {
        .text{
          background: #65b5fa;
        }
        .deleteButton{
          display: block;
        }
      }
      .add{
        position: relative;
        display: flex;
        flex-direction: row;
        font-size: 0.8em;
        margin: 5px 5px 5px 0;
        padding:0 5px 0 5px;
        .plus{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: .1rem;
          width: 2rem;
          border: 5px solid transparent;
          background-color: #b1dae7;
          border-radius: 1.25em;
          transition: all 0.2s linear;
          cursor: pointer;
        }
        .input{
          font-size: 100%;
          padding: 0.8em;
          outline: none;
          border: 2px solid rgb(200, 200, 200);
          background-color: transparent;
          border-radius: 20px;
          width: 100%;
          display: none;
        }
        .input:focus{
          display: block;
        }
      }
      .add:hover{
        .input{
          display: block;
        }
      }
    }
    .deleteButton{
      flex:1;
    }
  }
  .footer{
    position: relative;
    display: flex;
    flex-direction: row;
    .jobAdd{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: .3rem;
      width: 2.5rem;
      border: 5px solid transparent;
      background-color: #b1dae7;
      border-radius: 1em;
      transition: all 0.2s linear;
      cursor: pointer;
    }
    .jobAdd:hover{
      background: #74d3e0;
    }
    .input{
      font-size: 100%;
      padding: 0.8em;
      outline: none;
      border: 2px solid rgb(200, 200, 200);
      background-color: transparent;
      border-radius: 20px;
      width: 100%;
      display: none;
    }
    .input:focus{
      display: block;
    }
  }
  .footer:hover{
    .input{
      display: block;
    }
  }
}
</style>
