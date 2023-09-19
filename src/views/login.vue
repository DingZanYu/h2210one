<template>
  <div class="box">
    <el-form
      ref="ruleform"
      :model="loginruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
    >
      <h2>电商后台管理平台</h2>
      <el-form-item prop="username">
        <el-input v-model="loginruleForm.username" prefix-icon="User" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginruleForm.password"
          type="password"
          prefix-icon="Lock"
          show-password
        />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="goHome">登录</el-button>
        <el-button type="info">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { loginApi } from "@/api";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
// 登录
const loginruleForm = reactive<any>({
  username: "",
  password: "",
});
const ruleform = ref();
const validateUsername = (rule: any, value: any, callback: any) => {
  let reg = /^[a-zA-Z]{5,20}$/;
  if (reg.test(value)) {
    callback();
  }else{
    callback(new Error("你输入的用户字符要在5-20之间22"));
  }
    

  
};
const rules = reactive<any>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    // {
    //   min: 5,
    //   max: 20,
    //   message: "你输入的用户字符要在5-20个之间11",
    //   trigger: "blur",
    // },
    { validator: validateUsername, trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    // [{ validator: validatePass, trigger: "blur" }],
  ],
});

const goHome = () => {
  ruleform.value.validate((valid: any) => {
    if (valid) {
      loginApi(loginruleForm).then((res: any) => {
        console.log(res, "555");
        if (res.meta.status == 200) {
          localStorage.setItem("token", res.data.token);
          router.push("/");
          ElMessage.success(res.meta.msg);
        } else if (res.meta.status == 400) {
          ElMessage.error(res.meta.msg);
        }
      });
    }
  });
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  background: #294b6c;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    box-shadow: 0 0 10px 5px rgba(247, 247, 247, 0.5);
    border-radius: 10px;
    width: 600px;
    height: 260px;
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    // .el-form-item{
    //     background-color: #fff;
    // }
    h2 {
      margin-bottom: 30px;
      text-align: center;
    }
  }
}
</style>
