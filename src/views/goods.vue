<template>
  <div class="box">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="请输入内容" clearable>
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加商品</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" label="#" />
      <el-table-column prop="goods_name" label="商品名称" />
      <el-table-column prop="goods_price" label="商品价格(元)" />
      <el-table-column prop="goods_weight" label="商品重量" />
      <el-table-column prop="add_time" label="创建时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" type="primary"
            ><el-icon><EditPen /></el-icon>
          </el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.goods_id)"
            ><el-icon><Delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { listApi, delApi } from "@/api";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import moment from "moment";
const router = useRouter()
const formInline = reactive<any>({
  user: "",
});
const tableData = ref([]);

const info = reactive<any>({
  query: "",
  pagenum: 1,
  pagesize: 20,
});
// 获取列表数据
const getlist = () => {
  listApi(info).then((res: any) => {
    console.log(res, "6666");
    tableData.value = res.data.goods.map((item: any) => {
      let time = item.add_time*1000;
      return {
        ...item,
        add_time: moment(time).format("YYYY-MM-DD hh:mm:ss"),
      };
    });
  });
};
getlist()

// 删除
const del = (id: number) => {
  console.log(id, "999");
  delApi({ id: id }).then((res: any) => {
    console.log(res, "111");
    ElMessage.success("删除成功");
  });
  getlist()
};
// 添加商品
const add = ()=>{
  router.push('/goodsAdd')
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  .el-input {
    height: 40px;
    width: 400px;
  }
  .el-button {
    height: 40px;
  }
  .el-table{
    height: 800px;
    overflow-y: scroll;
  }
}
</style>
