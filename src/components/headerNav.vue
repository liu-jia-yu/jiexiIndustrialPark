<template>
  <div>
    <div v-if="data.content == '1'">
      <!-- logo -->
      <div class="logo">
        <img src="../assets/logo/bigtitle.png" />
      </div>
    </div>
    <div v-if="data.content == '2'">
      <div class="logo">
        <img src="/src/assets/logo/bigtitle2.546fcb82.png" />
      </div>
    </div>
    <div v-if="data.content == '3'">
      <div class="logo">
        <img src="/src/assets/logo/bigtitle3.3216bb12.png" />
      </div>
    </div>
    <div v-if="data.content == '4'">
      <div class="logo">
        <img src="/src/assets/logo/bigtitle4.8bc8c83e.png" />
      </div>
    </div>
    <!-- 选项 -->
    <div class="navlist">
      <div><a :style="{color: data.content == '1'  ? 'gold' : '#FFFFFF'}" :class="data.content == '1' ? 'activite':''"
          @click="setContent('1')" href="javascript:void(0)" class="active">红色党建</a></div>
      <div><a :style="{color: data.content === '2' ? '#45efff' : '#FFFFFF'}"
          :class="data.content === '2' ? 'activit':''" @click="setContent('2')" href="javascript:void(0)">网格治理</a>
      </div>
      <div><a :style="{color: data.content === '3' ? '#45efff' : '#FFFFFF'}"
          :class="data.content === '3' ? 'activit':''" @click="setContent('3')" href="javascript:void(0)">强村发展</a>
      </div>
      <div><a :style="{color: data.content === '4' ? '#45efff' : '#FFFFFF'}"
          :class="data.content === '4' ? 'activit':''" @click="setContent('4')" href="javascript:void(0)">暖心服务</a>
      </div>
    </div>
  </div>
</template>
<script setup>
  // 引入vuex
  import {
    useStore,
    mapState
  } from 'vuex'
  // 引入生命周期
  import {
    reactive,
    watch,
    computed,
    onMounted
  } from 'vue'
  // 储存vuex
  const store = useStore()
  // 响应式数据
  const data = reactive({
    content: '',
    selectedTab: "option1",
    selectedIndex: -1
  })
  // 加载监听器
  onMounted(() => {
    setContent('1')
  });
  const emit = defineEmits(["hiddenInvertClassification","hiddenPopup"]);
  // 更新选项
  const setContent = (e) => {
    let content = {
      a: e,
      b: 'Contentb',
    }
    emit("hiddenPopup")
    switch (e) {
      case '1': {
        console.log("红色党建页")
        emit('hiddenInvertClassification')
        break;
      }
      case '2': {
        console.log("网格治理页")
        emit('hiddenInvertClassification')
        break;
      }
      case '3': {
        console.log("强村发展页")
        emit('hiddenInvertClassification')
        break;
      }
      case '4': {
        console.log("暖心服务页")
        emit('hiddenInvertClassification')
        break;
      }
    }
    store.commit('updateContent', e)
  }
  // 获取vuex
  const getShowTask = computed(() => {
    //返回的是ref对象
    return store.state.currentContent
  })
  // 监听
  watch(getShowTask, (newValue, oldValue) => {
    // upNewData()
    data.content = newValue
  });
</script>
<style lang="scss" scoped>
  .logo img {
    height: 8vh;
    width: 65vw;
    background: rgba(255, 255, 255, 0.1);
    opacity: 1;
  }

  .navlist {
    display: flex;
    position: absolute;
    top: 3vh;
    left: 37vw;

  }

  .navlist div {
    margin: 0 20px;
    font-size: 20px;
    cursor: pointer;
  }

  .navlist a {
    text-decoration: none;
    color: white;
  }

  .activite {
    position: relative;
  }

  .activite::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: gold;
  }

  .activit {
    position: relative;
  }

  .activit::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #45efff;
  }
</style>