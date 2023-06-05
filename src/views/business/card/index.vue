<template>
  <div class="app-container">

    <el-table v-loading="loading" :data="cardList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="侧栏标题" align="center" prop="title" />
      <el-table-column label="侧栏内容" align="center" prop="content" >
        <template #default="scope">

            <div  class="listColumn"><p>{{scope.row.content}}</p></div>

          <span class="content"></span>
        </template>
      </el-table-column>
<!--      <el-table-column label="富文本内容" align="center" prop="richContent" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-tooltip content="编辑" placement="top" >
            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['business:card:edit']"></el-button>
          </el-tooltip>
<!--          <el-tooltip content="删除" placement="top" >-->
<!--            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['business:card:remove']"></el-button>-->
<!--          </el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        v-show="total>0"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getList"
        @current-change="getList"
    />


    <!-- 添加或修改侧栏对话框 -->
    <el-dialog :title="title" v-model="open" width="1000px" >
      <el-form ref="addForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="侧栏标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入侧栏标题" />
        </el-form-item>
        <el-form-item label="侧栏内容" prop="content">
          <el-input v-model="form.content" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="富文本内容">
          <rich-editor v-if="open" v-model:content="form.richContent"></rich-editor>
<!--          <editor v-model="form.richContent" :min-height="192" />-->
        </el-form-item>
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
import { listCard, getCard, delCard, addCard, updateCard } from "../../../api/business/card";
import {onMounted, ref, reactive, toRefs, } from "vue";
import RichEditor from '../components/richTEditor';
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();


      // 遮罩层
    const loading = ref(true);
      // 选中数组
const ids = ref([]);
      // 非单个禁用
const single = ref(true);
      // 非多个禁用
const multiple = ref(true);
      // 显示搜索条件
const showSearch = ref(true);
      // 总条数
const total = ref(0);
      // 侧栏表格数据
const cardList = ref([]);
      // 弹出层标题
const title = ref("");
      // 是否显示弹出层
const open = ref(false);
      // 查询参数
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    type: null,
  },
  rules: {
  },
});

let { queryParams, form, rules } = toRefs(data);

/**
 * 设置侧栏type筛选
 */
function setType(){
  const router = useRouter();
  queryParams.value.type = router.currentRoute.value.name
}
/** 查询侧栏列表 */
   function getList() {
      loading.value = true;
      listCard(queryParams.value).then(response => {
        cardList.value = response.rows;
        total.value = response.total;
        loading.value = false;
      });
    }

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
    // 表单重置
   function reset() {
      form.value = {
        id: null,
        title: null,
        content: null,
        richContent: "<p></p>"
      };
     proxy.resetForm("form");
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
/** 多选框选中数据 */
   function handleSelectionChange(selection) {
      ids.value = selection.map(item => item.id)
      single.value = selection.length!==1
      multiple.value = !selection.length
    }
    /** 新增按钮操作 */
   function handleAdd() {
      reset();
      open.value = true;
      title.value = "添加侧栏";
    }
    /** 修改按钮操作 */
   function handleUpdate(row) {
      reset();
      const id = row.id || ids.value
      getCard(id).then(response => {
        form.value = response.data;
        open.value = true;
        title.value = "修改侧栏";
      });
    }
    /** 提交按钮 */
   function submitForm() {
      proxy.$refs["addForm"].validate(valid => {
        if (valid) {
          //将所有视频居中
          const regExp1=/<div data-w-e-type="video" (?!style=\"text-align: center\")/g;
          form.value.richContent =  form.value.richContent.replace(regExp1,'<div data-w-e-type="video" style="text-align: center" ');
          if (form.value.id != null) {
            updateCard(form.value).then(response => {
              proxy.$modal.msgSuccess("修改成功");
              open.value = false;
              getList();
            });
          } else {
            addCard(form.value).then(response => {
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
      const ids = row.id || ids.value;
      proxy.$modal.confirm('是否确认删除侧栏编号为"' + ids + '"的数据项？').then(function() {
        return delCard(ids);
      }).then(() => {
        getList();
        proxy.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
    /** 导出按钮操作 */
   function handleExport() {
      proxy.download('business/card/export', {
        ...queryParams.value
      }, `card_${new Date().getTime()}.xlsx`)
    }
setType();
getList();
</script>
<style scoped lang="scss">

.listColumn {
  display: flex;
  text-align: center;
  max-width: 100%;

  p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

}


</style>
