<template>
  <div class="container">
    <a-layout id="action-panel">
      <a-layout-sider width="400">
        <a-card title="输入文案">
          <a-form-model
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="主文案">
              <a-input v-model="form.mainText" />
            </a-form-model-item>
            <a-form-model-item label="副文案">
              <a-input v-model="form.subText" />
            </a-form-model-item>
            <a-form-model-item label="行动点文案">
              <a-input v-model="form.actionText" />
            </a-form-model-item>
            <a-form-model-item label="主图片">
              <a-upload
                name="file"
                list-type="picture-card"
                class="file-uploader"
                :action="`${host}/template/uploadImage`"
                :multiple="true"
                :headers="{ Authorization: `Bearer ${token}` }"
                :file-list="fileList"
                :withCredentials="true"
                @change="handleChange"
                @preview="handlePreview"
              >
                <div v-if="fileList.length < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
              <a-button type="primary" @click="submit">
                一键生成
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </a-layout-sider>
      <a-layout-content>
        <div class="result-box" v-if="covers.length > 0">
          <AutoCover
            v-for="(item, index) in covers"
            :key="index"
            :cover="item"
            :index="index"
          />
        </div>
        <a-result v-else title="请先输入文案并上传图片">
          <template #icon>
            <a-icon type="smile" theme="twoTone" />
          </template>
        </a-result>
      </a-layout-content>
    </a-layout>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import AutoCover from "../components/pub/template/AutoCover";
import { mapState } from "vuex";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  components: {
    AutoCover,
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      covers: (state) => state.layerTag.covers,
    }),
  },
  data() {
    return {
      host: process.env.API,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      previewImage: "",
      fileList: [],
      previewVisible: false,
      form: {
        mainText: "",
        subText: "",
        actionText: "",
      },
    };
  },
  methods: {
    submit() {
      let mainImage = "";
      if (this.fileList.length > 0) {
        const { response } = this.fileList[0];
        console.log(this.fileList[0]);
        if (response.code === "0") {
          mainImage = response.data;
          const form = { ...this.form, mainImage: mainImage };
          this.$store.dispatch("layerTag/getAutoRender", form);
        } else {
          console.log(response);
          this.$message.error(response.msg);
          if (response.code === "401") {
            this.$store.dispatch("user/logout");
            this.$router.replace("/user/login");
          }
        }
      }
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
  },
};
</script>

<style lang="scss">
#action-panel {
  min-height: 800px;

  .ant-layout-sider {
    background-color: transparent;
    .image-row {
      position: relative;
      width: 104px;
      height: 104px;

      .image-mask {
        width: 100%;
        height: 100%;
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        opacity: 0;
        transform: all 0.6s;
        color: #fff;

        &:hover {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
      .image-preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .ant-layout-content {
    margin-left: 20px;

    .result-box {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 0.8fr));
      grid-gap: 20px;
    }
  }
}
</style>
