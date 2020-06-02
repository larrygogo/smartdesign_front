<template>
  <div
    class="image-layer"
    :style="{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        
    }"
  >
    <div
      class="edit-mask"
      :class=" {edit: index === currentIndex}"
      @mousedown.self="move"
      @click="openEditTool"
    >
      <div class="edit-tools" v-if="index === currentIndex" @mousedown.self="move">
        <div
          class="scale-tool tl"
          :style="{left: `${-20 / scale * 100}px`,top: `${-20 / scale * 100}px`, width: `${20 / scale * 100}px`, height: `${20 / scale * 100}px`}"
          @mousedown="zoom('tl')"
        ></div>
        <div
          class="scale-tool tr"
          :style="{right: `${-20 / scale * 100}px`, top: `${-20 / scale * 100}px`, width: `${20 / scale * 100}px`, height: `${20 / scale * 100}px`}"
          @mousedown="zoom('tr')"
        ></div>
        <div
          class="scale-tool bl"
          :style="{left: `${-20 / scale * 100}px`, bottom: `${-20 / scale * 100}px`, width: `${20 / scale * 100}px`, height: `${20 / scale * 100}px`}"
          @mousedown="zoom('bl')"
        ></div>
        <div
          class="scale-tool br"
          :style="{right: `${-20 / scale * 100}px`, bottom: `${-20 / scale * 100}px`, width: `${20 / scale * 100}px`, height: `${20 / scale * 100}px`}"
          @mousedown="zoom('br')"
        ></div>
        <div
          class="width-tool top"
          :style="{left: `calc(50% - ${5 / scale * 100}px)`, top: `${-15 / scale * 100}px`, width: `${10 / scale * 100}px`, height: `${10 / scale * 100}px`}"
          @mousedown.self="zoom('top')"
        ></div>

        <div
          class="width-tool left"
          :style="{left: `${-15 / scale * 100}px`, top: `calc(50% - ${5 / scale * 100}px)`, width: `${10 / scale * 100}px`, height: `${10 / scale * 100}px`}"
          @mousedown.self="zoom('left')"
        ></div>
        <div
          class="width-tool right"
          :style="{right: `${-15 / scale * 100}px`, top: `calc(50% - ${5 / scale * 100}px)`, width: `${10 / scale * 100}px`, height: `${10 / scale * 100}px`}"
          @mousedown.self="zoom('right')"
        ></div>

        <div
          class="width-tool bottom"
          :style="{left: `calc(50% - ${5 / scale * 100}px)`, bottom: `${-15 / scale * 100}px`, width: `${10 / scale * 100}px`, height: `${10 / scale * 100}px`}"
          @mousedown.self="zoom('bottom')"
        ></div>
      </div>
    </div>
    <div
      class="image-area"
      :style="{opacity: opacity, transform: `matrix(${transform.xx}, ${transform.xy}, ${transform.yx}, ${transform.yy}, ${transform.tx},  ${transform.ty})`}"
    >
      <img :src="image" />
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
    image: {
      type: String,
      default: () => {
        return "";
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
    height: {
      type: Number,
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
    transform: {
      type: Object,
      default: () => {
        return {
          xx: 1,
          xy: 0,
          yx: 0,
          yy: 1,
          tx: 0,
          ty: 1
        };
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
    zoom(mode) {
      const scale = this.width / this.height
      document.onmousemove = e => {
        let maxMove = Math.max(Math.abs(e.movementX), Math.abs(e.movementY));
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
          top = this.top;
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
          } else if (type === "br" && width > 5 && height > 5) {
            width += (-maxMove / this.scale) * 100;
            left -= (-maxMove / this.scale) * 100;
            height += (-maxMove / scale / this.scale) * 100;
            top -= (-maxMove / scale / this.scale) * 100;
          }
        } else if (mode === "tr") {
          if (type === "tr") {
            width += (maxMove / this.scale) * 100;
            height += (maxMove / scale / this.scale) * 100;
            top -= (maxMove / scale / this.scale) * 100;
          } else if (type === "bl" && width > 5 && height > 5) {
            width += (-maxMove / this.scale) * 100;
            height += (-maxMove / scale / this.scale) * 100;
            top -= (-maxMove / scale / this.scale) * 100;
          }
        } else if (mode === "bl") {
          if (type === "bl") {
            width += (maxMove / this.scale) * 100;
            left -= (maxMove / this.scale) * 100;
            height += (maxMove / scale / this.scale) * 100;
          } else if (type === "tr" && width > 5 && height > 5) {
            width += (-maxMove / this.scale) * 100;
            left -= (-maxMove / this.scale) * 100;
            height += (-maxMove / scale / this.scale) * 100;
          }
        } else if (mode === "br") {
          if (type === "br") {
            width += (maxMove / this.scale) * 100;
            height += (maxMove / scale / this.scale) * 100;
          } else if (type === "tl" && width > 5 && height > 5) {
            width += (-maxMove / this.scale) * 100;
            height += (-maxMove / scale / this.scale) * 100;
          }
        }
        this.$store.commit("editor/changeLayer", {
          attr: "top",
          value: top,
          index: this.index
        });
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
        this.$store.commit("editor/changeLayer", {
          attr: "height",
          value: height,
          index: this.index
        });
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.image-layer {
  position: absolute;
  transform-origin: 0px 0px 0px;
  user-select: none;

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
        top: -10px;
        left: -10px;
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

    .width-tool {
      position: absolute;
      background-image: url(~assets/images/assetSquare.svg);
      background-position: 0 0;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      z-index: 10;

      &.top {
        cursor: n-resize;
      }

      &.bottom {
        cursor: s-resize;
      }

      &.left {
        cursor: w-resize;
      }

      &.right {
        cursor: e-resize;
      }
    }
  }

  .image-area {
    cursor: move;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      transform-origin: 0px 0px 0px;
    }
  }
}
</style>