<template>
  <!-- <div>{{ data.content }}</div> -->
  <!-- 红色党建内容 -->
  <div v-if="data.content == '1'">
    <!-- 村庄选择 -->
    <div class="select-wrapper">
    <select v-model="data.selectedOption" class="select" >
      <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
    </select>
    <span v-if="!data.selectedOption" class="placeholder">请选择</span>
  </div>

  </div>
  <!-- 网格治理内容 -->
  <div v-if="data.content == '2'">
    <!-- 村庄选择 -->
    <div class="select-wrapper">
    <select v-model="data.selectedOption" class="select" >
      <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
    </select>
    <span v-if="!data.selectedOption" class="placeholder">请选择</span>
  </div>
  </div>
  <!-- 强村发展内容 -->
  <div v-if="data.content == '3'">
    <!-- 村庄选择 -->
    <div class="select-wrapper">
    <select v-model="data.selectedOption" class="select" >
      <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
    </select>
    <span v-if="!data.selectedOption" class="placeholder">请选择</span>
  </div>
  </div>
  <!-- 暖心服务 -->
  <div v-if="data.content == '4'">
    <!-- 村庄选择 -->
    <div class="select-wrapper">
    <select v-model="data.selectedOption" class="select" >
      <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
    </select>
    <span v-if="!data.selectedOption" class="placeholder">请选择</span>
  </div>
  </div>
</template>

<script setup>
  // 引入vuex
  import {
    useStore
  } from 'vuex'
  // 引入生命周期
  import {
    reactive,
    watch,
    computed
  } from 'vue'
  // 储存vuex
  const store = useStore()
  // 响应式数据
  const data = reactive({
    content: '',
    selectedOption: null,
    selsct :'请选择',
  })
  // 村庄选择数据
  const options = [
        { label: '广州', value: 'option1' },
        { label: '上海', value: 'option2' },
        { label: '北京', value: 'option3' },
      ]
  // 获取vuex
  const getShowTask = computed(() => {
    //返回的是ref对象
    return store.state.currentContent
  })
  // 监听
  watch(getShowTask, (newValue, oldValue) => {
    data.content = newValue
  });
  // console.log(store)
</script>

<style lang="scss" scoped>
.select-wrapper {
  position: relative;
  width: 120px;
}

.select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #CCC;
  border-radius: 5px;
  background-color: #FFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.select::-ms-expand {
  display: none;
}

.select option {
  font-size: 16px;
}

.select:active,
.select:focus {
  outline: none;
  border-color: #0078e7;
}

.select-wrapper::after {
  content: "\25BC";
  font-size: 14px;
  color: #555;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
}
.placeholder {
  padding-left: 10px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: black;
  pointer-events: none;
}
</style>