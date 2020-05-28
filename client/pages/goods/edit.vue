<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="page">
    <div class="header">
      <div class="left">
        <el-button
          class="back-btn"
          size="small"
          icon="el-icon-arrow-left"
          type="info"
          plain
          @click="$router.push('/goods')">
          返回
        </el-button>
        <span class="title">{{ type === "create" ? "新增试吃活动" : "更新试吃活动" }}</span>

      </div>
      <div class="right">
        <el-radio-group
          v-model="tabSelect"
          size="mini">
          <el-radio-button label="info">
            基本信息
          </el-radio-button>
          <el-radio-button label="feedback">
            反馈表单
          </el-radio-button>
        </el-radio-group>
        <el-button
          type="primary"
          size="mini"
          style="margin-left: 40px"
          @click="submit">
          {{ type === "create" ? "提交" : "保存" }}
        </el-button>
      </div>

    </div>
    <section class="info-row">
      <el-row :gutter="20">
        <el-col :span="6">
          <div
            v-show="fixed"
            class="fixed-box" />
          <el-card
            class="form-card"
            :class="{'fixed': fixed}">
            <div
              v-show="tabSelect === 'feedback'"
              class="feedback-form-view">
              <h4 class="title">
                表单组件
              </h4>
              <div
                class="feedback-form-item"
                @click="addRadio">
                单选框
              </div>
              <div
                class="feedback-form-item"
                @click="addCheck">
                多选框
              </div>
              <div
                class="feedback-form-item"
                @click="addText">
                问答框
              </div>
            </div>
            <el-form
              v-show="tabSelect === 'info'"
              ref="form"
              :model="form"
              :rules="rules"
              class="goods-form"
              prop="name">
              <h4 class="title">
                基本信息
              </h4>
              <el-form-item
                prop="name"
                label="美食名称">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item
                label="活动开始时间"
                prop="receiveStartDate">
                <el-date-picker
                  v-model="form.receiveStartDate"
                  class="input-100"
                  type="date" />
              </el-form-item>
              <el-form-item
                label="活动结束时间"
                prop="receiveEndDate">
                <el-date-picker
                  v-model="form.receiveEndDate"
                  class="input-100"
                  type="date" />
              </el-form-item>
              <el-form-item
                label="分享封面文案">
                <el-input
                  v-model="form.shareText1"
                  placeholder="第一行文案"
                  style="margin-bottom:20px" />
                <el-input
                  v-model="form.shareText2"
                  placeholder="第二行文案" />
              </el-form-item>
              <el-form-item
                required
                label="封面遮罩"
                prop="mask">
                <el-select
                  v-model="form.mask"
                  class="input-100">
                  <el-option
                    label="红色遮罩"
                    value="red" />
                  <el-option
                    label="黑色遮罩"
                    value="black" />
                </el-select>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="18">
          <div class="content-view">
            <div
              v-show="tabSelect === 'info'"
              class="upload-view">
              <div class="section">
                <el-row :gutter="10">
                  <el-col :span="4.8">
                    <uploader
                      required
                      :img="form.cover"
                      title="封面图"
                      @success="imgUrl => handleSuccess(imgUrl, 'cover')" />
                  </el-col>
                  <el-col :span="4.8">
                    <uploader
                      :img="form.logo"
                      title="logo"
                      @success="imgUrl => handleSuccess(imgUrl, 'logo')" />
                  </el-col>
                  <el-col :span="4.8">
                    <uploader
                      required
                      :img="form.shareCover"
                      title="分享封面图"
                      @success="imgUrl => handleSuccess(imgUrl, 'shareCover')" />
                  </el-col>
                </el-row>

              </div>
              <div class="section banner">
                <uploader-list
                  required
                  title="轮播图"
                  desc="[最多上传5张]"
                  :files="bannerList"
                  @success="imgUrl => handleSuccess(imgUrl, 'banner')"
                  @remove="imgUrl => handleRemove(imgUrl, 'banner')" />
              </div>
              <div class="section desc">
                <uploader-list
                  title="详情图"
                  :files="descList"
                  @success="imgUrl => handleSuccess(imgUrl, 'desc')"
                  @remove="imgUrl => handleRemove(imgUrl, 'desc')" />
              </div>
            </div>
            <div
              v-show="tabSelect === 'feedback'"
              class="feedback-content-view">
              <h4 class="feedback-content-title">
                反馈表单
              </h4>
              <template v-for="(item, index) in feedbackList">
                <feedback-radio
                  v-if="item.genre === 'radio'"
                  :id="index"
                  :key="index"
                  ref="feedback"
                  :question="item.question"
                  :options="item.options"
                  @save="feedbackSave"
                  @remove="feedbackRemove" />
                <feedback-check
                  v-if="item.genre === 'check'"
                  :id="index"
                  :key="index"
                  ref="feedback"
                  :question="item.question"
                  :options="item.options"
                  @save="feedbackSave"
                  @remove="feedbackRemove" />
                <feedback-text
                  v-if="item.genre === 'text'"
                  :id="index"
                  :key="index"
                  ref="feedback"
                  :question="item.question"
                  @save="feedbackSave"
                  @remove="feedbackRemove" />
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import Uploader from "@/components/uploader/uploader"
import UploaderList from "@/components/uploader/uploader-list"
import FeedbackRadio from "@/components/feedback/feedback-radio"
import FeedbackCheck from "@/components/feedback/feedback-check"
import FeedbackText from "@/components/feedback/feedback-text"
export default {
  middleware: "auth",
  layout: "auth",
  components: {
    Uploader,
    UploaderList,
    FeedbackRadio,
    FeedbackCheck,
    FeedbackText
  },
  data() {
    return {
      id: null,
      fixed: false,
      type: "create",
      tabSelect: "info",
      loading: false,
      bannerList: [],
      descList: [],
      feedbackList: [],
      form: {
        name: "",
        receiveStartDate: "",
        receiveEndDate: "",
        mask: "",
        cover: "",
        logo: "",
        shareText1: "",
        shareText2: "",
        shareCover: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入美食名称", trigger: "blur" },
          { max: 30, message: "长度在 30 个字符以内", trigger: "blur" }
        ],
        receiveStartDate: [
          { type: "date", required: true, message: "请选择活动开始日期", trigger: "change" }
        ],
        receiveEndDate: [
          { type: "date", required: true, message: "请选择活动结束日期", trigger: "change" }
        ],
        mask: [
          { required: true, message: "请选择封面遮罩", trigger: "change" }
        ]
      },
      noGoodsTips: false
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
    const { id } = this.$route.query
    if (id) {
      this.id = id
      this.type = "update"
      this.getGoodsInfo(id)
    }
  },
  methods: {
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > 60) this.fixed = true
      else this.fixed = false
    },
    addRadio() {
      this.feedbackList.push({
        genre: "radio",
        question: "",
        options: []
      })
    },
    addCheck() {
      this.feedbackList.push({
        genre: "check",
        question: "",
        options: []
      })
    },
    addText() {
      this.feedbackList.push({
        genre: "text",
        question: ""
      })
    },
    feedbackRemove(index) {
      this.feedbackList = this.feedbackList.filter((item, idx) => index !== idx)
    },
    feedbackSave(genre, index, ques, opts) {
      if (genre === "radio" || genre === "check") {
        this.feedbackList[index] = {
          genre,
          question: ques,
          options: opts
        }
      } else if (genre === "text") {
        this.feedbackList[index] = {
          genre,
          question: ques
        }
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleSuccess(imgUrl, type) {
      switch (type) {
        case "banner":
          this.bannerList.push({ url: imgUrl })
          break
        case "desc":
          this.descList.push({ url: imgUrl })
          break
        case "cover":
          this.form.cover = imgUrl
          break
        case "logo":
          this.form.logo = imgUrl
          break
        case "shareCover":
          this.form.shareCover = imgUrl
          break
      }
    },
    handleRemove(imgUrl, type) {
      switch (type) {
        case "banner":
          this.bannerList = this.bannerList.filter(item => (item.url !== imgUrl))
          break
        case "desc":
          this.descList = this.descList.filter(item => (item.url !== imgUrl))
          break
      }
    },
    submit() {
      this.$refs["form"].validate(async(valid) => {
        if (valid) {
          const form = Object.assign({}, this.form)
          form.id = this.id
          form.banner = this.bannerList
          form.desc = this.descList
          form.feedback = this.feedbackList
          if (form.banner.length === 0) {
            this.$message.error("轮播图不能为空")
          } else if (this.feedbackList.length === 0) {
            this.$message.error("反馈表单不能为空")
          } else if (this.$refs["feedback"].some(item => item.edit === true)) {
            this.$message.error("有未保存的表单组件")
          } else {
            this.loading = true
            if (this.type === "create") {
              this.$store.dispatch("goods/create", form).then(res => {
                this.loading = false
                if (res && res.code === "0") {
                  this.$message.success("添加成功")
                  this.$router.go(-1)
                }
              }).catch(e => {
                this.loading = false
              })
            } else if (this.type === "update") {
              this.$store.dispatch("goods/update", form).then(res => {
                this.loading = false
                if (res && res.code === "0") {
                  this.$message.success("保存成功")
                }
              }).catch(e => {
                this.loading = false
              })
            }
          }
        } else {
          console.log("error submit!!", valid)
          return false
        }
      })
    },
    async getGoodsInfo(id) {
      this.loading = true
      const res = await this.$store.dispatch("goods/getGoodsInfo", { id })
      if (res.data) {
        this.loading = false
        const form = {
          name: res.data.name,
          receiveStartDate: new Date(res.data.receiveStartDate),
          receiveEndDate: new Date(res.data.receiveEndDate),
          mask: res.data.mask,
          cover: res.data.cover,
          logo: res.data.logo,
          shareCover: res.data.shareCover,
          shareText1: res.data.shareText1,
          shareText2: res.data.shareText2
        }
        this.form = form
        this.bannerList = res.data.banner
        this.descList = res.data.desc
        this.feedbackList = res.data.feedback
      } else {
        this.$alert("活动不存在，立即返回", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.push("/goods")
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  & > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .back-btn {
      margin-right: 10px;
    }

    .title {
      font-size: 18px;
      vertical-align: middle;
      font-weight: bold;
    }
  }

  .info-row {

    .fixed-box {
      min-width: 300px;
      height: 200px;
    }
    .form-card {
      border-radius: 20px;
      min-height: calc(100vh - 7.5rem - 52px);

      &.fixed {
        position: fixed;
        top: 80px;
        left: 40px;
        width: 22%;
        z-index: 100;
      }

      .input-100 {
        width: 100%;
      }

      .feedback-form-view {
         & > .title {
           margin-bottom: 10px;
         }
        .feedback-form-item {
          background-color: #f0f2f5;
          padding: 10px 20px;
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 40px;
          border-radius: 20px;
          border: 1px solid #f0f2f5;
          cursor: pointer;

          &:hover {
            border: 1px dotted #ddd
          }
        }
      }
    }
  }

  .content-view {
    padding: 20px;
    background-color: #DCDFE6;
    border-radius: 20px;
    min-height: calc(100vh - 7.5rem - 52px);

    .section {
      margin-bottom: 20px;
      & > .title {
        font-size: 14px;
        margin-bottom: 10px;

        span {
          font-size: 12px;
          color: #8c939d;
        }
      }
    }

    .banner {

    }

    .feedback-content-title {
      text-align: center;
      margin-bottom: 20px;
    }

  }
}
</style>
