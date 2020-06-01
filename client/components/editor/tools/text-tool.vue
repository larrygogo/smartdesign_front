<template>
  <div class="text-tool" v-if="layers[currentIndex] && layers[currentIndex].type === 'text'">
    <el-form>
      <el-form-item label="文本">
        <el-input
          class="input"
          v-model="value"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="字号">
        <el-input-number
          class="input"
          v-model="fontSize"
          :min="12"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="对齐">
        <el-radio-group
          class="input"
          v-model="textAlign"
        >
          <el-radio-button label="left">
            <i class="iconfont icon-text-left"></i>
          </el-radio-button>
          <el-radio-button label="center">
            <i class="iconfont icon-text-center"></i>
          </el-radio-button>
          <el-radio-button label="right">
            <i class="iconfont icon-text-right"></i>
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="颜色">
        <el-color-picker
          class="input"
          v-model="color"
          :predefine="defaultColor"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="透明度">
        <div class="block">
          <el-slider
            v-model="opacity"
            :min="0"
            :max="1"
            :step="0.1"
          ></el-slider>
        </div>
      </el-form-item>
      <el-form-item label="字间距">
        <div class="block">
          <el-slider
            v-model="letterSpacing"
            :min="-100"
            :max="100"
            :step="1"
          ></el-slider>
        </div>
      </el-form-item>
      <el-form-item label="行间距">
        <div class="block">
          <el-slider
            v-model="lineHeight"
            :min="1"
            :max="10"
            :step="0.1"
          ></el-slider>
        </div>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确定删除这个图层吗？" @onConfirm="deleteLayer">
          <el-button class="input" type="danger" slot="reference">删除图层</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: false,
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
    };
  },
  computed: {
    ...mapState({
      currentIndex: state => state.editor.currentIndex,
      layers: state => state.editor.layers
    }),
    value: {
      get() {
        return this.layers[this.currentIndex].value;
      },
      set(value) {
        this.changeLayer("value", value)
      }
    },
    color: {
      get() {
        return this.layers[this.currentIndex].style ? this.layers[this.currentIndex].style.color : "#000000";
      },
      set(value) {
        this.changeLayer("color", value)
      }
    },
    opacity: {
      get() {
        return this.layers[this.currentIndex].style ? this.layers[this.currentIndex].style.opacity : 1;
      },
      set(value) {
        this.changeLayer("opacity", value)
      }
    },
    fontSize: {
      get() {
        return this.layers[this.currentIndex].style ? this.layers[this.currentIndex].style.fontSize : 24;
      },
      set(value) {
        this.changeLayer("fontSize", value)
      }
    },
    fontFamily: {
      get() {
        return this.layers[this.currentIndex].style ? this.layers[this.currentIndex].style.fontFamily : "";
      },
      set(value) {
        this.changeLayer("fontFamily", value)
      }
    },
    fontWeight: {
      get() {
        return this.layers[this.currentIndex].style ? this.layers[this.currentIndex].style.fontWeight : 500;
      },
      set(value) {
        this.changeLayer("fontWeight", value)
      }
    },
    textAlign: {
      get() {
        return this.layers[this.currentIndex].style ? this.layers[this.currentIndex].style.textAlign : "center";
      },
      set(value) {
        this.changeLayer("textAlign", value)
      }
    },
    lineHeight: {
      get() {
        return this.layers[this.currentIndex].style ? this.layers[this.currentIndex].style.lineHeight : 1;
      },
      set(value) {
        this.changeLayer("lineHeight", value)
      }
    },
    letterSpacing: {
      get() {
        return this.layers[this.currentIndex].style ? this.layers[this.currentIndex].style.letterSpacing : 0;
      },
      set(value) {
        this.changeLayer("letterSpacing", value)
      }
    }
  },
  methods: {
    changeLayer(attr, value) {
      this.$store.commit("editor/changeLayer", {
        attr,
        value,
        index: this.currentIndex
      });
    },
    deleteLayer() {
      this.$store.commit("editor/deleteLayer", this.currentIndex)
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
    height: 40px;
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