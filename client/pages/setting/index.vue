<template>
  <div>
    <div class="page">
      <div class="header">
        <h3 class="title">
          设置
        </h3>
      </div>
      <div class="setting">
        <uploader
          :img="banner"
          title="小程序首页 banner"
          @success="handleSuccess" />
      </div>

    </div>
    <div class="footer">
      <el-button
        type="primary"
        @click="updateBanner">
        保存
      </el-button>
    </div>
  </div>

</template>

<script>
import { mapState } from "vuex"
import Uploader from "@/components/uploader/uploader"
export default {
  middleware: "auth",
  layout: "auth",
  components: {
    Uploader
  },
  data() {
    return {
      banner: ""
    }
  },
  mounted() {
    this.getBanner()
  },
  methods: {
    handleSuccess(imgUrl) {
      this.banner = imgUrl
    },
    getBanner() {
      this.$store.dispatch("setting/getBanner").then(res => {
        if (res.status === 200 && res.data.code === "0") {
          this.banner = res.data.data.home_banner
        }
      })
    },
    updateBanner() {
      this.$store.dispatch("setting/setBanner", this.banner).then(res => {
        if (res.status === 200 && res.data.code === "0") {
          this.$message.success("保存成功")
        } else {
          this.$message.error("保存失败")
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  & > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .title {
      font-size: 20px;
      font-weight: normal;
    }
  }

  .setting {
    padding: 1.25rem;
    background-color: #DCDFE6;
    border-radius: 1.25rem;
    min-height: calc(100vh - 15rem);
  }

}
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 20px;
    left: 0;
    text-align: right;
    background-color: #ffffff;
}
</style>
