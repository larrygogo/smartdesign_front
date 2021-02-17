<template>
  <div
    class="text-tool"
    v-if="layers[currentIndex] && layers[currentIndex].type === 'image'"
  >
    <div class="tool-item">
      <p class="title">对齐</p>
      <div class="tool-item-row">
        <Toolicon
          type="layer-zdq"
          text="左对齐"
          @action="setLayerAlign('left')"
        />
        <Toolicon
          type="layer-spjz"
          text="水平居中"
          @action="setLayerAlign('horizCenter')"
        />
        <Toolicon
          type="layer-ydq"
          text="右对齐"
          @action="setLayerAlign('right')"
        />
        <Toolicon
          type="layer-sdq"
          text="顶对齐"
          @action="setLayerAlign('top')"
        />
        <Toolicon
          type="layer-czjz"
          text="垂直居中"
          @action="setLayerAlign('vertiCenter')"
        />
        <Toolicon
          type="layer-xdq"
          text="底对齐"
          @action="setLayerAlign('bottom')"
        />
      </div>
      <div class="tool-line-item">
        <span class="title">透明度</span>
        <div class="block">
          <a-slider
            id="test"
            v-model="opacity"
            :min="0"
            :max="1"
            :step="0.01"
          />
        </div>
      </div>
      <div class="tool-line-item">
        <span class="title">翻转</span>
        <div class="block">
              <Toolicon
                type="image-spfz"
                text="水平翻转"
                :active="scaleX === -1"
                @action="scale('x')"
              />
              <Toolicon
                type="image-czfz"
                text="垂直翻转"
                :active="scaleY === -1"
                @action="scale('y')"
              />
        </div>
      </div>
    </div>
    <el-form>
      <el-form-item>
        <el-popconfirm title="确定删除这个图层吗？" @onConfirm="deleteLayer">
          <a-button class="input" type="danger" slot="reference"
            >删除图层</a-button
          >
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MyIcon from '../../pub/MyIcon'
import Toolicon from './Toolicon'
export default {
  components: {
    MyIcon,
    Toolicon
  },
  props: {
    // layers: Array,
    // currentIndex: Number,
    // scaleX: Number,
    // scaleY: Number
  },
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
      templateWidth: state => state.editor.width,
      templateHeight: state => state.editor.height,
      currentIndex: state => state.editor.currentIndex,
      layers: state => state.editor.layers
    }),
    top: {
      get() {
        return this.layers[this.currentIndex].style.top;
      },
      set(value) {
        this.changeLayer("top", value)
      }
    },
    left: {
      get() {
        return this.layers[this.currentIndex].style.left;
      },
      set(value) {
        this.changeLayer("left", value)
      }
    },
    width: {
      get() {
        return this.layers[this.currentIndex].style.width;
      },
      set(value) {
        this.changeLayer("width", value)
      }
    },
    height: {
      get() {
        return this.layers[this.currentIndex].style.height;
      },
      set(value) {
        this.changeLayer("height", value)
      }
    },
    scaleX: {
      get() {
        return this.layers[this.currentIndex].style
          ? this.layers[this.currentIndex].style.transform.xx
          : 1;
      },
      set(value) {
        const transform = Object.assign({}, this.layers[this.currentIndex].style.transform)
        transform.xx = value
        this.changeLayer("transform", transform);
      }
    },
    scaleY: {
      get() {
        return this.layers[this.currentIndex].style
          ? this.layers[this.currentIndex].style.transform.yy
          : 1;
      },
      set(value) {
        const transform = Object.assign({}, this.layers[this.currentIndex].style.transform)
        transform.yy = value
        this.changeLayer("transform", transform);
      }
    },
    opacity: {
      get() {
        return this.layers[this.currentIndex].style
          ? this.layers[this.currentIndex].style.opacity
          : 1;
      },
      set(value) {
        this.changeLayer("opacity", value);
      }
    },
  },
  methods: {
    changeLayer(attr, value) {
      this.$store.commit("editor/changeLayer", {
        attr,
        value,
        index: this.currentIndex
      });
    },
    scale(mode) {
      console.log(mode)
      if(mode === 'x') {
        if(this.scaleX === 1) {
          this.scaleX = -1
        } else {
          this.scaleX = 1
        }
      } else if(mode === 'y') {
        if(this.scaleY === 1) {
          this.scaleY = -1
        } else {
          this.scaleY = 1
        }
      }
    },
    deleteLayer() {
      this.$store.commit("editor/deleteLayer", this.currentIndex);
    },
    setLayerAlign(mode) {
      switch(mode) {
        case "left":
          this.left = 0;
          break;
        case "right":
          this.left = this.templateWidth - this.width
          break;
        case "top":
          this.top = 0
          break;
        case "bottom":
          this.top = this.templateHeight - this.height
          break;
        case "horizCenter":
          this.left = (this.templateWidth - this.width) / 2
          break;
        case "vertiCenter":
          this.top = (this.templateHeight - this.height) / 2
          break;
      }
    }
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

    .tool-item-row {
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

      /deep/.ant-btn-group {
        .tool-btn {
          width: 80px;
        }
      }

      /deep/.ant-input-number {
        width: 100%;
      }
      /deep/.ant-btn,
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
    width: 75%;
    height: 30px;
  }

  .tool-btn {
    width: 30%;
    padding: 0;
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
</style>