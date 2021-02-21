<template>
  <header class="pc-header">
    <div class="container">
      <n-link to="/" class="logo">
        <img src="~assets/images/ls.png" alt="" srcset="" />
        <span>图必</span>
        <span>ToolBee</span>
      </n-link>
      <ul class="nav">
        <n-link to="/"> 模板中心 </n-link>
        <n-link to="/setting"></n-link>
      </ul>
      <ul class="user">
        <template v-if="!token">
          <n-link to="/login"> 登录 </n-link>
          <n-link to="/register"> 注册 </n-link>
        </template>
        <template v-else>
          <el-button
            class="header-btn"
            type="warning"
            size="mini"
            @click="$router.push('/editor')"
            >创建设计</el-button
          >
          <el-button
            class="header-btn"
            type="warning"
            size="mini"
            @click="$router.push('/user/work')"
            >我的作品</el-button
          >
          <el-dropdown trigger="click" @command="userAction">
            <span class="el-dropdown-link username">
              <i class="el-icon-user"/>
              {{ userId || "个人中心" }}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="layout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex"
export default {
computed: mapState({
    token: state => state.user.token,
    userId: state => state.user.userId
  }),
  methods: {
    userAction(command) {
      if (command === "layout") {
        this.$confirm("是否退出登录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store.dispatch("user/logout").then(() => {
              this.$cookies.remove("token", {
                path: "/"
              })
              this.$router.replace("/login")
            })
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
    font-family: "Sigmar One", sans-serif;
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

  .nav {
    float: left;
    line-height: 60px;
    margin-left: 40px;
    a {
      color: #333;
      transition: all 0.2s;

      &:not(:last-of-type) {
        margin-right: 20px;
      }
    }
    a:hover {
      // color: #0062ff;
      font-weight: bold;
    }
  }

  .user {
    float: right;
    line-height: 60px;
    margin-left: 40px;

    .username {
      cursor: pointer;
      outline: none;
    }

    a {
      color: #333;
      &:not(:last-of-type) {
        margin-right: 20px;
      }
    }
    a:hover {
      color: #333;
    }

    .header-btn {
      border-radius: 20px;
      color: rgb(99, 99, 99);

      &:last-of-type {
        margin-right: 20px;
      }
    }

    /deep/ .el-dropdown {
      height: 20px;
      padding: 18px 0 22px;
      line-height: 20px;
    }
  }
}
</style>