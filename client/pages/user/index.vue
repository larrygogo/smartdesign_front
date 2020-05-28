<template>
  <div class="page">
    <div class="header">
      <h3 class="title">
        用户管理
      </h3>
    </div>
    <el-card class="card">
      <el-table
        class="user-table"
        :data="userList"
        style="width: 100%">
        <el-table-column
          label="ID"
          type="index"
          width="50" />
        <el-table-column
          prop="nickname"
          label="昵称"
          width="180" />
        <el-table-column
          prop="avatar"
          label="头像">
          <template slot-scope="scope">
            <img
              class="avatar"
              :src="scope.row.avatar">
          </template>
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.gender === '1'">男</span>
            <span v-else-if="scope.row.gender === '2'">女</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="country"
          label="国家" />
        <el-table-column
          prop="province"
          label="省份/地区" />
        <el-table-column
          prop="city"
          label="城市" />
        <el-table-column
          prop="created"
          label="注册时间">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.created).format("YYYY-MM-DD") }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
      page: 1
    }
  },
  computed: mapState({
    count: state => state.user.count,
    pageSize: state => state.user.pageSize,
    userList: state => state.user.userList
  }),
  mounted() {
    this.getUserList(1)
  },
  methods: {
    async getUserList(page) {
      await this.$store.dispatch("user/getUserList", { page })
    },
    changePage(page) {
      this.getUserList(page)
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

    .user-table {
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
</style>
