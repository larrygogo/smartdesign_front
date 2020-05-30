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
    </el-form>
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
        this.setTemplateInfo("width", value)
      }
    },
    height: {
      get() {
        return this.$store.state.editor.height
      },
      set(value) {
        this.setTemplateInfo("height", value)
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
  methods: {
    setTemplateInfo(attr, value) {
      this.$store.commit("editor/setTemplate", { attr, value });
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
</style>