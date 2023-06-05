<template>
  <div v-if="data.content == '1'">
    <div class="box1" :class="'ctivit'">
      <span
        style="
          width: 60px;
          background-color: gold;
          border-radius: 5px;
          padding: 2px;
          color: black;
        "
        >红色基因</span
      >
      <ul style="display: flex; list-style: none; padding: 10px">
        <li
          class="boxone"
          :class="{ boxColorred: data.handarr[0] == 1 }"
          @click="handleClick(0)"
        >
          <img src="/src/assets/icons/flag.png" class="img1" />
          <span>红色故事</span>
        </li>

        <li
          class="boxone"
          :class="{ boxColorred: data.handarr[1] == 1 }"
          @click="handleClick(1)"
        >
          <img src="/src/assets/icons/footprint.png" class="img1" />
          <span>红色足迹</span>
        </li>
        <li
          class="boxone"
          :class="{ boxColorred: data.handarr[2] == 1 }"
          @click="handleClick(2)"
        >
          <img src="/src/assets/icons/staff member.png" class="img1" />
          <span>红色人员</span>
        </li>
        <li
          class="boxone"
          :class="{ boxColorred: data.handarr[3] == 1 }"
          @click="handleClick(3)"
        >
          <img src="/src/assets/icons/organization.png" class="img1" />
          <span>基层党组织</span>
        </li>
        <li
          class="boxone"
          :class="{ boxColorred: data.handarr[4] == 1 }"
          @click="handleClick(4)"
        >
          <img src="/src/assets/icons/Key personnel.png" class="img1" />
          <!-- <img src="/src/assets/icons/Key personnel.png"  v-if="data.handarr[4] == 0" class="img1" />
		  <img src="/src/assets/icons/Key personnel.png" v-if="data.handarr[4] == 1" class="img1" /> -->
          <span>基层党员</span>
        </li>
      </ul>
    </div>
  </div>
  <!-- 网格治理内容 -->
  <div v-if="data.content == '2'">
    <div class="ul2">
      <div :class="'ctivit-1'" class="bgtm">
        <span
          style="
            width: 60px;
            background-color: #45efff;
            border-radius: 5px;
            padding: 2px;
            color: black;
          "
          >网格管理</span
        >
        <ul style="display: flex">
          <li
            class="lattice"
            @click="handleClick(0)"
            :class="{ boxColorblue: data.handarr[0] == 1 }"
          >
            <img src="/src/assets/icons/book.png" class="img1" />
            <span>党建统领</span>
          </li>
          <li
            class="lattice1"
            @click="handleClick(1)"
            :class="{ boxColorblue: data.handarr[1] == 1 }"
          >
            <img src="/src/assets/icons/grid.png" class="img1" />
            <span>微网格</span>
          </li>
        </ul>
      </div>
      <div :class="'ctivit-1'" class="bgtm">
        <span
          style="
            width: 60px;
            background-color: #45efff;
            border-radius: 5px;
            padding: 2px;
            color: black;
          "
          >重点人员</span
        >
        <ul style="display: flex">
          <li
            class="lattice"
            @click="radioClick(1)"
            :class="{ boxColorblue: data.radioNumber == 1 }"
          >
            <img src="/src/assets/icons/staff member.png" class="img1" />
            <span>重点监管</span>
          </li>
          <li
            class="lattice1"
            @click="radioClick(2)"
            :class="{ boxColorblue: data.radioNumber == 2 }"
          >
            <img
              src="/src/assets/icons/Subsistence allowance.png"
              class="img1"
            />
            <span>低保</span>
          </li>
          <li
            class="lattice1"
            @click="radioClick(3)"
            :class="{ boxColorblue: data.radioNumber == 3 }"
          >
            <img src="/src/assets/icons/deformed man.png" class="img1" />
            <span>残疾</span>
          </li>
          <li
            class="lattice1"
            @click="radioClick(4)"
            :class="{ boxColorblue: data.radioNumber == 4 }"
          >
            <img src="/src/assets/icons/baby.png" class="img1" />
            <span>留守儿童</span>
          </li>
          <li
            class="lattice1"
            @click="radioClick(5)"
            :class="{ boxColorblue: data.radioNumber == 5 }"
          >
            <img src="/src/assets/icons/the old.png" class="img1" />
            <span>独居老人</span>
          </li>
          <li
            class="lattice1"
            @click="radioClick(6)"
            :class="{ boxColorblue: data.radioNumber == 6 }"
          >
            <img src="/src/assets/icons/project.png" class="img1" />
            <span>其他</span>
          </li>
        </ul>
      </div>
      <div :class="'ctivit-1'" class="bgtm">
        <span
          style="
            width: 60px;
            background-color: #45efff;
            border-radius: 5px;
            padding: 2px;
            color: black;
          "
          >房屋管理</span
        >
        <ul style="display: flex">
          <li
            class="lattice"
            @click="radioClick2(1)"
            :class="{ boxColorblue: data.radioNumber2 == 1 }"
          >
            <img src="/src/assets/icons/agritainment.png" class="img1" />
            <span>所有房屋</span>
          </li>
          <li
            class="lattice1"
            @click="radioClick2(2)"
            :class="{ boxColorblue: data.radioNumber2 == 2 }"
          >
            <img src="/src/assets/icons/agritainment.png" class="img1" />
            <span>出租房屋</span>
          </li>
        </ul>
      </div>
      <div :class="'ctivit-1'" class="bgtm">
        <span
          style="
            width: 60px;
            background-color: #45efff;
            border-radius: 5px;
            padding: 2px;
            color: black;
          "
          >重点场所</span
        >
        <ul style="display: flex">
          <li
            class="lattice"
            @click="handleClick(3)"
            :class="{ boxColorblue: data.handarr[3] == 1 }"
          >
            <img src="/src/assets/icons/agritainment.png" class="img1" />
            <span>重点场所</span>
          </li>
        </ul>
      </div>
      <div :class="'ctivit-1'" class="bgtm">
        <span
          style="
            width: 60px;
            background-color: #45efff;
            border-radius: 5px;
            padding: 2px;
            color: black;
          "
          >物联设备</span
        >
        <ul style="display: flex">
          <li
            class="lattice"
            @click="handleClick(4)"
            :class="{ boxColorblue: data.handarr[4] == 1 }"
          >
            <img src="/src/assets/icons/monitor.png" class="img1" />
            <span>监控</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 强村发展内容 -->
  <div v-if="data.content == '3'">
    <div class="ul3">
      <div :class="'ctivit-2'" class="bgtm-1">
        <span
          style="
            width: 60px;
            background-color: #45efff;
            border-radius: 5px;
            padding: 2px;
            color: black;
          "
          >村庄资源</span
        >
        <ul style="display: flex">
          <li
            class="lattice2"
            @click="handleClick(0)"
            :class="{ boxColorblue: data.handarr[0] == 1 }"
          >
            <img src="/src/assets/icons/agritainment.png" class="img1" />
            <span>宅基地</span>
          </li>
          <li
            class="lattice3"
            @click="handleClick(1)"
            :class="{ boxColorblue: data.handarr[1] == 1 }"
          >
            <img src="/src/assets/icons/WATER SYSTEM.png" class="img1" />
            <span>水系</span>
          </li>
          <li
            class="lattice3"
            @click="handleClick(2)"
            :class="{ boxColorblue: data.handarr[2] == 1 }"
          >
            <img src="/src/assets/icons/scenic spot.png" class="img1" />
            <span>农田</span>
          </li>
          <li
            class="lattice3"
            @click="handleClick(3)"
            :class="{ boxColorblue: data.handarr[3] == 1 }"
          >
            <img src="/src/assets/icons/road.png" class="img1" />
            <span>道路</span>
          </li>
        </ul>
      </div>
      <div :class="'ctivit-2'" class="bgtm-1">
        <span
          style="
            width: 60px;
            background-color: #45efff;
            border-radius: 5px;
            padding: 2px;
            color: black;
          "
          >产业种植</span
        >
        <ul style="display: flex">
          <li
            class="lattice2"
            @click="radioClick(1)"
            :class="{ boxColorblue: data.radioNumber == 1 }"
          >
            <img src="/src/assets/icons/grape.png" class="img1" />
            <span>葡萄</span>
          </li>
          <li
            class="lattice3"
            @click="radioClick(2)"
            :class="{ boxColorblue: data.radioNumber == 2 }"
          >
            <img src="/src/assets/icons/rice.png" class="img1" />
            <span>水稻</span>
          </li>
          <li
            class="lattice3"
            @click="radioClick(3)"
            :class="{ boxColorblue: data.radioNumber == 3 }"
          >
            <img src="/src/assets/icons/tea.png" class="img1" />
            <span>茶叶</span>
          </li>
          <li
            class="lattice3"
            @click="radioClick(4)"
            :class="{ boxColorblue: data.radioNumber == 4 }"
          >
            <img src="/src/assets/icons/project.png" class="img1" />
            <span>更多</span>
          </li>
        </ul>
      </div>
      <div :class="'ctivit-2'" class="bgtm-1">
        <span
          style="
            width: 60px;
            background-color: #45efff;
            border-radius: 5px;
            padding: 2px;
            color: black;
          "
          >其它</span
        >
        <ul style="display: flex">
          <li
            class="lattice2"
            @click="handleClick(4)"
            :class="{ boxColorblue: data.handarr[4] == 1 }"
          >
            <img src="/src/assets/icons/scenic spot.png" class="img1" />
            <span>景点</span>
          </li>
          <li
            class="lattice3"
            @click="handleClick(5)"
            :class="{ boxColorblue: data.handarr[5] == 1 }"
          >
            <img src="/src/assets/icons/agritainment.png" class="img1" />
            <span>农家乐</span>
          </li>
          <li
            class="lattice3"
            @click="handleClick(6)"
            :class="{ boxColorblue: data.handarr[6] == 1 }"
          >
            <img src="/src/assets/icons/enterprise.png" class="img1" />
            <span>企业</span>
          </li>
          <li
            class="lattice3"
            @click="handleClick(7)"
            :class="{ boxColorblue: data.handarr[7] == 1 }"
          >
            <img src="/src/assets/icons/shops.png" class="img1" />
            <span>商铺</span>
          </li>
          <li
            class="lattice3"
            @click="handleClick(8)"
            :class="{ boxColorblue: data.handarr[8] == 1 }"
          >
            <img src="/src/assets/icons/project.png" class="img1" />
            <span>项目建设</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 暖心服务 -->
  <div v-if="data.content == '4'">
    <div class="ul4 bgtm-2" :class="'ctivit-3'">
      <span
        style="
          width: 60px;
          background-color: #45efff;
          border-radius: 5px;
          padding: 2px;
          color: black;
        "
        >帮扶对象</span
      >
      <ul style="display: flex">
        <li
          class="lattice-3"
          @click="radioClick(1)"
          :class="{ boxColorblue: data.radioNumber == 1 }"
        >
          <img src="/src/assets/icons/agritainment.png" class="img1" />
          <span>宅基地</span>
        </li>
        <li
          class="lattice4"
          @click="radioClick(2)"
          :class="{ boxColorblue: data.radioNumber == 2 }"
        >
          <img src="/src/assets/icons/WATER SYSTEM.png" class="img1" />
          <span>水系</span>
        </li>
        <li
          class="lattice4"
          @click="radioClick(3)"
          :class="{ boxColorblue: data.radioNumber == 3 }"
        >
          <img src="/src/assets/icons/scenic spot.png" class="img1" />
          <span>农田</span>
        </li>
        <li
          class="lattice4"
          @click="radioClick(4)"
          :class="{ boxColorblue: data.radioNumber == 4 }"
        >
          <img src="/src/assets/icons/road.png" class="img1" />
          <span>道路</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { reactive, watch, computed } from "vue";
const store = useStore();
// 定义数据data
const data = reactive({
  content: "",
  handarr: [0, 0, 0, 0, 0, 0, 0, 0,0],
  showNumber: 0,
  radioNumber: 0,
  radioNumber2: 0,
});
const emit = defineEmits(["showAllHouse","showRedStory"]);
// 这里是点击盒子控制right显示隐藏方法
const handleClick = (e) => {
  //判断是点击哪个页面的的哪个按钮
  if (store.state.currentContent == 1){
    switch (e){
      //红色故事按钮
      case 0:
      {
        emit('showRedStory')
        break;
      }
        //红色足迹按钮
      case 1:{
        break;
      }
        //红色人员按钮
      case 2:{
        break;
      }
        //基层党组织按钮
      case 3:{
        break;
      }
        //基层党员按钮
      case 4:{
        break;
      }
    }
  }

  console.log(data.handarr[e])
  // 设置选中的盒子的状态，并触发isBShow的变化
  if (data.handarr[e] == 0) {
    data.handarr[e] = 1;
  } else {
    data.handarr[e] = 0;
  }
  data.showNumber = 0;
  let a;
  let b;
  for (a = 0; a < data.handarr.length; a++) {
    data.showNumber += data.handarr[a];
  }
  if (data.radioNumber > 0) {
    data.showNumber = data.showNumber + 1;
  }
  if (data.radioNumber2 > 0) {
    data.showNumber = data.showNumber + 1;
  }
  store.commit("setIsBShow", data.showNumber);
};

// 单选多选
const radioClick = (e) => {
  if (data.radioNumber != e) {
    data.radioNumber = e;
  } else {
    data.radioNumber = 0;
  }
  handleClick();
};

const radioClick2 = (e) => {
  if (e === 1) {
    emit('showAllHouse')
  }
  else if (e === 2 && data.radioNumber2 === 1) {
      emit('showAllHouse')
  }
  if (data.radioNumber2 !== e) {
    data.radioNumber2 = e;
  } else {
    data.radioNumber2 = 0;
  }
  handleClick();
};
const getShowTask = computed(() => {
  //返回的是ref对象
  return store.state.currentContent;
});
watch(getShowTask, (newValue, oldValue) => {
  data.content = newValue;
  data.handarr = [0, 0, 0, 0, 0, 0, 0, 0,0];
  data.radioNumber = 0;
  data.radioNumber2 = 0;
  store.commit("setIsBShow", 0);
});
</script>
<style lang="scss" scoped>
ul li {
  list-style: none;
}

.ul2 {
  display: flex;
  color: white;
}

.ul2 ul {
  padding: 0;
}

.ul3 {
  display: flex;
  color: white;
}

.ul3 ul {
  padding: 0;
}

.box1 {
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  width: 50%;
}

.box1 ul {
  padding: 0;
}

.box1 li {
  margin: 5px;
  border: white 1px solid;
  height: 70px;
  width: 100px;
}

.img1 {
  width: 30px;
  height: 30px;
  padding-top: 6px;
}

.boxone {
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.boxColorred {
  color: #fdc612;
  border: #fdc612 1px solid !important;
}
.boxColorblue {
  color: #45efff;
  border: #45efff 1px solid !important;
}

.lattice {
  user-select: none;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: white 1px solid;
  margin-right: 5px;
}

.lattice1 {
  user-select: none;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: white 1px solid;
  margin-right: 5px;
}

.lattice2 {
  user-select: none;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: white 1px solid;
  margin-right: 5px;
}

.lattice3 {
  user-select: none;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: white 1px solid;
  margin-right: 5px;
}

.lattice-3 {
  user-select: none;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: white 1px solid;
  margin-right: 5px;
}

.lattice4 {
  user-select: none;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: white 1px solid;
  margin-right: 5px;
}

.ul4 {
  color: white;
}

.ctivit {
  position: relative;
}

.ctivit::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: gold;
}

.ctivit-1 {
  position: relative;
}

.ctivit-1::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  width: 97%;
  height: 2px;
  background-color: #45efff;
}

.bgtm {
  background-color: rgba(0, 0, 0, 0.4);
  margin-right: 10px;
}

.ctivit-2 {
  position: relative;
}

.ctivit-2::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  width: 97%;
  height: 2px;
  background-color: #45efff;
}

.bgtm-1 {
  background-color: rgba(0, 0, 0, 0.4);
  margin-right: 10px;
}

.ctivit-3 {
  position: relative;
}

.ctivit-3::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #45efff;
}

.bgtm-2 {
  background-color: rgba(0, 0, 0, 0.4);
  margin-right: 10px;
  width: 35%;
  padding: 1px;
}
</style>
