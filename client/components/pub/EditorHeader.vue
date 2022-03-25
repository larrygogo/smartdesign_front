<template>
  <header class="pc-header">
    <div class="">
      <n-link to="/" class="logo">
        <img src="~assets/images/ls.png" alt="" srcset="" />
        <span>图必</span>
        <span>ToolBee</span>
      </n-link>
      <div class="name-row">
        <el-input class="name-input" v-model="name" @blur="saveName">
        </el-input>
      </div>
      <ul class="user">
        <template v-if="!token">
          <n-link to="/login"> 登录 </n-link>
          <n-link to="/register"> 注册 </n-link>
        </template>
        <template v-else>
          <el-upload
            v-if="layers.length === 0"
            class="upload-box"
            :action="host + '/template/upload'"
            :headers="header"
            :on-success="successUpload"
            :with-credentials="true"
            :show-file-list="false"
            :on-error="errorUpload"
            :limit="1"
            :file-list="fileList"
          >
            <el-button
              class="header-btn"
              size="mini"
              type="warning"
              :disabled="loading"
              >从PSD文件导入</el-button
            >
          </el-upload>
          <div v-else>
            <el-button
              class="header-btn"
              type="warning"
              size="mini"
              :loading="loading"
              @click="renderTemplate"
              >生成图片</el-button
            >
            <el-button
              class="header-btn"
              type="warning"
              size="mini"
              :loading="saveLoading"
              @click="saveTemplate"
              >保存</el-button
            >
          </div>

          <el-dropdown trigger="click" @command="userAction">
            <span class="el-dropdown-link">
              <i class="el-icon-user" />
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      templateId: (state) => state.editor.id,
      layers: (state) => state.editor.layers,
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
    }),
    header: {
      get() {
        return {
          Authorization: `Bearer ${this.$store.state.user.token}`,
        };
      },
    },
  },
  data() {
    return {
      name: "未命名作品",
      loading: false,
      saveLoading: false,
      fileList: [],
      host: process.env.API,
    };
  },
  mounted() {
    this.name = this.$store.state.editor.name;
  },
  watch: {
    "$store.state.editor.name": function(val) {
      this.name = val;
    },
  },
  methods: {
    userAction(command) {
      if (command === "layout") {
        this.$confirm("是否退出登录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$store.dispatch("user/logout").then(() => {
              this.$cookies.remove("token", {
                path: "/",
              });
              this.$router.replace("/login");
            });
          })
          .catch(() => {});
      }
    },
    editNameHandle() {
      this.editName = true;
    },
    saveName() {
      this.$store.commit("editor/setTemplate", {
        attr: "name",
        value: this.name,
      });
    },
    saveTemplate() {
      this.saveLoading = true;
      this.$store
        .dispatch("editor/saveTemplate")
        .then((res) => {
          if (res.status === 200 && res.data.code === "0") {
            this.$store.dispatch("editor/setLayerTag").then(() => {
              this.$store
                .dispatch("editor/getTemplate", res.data.data.id)
                .then(() => {
                  this.$router.replace("/editor?id=" + res.data.data.id);
                  if (this.templateId !== res.data.data.id) {
                    this.$message.success("已保存该模板至我的作品");
                  } else {
                    this.$message.success("模板保存成功");
                  }
                });
            });
          }
        })
        .finally(() => {
          this.saveLoading = false;
        });
    },
    renderTemplate() {
      this.render();
    },
    render() {
      this.loading = true;
      this.$store
        .dispatch("editor/render", this.name)
        .then((res) => {
          if (res.status === 200 && res.data.code === "0") {
            this.showRender = true;
            this.renderImg = res.data.data;
          } else {
            this.$message.error("图片渲染失败");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    successUpload(e) {
      if (e.code === "0") {
        this.$store.commit("editor/loadTemplate", e.data);
      } else {
        this.$message.error("上传错误");
      }
      this.fileList = [];
    },
    errorUpload(e) {
      if (e.status === 401) {
        this.$alert("请重新登录", "登录超时", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$router.replace("/login");
          },
        });
      } else {
        this.$message.error("上传错误");
      }
      this.fileList = [];
    },
  },
};
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
  background-color: #2e2e31;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
  z-index: 20;

  .logo {
    font-family: "Sigmar One", sans-serif;
    font-size: 20px;
    font-weight: bold;
    line-height: 60px;
    color: #fff;
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

  .name-row {
    float: left;
    line-height: 60px;
    margin-left: 40px;

    .text {
      width: 200px;
      color: #fff;
      cursor: pointer;
    }

    .name-input {
      /deep/.el-input__inner {
        margin-top: 10px;
        font-size: 18px;
        height: 40px;
        border-radius: 20px;
        background-color: #2e2e31;
        border-color: #2e2e31;
        color: #fff;
        transition: all 0.3s;

        &:focus {
          background-color: #1d1d20;
          border-color: #2e2e31;
          color: #fff;
        }
      }

      &:hover {
        /deep/.el-input__inner {
          background-color: #1d1d20;
          border-color: #2e2e31;
          color: #fff;
        }
      }
    }
  }

  .user {
    display: flex;
    float: right;
    line-height: 60px;
    margin-left: 40px;

    /deep/.el-dropdown {
      color: #fff;
      cursor: pointer;
    }

    a {
      color: #333;
      &:not(:last-of-type) {
        margin-right: 20px;
      }
    }
    a:hover {
      color: #0062ff;
    }

    .header-btn {
      border-radius: 20px;
      color: rgb(99, 99, 99);
      background-color: #ffed4d;
      border-color: #ffed4d;

      &:hover {
        background: #fff171;
        border-color: #fff171;
      }

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
