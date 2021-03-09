<template>
  <div class="page container">
    <div class="header">
      <h2 class="title">我的作品</h2>
      <a-input-search
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
    </div>
    <TempList
      :templates="templates"
      :page="page"
      :pageSize="pageSize"
      :count="count"
      :show-status-tag="true"
      @changePage="getList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TempList from "@/components/pub/template/TempList";
export default {
  middleware: "auth",
  components: {
    TempList,
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapState({
      count: (state) => state.work.count,
      templates: (state) => state.work.list,
    }),
  },
  data() {
    return {
      page: 1,
      pageSize: 12,
    };
  },
  methods: {
    getList(page, pageSize) {
      if (!page) {
        page = this.page;
      }
      if (!pageSize) {
        pageSize = this.pageSize;
      }
      this.loading = true;
      this.$store
        .dispatch("work/getWorkList", { page, pageSize })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .title {
      font-size: 20px;
    }
    /deep/.ant-input-suffix {
      top: 40%;
    }
  }
}
</style>
