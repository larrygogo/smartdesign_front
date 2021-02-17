<template>
  <div class="page">
    <EditorHeader />
    <div class="editor" v-loading="loading">
      <template-editor />
      <LayerTool />
      <Attribute />
      <slider />
      <scale-tool />
    </div>
  </div>
</template>

<script>
import EditorHeader from '@/components/pub/EditorHeader'
import Slider from "../components/editor/slider";
import Attribute from "../components/editor/Attribute";
import TemplateEditor from "../components/editor/template-editor";
import LayerTool from "../components/editor/tools/layer-tool";
import ScaleTool from "../components/editor/tools/scale-tool";
export default {
  layout: 'editor',
  middleware: "verify",
  head: {
    title: "编辑我的设计"
  },
  components: {
    EditorHeader,
    Slider,
    ScaleTool,
    LayerTool,
    TemplateEditor,
    Attribute
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
    
  }
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: #202020;

}
.editor {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-left: 80px;
  padding-right: 300px; */
  height: 100vh;
}
</style>