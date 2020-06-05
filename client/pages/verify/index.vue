<template>
  <div class="page">
    <div class="login-container">
      <h1 class="title">
        邮箱验证
      </h1>
      <p class="desc">
        <span>Hi, <b style="color: #333">{{name}}</b></span>
      </p>
      <p class="desc">
        <span>点击下方按钮验证你的账号</span>
      </p>
      <el-form
        ref="login"
        class="login-form">
        <el-form-item>
          <el-button
            class="login-btn ripple"
            type="primary"
            :loading="loading"
            :disabled="!code"
            @click="verify">点 击 验 证</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "nonAuth",
  data() {
    return {
      loading: false,
      code: "",
      name: ""
    }
  },
  created() {
    const {code, name} = this.$route.query
    if(code && name) {
      this.name = name
      this.code = code
    }
  },
  methods: {
    async verify() {
      this.loading = true
      await this.$store.dispatch("user/verify", this.code)
      this.loading = false
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
    width: 420px;
    padding: 50px 40px;
    margin: 0 auto;
    background-color: #fefefe;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);

    border-radius: 20px;
    background-size: 300px 300px;
    background-position: 40px 0px;
    background-repeat: no-repeat;

    .logo {
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
      margin-bottom: 10px;

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

  
}
</style>
