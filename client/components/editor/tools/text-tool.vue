<template>
  <div
    class="text-tool"
    v-if="layers[currentIndex] && layers[currentIndex].type === 'text'"
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
    </div>
    <div class="tool-item">
      <p class="title">文本</p>
      <Toolicon
        type="text-b"
        text="加粗"
        :active="fontWeight === 'bold' || fontWeight > 500"
        @action="setFontWeight"
      />
      <Toolicon
        type="text-i"
        text="斜体"
        :active="fontStyle === 'italic'"
        @action="setFontStyle"
      />
      <Toolicon
        type="text-left"
        :text="'文本左对齐'"
        :active="textAlign === 'left'"
        @action="setTextAlign('left')"
      />
      <Toolicon
        type="text-center"
        :text="'文本居中'"
        :active="textAlign === 'center'"
        @action="setTextAlign('center')"
      />
      <Toolicon
        type="text-right"
        :text="'文本右对齐'"
        :active="textAlign === 'right'"
        @action="setTextAlign('right')"
      />
    </div>
    <div class="tool-item">
      <p class="title">文本样式</p>
      <div class="tool-line-item">
        <span class="title">颜色</span>
        <div class="block">
          <el-color-picker
            class="input"
            v-model="color"
            :predefine="defaultColor"
          ></el-color-picker>
        </div>
      </div>
      <div class="tool-line-item" ref="fontFamilyNode">
        <span class="title">字体</span>
        <div class="block">
          <a-select
            :value="fontFamily"
            default-value="zh3"
            class="font-select input"
            @change="changeFont"
            :getPopupContainer="() => {
              return this.$refs['fontFamilyNode']
            }"
            :dropdownMenuStyle="{
              background: '#212121'
            }"
          >
            <a-select-option v-for="font in fontMap" :key="font.fontName">
              <div class="font-select-item">
                <img class="font-image" :src="font.image" alt="" srcset="" />
                <span v-if="!font.image">{{ font.fontName }}</span>
              </div>
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="tool-line-item">
        <span class="title">字号</span>
        <div class="block">
          <a-input-number
            :value="Math.ceil(fontSize)"
            :min="12"
            step="1"
            @change="(e) => (fontSize = e)"
          />
        </div>
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
        <span class="title">字间距</span>
        <div class="block">
          <a-slider
            id="test"
            v-model="letterSpacing"
            :min="-100"
            :max="100"
            :step="1"
          />
        </div>
      </div>
      <div class="tool-line-item">
        <span class="title">行间距</span>
        <div class="block">
          <a-slider
            id="test"
            v-model="lineHeight"
            :min="1"
            :max="10"
            :step="0.1"
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
import Toolicon from './Toolicon'
import fontMap from '~/config/fontMap'
import {loadStyle} from '~/utils/editor'
export default {
  components: {
    Toolicon
  },
  data() {
    this.fontMap = fontMap
    return {
      host: process.env.NODE_ENV === 'development' ? process.env.DEV_HOST : process.env.PRO_HOST,
      show: false,
      fontSelectStyle: {
        height: '50px',
        padding: '10px'
      },
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
        return this.layers[this.currentIndex].style 
        ? this.layers[this.currentIndex].style.fontWeight
        ? this.layers[this.currentIndex].style.fontWeight : 400 : 400;
      },
      set(value) {
        this.changeLayer("fontWeight", value)
      }
    },
    fontStyle: {
      get() {
        return this.layers[this.currentIndex].style 
        ? this.layers[this.currentIndex].style.fontStyle 
        ? this.layers[this.currentIndex].style.fontStyle 
        : 'normal'
        : 'normal';
      },
      set(value) {
        this.changeLayer("fontStyle", value)
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
    setTextAlign(textAlign) {
      this.textAlign = textAlign
    },
    setFontWeight() {
      if(this.fontWeight === 'bold' || this.fontWeight > 400) {
        this.fontWeight = 400
      } else {
        this.fontWeight = 900
      }
    },
    changeFont(e) {
      const [font] = this.fontMap.filter(item => item.fontName === e)
      this.$store.dispatch("editor/getFontFile", font.id).then((res) => {
        loadStyle(`${this.host}/fonts/${res.data.data}.css`)
        this.fontFamily = font.fontName
      })
    },
    setFontStyle() {
      if(this.fontStyle === 'italic') {
        this.fontStyle = 'normal'
      } else {
        this.fontStyle = 'italic'
      }
      console.log(this.fontStyle)
    },
    changeLayer(attr, value) {
      this.$store.commit("editor/changeLayer", {
        attr,
        value,
        index: this.currentIndex
      });
    },
    deleteLayer() {
      this.$store.commit("editor/deleteLayer", this.currentIndex)
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
  padding-top: 20px;

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
      /deep/.ant-select-selection--single,
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
    .ant-select-selection,
    
    .ant-select-selection-selected-value,
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

  .font-image {
    height: 18px;
  }

  .font-select-item {
    height: 30px !important;
    padding: 0 !important;
    text-align: center;
  }
  /deep/.ant-select-dropdown-menu-item-selected,
  /deep/.ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled) {
    background-color: #000;
  }
}
</style>