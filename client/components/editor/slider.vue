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
  </div>
</template>

<script>
export default {
  methods: {
    addTextLayer() {
      this.$store.commit("editor/addLayer", {
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

  .slider-nav {
    list-style: none;
    padding: 40px 0 0;

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
    }
  }
}
</style>