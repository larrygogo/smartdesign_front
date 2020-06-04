<template>
  <div class="page">
    <div class="login-container">
      <h1 class="title">
        免费注册
      </h1>
      <p class="desc">
        {{ disabled ? '暂未开放' : '勤劳的小蜜蜂' }}，
        <span>点击<n-link to="/login">这里登录</n-link></span>
      </p>
      <el-form
        ref="login"
        class="login-form">
        <el-form-item prop="userId">
          <el-input
            v-model="form.username"
            :disabled="disabled"
            class="input-box"
            name="username"
            placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            :disabled="disabled"
            class="input-box"
            name="email"
            placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            :disabled="disabled"
            class="input-box"
            type="password"
            placeholder="请输入密码" />
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="form.password"
            :disabled="disabled"
            class="input-box"
            type="password"
            placeholder="再次输入密码"
            @keyup.enter.native="login" />
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn ripple"
            :disabled="disabled"
            type="primary"
            @click="login">注 册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <footer>ToolBee.cn ® 2020</footer>
  </div>
</template>

<script>
export default {
  layout: "nonAuth",
  data() {
    return {
      disabled: true,
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async login() {
      this.$store.dispatch("user/login", this.form).then(() => {
        this.$router.push("/")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  min-width: 1024px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #d3dae0;
  background-image: url(~assets/images/homebg.svg);
  background-size: auto 100%;
  background-position: top center;
  background-repeat: no-repeat;

  .login-container {
    box-sizing: border-box;
    width: 720px;
    padding: 50px 40px;
    margin: 0 auto;
    background-color: #fefefe;
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
      color: #333;
    }

    .desc {
      font-size: 14px;
      margin: 0;
      color: #c2c3c8;

      a {
        color: #636363;

        &:hover {
          color: #636363
        }
      }
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
            border: 2px solid #7d7d7d;
            background-color: #f0f2f5;
          }

          &::-webkit-input-placeholder {
            font-weight: 400;
            letter-spacing: 2px;
          }
        }
      }

      .login-btn {
        width: 100%;
        border-radius: 8px;
        color: #fff;
        font-size: 14px;
        height: 38px;
        float: right;
        

        span {
          padding-left: 5px;
        }
      }
    }
  }

  footer {
    position: fixed;
    bottom: 20px;
    color: #636363;
  }
}
</style>
