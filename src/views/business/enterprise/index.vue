<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="企业名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入企业名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="creditCode">
        <el-input
          v-model="queryParams.creditCode"
          placeholder="请输入统一社会信用代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="法人代表" prop="legalPerson">
        <el-input
          v-model="queryParams.legalPerson"
          placeholder="请输入法人代表"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" size="default" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" size="default" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          size="default"
          @click="handleAdd"
          v-hasPermi="['business:enterprise:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          size="default"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['business:enterprise:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          size="default"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['business:enterprise:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          size="default"
          @click="handleExport"
          v-hasPermi="['business:enterprise:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="enterpriseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="企业id" align="center" prop="id"/>
      <el-table-column label="企业名称" align="center" prop="name"/>
      <el-table-column label="统一社会信用代码" align="center" prop="creditCode"/>
      <el-table-column label="法人代表" align="center" prop="legalPerson"/>
      <el-table-column label="手机号" align="center" prop="mobilephone"/>
      <el-table-column label="注册地址" align="center" prop="address"/>
      <el-table-column label="邮编" align="center" prop="postCode"/>
      <el-table-column label="从业人数" align="center" prop="peopleNum"/>
      <el-table-column label="电子邮箱" align="center" prop="eMail"/>
      <el-table-column label="固定电话" align="center" prop="telephone"/>
      <el-table-column label="楼层数" align="center" prop="floorNo"/>
      <el-table-column label="房间号" align="center" prop="roomId"/>
      <el-table-column label="照片" align="center" prop="photo">
<!--        <el-image-->
<!--          style="width: 100px; height: 100px"-->
<!--          src='/RC.jpg'></el-image>-->
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            size="default"
            link
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['business:enterprise:edit']"
          >修改
          </el-button>
          <el-button
            size="default"
            link
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['business:enterprise:remove']"
          >删除
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
    <!-- 添加或修改企业对话框 -->
    <el-dialog :title="title" v-model="open" width="1200px" append-to-body>
      <el-form ref="enterpriseForm" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="80" >
          <el-col :span="8">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入企业名称"/>
            </el-form-item>
            <el-form-item label="信用代码" prop="creditCode">
              <el-input v-model="form.creditCode" placeholder="请输入统一社会信用代码"/>
            </el-form-item>
            <el-form-item label="法人代表" prop="legalPerson">
              <el-input v-model="form.legalPerson" placeholder="请输入法人代表"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="mobilephone">
              <el-input v-model="form.mobilephone" placeholder="请输入手机号"/>
            </el-form-item>
            <el-form-item label="注册地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入注册地址"/>
            </el-form-item>
            <el-form-item label="邮编" prop="postCode">
              <el-input v-model="form.postCode" placeholder="请输入邮编"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="从业人数" prop="peopleNum">
              <el-input v-model="form.peopleNum" placeholder="请输入从业人数"/>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="eMail">
              <el-input v-model="form.eMail" placeholder="请输入电子邮箱"/>
            </el-form-item>
            <el-form-item label="固定电话" prop="telephone">
              <el-input v-model="form.telephone" placeholder="请输入固定电话"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col>
            <el-form-item label="建筑" prop="buildingId">
              <el-select v-model="buildingName" placeholder="请选择">
                <el-option
                  v-for="item in buildingList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="楼层数" prop="floorNo">
              <el-select v-model="form.floorNo" placeholder="请选择">
                <el-option
                  v-for="item in 10"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="房间号" prop="roomId">
              <el-input v-model="form.roomId" placeholder="请输入房间号"/>
            </el-form-item>
            <el-form-item label="照片" prop="photo">
<!--              <el-image-->
<!--                style="width: 100px; height: 100px"-->
<!--                src='/RC.jpg'></el-image>-->
            </el-form-item>
          </el-col>
        </el-row>
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

<script setup>
import {listEnterprise, getEnterprise, delEnterprise, addEnterprise, updateEnterprise} from "../../../api/business/enterprise";
import { listBuilding} from "../../../api/business/building";
import {getCurrentInstance, reactive, ref, toRefs} from "vue";
const { proxy } = getCurrentInstance();

const buildingName="明理楼";
const buildingList=ref([])
const loading=ref(true)
const ids=ref([])
const single=ref(true)
const multiple=ref(true)
const showSearch=ref(true)
const total=ref(0)
const enterpriseList=ref([])
const title=ref("")
const open=ref(false)
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: null,
    creditCode: null,
    legalPerson: null,
    mobilephone: null,
    address: null,
    postCode: null,
    peopleNum: null,
    eMail: null,
    telephone: null,
    buildingId: null,
    floorNo: null,
    roomId: null,
    photo: null
  },
  rules: {},
});
const { queryParams, form, rules } = toRefs(data);

/** 查询企业列表 */
function getList() {
  loading.value = true;
  listEnterprise(queryParams.value).then(response => {
    enterpriseList.value = response.rows;
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
    name: null,
    creditCode: null,
    legalPerson: null,
    mobilephone: null,
    address: null,
    postCode: null,
    peopleNum: null,
    eMail: null,
    telephone: null,
    buildingId: null,
    floorNo: null,
    roomId: null,
    photo: null
  };
  // proxy.resetForm("form");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
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
  title.value = "添加企业";
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const id = row.id || ids.value
  getEnterprise(id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改企业";
  });
}
/** 提交按钮 */
function submitForm() {
  $refs["enterpriseForm"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateEnterprise(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addEnterprise(form.value).then(response => {
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
  const ids = row.id || ids;
  proxy.$modal.confirm('是否确认删除企业编号为"' + ids + '"的数据项？').then(function () {
    return delEnterprise(ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {
  });
}
/** 导出按钮操作 */
function handleExport() {
  download('business/enterprise/export', {
    ...queryParams
  }, `enterprise_${new Date().getTime()}.xlsx`)
}
getList();
listBuilding().then((res)=>{
  buildingList.value=res.rows;
})
</script>
