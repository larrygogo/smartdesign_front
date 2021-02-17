<template>
  <div class="page container">
    <div class="header">
      <ul class="nav-bar">
        <!-- <li class="nav-item" :class="{active: activeNav === 1}" @click="selectNav(1)">全部</li> -->
        <!-- <li class="nav-item" :class="{active: activeNav === 2}" @click="selectNav(2)">热门</li> -->
        <!-- <li class="nav-item" :class="{active: activeNav === 3}" @click="selectNav(3)">最新</li> -->
      </ul>
      <ul class="nav-bar">
        <!-- <li class="nav-item btn" v-if="isAdmin" @click="openUploadDialog">
          上传模板
        </li> -->
      </ul>
    </div>
    <TempList
      :templates="templates"
      :page="page"
      :pageSize="pageSize"
      :count="count"
      @changePage="getList"
    />
    <TempUploadDialog :show="uploadDialog" @close="closeUploadDialog" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TempUploadDialog from '@/components/upload/TempUploadDialog'
import TempList from '@/components/pub/template/TempList'
export default {
  components: {
    TempList,
    TempUploadDialog
  },
  computed: {
    ...mapState({
      isAdmin: state => state.user.isAdmin,
      count: state => state.template.count,
      templates: state => state.template.list,
    }),
  },
  mounted() {
    this.getList()
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      loading: false,
      uploadDialog: false,
      activeNav: 1,
    };
  },
  methods: {
    selectNav(nav) {
      this.activeNav = nav  
    },
    openUploadDialog() {
      this.uploadDialog = true
    },
    closeUploadDialog() {
      this.uploadDialog = false
    },
    getList(page, pageSize) {
      if(!page) {
        page = this.page
      }
      if(!pageSize) {
        pageSize = this.pageSize
      }
      this.loading = true
      this.$store.dispatch("template/getList", { page, pageSize }).finally(() => {
        this.loading = false
      })
      
    },
  }
};
</script>

<style lang="scss" scoped>
.page {
  .header {
    display: flex;
    justify-content: space-between;

    .nav-bar {
      display: flex;
      list-style: none;
      padding: 0;
      margin-bottom: 20px;

      .nav-item {
        padding: 5px 30px;
        border-radius: 5px;
        cursor: pointer;
        color: #636363;
        transition: all 0.2s;

        &:not(:last-of-type) {
          margin-right: 20px;
        }

        &:hover {
          background-color: #c3c3c3;
          color: #333;
        }

        &.active {
          background-color: #606266;
          color: rgb(240, 226, 106);

          &:hover {
            background-color: #606266;
            color: rgb(240, 226, 106);
          }
        }

        &.btn {
          font-size: 12px;
          padding: 5px 20px;
          background-color: #606266;
          color: rgb(240, 226, 106);
        }
      }
    }
  }
}
</style>
