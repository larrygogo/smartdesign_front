<template>
  <div
    class="template-editor"
    :style="{width: `${width}px`, height: `${height}px`, background: background, transform: `scale(${scale / 100})`}"
    @click.self="seleteTemplate"
  >
    <template v-for="(item, index) in layers">
      <text-layer
        v-if="item.type === 'text'"
        :key="index"
        :index="index"
        :scale="scale"
        :value="item.value"
        :top="item.style.top"
        :left="item.style.left"
        :width="item.style.width"
        :color="item.style.color"
        :fontSize="item.style.fontSize"
        :fontFamily="item.style.fontFamily"
        :fontWeight="item.style.fontWeight"
        :lineHeight="item.style.lineHeight"
        :textAlign="item.style.textAlign"
        :opacity="item.style.opacity"
        :letterSpacing="item.style.letterSpacing"
      />
      <image-layer
        v-if="item.type === 'image'"
        :key="index"
        :index="index"
        :scale="scale"
        :image="item.image"
        :top="item.style.top"
        :left="item.style.left"
        :width="item.style.width"
        :height="item.style.height"
        :opacity="item.style.opacity"
        :scaleX="item.style.scaleX"
        :scaleY="item.style.scaleY"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import textLayer from "./text-layer";
import imageLayer from "./image-layer";
export default {
  components: {
    textLayer,
    imageLayer
  },
  computed: {
    ...mapState({
      width: state => state.editor.width,
      height: state => state.editor.height,
      background: state => state.editor.background,
      layers: state => state.editor.layers,
      scale: state => state.editor.templateScale
    })
  },
  methods: {
    changeTemplate(attr, value) {
      this.template[attr] = value;
    },
    moveLayer(top, left, index) {
      this.$store.commit("editor/moveLayer", top, left, index);
    },
    seleteTemplate() {
      this.$store.commit("editor/setTemplate", {
        attr: "currentIndex",
        value: -1
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.template-editor {
  position: relative;
  background: #fff;
  overflow: hidden;
}
</style>