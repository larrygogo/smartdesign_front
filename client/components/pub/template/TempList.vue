<template>
  <div class="template-row">
    <section class="template">
      <div class="template-list">
        <TempCover
          v-for="item in templates"
          :key="item._id"
          :id="item._id"
          :name="item.name"
          :cover="item.cover"
          :username="item.author.username"
          :release="item.release"
          :verify="item.verify"
          :showStatusTag="showStatusTag"
        />
      </div>
    </section>
    <el-pagination
      class="pagination"
      background
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="count"
      @prev-click="changePage"
      @next-click="changePage"
      @current-change="changePage"
    />
  </div>
</template>

<script>
import TempCover from "./TempCover"
export default {
  props: {
    templates: {
      type: Array,
      default: () => {
        return []
      }
    },
    page: {
      type: Number | String,
      default: () => {
        return 1
      }
    },
    pageSize: {
      type: Number | String,
      default: () => {
        return 10
      }
    },
    count: {
      type: Number | String,
      default: () => {
        return 0
      }
    },
    showStatusTag: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  components: {
    TempCover
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.template {
  .template-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 0.8fr));
    grid-gap: 20px;
  }
  .load {
    text-align: center;
    margin: 20px 0;
    height: 100px;

    .load-more {
    }

    .no-more {
      font-size: 12px;
      color: #777;
    }
  }
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>