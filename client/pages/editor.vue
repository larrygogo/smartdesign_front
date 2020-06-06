<template>
  <div class="editor" @click.self="initTool" v-loading="loading">
    <template-editor />
    <layers-tool />
    <slider />
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
import layersTool from "../components/editor/tools/layers-tool";
export default {
  middleware: "verify",
  head: {
    title: "编辑器"
  },
  components: {
    Slider,
    ScaleTool,
    TextTool,
    ImageTool,
    layersTool,
    TemplateEditor,
    TemplateTool
  },
  data() {
    return {
      loading: false,
      scale: 100
    };
  },
  created() {
      const { id } = this.$route.query
      this.loading = true
      this.$store.commit("editor/initTemplate")
      if(id) {
        this.$store.dispatch("editor/getTemplate", id).finally(() => {
          this.loading = false
        })
      } else {
        this.loading = false
      }
  },
  methods: {
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