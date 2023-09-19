<template>
  <div class="content">
    <el-alert class="info" type="info" title="消息提示文案" center show-icon />
    <el-steps :active="active" finish-status="success">
      <el-step title="基本信息" />
      <el-step title="商品参数" />
      <el-step title="商品属性" />
      <el-step title="商品图片" />
      <el-step title="商品内容" />
      <el-step title="完成" />
    </el-steps>
    <el-tabs
      :before-leave="fun"
      tab-position="left"
      @tab-click="next"
      class="demo-tabs"
    >
      <keep-alive> </keep-alive>
      <el-tab-pane label="基本信息">
        <el-form :model="form" label-position="top">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name" />
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price" />
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight" />
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number" />
          </el-form-item>
          <div>
            <span>商品分类</span>
            <el-cascader
              placeholder="请选择商品分类"
              v-model="form.goods_cat"
              :options="options"
              :props="{ label: 'cat_name', value: 'cat_id' }"
            />
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">
        <div>
          <el-checkbox label="国产" size="large" />
          <el-checkbox label="进口" size="large" />
        </div>
        <div>
          <el-checkbox label="燃气灶" size="large" />
          <el-checkbox label="燃气灶酒精炉" size="large" />
          <el-checkbox label="电磁炉" size="large" />
          <el-checkbox label="电陶炉" size="large" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性">Role</el-tab-pane>
      <el-tab-pane label="商品图片">
        <el-upload
          v-model:file-list="fileList"
          multiple
          class="upload-demo"
          action="http://shiyansong.cn:8888/api/private/v1/upload"
          :on-success="onSuccess"
          :headers="{ Authorization: token }"
        >
          <template #trigger>
            <el-button type="primary">点击上传</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip text-red">
              只能上传jpg/png文件,且不能超过500kb
            </div>
          </template>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <quill-editor
          style="height: 500px"
          v-model:value="state.content"
          :options="state.editorOption"
        />
        <el-button class="primary" type="primary" @click="add"
          >添加商品</el-button
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { classApi, addApi } from "@/api";
import { useRouter } from "vue-router";
const router = useRouter();
const active = ref(0);
// const goods_cat = ref("");
const options = ref([]);
const fileList = ref([]);
const form = reactive<any>({
  goods_name: "",
  goods_cat: "",
  goods_price: "",
  goods_number: "",
  goods_weight: "",
  pics:['']
});

classApi().then((res: any) => {
  console.log(res, "9999");
  options.value = res.data;
});

const next = (value: any) => {
  console.log(value.index, "22");
  if (value.index !== "0") {
    // active.value = Number(value.index)
    if (form.goods_cat) {
      active.value = Number(value.index);
    } else {
      ElMessage.error("请选择商品分类");
    }
  }
};
const fun = () => {
  if (form.goods_cat === "") return false;
};

// 添加商品
const add = () => {
  // console.log(form,'99');
  addApi(form).then((res: any) => {
    console.log(res, "22");
    if (res.meta.status == 201) {
      ElMessage.success(res.meta.msg);
      router.push("/goods");
    } else if (res.meta.status == 400) {
      ElMessage.error(res.meta.msg);
    }
  });
};

const state = reactive({
  content: "<p>2333</p>",
  _content: "",
  editorOption: {
    placeholder: "请输入内容",
    modules: {
      // toolbars: [
      // custom toolbars options
      // will override the default configuration
      // ],
      // other moudle options here
      // otherMoudle: {}
    },
    // more options
  },
});
let token = localStorage.getItem("token");
const onSuccess = (response: any, uploadFile: any, uploadFiles: any) => {
  form.pics.push(response.data.tmp_path as any)
};
</script>
<style lang="scss" scoped>
.content {
  // height: 800px;
  margin-top: 30px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 3px rgba(145, 145, 145, 0.5);
  .el-form-item {
    padding: 15px;
    .el-input {
      width: 100%;
      height: 50px;
    }
  }
  .el-steps {
    width: 90%;
    margin: 0 auto;
  }
  .el-cascader {
    margin-left: 15px;
    height: 50px;
  }
  .el-tabs {
    margin-top: 20px;
  }
  .primary {
    margin-top: 15px;
  }
}
</style>
