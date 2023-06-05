<template>
  <div style="border: 1px solid #ccc">
    <div class="demo-progress" >
      <el-progress :text-inside="true"
                   :stroke-width="15"
                   striped
                   striped-flow
                   :percentage="myProgress"
                   v-if="myProgress!=0"/>
    </div>
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 500px; overflow-y: hidden; max-width: 54.5rem"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="contentChange"
    />

<!--    <div class="demo-progress">-->
<!--   -->
<!--    </div>-->
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {onBeforeUnmount, ref, shallowRef, onMounted, watch} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {getToken} from "../../../utils/auth";
import { ElMessage } from 'element-plus'
export default {
  components: {Editor, Toolbar},
  props: {
    /* 编辑器的内容 */
    content: {
      type: String,
      default: '<p></p>'
    },
  },
  setup(props, {emit}) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref(props.content)

    let myProgress = ref(0);



    // 模拟 ajax 异步获取内容
    onMounted(() => {
    })
    const toolbarConfig = {}
    const editorConfig = {placeholder: '请输入内容...', MENU_CONF: {}}
    editorConfig.MENU_CONF['uploadImage'] = {
      server: import.meta.env.VITE_APP_BASE_API + "/common/upload",
      // form-data fieldName ，默认值 'wangeditor-uploaded-image'
      fieldName: 'file',

      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 4 * 1024 * 1024, // 1M

      // 最多可上传几个文件，默认为 100
      // maxNumberOfFiles: 10,

      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],

      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      // meta: {
      //   token: getToken(),
      //   otherKey: 'yyy'
      // },

      // 将 meta 拼接到 url 参数中，默认 false
      // metaWithUrl: false,

      // 自定义增加 http  header
      headers: {
        Authorization: "Bearer " + getToken()
      },

      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,

      // 超时时间，默认为 10 秒
      timeout: 10 * 1000, // 5 秒


      // 上传之前触发
      onBeforeUpload(file: File) { // TS 语法
        // onBeforeUpload(file) {    // JS 语法
        // file 选中的文件，格式如 { key: file }
        return file

        // 可以 return
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
      },

      // 上传进度的回调函数
      onProgress(progress: number) {  // TS 语法
        // onProgress(progress) {       // JS 语法
        // progress 是 0-100 的数字
        console.log('progress', progress)
        myProgress.value = progress
      },

      // 单个文件上传成功之后
      onSuccess(file: File, res: any) {  // TS 语法
        // onSuccess(file, res) {          // JS 语法
        // // @ts-ignore
        // proxy.$modal.msgSuccess("上传成功！");
        console.log(`${file.name} 上传成功`, res)
        myProgress.value = 0
        ElMessage({
          message: '上传成功！',
          type: 'success',
        })
      },

      // 单个文件上传失败
      onFailed(file: File, res: any) {   // TS 语法
        // onFailed(file, res) {           // JS 语法
        // @ts-ignore
        // proxy.$modal.msgError("上传失败,请确保图片大小小于4M后重试！");
        console.log(`${file.name} 上传失败`, res)
        myProgress.value = 0
        ElMessage.error('上传失败！')
      },

      // 上传错误，或者触发 timeout 超时
      onError(file: File, err: any, res: any) {  // TS 语法
        // onError(file, err, res) {               // JS 语法
        // @ts-ignore
        // proxy.$modal.msgError("上传出错，请稍后重试！");
        console.log(`${file.name} 上传出错`, err, res)
        myProgress.value = 0
        ElMessage.error('上传出错！')
      },
      // 自定义插入图片
      customInsert(res: any, insertFn) {  // TS 语法
        if (res.code===200){
          insertFn(res.url,res.originalFilename,res.url)
        }
      },
    }

    editorConfig.MENU_CONF['uploadVideo'] = {
      server: import.meta.env.VITE_APP_BASE_API + "/common/upload",
      // form-data fieldName ，默认值 'wangeditor-uploaded-image'
      fieldName: 'file',

      // 单个文件的最大体积限制，默认为 10M
      maxFileSize: 50 * 1024 * 1024, // 8M

      // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['video/*'],

      // 自定义增加 http  header
      headers: {
        Authorization: "Bearer " + getToken()
      },

      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,

      // 超时时间，默认为 10 秒
      // timeout: 10 * 1000, // 5 秒

      // 上传之前触发
      onBeforeUpload(file: File) {   // TS 语法
                                     // onBeforeUpload(file) {      // JS 语法
        // file 选中的文件，格式如 { key: file }
        return file

        // 可以 return
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
      },

      // 上传进度的回调函数
      onProgress(progress: number) {  // TS 语法
        // onProgress(progress) {       // JS 语法
        // progress 是 0-100 的数字
        console.log('progress', progress)
        myProgress.value = progress
      },

      // 单个文件上传成功之后
      onSuccess(file: File, res: any) {  // TS 语法
        // onSuccess(file, res) {          // JS 语法
        // @ts-ignore
        // proxy.$modal.msgSuccess("上传成功！");
        console.log(`${file.name} 上传成功！`, res)
        myProgress.value = 0
        ElMessage({
          message: '上传成功',
          type: 'success',
        })
      },

      // 单个文件上传失败
      onFailed(file: File, res: any) {  // TS 语法
        // onFailed(file, res) {          // JS 语法
       // @ts-ignore
       //  proxy.$modal.msgError("上传失败,请确保视频大小小于50M后重试！");
        console.log(`${file.name} 上传失败`, res)
        myProgress.value = 0
        ElMessage.error('上传失败！')
      },

      // 上传错误，或者触发 timeout 超时
      onError(file: File, err: any, res: any) {  // TS 语法
        // onError(file, err, res) {               // JS 语法
        // @ts-ignore
        // proxy.$modal.msgError("上传出错，请稍后重试！");
        console.log(`${file.name} 上传出错`, err, res)
        myProgress.value = 0
        ElMessage.error('上传出错！')
      },

      // 自定义插入视频
      customInsert(res: any, insertFn) {  // TS 语法
        // customInsert(res, insertFn) {                  // JS 语法
        // res 即服务端的返回结果

        // 从 res 中找到 url poster ，然后插入视频
        insertFn(res.url)
      },
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    const contentChange = (editor) => {
      emit('update:content', valueHtml.value)
    }


    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      contentChange,
      myProgress
    };
  }
}
</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 54.5rem;
}
</style>
