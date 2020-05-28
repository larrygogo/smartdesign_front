<template>
  <div class="pc-page">
    <header class="pc-header">
      <n-link
        to="/"
        class="logo">
        <img
          src="~assets/images/logo.png"
          alt=""
          srcset="">
        <span>Manage System</span>
      </n-link>
      <ul class="nav">
        <n-link to="/">
          首页
        </n-link>
        <n-link to="/goods">
          活动管理
        </n-link>
        <n-link to="/order">
          订单管理
        </n-link>
        <n-link to="/user">
          用户管理
        </n-link>
        <n-link to="/setting">
          设置
        </n-link>
      </ul>
      <div class="user">
        <el-dropdown
          trigger="click"
          @command="userAction">
          <span class="el-dropdown-link">
            <i class="el-icon-user" />
            {{ nickname || "个人中心" }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu
            slot="dropdown">
            <el-dropdown-item
              command="layout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <nuxt class="pc-body" />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: mapState({
    nickname: state => state.manager.nickname
  }),
  created() {
    this.$store.dispatch("manager/getUserInfo")
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
    background-color: #fff;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
    z-index: 20;

    .logo {
      float: left;
      font-size: 20px;
      font-weight: bold;
      line-height: 60px;
      color: #333;
      overflow: auto;
      letter-spacing: 2px;

      img {
        float: left;
        margin: 15px 10px 15px 0;
        height: 30px;
        width: 30px;
      }
    }

    .nav {
      float: left;
      line-height: 60px;
      margin-left: 40px;
      a {
        color: #333;

        &:not(:last-of-type) {
          margin-right: 20px;
        }
      }
      a:hover {
        color: #0062ff;
      }
    }

    .user {
      float: right;
      height: 60px;
      box-sizing: border-box;

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
</style>
