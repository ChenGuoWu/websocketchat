<!--
 * @Author: guowu
 * @Date: 2021-04-07 10:53:57
 * @LastEditTime: 2021-04-07 16:19:10
-->

<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="账号" prop="username">
        <el-input  v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mapMutations } from "vuex";
export default {
    
  //import引入的组件需要注入到对象中才能使用
  name: "Login",
  components: {},
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      }
      callback();
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    //这里存放数据
    return {
      ruleForm: {
        username: "",
        pass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
      },
    };
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //   console.log(this.data.trim())
  },
  //监听属性 类似于data概念
  computed: {
       
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      ...mapMutations("user",["setusername"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message("登录成功");
          this.setusername(this.ruleForm.username);
          this.$router.push({ path: "/home" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
};
</script>
<style lang='scss' scoped>
.login {
  width: 30%;
  margin: 0 auto;
}
</style>