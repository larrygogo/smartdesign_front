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
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="`${host}/template/uploadImage`"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
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
  </div>
</template>

<script>
import AutoCover from "../components/pub/template/AutoCover";
import { mapState } from "vuex";
export default {
  components: {
    AutoCover,
  },
  computed: {
    ...mapState({
      covers: (state) => state.layerTag.covers,
    }),
  },
  data() {
    return {
      // covers: [
      //   "http://127.0.0.1:3300/static/2021036/d22e60bf-f957-487f-b9f2-8fa62542c31c.png",
      //   "http://127.0.0.1:3300/static/2021036/ba4720b1-44aa-4007-9180-991acea5b157.png",
      //   "http://127.0.0.1:3300/static/2021036/92881543-1f18-498b-8c0f-db8d77e9c795.png",
      //   "http://127.0.0.1:3300/static/2021036/cf226b97-ebf1-4365-9902-d7e8fd7113d4.png",
      // ],
      host:
        process.env.NODE_ENV === "development"
          ? process.env.DEV_HOST
          : process.env.PRO_HOST,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      imageUrl: "",
      form: {
        mainText: "",
        subText: "",
        actionText: "",
      },
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("layerTag/getAutoRender", this.form);
    },
  },
};
</script>

<style lang="scss">
#action-panel {
  min-height: 800px;

  .ant-layout-sider {
    background-color: transparent;
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
