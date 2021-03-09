<template>
  <div
    class="edit-mask"
    :class="{ edit: index === currentIndex, 'edit-text': editIndex === index }"
    :style="{
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${getHeight()}px`,
    }"
    @mousedown.self="move"
    @click="openEditTool"
    @dblclick="editText"
  >
    <div class="edit-tools" @mousedown.self="move">
      <div class="scale-tools top" @mousedown.self="move">
        <div
          class="scale-tool tl"
          :style="{
            marginLeft: `${(-10 / scale) * 100}px`,
            marginTop: `${(-10 / scale) * 100}px`,
            width: `${(20 / scale) * 100}px`,
            height: `${(20 / scale) * 100}px`,
          }"
          @mousedown="zoom('tl')"
        ></div>
        <div
          class="scale-tool tr"
          :style="{
            marginRight: `${(-10 / scale) * 100}px`,
            marginTop: `${(-10 / scale) * 100}px`,
            width: `${(20 / scale) * 100}px`,
            height: `${(20 / scale) * 100}px`,
          }"
          @mousedown="zoom('tr')"
        ></div>
      </div>
      <div class="width-tools" @mousedown.self="move">
        <div
          class="width-tool left"
          :style="{
            marginLeft: `${(-5 / scale) * 100}px`,
            marginTop: `${(-10 / scale) * 100}px`,
            width: `${(8 / scale) * 100}px`,
            height: `${(20 / scale) * 100}px`,
          }"
          @mousedown.self="scaleWidth('left')"
        ></div>
        <div
          class="width-tool right"
          :style="{
            marginRight: `${(-5 / scale) * 100}px`,
            marginTop: `${(-10 / scale) * 100}px`,
            width: `${(8 / scale) * 100}px`,
            height: `${(20 / scale) * 100}px`,
          }"
          @mousedown.self="(e) => scaleWidth('right')"
        ></div>
        <div
          v-if="layerType === 'image'"
          class="width-tool top"
          :style="{
            left: `calc(50% - ${(5 / scale) * 100}px)`,
            top: `${(-10 / scale) * 100}px`,
            width: `${(20 / scale) * 100}px`,
            height: `${(20 / scale) * 100}px`,
          }"
          @mousedown.self="zoom('top')"
        ></div>
        <div
          v-if="layerType === 'image'"
          class="width-tool bottom"
          :style="{
            left: `calc(50% - ${(5 / scale) * 100}px)`,
            bottom: `${(-10 / scale) * 100}px`,
            width: `${(20 / scale) * 100}px`,
            height: `${(20 / scale) * 100}px`,
          }"
          @mousedown.self="zoom('top')"
        ></div>
      </div>
      <div class="scale-tools bottom" @mousedown.self="move">
        <div
          class="scale-tool bl"
          :style="{
            marginLeft: `${(-10 / scale) * 100}px`,
            marginBottom: `${(-10 / scale) * 100}px`,
            width: `${(20 / scale) * 100}px`,
            height: `${(20 / scale) * 100}px`,
          }"
          @mousedown="zoom('bl')"
        ></div>
        <div
          class="scale-tool br"
          :style="{
            marginRight: `${(-10 / scale) * 100}px`,
            marginBottom: `${(-10 / scale) * 100}px`,
            width: `${(20 / scale) * 100}px`,
            height: `${(20 / scale) * 100}px`,
          }"
          @mousedown="zoom('br')"
        ></div>
      </div>
    </div>
    <div class="text-exit-mask" v-if="layerType === 'text'">
      <textarea
        autofocus
        ref="textarea"
        v-show="editIndex === index"
        class="text-exit-box"
        :style="{
          left: '-3px',
          width: `${width + 5}px`,
          color: `${color}`,
          textAlign: `${textAlign}`,
          fontSize: `${fontSize}px`,
          fontWeight: fontWeight,
          lineHeight: lineHeight,
          letterSpacing: `${letterSpacing}px`,
        }"
        @blur="saveEdit"
        @change="changeTextValue"
        v-model="value"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { loadStyle } from "~/utils/editor";
import fontMap from "~/config/fontMap";
export default {
  props: {
    height: Number,
    width: Number,
    left: Number,
    top: Number,
    scale: Number,
    color: String,
    fontSize: Number,
    textAlign: String,
    fontWeight: Number,
    lineHeight: Number,
    letterSpacing: Number,
    index: Number,
    value: String,
    layerType: String,
  },
  data() {
    this.fontMap = fontMap;
    return {
      host:
        process.env.NODE_ENV === "development"
          ? process.env.DEV_HOST
          : process.env.PRO_HOST,
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      editIndex: (state) => state.editor.editIndex,
      currentIndex: (state) => state.editor.currentIndex,
      layers: (state) => state.editor.layers,
    }),
    textHeight: () => {
      if (lineHeight) {
      }
    },
  },
  methods: {
    editText() {
      if (this.layers[this.currentIndex].type === "text") {
        this.$store.commit("editor/setEditIndex", this.index);
        this.$refs["textarea"].focus();
        this.$refs["textarea"].select();
      }
    },
    saveEdit() {
      const fontFamily = this.layers[this.index].style.fontFamily;
      const [font] = this.fontMap.filter(
        (item) => item.fontName === fontFamily
      );
      this.$store
        .dispatch("editor/getFontFile", {
          fontName: font.id,
          index: this.index,
        })
        .then((res) => {
          loadStyle(`${this.host}/fonts/${res.data.data}.css`);
          this.$store.commit("editor/setEditIndex", -1);
        });
    },
    changeTextValue(e) {
      this.$store.commit("editor/changeLayer", {
        attr: "value",
        value: e.target.value,
        index: this.index,
      });
    },
    getHeight() {
      if (this.layerType === "text") {
        return this.lineHeight * this.height;
      } else if (this.layerType === "image") {
        return this.height;
      }
    },
    move() {
      if (this.editIndex !== this.index) {
        document.onmousemove = (e) => {
          const left = this.left + (e.movementX / this.scale) * 100;
          const top = this.top + (e.movementY / this.scale) * 100;
          this.$store.commit("editor/moveLayer", {
            top,
            left,
            index: this.index,
          });
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    },
    zoom(mode) {
      const layerType = this.layerType;
      const scale = this.width / this.height;
      document.onmousemove = (e) => {
        let maxMove = Math.max(Math.abs(e.movementX), Math.abs(e.movementY));
        let fontMove = e.movementY;
        const type =
          e.movementX >= 0
            ? e.movementY >= 0
              ? "br"
              : "tr"
            : e.movementY >= 0
            ? "bl"
            : "tl";
        let width = this.width,
          height = this.height,
          left = this.left,
          top = this.top,
          fontSize = this.fontSize;
        if (mode === "left") {
          width -= (e.movementX / this.scale) * 100;
          left += (e.movementX / this.scale) * 100;
        } else if (mode === "right") {
          width += (e.movementX / this.scale) * 100;
        } else if (mode === "top") {
          top += (e.movementY / this.scale) * 100;
          height -= (e.movementY / this.scale) * 100;
        } else if (mode === "bottom") {
          height += (e.movementY / this.scale) * 100;
        } else if (mode === "tl") {
          if (type === "tl") {
            width += (maxMove / this.scale) * 100;
            left -= (maxMove / this.scale) * 100;
            height += (maxMove / scale / this.scale) * 100;
            top -= (maxMove / scale / this.scale) * 100;
            if (layerType === "text") {
              fontSize = Number(
                String(fontSize + (maxMove / this.scale / scale) * 100).replace(
                  /^(.*\..{5}).*$/,
                  "$1"
                )
              );
            }
          } else if (type === "br" && width > 5 && height > 5) {
            width += (-maxMove / this.scale) * 100;
            left -= (-maxMove / this.scale) * 100;
            height += (-maxMove / scale / this.scale) * 100;
            top -= (-maxMove / scale / this.scale) * 100;
            if (layerType === "text") {
              fontSize = Number(
                String(fontSize - (maxMove / this.scale / scale) * 100).replace(
                  /^(.*\..{5}).*$/,
                  "$1"
                )
              );
            }
          }
        } else if (mode === "tr") {
          if (type === "tr") {
            width += (maxMove / this.scale) * 100;
            height += (maxMove / scale / this.scale) * 100;
            top -= (maxMove / scale / this.scale) * 100;
            if (layerType === "text") {
              fontSize = Number(
                String(fontSize + (maxMove / this.scale / scale) * 100).replace(
                  /^(.*\..{5}).*$/,
                  "$1"
                )
              );
            }
          } else if (type === "bl" && width > 5 && height > 5) {
            width += (-maxMove / this.scale) * 100;
            height += (-maxMove / scale / this.scale) * 100;
            top -= (-maxMove / scale / this.scale) * 100;
            if (layerType === "text") {
              fontSize = Number(
                String(fontSize - (maxMove / this.scale / scale) * 100).replace(
                  /^(.*\..{5}).*$/,
                  "$1"
                )
              );
            }
          }
        } else if (mode === "bl") {
          if (type === "bl") {
            width += (maxMove / this.scale) * 100;
            left -= (maxMove / this.scale) * 100;
            height += (maxMove / scale / this.scale) * 100;
            if (layerType === "text") {
              fontSize = Number(
                String(fontSize - (maxMove / this.scale / scale) * 100).replace(
                  /^(.*\..{5}).*$/,
                  "$1"
                )
              );
            }
          } else if (type === "tr" && width > 5 && height > 5) {
            width += (-maxMove / this.scale) * 100;
            left -= (-maxMove / this.scale) * 100;
            height += (-maxMove / scale / this.scale) * 100;
            if (layerType === "text") {
              fontSize = Number(
                String(fontSize + (maxMove / this.scale / scale) * 100).replace(
                  /^(.*\..{5}).*$/,
                  "$1"
                )
              );
            }
          }
        } else if (mode === "br") {
          if (type === "br") {
            width += (maxMove / this.scale) * 100;
            height += (maxMove / scale / this.scale) * 100;
            if (layerType === "text") {
              fontSize = Number(
                String(fontSize + (maxMove / this.scale / scale) * 100).replace(
                  /^(.*\..{5}).*$/,
                  "$1"
                )
              );
            }
          } else if (type === "tl" && width > 5 && height > 5) {
            width += (-maxMove / this.scale) * 100;
            height += (-maxMove / scale / this.scale) * 100;
            if (layerType === "text") {
              fontSize = Number(
                String(fontSize - (maxMove / this.scale / scale) * 100).replace(
                  /^(.*\..{5}).*$/,
                  "$1"
                )
              );
            }
          }
        }
        this.$store.commit("editor/changeLayer", {
          attr: "top",
          value: top,
          index: this.index,
        });
        this.$store.commit("editor/changeLayer", {
          attr: "left",
          value: left,
          index: this.index,
        });
        this.$store.commit("editor/changeLayer", {
          attr: "width",
          value: width,
          index: this.index,
        });
        this.$store.commit("editor/changeLayer", {
          attr: "height",
          value: height,
          index: this.index,
        });
        if (layerType === "text") {
          this.$store.commit("editor/changeLayer", {
            attr: "fontSize",
            value: fontSize,
            index: this.index,
          });
        }
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    scaleWidth(mode) {
      document.onmousemove = (e) => {
        let width = this.width,
          left = this.left;
        if (mode === "left") {
          width -= (e.movementX / this.scale) * 100;
          left += (e.movementX / this.scale) * 100;
        } else if (mode === "right") {
          width += (e.movementX / this.scale) * 100;
        }
        this.$store.commit("editor/changeLayer", {
          attr: "left",
          value: left,
          index: this.index,
        });
        this.$store.commit("editor/changeLayer", {
          attr: "width",
          value: width,
          index: this.index,
        });
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    openEditTool() {
      this.$store.commit("editor/editLayer", this.index);
    },
  },
};
</script>

<style lang="scss">
.edit-mask {
  position: absolute;
  cursor: pointer;

  &:hover {
    border: 1px solid #f5e97c;
  }

  .text-exit-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    .text-exit-box {
      position: absolute;
      background-color: inherit;
      margin: 0;
      border: 0;
      outline: none;
      height: 100%;
      resize: none;
      overflow: hidden;

      &::selection {
        background: #1890ff;
      }
    }
  }

  &.edit-text {
    cursor: text !important;

    .text-exit-mask {
      z-index: 10;
    }
  }

  &.edit {
    border: 1px dashed #8a8a8a;
    z-index: 9999;
    cursor: move;

    .edit-tools {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // justify-content: center;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }

    .scale-tool {
      position: absolute;
      background-image: url(~assets/images/assetCircle.svg);
      background-position: 0 0;
      background-size: 100% 100%;
      background-repeat: no-repeat;

      &.tl {
        top: 0;
        left: 0;
        cursor: nw-resize;
        transform: rotate(90deg);
      }

      &.tr {
        top: 0;
        right: 0;
        cursor: ne-resize;
        transform: rotate(180deg);
      }

      &.bl {
        bottom: 0;
        left: 0;
        cursor: sw-resize;
        transform: rotate(0deg);
      }

      &.br {
        bottom: 0;
        right: 0;
        cursor: se-resize;
        transform: rotate(-90deg);
      }
    }

    .width-tool {
      position: absolute;
      background-image: url(~assets/images/scalewidth.svg);
      background-position: 0 0;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      z-index: 10;

      &.top {
        transform: rotate(90deg);
        cursor: n-resize;
      }

      &.bottom {
        transform: rotate(90deg);
        cursor: s-resize;
      }

      &.left {
        cursor: w-resize;
      }

      &.right {
        right: 0;
        cursor: e-resize;
      }
    }
  }
}
</style>
