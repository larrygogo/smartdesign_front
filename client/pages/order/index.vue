<template>
  <div class="page">
    <div class="header">
      <h3 class="title">
        订单管理
      </h3>
    </div>
    <el-card class="card">
      <el-radio-group
        v-model="status"
        class="status-bar"
        size="mini"
        @change="changeStatus">
        <el-radio-button :label="undefined">
          全部
        </el-radio-button>
        <el-radio-button label="0">
          待审核
        </el-radio-button>
        <el-radio-button label="1">
          待反馈
        </el-radio-button>
        <el-radio-button label="2">
          已完成
        </el-radio-button>
        <el-radio-button label="3">
          未通过
        </el-radio-button>
      </el-radio-group>
      <el-table
        class="order-table"
        :data="orderList"
        style="width: 100%">
        <el-table-column
          label="订单编号"
          prop="_id"
          width="210" />
        <el-table-column
          label="活动名称">
          <template slot-scope="scope">
            <n-link :to="`/goods/edit?id=${scope.row.goods._id}`">
              {{ scope.row.goods.name }}
            </n-link>
          </template>
        </el-table-column>
        <el-table-column
          label="用户昵称"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.user.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="gender"
          label="订单状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === '0'">
              待审核
            </el-tag>
            <el-tag
              v-else-if="scope.row.status === '1'"
              type="warning">
              待反馈
            </el-tag>
            <el-tag
              v-else-if="scope.row.status === '2'"
              type="success">
              已完成
            </el-tag>
            <el-tag
              v-else-if="scope.row.status === '3'"
              type="danger">
              未通过
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="express"
          label="快递单号"
          width="150" />
        <el-table-column
          label="反馈信息">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === '2' && scope.row.feedback && scope.row.feedback.length > 0"
              type="text"
              size="small"
              @click="openFeedback(scope.row)">
              查看反馈
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="created"
          label="创建时间">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.created).format("YYYY-MM-DD HH:mm:ss") }}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="openOrderInfo(scope.row)">
              详情
            </el-button>
            <el-button
              v-if="scope.row.status==='0'"
              type="text"
              size="small"
              @click="openAuditOrder(scope.row)">
              审核
            </el-button>
            <el-button
              v-if="scope.row.status === '1'"
              type="text"
              size="small"
              @click="setExpress(scope.row)">
              修改快递
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="订单详情"
      :visible.sync="showOrderInfo"
      width="30%">
      <div class="info-item">
        <span class="info-item-title">订单编号：</span>
        <span class="info-item-content">{{ orderInfo._id }}</span>
      </div>
      <div class="info-item">
        <span class="info-item-title">订单状态：</span>
        <span class="info-item-content">
          <el-tag v-if="orderInfo.status === '0'">
            待审核
          </el-tag>
          <el-tag
            v-else-if="orderInfo.status === '1'"
            type="warning">
            待反馈
          </el-tag>
          <el-tag
            v-else-if="orderInfo.status === '2'"
            type="success">
            已完成
          </el-tag>
          <el-tag
            v-else-if="orderInfo.status === '3'"
            type="danger">
            未通过
          </el-tag>
        </span>
      </div>
      <div class="info-item">
        <span class="info-item-title">活动名称：</span>
        <span class="info-item-content">{{ orderInfo.goods && orderInfo.goods.name }}</span>
      </div>
      <div class="info-item">
        <span class="info-item-title">用户昵称：</span>
        <span class="info-item-content">{{ orderInfo.user && orderInfo.user.nickname }}</span>
      </div>
      <div class="info-item">
        <span class="info-item-title">用户头像：</span>
        <img
          v-if="orderInfo.user"
          class="avatar"
          :src="orderInfo.user.avatar"
          alt="">
      </div>
      <div class="user-info">
        <h4 class="title">
          收货信息
        </h4>
        <div class="info-item">
          <span class="info-item-title">收货人：</span>
          <span class="info-item-content">{{ orderInfo.name }}</span>
        </div>
        <div class="info-item">
          <span class="info-item-title">联系方式：</span>
          <span class="info-item-content">{{ orderInfo.mobile }}</span>
        </div>
        <div class="info-item">
          <span class="info-item-title">收货地址：</span>
          <span class="info-item-content">{{ orderInfo.address }}</span>
        </div>
      </div>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="showOrderInfo = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="审核订单"
      :visible.sync="showAuditOrder"
      width="30%">
      <div class="info-item">
        <span class="info-item-title">订单编号：</span>
        <span class="info-item-content">{{ orderInfo._id }}</span>
      </div>
      <el-input
        v-model="express"
        placeholder="请输入快递单号" />
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="danger"
          @click="saveAuditOrder('3')">不通过</el-button>
        <el-button
          type="primary"
          @click="saveAuditOrder('1')">通过审核</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改快递单号"
      :visible.sync="showSetExpress"
      width="30%">
      <div class="info-item">
        <span class="info-item-title">订单编号：</span>
        <span class="info-item-content">{{ orderInfo._id }}</span>
      </div>
      <el-input
        v-model="express"
        placeholder="请输入快递单号" />
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="saveExpress">确 定</el-button>
        <el-button @click="showSetExpress = false">取 消</el-button>

      </span>
    </el-dialog>
    <el-dialog
      title="反馈信息"
      :visible.sync="showFeedback"
      width="30%">
      <div class="info-item">
        <span class="info-item-title">订单编号：</span>
        <span class="info-item-content">{{ orderInfo._id }}</span>
      </div>
      <div class="feedback-row">
        <div
          v-for="(item, index) in feedback"
          :key="item._id"
          class="feedback-item">
          <h5 class="feedback-question">
            {{ (index + 1)+ '. '+item.question }}
          </h5>
          <div
            v-if="item.genre ==='check'"
            class="feedback-answer">
            <div
              v-for="(e, i) in item.answer"
              :key="e"
              class="feedback-answer-item">
              {{ answerIndex[i] + '. ' + e }}
            </div>
          </div>
          <div
            v-else-if="item.genre ==='radio'"
            class="feedback-answer">
            选项：{{ item.answer }}
          </div>
          <div
            v-else-if="item.genre ==='text'"
            class="feedback-answer">
            回答：{{ item.answer }}
          </div>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="showFeedback = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      class="pagination"
      layout="total, prev, pager, next"
      :total="count"
      :page-size="pageSize"
      :current-page="page"
      @current-change="changePage" />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  middleware: "auth",
  layout: "auth",
  data() {
    return {
      page: 1,
      status: undefined,
      orderInfo: {},
      express: "",
      feedback: [],
      answerIndex: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
      showOrderInfo: false,
      showAuditOrder: false,
      showSetExpress: false,
      showFeedback: false
    }
  },
  computed: mapState({
    count: state => state.order.count,
    pageSize: state => state.order.pageSize,
    orderList: state => state.order.orderList
  }),
  mounted() {
    this.getOrderList(1)
  },
  methods: {
    async getOrderList(page, status) {
      await this.$store.dispatch("order/getOrderList", { page, status })
    },
    changePage(page) {
      this.getOrderList(page)
    },
    async changeStatus(status) {
      console.log(status)
      await this.getOrderList(1, status)
    },
    openOrderInfo(order) {
      this.orderInfo = order
      this.showOrderInfo = true
    },
    openAuditOrder(order) {
      this.orderInfo = order
      this.express = ""
      this.showAuditOrder = true
    },
    openFeedback(order) {
      this.orderInfo = order
      this.feedback = order.feedback
      this.showFeedback = true
    },
    saveAuditOrder(status) {
      const orderId = this.orderInfo._id
      const express = this.express
      if (!orderId) {
        this.$message.error("未知订单")
      } else if (status !== "3" && express.trim().length === 0) {
        this.$message.error("快递单号不能为空")
      } else {
        this.$store.dispatch("order/auditOrder", { orderId, status, express }).then(res => {
          if (res.code === "0") {
            this.$message.success(res.msg)
            this.showAuditOrder = false
            this.getOrderList(this.page, this.status)
          } else {
            this.$message.error(res.msg || "审核失败")
          }
        })
      }
    },
    setExpress(order) {
      this.orderInfo = order
      this.express = this.orderInfo.express
      this.showSetExpress = true
    },
    saveExpress() {
      const orderId = this.orderInfo._id
      const express = this.express
      if (!orderId) {
        this.$message.error("未知订单")
      } else if (express.trim().length === 0) {
        this.$message.error("快递单号不能为空")
      } else {
        this.$store.dispatch("order/setOrderExpress", { orderId, express }).then(res => {
          if (res.code === "0") {
            this.$message.success(res.msg)
            this.showSetExpress = false
            this.getOrderList(this.page, this.status)
          } else {
            this.$message.error(res.msg || "修改失败")
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
    align-items: center;
    margin-bottom: 10px;

    .title {
      font-size: 20px;
      font-weight: normal;
    }
  }

  .card {
    border-radius: 20px;
    padding: 20px;

    .status-bar {
      margin-bottom: 10px;
    }

    /deep/ {
      .el-table__header-wrapper {
        border-radius: 10px;

      }
      .el-table thead {
        background-color: #f0f2f5;
        border-radius: 20px;
        overflow: hidden;

      }

      .el-table thead tr {
        background-color: transparent;

      }

      .el-table th {
        background-color: transparent;
      }

    }

    .order-table {
      .avatar {
        width: 50px;
        height: 50px;
      }

    }

  }
  .pagination {
    margin-top: 10px;
    text-align: right;
  }
}

.user-info {
  border-radius: 10px;
  padding: 20px;
  background-color: #f0f2f5;
  margin-top: 30px;

  .title {
    margin-bottom: 10px;
    text-align: center;
  }

  .info-item {
    margin-bottom: 10px;
  }
}

.info-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  .info-item-title {
    font-weight: bold;
  }

  .avatar {
    width: 50px;
    height: 50px;
  }
}

.feedback-item {
  margin-bottom: 20px;
}

</style>
