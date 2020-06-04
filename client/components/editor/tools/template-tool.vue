<template>
  <div class="text-tool">
    <el-form>
      <el-form-item label="宽度">
        <el-input class="input" v-model="width" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="高度">
        <el-input class="input" v-model="height" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="背景">
        <el-color-picker
          class="input"
          v-model="background"
        ></el-color-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="input" type="primary" @click="render" :loading="loading">生成图片</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="下载图片"
      :visible.sync="showRender"
      :close-on-click-modal="false"
      width="50%">
      <el-tooltip class="item" effect="dark" content="右键保存图片" placement="top">
        <img style="width: 100%" :src="renderImg">
      </el-tooltip>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    width: {
      get() {
        return this.$store.state.editor.width
      },
      set(value) {
        if(Number(value) > 2000) {
          this.$message.error("模板宽度不超过2000")
        } else {
          this.setTemplateInfo("width", Number(value))
        }
        
      }
    },
    height: {
      get() {
        return this.$store.state.editor.height
      },
      set(value) {
        if(Number(value) > 2000) {
          this.$message.error("模板高度不超过2000")
        } else {
          this.setTemplateInfo("height", Number(value))
        }
      }
    },
    background: {
      get() {
        return this.$store.state.editor.background
      },
      set(value) {
        this.setTemplateInfo("background", value)
      }
    }
  },
  data() {
    return {
      loading: false,
      showRender: false,
      renderImg: ""
    }
  },
  methods: {
    setTemplateInfo(attr, value) {
      this.$store.commit("editor/setTemplate", { attr, value });
    },
    render() {
      this.loading = true
      this.$store.dispatch("editor/render").then(res => {
        this.loading = false
        if(res.status === 200 && res.data.code === "0") {
          this.showRender = true
          this.renderImg = res.data.data
        } else {
          this.$message.error("图片渲染失败")
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(~assets/font/iconfont.css);
.text-tool {
  position: absolute;
  top: 60px;
  right: 0;
  height: calc(100% - 60px);
  padding: 50px 20px;
  width: 300px;
  background-color: #fff;
  text-align: center;

  .input {
    width: 75%;
    height: 50px;
  }

  /deep/ {
    .el-color-picker__trigger {
      width: 100%;
    }
  }

  .block {
    display: block;
    width: 75%;
    padding: 0 20px;
    overflow: hidden;
  }
}

.render-tips {
  font-size: 14px;
  margin-bottom: 20px;
}
</style>