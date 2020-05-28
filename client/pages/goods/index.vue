<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="page">
    <div class="header">
      <h3 class="title">
        活动管理
      </h3>
      <section class="action">
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="$router.push('/goods/edit')">
          新建试吃活动
        </el-button>
      </section>
    </div>

    <section class="template">
      <el-row
        :gutter="20"
        class="template-row">
        <el-col
          v-for="item in goodsList"
          :key="item._id"
          :span="12"
          :sm="8"
          :md="6">
          <el-card
            class="template-item"
            shadow="hover">
            <div class="template-cover">
              <img
                class="template-cover-img"
                :src="item.cover"
                alt="">
            </div>
            <div class="template-info">
              <p class="name">
                {{ item.name }}
              </p>
              <p class="receive-date">
                活动时间：{{ formatDate(item.receiveStartDate) }} - {{ formatDate(item.receiveEndDate) }}
              </p>
              <el-dropdown
                class="more"
                trigger="click"
                @command="command => goodsAction(command, item)">
                <span class="el-dropdown-link">
                  <i class="el-icon-more el-icon--right" />
                </span>
                <el-dropdown-menu
                  slot="dropdown">
                  <el-dropdown-item
                    icon="el-icon-edit"
                    command="edit">
                    编辑
                  </el-dropdown-item>
                  <el-dropdown-item
                    icon="el-icon-delete"
                    command="delete">
                    删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        class="pagination"
        layout="total, prev, pager, next"
        :total="count"
        :page-size="pageSize"
        :current-page="page"
        @current-change="changePage" />
    </section>

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
      type: "latest",
      loading: false
    }
  },
  computed: mapState({
    goodsList: state => state.goods.goodsList,
    count: state => state.goods.count,
    pageSize: state => state.goods.pageSize
  }),
  mounted() {
    this.getGoodsList(1)
  },
  methods: {
    async getGoodsList(page) {
      await this.$store.dispatch("goods/getGoodsList", { page })
    },
    formatDate(datetime) {
      return this.$moment(datetime).format("YYYY/MM/DD")
    },
    changePage(page) {
      this.getGoodsList(page)
    },
    goodsAction(command, goods) {
      switch (command) {
        case "edit":
          this.$router.push("/goods/edit?id=" + goods._id)
          break
        case "delete":
          this.$confirm(`是否删除活动【${goods.name}】`, "提示", {
            type: "warning",
            closeOnClickModal: false
          }).then(() => {
            this.loading = true
            this.$store.dispatch("goods/delete", { id: goods._id }).then(res => {
              this.loading = false
              if (res && res.code === "0") {
                this.$message.success("删除成功")
                this.getGoodsList(1)
              } else {
                this.$message.success("删除失败")
              }
            }).catch(() => {
              this.loading = false
              this.$message.success("删除失败")
            })
          }).catch(() => {})
          break
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
  .template{
    // padding: 20px;
    // background-color: #DCDFE6;
    border-radius: 20px;
    min-height: calc(100vh - 7.5rem - 52px);

    .template-row {
      min-height: calc(100vh - 10rem - 84px);
    }

    .template-item {
      border-radius: 20px;
      margin-bottom: 20px;

      .template-cover {
        height: 300px;
        width: 100%;
        border-radius: 20px;
        overflow: hidden;

        .template-cover-img {
          width:100%;
          height:100%;
          object-fit: cover;
        }
      }
      .template-info {
        position: relative;
        padding-left: 10px;
        line-height: 24px;
        font-size: 14px;

        .name {

          font-weight: bold;
        }

        .receive-date {
          color: #333;
        }

        .more {
          position: absolute;
          top: 0;
          right: 20px;
          height: 30px;
          cursor: pointer;

        }
      }
    }
  }
  .pagination {
    text-align: right;
  }
}
</style>
