<template>
  <div class="app-container">
    <el-form :model="queryParams" style="padding: 0;margin: 0" :inline="true" ref="queryForm" v-show="showSearch"
      label-width="68px">
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="queryParams.title" placeholder="请输入新闻标题" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker v-model="daterangePublishTime" style="width: 240px" value-format="YYYY-MM-DD" type="daterange"
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
        <el-select v-model="queryParams.isShow" placeholder="请选择是否显示" clearable>
          <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否置顶" prop="isTop">
        <el-select v-model="queryParams.isTop" placeholder="请选择是否置顶" clearable>
          <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" size="default" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" size="default" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" size="default" @click="handleAdd"
          v-hasPermi="['business:bulletin:add']">新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" size="default" :disabled="single" @click="handleUpdate"
          v-hasPermi="['business:bulletin:edit']">修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" size="default" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['business:bulletin:remove']">删除
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--            type="warning"-->
      <!--            plain-->
      <!--            icon="el-icon-download"-->
      <!--            size="mini"-->
      <!--            @click="handleExport"-->
      <!--            v-hasPermi="['business:bulletin:export']"-->
      <!--        >导出-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bulletinList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!--      <el-table-column label="新闻id" align="center" prop="id"/>-->
      <el-table-column label="新闻标题" align="center" prop="title" />
      <!--      <el-table-column label="贡献者" align="center" prop="contributePeople"/>-->
      <!--      <el-table-column label="新闻内容" align="center" prop="content"/>-->
      <el-table-column label="发布时间" align="center" prop="publishTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.publishTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" align="center" prop="isShow">
        <template #default="scope">
          <el-switch v-model="scope.row.isShow" :active-value="1" :inactive-value="0"
            @change="handleIsShowChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否置顶" align="center" prop="isTop">
        <template #default="scope">
          <el-switch v-model="scope.row.isTop" :active-value="1" :inactive-value="0"
            @change="handleIsTopChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link size="default" icon="Edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['business:bulletin:edit']">修改
          </el-button>
          <el-button size="default" link icon="Delete" @click="handleDelete(scope.row)"
            v-hasPermi="['business:bulletin:remove']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        v-show="total>0"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[5,10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getList"
        @current-change="getList"
    />

    <!-- 添加或修改新闻对话框 -->
    <el-dialog :title="title" v-model="open" width="1000px" append-to-body>
      <el-form ref="bulletinForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入新闻标题" />
        </el-form-item>
        <el-form-item label="贡献者" prop="contributePeople">
          <people-list v-model:value="form.contributePeople"></people-list>
        </el-form-item>
        <el-form-item label="发布时间" prop="publishTime">
          <el-date-picker clearable v-model="form.publishTime" type="date" value-format="YYYY-MM-DD"
            placeholder="请选择发布时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="新闻内容">
          <rich-editor v-if="open" v-model:content="form.content"></rich-editor>
        </el-form-item>

        <!--        <el-form-item label="是否显示" prop="isShow">-->
        <!--          <el-select v-model="form.isShow" placeholder="请选择是否显示">-->
        <!--            <el-option-->
        <!--                v-for="dict in sys_yes_no"-->
        <!--                :key="dict.value"-->
        <!--                :label="dict.label"-->
        <!--                :value="parseInt(dict.value)"-->
        <!--            ></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="是否置顶" prop="isTop">-->
        <!--          <el-select v-model="form.isTop" placeholder="请选择是否置顶">-->
        <!--            <el-option-->
        <!--                v-for="dict in sys_yes_no"-->
        <!--                :key="dict.value"-->
        <!--                :label="dict.label"-->
        <!--                :value="parseInt(dict.value)"-->
        <!--            ></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup  name="Bulletin">
import { listBulletin, getBulletin, delBulletin, addBulletin, updateBulletin } from "../../../api/business/bulletin";
import { getCurrentInstance, reactive, ref, toRefs } from "vue";
import RichEditor from '../components/richTEditor';
import PeopleList from "./components/peopleList";

const { proxy } = getCurrentInstance();
const sys_yes_no = ref([{ label: "是", value: 1 }, { label: "否", value: 0 }])
const bulletinList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: null,
    publishTime: null,
    isShow: null,
    isTop: null,
    params: {}
  },
  rules: {},
});
const { queryParams, form, rules } = toRefs(data);
const  daterangePublishTime  = ref([]);

/** 查询新闻列表 */
function getList() {
  loading.value = true;
  if (null != daterangePublishTime && '' !== daterangePublishTime) {
    queryParams.value.params["beginPublishTime"] = daterangePublishTime[0];
    queryParams.value.params["endPublishTime"] = daterangePublishTime[1];
  }
  listBulletin(queryParams.value).then(response => {
    bulletinList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}
// 表单重置
function reset() {
  form.value = {
    id: null,
    title: null,
    contributePeople: null,
    content: null,
    createBy: null,
    createTime: null,
    publishTime: null,
    isShow: null,
    isTop: null
  };
  // proxy.resetForm("bulletinForm");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  daterangePublishTime.value = [];
  proxy.resetForm("queryForm");
  handleQuery();
}
// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加新闻";
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const id = row.id || ids.value
  getBulletin(id).then(response => {
    form.value = response.data;
    open.value = true;
    // title.value = "修改新闻";
  });
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["bulletinForm"].validate(valid => {
    if (valid) {
      //将所有视频居中
      const regExp1=/<div data-w-e-type="video" (?!style=\"text-align: center\")/g;
      form.value.content =  form.value.content.replace(regExp1,'<div data-w-e-type="video" style="text-align: center" ');
      if (form.value.id != null) {
        updateBulletin(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addBulletin(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 删除按钮操作 */
function handleDelete(row) {
  const ids1 = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除新闻编号为"' + ids1 + '"的数据项？').then(function () {
    return delBulletin(ids1);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {
  });
}

function deleteItem(item) {
  console.log(item)
}

function handleIsTopChange(row) {

}
function handleIsShowChange(row) {

}
getList();
</script>
<style lang="scss" scoped>
.app-container {
  font-size: 16px;
}
</style>
