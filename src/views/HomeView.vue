<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="left">公司logo</div>
        <el-button @click="goLogin" class="gologin">登出</el-button>
      </el-header>
      <el-container>
        <!-- <el-aside> -->
        <el-menu
          active-text-color="#ffcc50"
          background-color="#313743"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          :collapse="isCollapse"
          router
        >
          <p @click="isCollapse = !isCollapse">|||</p>
          <el-sub-menu v-for="item in leftList" :key="item.id" :index="item.id">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              v-for="ele in item.children"
              :key="ele.id"
              :index="'/' + ele.path"
              >{{ ele.authName }}</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
        <!-- </el-aside> -->
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item,index in route.matched" :key="index">{{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div v-for="item,index in arr" :key="index">
            {{item}}
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref,watch } from "vue";
import { leftApi } from "@/api";
import { ElMessage } from "element-plus";
import { useRouter,useRoute } from "vue-router";
const router = useRouter();
const route = useRoute()
const arr = ref<any>([])
const goLogin = () => {
  localStorage.removeItem("token");
  ElMessage.error("退出成功!");
  router.push("/login");
};

const isCollapse = ref(false);

const leftList = ref<any>([]);

leftApi({ type: "tree" }).then((res: any) => {
  console.log(res, "111");
  leftList.value = res.data;
  ElMessage({
    message: "获取列表成功",
    type: "success",
  });
});

let meta = route.matched
console.log(meta,'11');

watch(route,()=>{
  console.log(route,'100000');
  
  arr.value.push(route.meta.title)
})


</script>
<style lang="scss" scoped>
.el-header {
  background-color: #363c42;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  .gologin {
    margin-top: 5px;
    width: 70px;
    height: 45px;
  }
}
.el-aside {
  background-color: #fff;
  .el-menu-vertical-demo {
    // width: 200px;
    height: calc(100vh - 60px);
    border: none;
  }
}
.el-main {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #e8eef4;
}
p {
  text-align: center;
  color: white;
  padding: 5px 0;
  box-sizing: border-box;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}
.left {
  color: white;
}
</style>
