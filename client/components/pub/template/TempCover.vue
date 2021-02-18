<template>
  <div class="template-item">
    <div class="template-cover-row" @click="toEditor(id)">
      <img class="template-cover" :src="host + cover" />
      <div class="template-mask">
        <p class="username">{{ username }}</p>
      </div>
    </div>
    <div class="template-info">
      <p class="name">
        <a-tag v-if="showStatusTag" :color="getStatus() | statusColor"> {{ getStatus() | statusName }} </a-tag>{{ name }}
      </p>
      <el-dropdown
        class="more"
        trigger="click"
        v-if="isAdmin"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <i class="el-icon-more el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item icon="el-icon-edit">编辑</el-dropdown-item> -->
          <el-dropdown-item
            icon="el-icon-delete"
            command="delete"
            style="color: #f56c6c"
            >删除</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="删除模板" :visible.sync="dialogVisible" width="30%">
      <p class="delete-info">
        <i class="el-icon-warning" style="color: #e6a23c" />
        <span>你确认要删除该模板吗？[ 操作无法撤销 ]</span>
      </p>
      <el-checkbox v-model="bothResource" class="resource-check"
        >同时删除模板素材文件</el-checkbox
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    props: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      cover: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      release: {
        type: Boolean,
        required: true
      },
      verify: {
        type: Boolean,
        required: true
      },
      showStatusTag: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      ...mapState({
        isAdmin: state => state.user.isAdmin
      }),
      templates: {
        get() {
          return this.$store.state.template.list
        },
        set(value) {
          this.$store.commit("template/SET_LIST", value)
        }
      },
      count: {
        get() {
          return this.$store.state.template.count
        },
        set(value) {
          this.$store.commit("template/SET_COUNT", value)
        }
      }
    },
    filters: {
      statusColor: (status) => {
        return status.color
      },
      statusName: (status) => {
        return status.name
      },
    },
    data() {
      return {
        host: process.env.NODE_ENV === 'development' ? process.env.DEV_HOST : process.env.PRO_HOST,
        dialogVisible: false,
        bothResource: false
      }
    },
    methods: {
      toEditor(id) {
        this.$router.push("/editor?id=" + id)
      },
      handleCommand(command) {
        if(command === "delete") {
          this.handleDelete()
        }
      },
      handleDelete() {
        this.dialogVisible = true
        this.bothResource = false
      },
      checkDelete() {
        this.$store.dispatch("template/delete", {id: this.id, bothResource: this.bothResource}).then(res => {
          if(res.status === 200 && res.data.code === "0") {
            this.$message.success("删除成功")
            this.templates = this.templates.filter(item => item._id !== this.id)
            this.count--
          } else {
            this.$message.error("删除失败")
          }
          this.dialogVisible = false
        })
      },
      getStatus() {
        if(!this.release) {
          return { color: "blue", name: "未发布" }
        } else if(!this.verify){
          return { color: "orange", name: "审核中" }
        } else {
          return { color: "green", name: "已发布" }
        }
      }
    }
};
</script>

<style lang="scss" scoped>
.template-item {
  border-radius: 20px;

  .template-cover-row {
    position: relative;
    max-width: 100%;
    height: 0;
    padding-bottom: 60%;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer !important;
  }

  .template-mask {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.3s;
    background-image: linear-gradient(
      180deg,
      transparent 62%,
      rgba(0, 0, 0, 0.00345888) 63.94%,
      rgba(0, 0, 0, 0.014204) 65.89%,
      rgba(0, 0, 0, 0.0326639) 67.83%,
      rgba(0, 0, 0, 0.0589645) 69.78%,
      rgba(0, 0, 0, 0.0927099) 71.72%,
      rgba(0, 0, 0, 0.132754) 73.67%,
      rgba(0, 0, 0, 0.177076) 75.61%,
      rgba(0, 0, 0, 0.222924) 77.56%,
      rgba(0, 0, 0, 0.267246) 79.5%,
      rgba(0, 0, 0, 0.30729) 81.44%,
      rgba(0, 0, 0, 0.341035) 83.39%,
      rgba(0, 0, 0, 0.367336) 85.33%,
      rgba(0, 0, 0, 0.385796) 87.28%,
      rgba(0, 0, 0, 0.396541) 89.22%,
      rgba(0, 0, 0, 0.4) 91.17%
    );

    &:hover {
      opacity: 1;
    }

    .username {
      padding: 30px 20px;
      color: #fff;
      font-weight: 700;
    }
  }

  .template-cover {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .template-info {
    display: flex;
    justify-content: space-between;
    height: 30px;
    padding: 0 5px;

    .name {
      font-size: 14px;
      line-height: 30px;
      color: #636363;
    }

    .more {
      height: 30px;
      padding: 7px 0;
      cursor: pointer;
    }
  }

  .delete-info {
    font-size: 14px;
  }
  .resource-check {
    font-size: 12px;
    margin-top: 10px;
    font-weight: 400;
    color: #999;
  }
}
</style>