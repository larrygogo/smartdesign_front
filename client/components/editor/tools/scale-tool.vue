<template>
  <div class="scale-tool">
    <el-button class="scale-btn" type="text" @click="zoomOut" title="缩小">
      <i class="el-icon-minus" />
    </el-button>
    <span class="scale-value">{{ scale }}%</span>
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
  computed: {
    width: {
      get() {
        const width = this.$store.state.editor.width
        return width
      }
    },
    height: {
      get() {
        const height = this.$store.state.editor.height
        return height
      }
    },
    scale: {
      get() {
        const scale = this.$store.state.editor.templateScale
        return scale
      },
      set(value) {
        this.$store.commit("editor/setTemplate", { attr: "scale", value });
      }
    }
  },
  data() {
    return {
      defaultScale: 100
    }
  },
  mounted() {
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight
    if(this.width / this.height > 1 && this.width > winWidth * 0.8) {
      this.defaultScale = Math.ceil(winWidth / this.width * 0.8 * 100)
    } else if(this.width / this.height < 1 && this.height > winHeight * 0.9){
      this.defaultScale = Math.ceil(winHeight / this.height * 0.9 * 100)
    }
    this.scale = this.defaultScale
  },
  methods: {
    zoomOut() {
      if(this.scale > 10)
        this.scale -= 5
    },
    zoomIn() {
      if(this.scale < 150)
      this.scale += 5
    },
    reduction() {
      this.scale = this.defaultScale
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