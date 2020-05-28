<template>
  <div class="uploader-row">
    <h3 class="title">
      <span
        v-show="required"
        class="required">*</span>
      {{ title }}
      <span>{{ desc }}</span>
    </h3>
    <el-upload
      class="uploader"
      :action="host + '/setting/upload'"
      :show-file-list="false"
      :file-list="list"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload">

      <div
        v-if="uploading"
        class="progress">
        <el-progress
          type="circle"
          :percentage="percentage"
          :width="90" />
      </div>
      <div
        v-else-if="imageUrl"
        class="image-row">
        <div class="image-mask">
          <i
            class="el-icon-zoom-in preview-icon"
            @click.self.stop="handlePreview" />
          <i
            v-if="openDelete"
            class="el-icon-delete delete-icon"
            @click.self.stop="handleRemove" />
        </div>
        <img
          class="image"
          :src="imageUrl"
          alt="">
      </div>
      <i
        v-else
        slot="default"
        class="el-icon-plus uploader-icon" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="imageUrl"
        alt="">
    </el-dialog>
  </div>
</template>

<script>
import env from "../../../env"
export default {
  props: {
    required: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    openDelete: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    img: {
      type: String,
      default: () => {
        return null
      }
    },
    title: String,
    desc: String
  },
  data() {
    return {
      list: [],
      host: env[process.env.NODE_ENV].ENV_API,
      uploading: false,
      percentage: 0,
      imageUrl: "",
      dialogVisible: false
    }
  },
  watch: {
    img(val) {
      this.imageUrl = val
    }
  },
  mounted() {

  },
  methods: {
    handleSuccess(res, file) {
      this.uploading = false
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit("success", res.data.path)
    },
    beforeUpload(file) {
      this.percentage = 0
      this.uploading = true
    },
    handleProgress(event, file, fileList) {
      this.percentage = parseInt(event.loaded / event.total * 100)
    },
    handlePreview(file) {
      this.dialogVisible = true
    },
    handleRemove(file) {
      this.$emit("remove", this.imageUrl)
    },
    handleError() {
      this.percentage = 0
      this.uploading = false
      this.$message.error("文件上传失败")
    }
  }
}
</script>

<style lang="scss">
.uploader-row {

  .title {
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 20px;

    span {
      font-size: 12px;
      color: #8c939d;
    }

    .required {
      color: crimson;
    }
  }
  .uploader /deep/ .el-upload {
    box-sizing: border-box;

    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
  }
  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .image-row {
    position: relative;

    .image-mask {
      display: none;
      i:not(:last-child) {
        margin-right: 10px;
      }
      .preview-icon {
        font-size: 20px;
      }
      .delete-icon {
        font-size: 20px;
      }
    }

    &:hover {
      .image-mask {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 148px;
        height: 148px;
        background-color: rgba(0, 0, 0, .2);

        color: #fff;

      }
    }

    .image {
      width: 148px;
      height: 148px;
      display: block;
      object-fit: cover;
    }
  }

  .progress {
    padding: 30px;
  }
}
</style>
