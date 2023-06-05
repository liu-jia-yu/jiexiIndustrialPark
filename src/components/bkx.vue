<template>
  <div class="bkx">

    <span  :style="{'backgroundColor' : data.content == '1' ? '#500d0d':'#349cab'}"
	 class="tips" :class="data.content == '1' ? 'tipsH':''"></span>
    <span class="tips1" :class="data.content == '1' ? 'tipsH':''"></span>
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
		content : 1,
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
</script>

<style lang="scss" scoped>
  .bkx {
    position: absolute;
    right: -0.1vw;
    top: -2.2vh;
    width: 100%;

  }

  // 1
  .tips {
    display: inline-block;
    width: 100%;
    height: 0.5px;
    background-color: #349cab;
    position: relative;
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
    background-color: #45efff;
  }

  .tips:before {
    content: "";
    position: absolute;
    width: 16px;
    height: 3px;
    border-radius: 2px;
    background-color: #45efff;
  }

  // 2
  .tips1 {
    top: -13px;
    display: inline-block;
    width: 100%;
    background-color: #349cab;
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
    background-color: #45efff;
  }

  .tips1:before {
    content: "";
    position: absolute;
    width: 16px;
    height: 3px;
    border-radius: 2px;
    background-color: #45efff;
  }
  
  // 类型1
  .tipsH{
      background-color: #fdc612;
    }
  
    .tipsH:after {
      background-color: #fdc612;
    }
    .tipsH:before {
      background-color: #fdc612;
    }
</style>