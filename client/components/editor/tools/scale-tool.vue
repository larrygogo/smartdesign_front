<template>
  <div class="scale-tool">
    <el-button class="scale-btn" type="text" @click="zoomOut" title="缩小">
      <i class="el-icon-minus" />
    </el-button>
    <span class="scale-value">{{scale}}%</span>
    <el-button class="scale-btn" type="text" @click="zoomIn" title="放大">
      <i class="el-icon-plus" />
    </el-button>
    <el-button class="scale-btn" type="text" @click="reduction" title="原始比例">
      <i class="el-icon-full-screen" />
    </el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    scale: state => state.editor.templateScale
  }),
  methods: {
    zoomOut() {
      const scale = this.scale - 5;
      this.$store.commit("editor/setTemplate", { attr: "scale", value: scale });
    },
    zoomIn() {
      const scale = this.scale + 5;
      this.$store.commit("editor/setTemplate", { attr: "scale", value: scale });
    },
    reduction() {
      this.$store.commit("editor/setTemplate", { attr: "scale", value: 100 });
    }
  }
};
</script>

<style lang="scss" scoped>
.scale-tool {
  position: absolute;
  bottom: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 0px 20px;
  border-radius: 10px;
}

.scale-btn {
  font-size: 18px;
  color: #fff;
}

.scale-value {
  margin: 0 20px;
}
</style>