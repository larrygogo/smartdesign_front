<template>
  <el-dialog title="模板上传" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%">
    <el-upload
      class="upload-box"
      :action="host + '/template/upload'"
      :headers="header"
      :on-success="successUpload"
      :with-credentials="true"
      :on-error="errorUpload"
      :limit="1"
      :file-list="fileList"
    >
      <el-button size="small" type="primary" :disabled="loading">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传psd文件，且不超过20Mb</div>
    </el-upload>
    <el-form class="form">
      <el-form-item required>
        <el-input v-model="name" class="input" :disabled="loading" placeholder="请输入模板名称" />
      </el-form-item>
      <el-form-item required label="标签">
        <el-input
          class="input input-new-tag"
          v-if="inputVisible"
          v-model="tag"
          size="small"
          ref="saveTagInput"
          placeholder="回车确认输入"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput"
          :disabled="loading"
        >+ 新增标签</el-button>
        <el-tag
          class="tag"
          :key="tag"
          v-for="tag in tags"
          :closable="!loading"
          :disable-transitions="false"
          @close="closeTag(tag)"
        >{{tag}}</el-tag>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="!loading" @click="dialogVisible = false">取 消</el-button>
      <el-button
        class="submit-btn"
        type="primary"
        :loading="loading"
        @click="createTemplate"
      >{{loading ? '保 存 中 请 勿 关 闭': '确 定'}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    header: {
      get() {
        return {
          Authorization: `Bearer ${this.$store.state.user.token}`
        };
      }
    },
    dialogVisible: {
      get() {
        return this.show;
      },
      set(value) {
        if (!this.loading) {
          this.$emit("close");
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      host: process.env.ENV_API,
      inputVisible: false,
      fileList: [],
      filepath: "",
      name: "",
      tag: "",
      tags: []
    };
  },
  methods: {
    successUpload(e) {
      if (e.code === "0") {
        this.filepath = e.data;
      } else {
        this.$message.error("上传错误");
      }
    },
    errorUpload(e) {
      if (e.status === 401) {
        this.$alert("请重新登录", "登录超时", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.replace("/login");
          }
        });
      } else {
        this.$message.error("上传错误");
      }
    },
    closeTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let tag = this.tag;
      const index = this.tags.indexOf(tag);
      if (tag && index === -1) {
        this.tags.push(tag);
      }
      this.inputVisible = false;
      this.tag = "";
    },
    createTemplate() {
      const template = {
        name: this.name,
        filepath: this.filepath,
        tag: this.tags.join()
      };
      this.loading = true;
      this.$store.dispatch("template/createTemplate", template).then(res => {
        this.loading = false
        if(res.status === 200 && res.data.code === "0") {
          this.$message.success("上传成功")
          this.dialogVisible = false
        } else {
          this.$message.error("上传失败")
        }
      }).catch(e => {
        this.loading = false
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-box {
  margin-bottom: 20px;
}

.form {
  .input-new-tag {
    width: auto;
  }
  .input {
    /deep/ .el-input__inner {
      &:focus {
        border: 2px solid #7d7d7d;
        background-color: #f0f2f5;
      }
    }
  }

  .tag {
    &:not(:last-of-type) {
      margin-right: 5px;
    }
  }
}

/deep/ {
  .is-disabled.submit-btn {
    color: #fff;
  }
}
</style>