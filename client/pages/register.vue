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
        :model="form"
        :rules="rules"
        ref="registerForm"
        class="login-form">
        <el-form-item prop="username">
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
            v-model="form.repassword"
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
            @click="register">注 册</el-button>
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      disabled: false,
      form: {
        email: "",
        username: "",
        password: "",
        repassword: ""
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
        ],
        repassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      this.$refs["registerForm"].validate(async (valid) => {
        console.log(valid)
        if(valid) {
          await this.$store.dispatch("user/register", this.form)
          return true
        } else {
          return false;
        }
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
