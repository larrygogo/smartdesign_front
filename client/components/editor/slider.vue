<template>
  <div class="editor-slider">
    <ul class="slider-nav">
      <li title="文本" @click="addTextLayer">
        <i class="iconfont icon-text"></i>
      </li>
      <li title="图片" @click="checkImage" v-loading.full="loading">
        <i class="iconfont icon-image"></i>
        <input class="image-file-input" id="imageFile" @change="handleFileChange" ref="imageFile" type="file" />
      </li>
    </ul>
    <ul class="slider-nav">
      <li :class="{clicked: layersTool}" title="图层" @click="layersTool = !layersTool">
        <i class="iconfont icon-layers"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      count: state => state.editor.count
    }),
    header: {
      get() {
        return {
          Authorization: `Bearer ${this.$store.state.user.token}`
        };
      }
    },
    layersTool: {
      get() {
        return this.$store.state.editor.tools.layers
      },
      set(value) {
        this.$store.commit("editor/setTemplate", {
          attr: "layersTool",
          value
        })
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    checkImage() {
      let inputDOM = this.$refs.imageFile;
      inputDOM.click()
    },
    handleFileChange() {
      let inputDOM = this.$refs.imageFile;
      const file = inputDOM.files[0];// 通过DOM取文件数据
      if(file) {
        const size = Math.floor(file.size / 1024);//计算文件的大小　
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
          const base64 = e.target.result;
          const img = new Image();
          img.src = base64;
          img.onload = () => {
            const width = img.naturalWidth
            const height = img.naturalHeight
            const formData = new FormData();
            formData.append("file", file); 
            const options = {  
              url: '/template/uploadImage',
              data: formData,
              method: 'post',
              headers: this.header
            }
            this.loading = true
            this.$axios(options).then((res) => {
              this.loading = false
              if(res.status === 200 && res.data.code === "0") {
                console.log(res.data)
                this.addImageLayer(res.data.data, width, height)
              } else {
                this.$message.error("图片上传失败")
              }
            })
          }
        }
      }
    },
    addTextLayer() {
      this.$store.commit("editor/addLayer", {
        name: "文本" + this.count,
        type: "text",
        value: "默认文本",
        style: {
          top: 50,
          left: 50,
          width: 200,
          color: "#000000",
          fontSize: 34,
          fontFamily: "Microsoft YaHei",
          fontWeight: 500,
          lineHeight: 1.2,
          textAlign: "center",
          opacity: 1,
          letterSpacing: 0
        }
      });
    },
    addImageLayer(src = "", width, height) {
      this.$store.commit("editor/addLayer", {
        name: "图像" + this.count,
        type: "image",
        image: src,
        style: {
          top: 50,
          left: 50,
          width: width,
          height: height,
          opacity: 1,
          transform: {xx: 1, xy: 0, yx: 0, yy: 1, tx: 0, ty: 1}
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(~assets/font/iconfont.css);
.editor-slider {
  position: absolute;
  left: 0;
  top: 60px;
  height: calc(100% - 60px);
  background-color: #fff;
  width: 80px;
  padding: 20px 0 0;
  border-right: 1px solid #f1f3f7;

  .slider-nav {
    list-style: none;
    padding: 20px 0;

    &:not(:last-of-type) {
      border-bottom: 1px dashed #f1f3f7;
    }

    li {
      text-align: center;
      height: 80px;
      line-height: 80px;
      cursor: pointer;
      &:hover {
        .iconfont {
          color: #f8cc0b;
        }
      }

      .iconfont {
        font-size: 30px;
        color: #636363;
      }

      &.clicked {
        .iconfont {
          color: #f8cc0b;
        }
      }

      .image-file-input {
        display: none;
      }
    }
  }
}

/deep/ {
  .layer-tool {
    outline: none;
    position: absolute;
    left: 80px;
    top: 60px;
    height: calc(100% - 60px);
    box-shadow: none;
  }
}
</style>