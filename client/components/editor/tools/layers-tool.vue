<template>
  <div class="layers-tool" :class="{ out: show }">
    <div class="header">
      <p class="title">拖拽图层排序</p>
      <a-button size="small" class="tips-btn" @click="openLayerTagModal"
        >设置标签</a-button
      >
    </div>

    <div class="layer-list">
      <div
        class="layer-item"
        :class="{ selcted: currentIndex === layers.length - 1 - index }"
        v-for="(layer, index) in layers"
        v-dragging="{ item: layer, list: layers, group: 'layers' }"
        :key="index"
        @click="selectLayer(index)"
        @dblclick="renameLayer(index)"
      >
        <div class="icon">
          <i v-if="layer.type === 'text'" class="iconfont icon-text"></i>
          <i v-if="layer.type === 'image'" class="iconfont icon-image"></i>
        </div>
        <span v-if="renameIndex !== index">{{ layer.name }}</span>
        <el-input
          v-else
          placeholder="请输入内容"
          v-model="rename"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-check"
            @click="finishRename"
          ></el-button>
        </el-input>
      </div>
      <a-modal
        title="设置标签"
        :visible="layerTagVisible"
        :confirm-loading="confirmLoading"
        :okText="'保存'"
        :cancelText="'取消'"
        @ok="onLayerTagSubmit"
        @cancel="layerTagVisible = false"
      >
        <a-form-model
          ref="layerTagForm"
          :model="layerTagForm"
          :rules="layerTagFormRules"
          v-bind="layout"
        >
          <a-form-model-item has-feedback label="主文案" prop="mainText">
            <a-select
              v-model="layerTagForm.mainText"
              placeholder="请选择主文案图层"
              @change="changeLayerTag"
            >
              <a-select-option
                v-for="item in textLayers"
                :key="item._id"
                :value="item._id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item has-feedback label="副文案" prop="subText">
            <a-select
              v-model="layerTagForm.subText"
              placeholder="请选择副文案图层"
              @change="changeLayerTag"
            >
              <a-select-option
                v-for="item in textLayers"
                :key="item._id"
                :value="item._id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item has-feedback label="行动文案" prop="actionText">
            <a-select
              v-model="layerTagForm.actionText"
              placeholder="请选择行动文案图层"
              @change="changeLayerTag"
            >
              <a-select-option
                v-for="item in textLayers"
                :key="item._id"
                :value="item._id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item has-feedback label="主图片" prop="mainImage">
            <a-select
              v-model="layerTagForm.mainImage"
              placeholder="请选择主图片图层"
              @change="changeLayerTag"
            >
              <a-select-option
                v-for="item in imageLayers"
                :key="item._id"
                :value="item._id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
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
      currentIndex: (state) => state.editor.currentIndex,
      saved: (state) => state.editor.saved,
      textLayers: (state) =>
        state.editor.layers.filter((item) => item.type === "text"),
      imageLayers: (state) =>
        state.editor.layers.filter((item) => item.type === "image"),
    }),
    layerTagForm: {
      get() {
        return this.$store.state.editor.layerTag;
      },
      set(value) {
        this.$store.commit("editor/setLayerTag", value);
      },
    },
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
          value,
        });
      },
    },
  },
  watch: {
    "$store.state.editor.layers"(value) {
      this.layers = value.map((item) => item).reverse();
    },
    "$store.state.editor.layerTag"(value) {
      this.layerTagForm = value;
    },
  },
  mounted() {
    this.layers = this.$store.state.editor.layers.map((item) => item).reverse();
    this.$dragging.$on("dragged", (e) => {
      this.$nextTick(() => {
        this.$store.commit("editor/setTemplate", {
          attr: "layers",
          value: this.layers.map((item) => item).reverse(),
        });
      });
    });
  },
  data() {
    const checkMainText = (rule, value, callback) => {
      const { mainText, subText, actionText, mainImage } = this.layerTagForm;
      console.log(mainText, subText, actionText, mainImage);
      if (!mainText) {
        callback();
      } else if (
        mainText === subText ||
        mainText === actionText ||
        mainText === mainImage
      ) {
        console.log(mainText);
        callback(new Error("不能与其他标签选择同一图层"));
      }
      callback();
    };
    const checkSubText = (rule, value, callback) => {
      const { mainText, subText, actionText, mainImage } = this.layerTagForm;
      if (!subText) {
        callback();
      } else if (
        subText === mainText ||
        subText === actionText ||
        subText === mainImage
      ) {
        callback(new Error("不能与其他标签选择同一图层"));
      }
      callback();
    };
    const checkActionText = (rule, value, callback) => {
      const { mainText, subText, actionText, mainImage } = this.layerTagForm;
      if (!actionText) {
        callback();
      } else if (
        (!!actionText && actionText === mainText) ||
        actionText === subText ||
        actionText === mainImage
      ) {
        callback(new Error("不能与其他标签选择同一图层"));
      }
      callback();
    };
    const checkMainImage = (rule, value, callback) => {
      const { mainText, subText, actionText, mainImage } = this.layerTagForm;
      if (!mainImage) {
        callback();
      } else if (
        (!!mainImage && mainImage === mainText) ||
        mainImage === subText ||
        mainImage === actionText
      ) {
        callback(new Error("不能与其他标签选择同一图层"));
      }
      callback();
    };
    return {
      layerTagLoading: false,
      layerTagVisible: false,
      confirmLoading: false,
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      layerTagForm: {},
      layerTagFormRules: {
        mainText: [
          {
            validator: checkMainText,
            trigger: "change",
          },
        ],
        subText: [
          {
            validator: checkSubText,
            trigger: "change",
          },
        ],
        actionText: [
          {
            validator: checkActionText,
            trigger: "change",
          },
        ],
        mainImage: [
          {
            validator: checkMainImage,
            trigger: "change",
          },
        ],
      },
      renameIndex: -1,
      rename: "",
      layers: [],
    };
  },
  methods: {
    openLayerTagModal() {
      if (!this.saved) {
        this.$message.info("请先保存模板");
      } else {
        this.layerTagVisible = true;
      }
    },
    selectLayer(index) {
      this.$store.commit("editor/setTemplate", {
        attr: "currentIndex",
        value: this.layers.length - 1 - index,
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
        value: this.rename,
      });
      this.renameIndex = -1;
    },
    onLayerTagSubmit() {
      this.$refs.layerTagForm.validate((valid) => {
        if (valid) {
          this.layerTagLoading = true;
          this.layerTagForm["id"] = this.$store.state.editor.id;
          this.$store
            .dispatch("editor/setLayerTag", this.layerTagForm)
            .then((res) => {
              if (res.status === 200 && res.data.code === "0") {
                this.$message.success("标签保存成功");
                this.layerTagVisible = false;
              }
            })
            .finally(() => {
              this.layerTagLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    changeLayerTag(e, attr) {
      this.$store.commit("editor/setLayerTagItem", { attr, value: e });
    },
  },
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
  .header {
    display: flex;

    .tips-btn {
      color: #636363;
      background-color: #ffed4d;
      border-color: #ffed4d;
      font-size: 12px;
    }
  }
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
