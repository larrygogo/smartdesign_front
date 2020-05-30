<template>
  <div
    class="text-layer"
    :style="{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        color: color,
        fontSize: `${fontSize}px`,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        textAlign: textAlign,
        lineHeight: lineHeight,
        letterSpacing: `${letterSpacing}px`
    }"
  >
    <div
      class="edit-mask"
      :class=" {edit: index === currentIndex}"
      @mousedown.self="move"
      @click="openEditTool"
    >
      <div class="edit-tools" v-if="index === currentIndex" @mousedown.self="move">
        <!-- <div class="scale-tools top" @mousedown.self="move">
          <div
            class="scale-tool tl"
            :style="{marginLeft: `${-10 / scale * 100}px`, marginTop: `${-10 / scale * 100}px`, width: `${20 / scale * 100}px`, height: `${20 / scale * 100}px`}"
            @mousedown="zoom('tl')"
          ></div>
          <div
            class="scale-tool tr"
            :style="{marginRight: `${-10 / scale * 100}px`, marginTop: `${-10 / scale * 100}px`, width: `${20 / scale * 100}px`, height: `${20 / scale * 100}px`}"
            @mousedown="zoom('tr')"
          ></div>
        </div>-->
        <div class="width-tools" @mousedown.self="move">
          <div
            class="width-tool left"
            :style="{marginLeft: `${-5 / scale * 100}px`, width: `${10 / scale * 100}px`, height: `${10 / scale * 100}px`}"
            @mousedown.self="scaleLeftWidth"
          ></div>
          <div
            class="width-tool right"
            :style="{marginRight: `${-5 / scale * 100}px`, width: `${10 / scale * 100}px`, height: `${10 / scale * 100}px`}"
            @mousedown.self="e => scaleWidth('right')"
          ></div>
        </div>
        <!-- <div class="scale-tools bottom" @mousedown.self="move">
          <div
            class="scale-tool bl"
            :style="{marginLeft: `${-10 / scale * 100}px`, marginBottom: `${-10 / scale * 100}px`, width: `${20 / scale * 100}px`, height: `${20 / scale * 100}px`}"
            @mousedown="zoom('bl')"
          ></div>
          <div
            class="scale-tool br"
            :style="{marginRight: `${-10 / scale * 100}px`, marginBottom: `${-10 / scale * 100}px`, width: `${20 / scale * 100}px`, height: `${20 / scale * 100}px`}"
            @mousedown="zoom('br')"
          ></div>
        </div>-->
      </div>
    </div>
    <div class="text-area" :style="{opacity: opacity}">
      <span>{{value}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    index: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    scale: {
      type: Number,
      default: () => {
        return 100;
      }
    },
    value: {
      type: String,
      default: () => {
        return "默认文本";
      }
    },
    top: {
      type: Number,
      default: () => {
        return 100;
      }
    },
    left: {
      type: Number,
      default: () => {
        return 100;
      }
    },
    width: {
      type: Number,
      default: () => {
        return 100;
      }
    },
    color: {
      type: String,
      default: () => {
        return "#000000";
      }
    },
    opacity: {
      type: Number,
      default: () => {
        return 1;
      }
    },
    fontSize: {
      type: Number,
      default: () => {
        return 24;
      }
    },
    fontFamily: {
      type: String,
      default: () => {
        return "";
      }
    },
    fontWeight: {
      type: Number,
      default: () => {
        return 500;
      }
    },
    textAlign: {
      type: String,
      default: () => {
        return "center";
      }
    },
    lineHeight: {
      type: Number,
      default: () => {
        return 1.2;
      }
    },
    letterSpacing: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },
  computed: mapState({
    currentIndex: state => state.editor.currentIndex
  }),
  methods: {
    move(e) {
      document.onmousemove = e => {
        const left = this.left + (e.movementX / this.scale) * 100;
        const top = this.top + (e.movementY / this.scale) * 100;
        this.$store.commit("editor/moveLayer", {
          top,
          left,
          index: this.index
        });
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    openEditTool() {
      this.$store.commit("editor/editLayer", this.index);
    },
    scaleWidth(mode) {
      document.onmousemove = e => {
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
          index: this.index
        });
        this.$store.commit("editor/changeLayer", {
          attr: "width",
          value: width,
          index: this.index
        });
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    zoom(mode) {
      let font = 0;
      document.onmousemove = e => {};
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.text-layer {
  position: absolute;
  transform-origin: 0px 0px 0px;

  span {
    user-select: none;
  }

  .edit-mask {
    position: absolute;
    box-sizing: content-box;
    padding: 10px;
    top: -10px;
    left: -10px;
    width: 100%;
    height: 100%;
    cursor: move;
    z-index: 10;

    &:hover {
      border: 2px solid #f5e97c;
    }

    &.edit {
      border: 1px dashed #8a8a8a;
    }

    .edit-tools {
      position: absolute;
      display: flex;
      flex-direction: column;
      //   justify-content: space-between;
      justify-content: center;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }

    .scale-tools {
      display: flex;
      justify-content: space-between;

      .scale-tool {
        background-image: url(~assets/images/assetCircle.svg);
        background-position: 0 0;
        background-size: 100% 100%;
        background-repeat: no-repeat;

        &.tl {
          cursor: nw-resize;
          transform: rotate(90deg);
        }

        &.tr {
          cursor: ne-resize;
          transform: rotate(180deg);
        }

        &.bl {
          cursor: sw-resize;
          transform: rotate(0deg);
        }

        &.br {
          cursor: se-resize;
          transform: rotate(-90deg);
        }
      }
    }
    .width-tools {
      display: flex;
      justify-content: space-between;

      .width-tool {
        background-image: url(~assets/images/assetSquare.svg);
        background-position: 0 0;
        background-size: 100% 100%;
        background-repeat: no-repeat;

        &.left {
          cursor: w-resize;
        }

        &.right {
          cursor: e-resize;
        }
      }
    }
  }

  .text-area {
    transform-origin: 0px 0px 0px;
    text-decoration: inherit;
    cursor: move;
    word-break: break-all;
  }
}
</style>