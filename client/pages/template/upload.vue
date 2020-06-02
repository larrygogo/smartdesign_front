<template>
  <div class="page">
    <div class="header">
      <el-button
        class="back-btn"
        size="small"
        icon="el-icon-arrow-left"
        type="info"
        plain
        @click="$router.push('/')">
        返回
      </el-button>
      <span class="title">新建模板</span>
    </div>
    <section class="upload-row">
      <el-row gutter="20">
        <el-col :span="6">
          <el-card class="upload-form-card">
            <el-form class="upload-form">
              <el-form-item
                ref="form"
                label="模板名称"
                :model="form">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-button type="primary">
                提交
              </el-button>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="18">
          <div class="template-view">
            <div class="view-box">
              <img
                class=""
                src="~/assets/images/default-template.png"
                alt="">
            </div>
            <div class="upload-box">
              <el-upload
                ref="upload"
                class="upload-action"
                :action="host + '/template/upload'"
                :headers="{Authorization}"
                :multiple="false"
                :limit="1"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-exceed="handleChange"
                :auto-upload="false">
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary">
                  选取文件
                </el-button>
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  type="success"
                  @click="submitUpload">
                  上传到服务器
                </el-button>
                <div
                  slot="tip"
                  class="el-upload__tip">
                  只能上传psd后缀的ps文件，且不超过10m
                </div>
              </el-upload>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import env from "../../../env"
import {mapState} from 'vuex'
export default {
  middleware: "auth",
  computed: mapState({
    Authorization: state => ('Bearer ' + state.user.token)
  }),
  data() {
    return {
      host: env[process.env.NODE_ENV].ENV_API,
      fileList: [],
      form: {
        name: ""
      }
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
    },
    handleChange(files, fileList) {
      this.fileList = [...files]
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  & > .header {
    margin-bottom: 20px;

    .back-btn {
      margin-right: 10px;
    }

    .title {
      font-size: 18px;
      vertical-align: middle;
    }
  }

  .upload-row {

    .upload-form-card {
      border-radius: 10px;
      min-height: calc(100vh - 7.5rem - 52px);
    }
  }

  .template-view {
    padding: 40px 20px;
    background-color: #DCDFE6;
    border-radius: 10px;
    min-height: calc(100vh - 7.5rem - 52px);

    .view-box {
      margin: 0 auto 20px;
      max-width: 500px;
      img {
        width: 100%;
      }
    }

    .upload-box {
      max-width: 500px;
      margin: 0 auto;
      .upload-action {
      }
    }
  }
}
</style>
