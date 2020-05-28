<template>
  <div class="data-page">
    <el-row
      :gutter="40"
      class="data-row">
      <el-col
        :span="5"
        :sm="6"
        :xs="6">
        <el-card class="data-card">
          <img
            class="data-img"
            src="~assets/images/data-image1.png"
            alt=""
            srcset="">
          <div class="data-info">
            <div class="data-head">
              <span class="data-title">用户总数</span>
              <span class="date">{{ $moment().format('YYYY/MM/DD') }}</span>
            </div>
            <p class="data-number">
              {{ userCount }}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col
        :span="5"
        :sm="6"
        :xs="6">
        <el-card class="data-card">
          <img
            class="data-img"
            src="~assets/images/data-image2.png"
            alt=""
            srcset="">
          <div class="data-info">
            <div class="data-head">
              <span class="data-title">活动总数</span>
              <span class="date">{{ $moment().format('YYYY/MM/DD') }}</span>
            </div>
            <p class="data-number">
              {{ goodsCount }}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col
        :span="5"
        :sm="6"
        :xs="6">
        <el-card class="data-card">
          <img
            class="data-img"
            src="~assets/images/data-image1.png"
            alt=""
            srcset="">
          <div class="data-info">
            <div class="data-head">
              <span class="data-title">今日订单数</span>
              <span class="date">{{ $moment().format('YYYY/MM/DD') }}</span>
            </div>
            <p class="data-number">
              {{ orderCount }}
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="charts-card">
          <p>近7日小程序数据</p>
          <ve-line
            :data="weekly"
            :settings="chartSettings" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  middleware: "auth",
  layout: "auth",
  data() {
    return {
      chartSettings: {
        labelMap: {
          "refData": "日期",
          "sessionCnt": "打开次数",
          "stayTimeSession": "平均访问深度",
          "stayTimeUv": "人均停留时长 (秒)",
          "visitDepth": "次均停留时长 (秒)",
          "visitPv": "访问次数",
          "visitUv": "访问人数",
          "visitUvNew": "新用户数"
        },
        area: true
      }
    }
  },
  computed: mapState({
    userCount: state => state.data.userCount,
    goodsCount: state => state.data.goodsCount,
    orderCount: state => state.data.orderCount,
    weekly: state => state.data.weekly
  }),
  mounted() {
    this.getWeekly()
    this.getData()
  },
  methods: {
    async getData() {
      await this.$store.dispatch("data/getData")
    },
    async getWeekly() {
      await this.$store.dispatch("data/getWeekly")
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  .data-page {
    padding-top: 100px;
    min-width: 1100px;
  }
  .data-row {
    margin-bottom: 40px;
  }
  .data-card {
    border-radius: 20px;
    padding: 20px 10px;

    &:hover {
      transform: scale(1.12) translateY(-10px);
    }

    /deep/ {
      .el-card__body {
        display: flex;
      }
    }

    .data-img {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }

    .data-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .data-head {
      font-size: 14px;
      color: #999;
      margin-bottom: 10px;

      .data-title {
        margin-right: 10px;
      }

      .date {
        font-size: 12px;
      }
    }

    .data-number {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .charts-card {
    border-radius: 20px;
  }

</style>
