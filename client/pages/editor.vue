<template>
  <div class="editor" @click.self="initTool">
    <slider />
    <template-editor />
    <scale-tool />
    <template-tool />
    <text-tool />
    <image-tool />
  </div>
</template>

<script>
import Slider from "../components/editor/slider";
import TemplateEditor from "../components/editor/template-editor";
import ScaleTool from "../components/editor/tools/scale-tool";
import TextTool from "../components/editor/tools/text-tool";
import ImageTool from "../components/editor/tools/image-tool";
import TemplateTool from "../components/editor/tools/template-tool";
export default {
  head: {
    title: "编辑器"
  },
  middleware: "auth",
  components: {
    Slider,
    ScaleTool,
    TextTool,
    ImageTool,
    TemplateEditor,
    TemplateTool
  },
  data() {
    return {
      scale: 100
    };
  },
  mounted() {
      this.$store.commit("editor/initTemplate")
  },
  methods: {
    zoom(scale) {
        if(scale > 5 && scale < 155) {
            this.scale = scale;
        }
    },
    initTool() {
        this.$store.commit("editor/setTemplate", { attr: "currentIndex", value: -1})
    }
  }
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 100px;
  padding-right: 300px;
}
</style>