<template>
  <div class="page">
    <div class="login-container">
      <h1 class="title">
        Manage System
      </h1>
      <p class="desc">
        请输入您的账号
      </p>
      <el-form
        ref="login"
        class="login-form">
        <el-form-item prop="userId">
          <el-input
            v-model="form.account"
            class="input-box"
            placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            class="input-box"
            type="password"
            placeholder="请输入密码"
            @keyup.enter.native="login" />
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn ripple"
            type="primary"
            @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        account: "",
        password: ""
      }
    }
  },
  methods: {
    async login() {
      this.$store.dispatch("manager/login", this.form).then(() => {
        this.$router.push("/")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-width: 1024px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #f0f2f5;
  background-image: url(~assets/images/homebg.png);
  background-size: 100% 100%;
  // background-repeat: no-repeat;

  .login-container {
    box-sizing: border-box;
    width: 720px;
    padding: 50px 40px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-image:  url(~assets/images/logo1.png);
    background-size: 300px 300px;
    background-position: 40px 0px;
    background-repeat: no-repeat;
    padding-left: 400px;

    .logo {
      width: 80%;
      height: auto;
    }

    .title {
      font-size: 20px;
      margin: 0 0 10px 0;
      font-weight: 600;
      // color: rgb(50, 41, 101);
      color: #333;
    }

    .desc {
      font-size: 14px;
      margin: 0;
      color: #c2c3c8;
    }

    .login-form {
      padding: 20px 0;

      .input-box {

        /deep/ .el-input__inner {
          outline: none;
          border: 1px solid rgb(154, 154, 154);
          font-size: 12px;
          letter-spacing: 1px;
          transition: all .4s;
          color: #333;

          &[type=password] {
            letter-spacing: 2px;
          }

          &:focus {
            border: 1px solid #0062ff;
            background-color: #f0f2f5;
          }

          &::-webkit-input-placeholder {
            font-weight: 400;
            letter-spacing: 2px;
          }
        }
      }

      .login-btn {
        border-radius: 8px;
        color: #fff;
        font-size: 14px;
        height: 38px;
        float: right;
        background-color: #0062ff;

        span {
          padding-left: 5px;
        }
      }
    }
  }
}
</style>
