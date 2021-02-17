<template>
  <div class="layer-tool" @click.self="initTool">
    <div
      class="template-mask"
      :style="{
        left: `calc(50% - 110px - ${width / 2}px`,
        width: `${width}px`,
        minWidth: `${width}px`,
        height: `${height}px`,
        transform: `scale(${scale / 100})`,
      }"
    >
      <MaskTool
        v-for="(item, index) in layers"
        :key="index"
        :top="item.style.top"
        :left="item.style.left"
        :width="item.style.width"
        :height="item.style.height"
        :layerType="item.type"
        :value="item.value"
        :color="item.style.color"
        :fontSize="item.style.fontSize"
        :textAlign="item.style.textAlign"
        :fontWeight="item.style.fontWeight"
        :lineHeight="item.style.lineHeight"
        :letterSpacing="item.style.letterSpacing"
        :index="index"
        :scale="scale"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MaskTool from './mask-tool'
export default {
  components: {
    MaskTool
  },
  computed: {
    ...mapState({
      width: state => state.editor.width,
      height: state => state.editor.height,
      background: state => state.editor.background,
      layers: state => state.editor.layers,
      scale: state => state.editor.templateScale,
      currentIndex: state => state.editor.currentIndex
    })
  },
  methods: {
    initTool() {
      this.$store.commit("editor/setTemplate", { attr: "currentIndex", value: -1})
      this.$store.commit("editor/setTab", "3")
      this.$store.commit("editor/setTemplate", {
        attr: "editIndex",
        value: -1
      });
    }
  }
}
</script>

<style lang="scss">
.layer-tool {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .template-mask {
    position: absolute;
  }
}
</style>