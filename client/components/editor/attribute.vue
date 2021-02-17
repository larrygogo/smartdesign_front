<template>
  <div class="attribute-row">
    <el-tabs class="attribute" v-model="tab" type="border-card">
      <el-tab-pane label="属性设置" name="1">
        <template v-if="layers[currentIndex]">
          <TextTool />
          <ImageTool />
        </template>
        <div class="nolayer" v-else>
          <img src="@/assets/images/nolayer.svg" alt="" srcset="" />
          <span>在画布中选择元素并开始编辑</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图层设置" name="2">
        <LayersTool />
      </el-tab-pane>
      <el-tab-pane label="画布设置" name="3">
        <TemplateTool />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TextTool from "./tools/text-tool";
import ImageTool from "./tools/image-tool";
import LayersTool from "./tools/layers-tool";
import TemplateTool from "./tools/template-tool";
export default {
  components: {
    TextTool,
    ImageTool,
    LayersTool,
    TemplateTool
  },
  computed: {
    ...mapState({
      currentIndex: state => state.editor.currentIndex,
      layers: state => state.editor.layers
    }),
    tab: {
      get() {
        return this.$store.state.editor.tab
      },
      set(tab) {
        this.$store.commit("editor/setTab", tab)
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.attribute-row {
  position: absolute;
  top: 60px;
  right: 0;
  height: calc(100% - 60px);
  width: 300px;
  background-color: #fff;
  text-align: center;
  color: #c5c5c5;

  .attribute {
    height: 100%;
    box-shadow: none;
    background: #2e2e31;
    border-color: #464444;

    /deep/.el-tabs__header {
      background: #464444;
      border-bottom: 1px solid #5f5f5f;

      .el-tabs__item.is-active {
        color: #fff;
        background: #2e2e31;
        border-right-color: #464444;
        border-left-color: #464444;
      }

      .el-tabs__item:hover {
        color: #fff;
      }
    }

    .nolayer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      img {
        width: 150px;
      }

      span {
        margin: 20px;
        color: #606266;
      }
    }
  }
}
</style>