<template>
  <div class="text-tool" v-if="layers[currentIndex] && layers[currentIndex].type === 'image'">
    <el-form>
      <el-form-item label="翻转">
        <el-button
          class="input tool-btn"
          :type="scaleX === 1 ? 'default' : scaleX === -1 ? 'warning' : 'default'"
          @click="scale('x')"
        ><i class="iconfont icon-scale-x"></i> 水平</el-button>
        <el-button
          class="input tool-btn"
          :type="scaleY === 1 ? 'default' : scaleY === -1 ? 'warning' : 'default'"
          @click="scale('y')"
        ><i class="iconfont icon-scale-y"></i> 垂直</el-button>
      </el-form-item>
      <el-form-item label="透明度">
        <div class="block">
          <el-slider v-model="opacity" :min="0" :max="1" :step="0.1"></el-slider>
        </div>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确定删除这个图层吗？" @onConfirm="deleteLayer">
          <el-button class="input" type="danger" slot="reference">删除图层</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: false,
      defaultColor: [
        "#000000",
        "#ffffff",
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585"
      ]
    };
  },
  computed: {
    ...mapState({
      currentIndex: state => state.editor.currentIndex,
      layers: state => state.editor.layers
    }),
    scaleX: {
      get() {
        return this.layers[this.currentIndex].style
          ? this.layers[this.currentIndex].style.transform.xx
          : 1;
      },
      set(value) {
        const transform = Object.assign({}, this.layers[this.currentIndex].style.transform)
        transform.xx = value
        this.changeLayer("transform", transform);
      }
    },
    scaleY: {
      get() {
        return this.layers[this.currentIndex].style
          ? this.layers[this.currentIndex].style.transform.yy
          : 1;
      },
      set(value) {
        const transform = Object.assign({}, this.layers[this.currentIndex].style.transform)
        transform.yy = value
        this.changeLayer("transform", transform);
      }
    },
    opacity: {
      get() {
        return this.layers[this.currentIndex].style
          ? this.layers[this.currentIndex].style.opacity
          : 1;
      },
      set(value) {
        this.changeLayer("opacity", value);
      }
    }
  },
  methods: {
    changeLayer(attr, value) {
      this.$store.commit("editor/changeLayer", {
        attr,
        value,
        index: this.currentIndex
      });
    },
    scale(mode) {
      console.log(mode)
      if(mode === 'x') {
        if(this.scaleX === 1) {
          this.scaleX = -1
        } else {
          this.scaleX = 1
        }
      } else if(mode === 'y') {
        if(this.scaleY === 1) {
          this.scaleY = -1
        } else {
          this.scaleY = 1
        }
      }
    },
    deleteLayer() {
      this.$store.commit("editor/deleteLayer", this.currentIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(~assets/font/iconfont.css);
.text-tool {
  position: absolute;
  top: 60px;
  right: 0;
  height: calc(100% - 60px);
  padding: 50px 20px;
  width: 300px;
  background-color: #fff;
  text-align: center;

  .input {
    width: 75%;
    height: 40px;
  }

  .tool-btn {
    width: 30%;
    padding: 0;
  }

  /deep/ {
    .el-color-picker__trigger {
      width: 100%;
    }
  }

  .block {
    display: block;
    width: 75%;
    padding: 0 20px;
    overflow: hidden;
  }
}
</style>