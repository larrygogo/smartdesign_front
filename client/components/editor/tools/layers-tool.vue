<template>
  <div class="layers-tool" :class="{out: show}">
    <p class="title">拖拽图层排序</p>
    <div class="layer-list">
      <div
        class="layer-item"
        :class="{selcted: currentIndex === layers.length - 1 - index}"
        v-for="(layer, index) in layers"
        v-dragging="{ item: layer, list: layers, group: 'layers' }"
        :key="index"
        @click="selectLayer(index)"
        @dblclick="renameLayer(index)"
      > 
        <div class="icon">
          <i v-if="layer.type === 'text'" 
            class="iconfont icon-text"></i>
          <i v-if="layer.type === 'image'" 
          class="iconfont icon-image"></i>
        </div>
        <span v-if="renameIndex !== index">{{layer.name}}</span>
        <el-input v-else placeholder="请输入内容" v-model="rename" class="input-with-select">
          <el-button slot="append" icon="el-icon-check" @click="finishRename"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *  图层的操作是layers逆序之后的
 */
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      currentIndex: state => state.editor.currentIndex
    }),
    show: {
      get() {
        const show = this.$store.state.editor.tools.layers;
        if (!show) {
          this.renameIndex = -1;
        }
        return show;
      },
      set(value) {
        this.$store.commit("editor/setTemplate", {
          attr: "layersTool",
          value
        });
      }
    }
  },
  watch: {
    "$store.state.editor.layers"(value) {
      this.layers = value.map(item => item).reverse();
    }
  },
  mounted() {
    this.layers = this.$store.state.editor.layers.map(item => item).reverse();
    this.$dragging.$on("dragged", e => {
      this.$nextTick(() => {
        this.$store.commit("editor/setTemplate", {
          attr: "layers",
          value: this.layers.map(item => item).reverse()
        });
      });
    });
  },
  data() {
    return {
      renameIndex: -1,
      rename: "",
      layers: []
    };
  },
  methods: {
    selectLayer(index) {
      this.$store.commit("editor/setTemplate", {
        attr: "currentIndex",
        value: this.layers.length - 1 - index
      });
    },
    renameLayer(index) {
      this.rename = this.layers[index].name;
      this.renameIndex = index;
    },
    finishRename() {
      this.$store.commit("editor/changeLayer", {
        index: this.layers.length - 1 - this.renameIndex,
        attr: "name",
        value: this.rename
      });
      this.renameIndex = -1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(~assets/font/iconfont.css);
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes fadeOutLeft {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}
.layers-tool {

  .title {
    width: 100%;
    height: 30px;
    font-size: 14px;
    color: #636363;
    font-weight: 400;
    text-align: left;
  }

  .layer-list {
    overflow: scroll;
    border: 1px solid #868686;

    .layer-item {
      position: relative;
      border-bottom: 1px dotted #d8d8d8;
      text-align: center;
      color: #636363;
      line-height: 40px;
      cursor: pointer;

      &.selcted {
        color: #fff;
        background-color: #636363;
      }

      &:last-of-type {
        border-bottom: 0px;
      }

      .icon {
        position: absolute;
        left: 20px;
      }
    }
  }
}
</style>