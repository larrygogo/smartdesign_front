<template>
  <div
    ref="textLayer"
    class="text-layer"
    :style="{
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      color: color,
      fontSize: `${fontSize}px`,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textAlign: textAlign,
      lineHeight: lineHeight,
      letterSpacing: `${letterSpacing}px`,
    }"
  >
    <div class="text-area" :style="{ opacity: opacity }">
      <span v-show="editIndex !== index">{{ value }}</span>
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
    fontStyle: {
      type: String,
      default: () => {
        return "normal";
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
    editIndex:  state => state.editor.editIndex,
    currentIndex: state => state.editor.currentIndex
  }),
  data () {
    return {
      observer: null,
      firedNum: 0,
      recordOldValue: { // 记录下旧的宽高数据，避免重复触发回调函数
        width: '0',
        height: '0'
      }
    }
  },
  mounted() {
    this.listenHeight()
  },
  methods: {
    // 监听文字图层高度变化
    listenHeight() {
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      let element = this.$refs['textLayer']
      this.observer = new MutationObserver((mutationList) => {
        // for (let mutation of mutationList) {
        //   console.log(mutation)
        // }
        let width = getComputedStyle(element).getPropertyValue('width')
        let height = getComputedStyle(element).getPropertyValue('height')
        if (width === this.recordOldValue.width && height === this.recordOldValue.height) 
        return this.recordOldValue = {
          width,
          height
        }
        this.$store.commit("editor/changeLayer", {
          attr: 'height',
          value: Number(height.replace('px', '')),
          index: this.index
        });
        this.firedNum += 1
      })
      this.observer.observe(element, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })
    }
  },
  beforeDestroyed () {
    if (this.observer) {
      this.observer.disconnect()
      this.observer.takeRecords()
      this.observer = null
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
    // padding: 10px;
    // top: -10px;
    // left: -10px;
    width: 100%;
    height: 100%;
    cursor: move;
    z-index: 10;

    &:hover {
      border: 1px solid #f5e97c;
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