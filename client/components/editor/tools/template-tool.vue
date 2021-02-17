<template>
  <div class="text-tool">
    <div class="tool-item">
      <div class="tool-line-item">
        <span class="title">宽度</span>
        <div class="block">
          <a-input-number
            :value="Math.ceil(width)"
            :min="10"
            :max="2000"
            step="1"
            @change="(e) => (width = e)"
          />
        </div>
      </div>
      <div class="tool-line-item">
        <span class="title">高度</span>
        <div class="block">
          <a-input-number
            :value="Math.ceil(height)"
            :min="10"
            :max="2000"
            step="1"
            @change="(e) => (height = e)"
          />
        </div>
      </div>
      <div class="tool-line-item">
        <span class="title">背景色</span>
        <div class="block">
          <el-color-picker
            class="input"
            v-model="background"
            :predefine="defaultColor"
          ></el-color-picker>
        </div>
      </div>
    </div>
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
      defaultColor: [
        "#000000",
        "#ffffff",
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585"
      ]
    }
  },
  methods: {
    setTemplateInfo(attr, value) {
      this.$store.commit("editor/setTemplate", { attr, value });
    },
  }
};
</script>

<style lang="scss" scoped>
@import url(~assets/font/iconfont.css);
.text-tool {

  .tool-item {
    margin-bottom: 20px;
    text-align: left;

    & > .title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .tool-line-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      & > .title {
        font-size: 14px;
        margin-right: 20px;
      }

      /deep/.ant-input-number {
        width: 100%;
      }

      /deep/.ant-input-number,
      /deep/.ant-input-number-handler-wrap,
      /deep/.ant-input-number-handler-down {
        background-color: #1d1d20;
        border-color: #57575c;
        color: #c5c5c5;
        svg {
          color: #fff;
        }
      }

      /deep/ .ant-slider-handle {
        border-color: #adb1b3;
      }

      /deep/ .ant-slider-track {
        background-color: #ffed4d;
      }
    }
  }

  .input {
    width: 100%;
    height: 30px;
  }

  /deep/ {
    .el-color-picker__trigger {
      width: 100%;
      height: 30px;
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