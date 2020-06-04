<template>
  <div class="pc-page">
    <header class="pc-header">
      <n-link
        to="/"
        class="logo">
        <img
          src="~assets/images/ls.png"
          alt=""
          srcset="">
        <span>图必</span>
        <span>ToolBee</span>
      </n-link>
      <ul class="user">
        <n-link to="/login">
          登录
        </n-link>
        <n-link to="/register">
          注册
        </n-link>
      </ul>
    </header>
    <nuxt class="pc-body" />
    <footer class="footer">ToolBee.cn ® 2020</footer>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  created() {
  },
  methods: {
    userAction(command) {
      if (command === "layout") {
        this.$confirm("是否退出登录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store.dispatch("manager/logout").then(() => {
              this.$cookies.remove("token", {
                path: "/"
              })
              this.$router.push("/login")
            })
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style>
  html {
    font-family: Mircosoft YaHei, PingFang, Helvetica;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
    margin: 0;
  }

  a {
    text-decoration: none;
  }
</style>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');
  .pc-page {
    min-width: 1100px;
  }
  .pc-header {
    box-sizing: border-box;
    position: fixed;
    min-width: 1100px;
    top: 0;
    height: 60px;
    width: 100%;
    padding: 0 40px;
    z-index: 20;

    .logo {
      font-family: 'Sigmar One', sans-serif;
      font-size: 20px;
      font-weight: bold;
      line-height: 60px;
      color: rgb(99, 99, 99);
      overflow: auto;
      letter-spacing: 2px;
      overflow: auto;

      img {
        float: left;
        margin: 15px 10px 15px 0;
        height: 30px;
        width: 30px;
      }

      span {
        float: left;
      }
    }

    .user {
      float: right;
      line-height: 60px;
      margin-left: 40px;

      a {
        color: #333;
        transition: all .2s;

        &:not(:last-of-type) {
          margin-right: 20px;
        }
      }
      a:hover {
        color: #000;
        font-weight: bold;
      }

      /deep/ .el-dropdown{
        height: 20px;
        padding: 18px 0 22px;
        line-height: 20px;

      }
    }
  }

  .pc-body {
    min-height: 100vh;
    padding: 80px 40px 40px 40px;
    background-color: #eff1f4;
  }

  .footer {
    position: fixed;
    width: 100%;
    bottom: 20px;
    color: #636363;
    text-align: center;
  }
</style>
