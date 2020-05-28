<template>
  <div class="uploader-list">
    <h3 class="title">
      <span
        v-show="required"
        class="required">*</span>
      {{ title }}
      <span>{{ desc }}</span>
    </h3>
    <el-upload
      :action="host + '/setting/upload'"
      list-type="picture-card"
      :file-list="fileList"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-preview="handlePreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showPreview">
      <img
        width="100%"
        :src="dialogImageUrl"
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
    files: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: String,
    desc: String
  },
  data() {
    return {
      fileList: [],
      host: env[process.env.NODE_ENV].ENV_API,
      showPreview: false,
      dialogImageUrl: ""
    }
  },
  watch: {
    files(val) {
      this.fileList = val.map((item, index) => { return { name: index, url: item.url } })
    }
  },
  methods: {
    handleSuccess(res, file) {
      this.$emit("success", res.data.path)
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.showPreview = true
    },
    handleRemove(file) {
      this.$emit("remove", file.url)
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
.title {
  font-size: 14px;
  margin-bottom: 10px;

  span {
    font-size: 12px;
    color: #8c939d;
  }

  .required {
    color: crimson;
  }

}
.el-upload-list__item-thumbnail {
  object-fit: cover;
}
</style>
