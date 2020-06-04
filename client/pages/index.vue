<template>
  <div class="page">
    <div class="header">
      <ul class="nav-bar">
        <li class="nav-item" :class="{active: activeNav === 1}" @click="selectNav(1)">全部</li>
        <!-- <li class="nav-item" :class="{active: activeNav === 2}" @click="selectNav(2)">热门</li> -->
        <!-- <li class="nav-item" :class="{active: activeNav === 3}" @click="selectNav(3)">最新</li> -->
      </ul>
      <ul class="nav-bar">
        <li class="nav-item btn" v-if="isAdmin" @click="openUploadDialog">上传模板</li>
      </ul>
    </div>
    <section class="template">
      <div class="template-list">
        <template-cover 
          v-for="item in templates" 
          :key="item._id" 
          :id="item._id" 
          :name="item.name" 
          :cover="item.cover"
          :username="item.author.username" />
      </div>
      <div class="load">
        <el-button v-if="count !== templates.length" class="load-more" size="small" @click="getMore">加载更多</el-button>
        <p class="no-more" v-else>没有更多了 (#^.^#)</p>
      </div>
    </section>
    <upload-dialog :show="uploadDialog" @close="closeUploadDialog"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UploadDialog from '@/components/upload/upload-template'
import TemplateCover from "../components/list/template-cover";
export default {
  middleware: "verify",
  components: {
    TemplateCover,
    UploadDialog
  },
  computed: {
    ...mapState({
      isAdmin: state => state.user.isAdmin,
      count: state => state.template.count,
    }),
    templates: {
      get() {
        return this.$store.state.template.list
      },
      set(value) {
        this.$store.commit("template/SET_LIST", value)
      }
    },
    page: {
      get() {
        return this.$store.state.template.page
      },
      set(value) {
        this.$store.commit("template/SET_PAGE", value)
      }
    },
    pageSize: {
      get() {
        return this.$store.state.template.pageSize
      },
      set(value) {
        this.$store.commit("template/SET_PAGE_SIZE", value)
      }
    }
  },
  mounted() {
    this.initList()
  },
  data() {
    return {
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
    async initList() {
      this.templates = []
      this.page = 1
      const list = await this.$store.dispatch("template/getList")
      if(list.length < 1) {
        this.$message.error("加载失败")
      } else {
        this.templates = list
      }
    },
    async getMore() {
      this.page += 1
      const list = await this.$store.dispatch("template/getList")
      if(list.length < 1) {
        this.$message.error("加载失败")
      } else {
        this.templates = [...this.templates, ...list]
      }
    }
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
        transition: all .2s;
        
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
  .template {
    .template-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, .8fr));
      grid-gap: 20px;
    }
    .load {
      text-align: center;
      margin: 20px 0;
      
      .load-more {
      }

      .no-more {
        font-size: 12px;
        color: #777;
      }
    }
    
  }
  
}
</style>
