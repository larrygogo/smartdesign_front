<template>
  <div class="editor-slider">
    <ul class="slider-nav">
      <li title="文本" @click="addTextLayer">
        <i class="iconfont icon-text"></i>
      </li>
      <li title="图片" @click="addImageLayer">
        <i class="iconfont icon-image"></i>
      </li>
    </ul>
    <ul class="slider-nav">
      <li :class="{clicked: layersTool}" title="图层" @click="layersTool = !layersTool">
        <i class="iconfont icon-layers"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      count: state => state.editor.count
    }),
    layersTool: {
      get() {
        return this.$store.state.editor.tools.layers
      },
      set(value) {
        this.$store.commit("editor/setTemplate", {
          attr: "layersTool",
          value
        })
      }
    }
  },
  methods: {
    addTextLayer() {
      this.$store.commit("editor/addLayer", {
        name: "文本" + this.count,
        type: "text",
        value: "默认文本",
        style: {
          top: 50,
          left: 50,
          width: 200,
          color: "#000000",
          fontSize: 34,
          fontFamily: "Microsoft YaHei",
          fontWeight: 500,
          lineHeight: 1.2,
          textAlign: "center",
          opacity: 1,
          letterSpacing: 0
        }
      });
    },
    addImageLayer() {
      this.$store.commit("editor/addLayer", {
        name: "图像" + this.count,
        type: "image",
        image: "/images/ls.png",
        style: {
          top: 50,
          left: 50,
          width: 200,
          height: 200,
          opacity: 1,
          scaleX: 1,
          scaleY: 1
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(~assets/font/iconfont.css);
.editor-slider {
  position: absolute;
  left: 0;
  top: 60px;
  height: calc(100% - 60px);
  background-color: #fff;
  width: 80px;
  padding: 20px 0 0;
  border-right: 1px solid #f1f3f7;

  .slider-nav {
    list-style: none;
    padding: 20px 0;

    &:not(:last-of-type) {
      border-bottom: 1px dashed #f1f3f7;
    }

    li {
      text-align: center;
      height: 80px;
      line-height: 80px;
      cursor: pointer;
      &:hover {
        .iconfont {
          color: #f8cc0b;
        }
      }

      .iconfont {
        font-size: 30px;
        color: #636363;
      }

      &.clicked {
        .iconfont {
          color: #f8cc0b;
        }
      }
    }
  }
}

/deep/ {
  .layer-tool {
    outline: none;
    position: absolute;
    left: 80px;
    top: 60px;
    height: calc(100% - 60px);
    box-shadow: none;
  }
}
</style>