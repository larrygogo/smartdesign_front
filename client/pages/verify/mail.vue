<template>
  <div class="verify-page">
    <el-card class="verify-box" title="验证邮箱">
      <div slot="header" class="clearfix">
        <h3>验证邮箱</h3>
      </div>
      <div v-if="!verify">
        <p>您的账号还没有通过邮箱验证，请发送邮件验证账号</p>
        <p class="small-t">若您没有收到邮件，请执行以下操作：</p>
        <p class="small-t">1. 请查看垃圾箱</p>
        <p class="small-t">
          2. 将
          <el-tag size="mini">no-reply@toolbee.cn</el-tag>添加到白名单，重新发送
        </p>
        <div class="btn-row">
          <el-button
            type="primary"
            @click="sendMail"
            :disabled="!show"
          >{{show ? '发送验证邮件' : `${count}s 后重新发送`}}</el-button>
        </div>
      </div>
      <div v-else>
        <p>恭喜你已通过邮箱验证！</p>
        <div class="btn-row">
          <el-button type="primary" @click="$router.replace('/')">返回首页</el-button>
        </div>
      </div>
    </el-card>
    <footer class="footer">ToolBee.cn ® 2020</footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    verify: state => state.user.verify
  }),
  data() {
    return {
      show: true,
      count: ""
    };
  },
  methods: {
    sendMail() {
      const TIME_COUNT = 60;
      this.$store.dispatch("user/sendMail").then(res => {
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.verify-box {
  p {
    line-height: 2;
  }
  .small-t {
    font-size: 12px;
    color: #999;
  }
  .btn-row {
    text-align: right;
  }
}

.footer {
  position: fixed;
  width: 100%;
  bottom: 20px;
  color: #636363;
  text-align: center;
}
</style>