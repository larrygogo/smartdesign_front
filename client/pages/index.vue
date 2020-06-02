<template>
  <div class="page">
    <div class="header">
      <ul class="nav-bar">
        <li class="nav-item" :class="{active: activeNav === 1}" @click="selectNav(1)">全部</li>
        <li class="nav-item" :class="{active: activeNav === 2}" @click="selectNav(2)">热门</li>
        <li class="nav-item" :class="{active: activeNav === 3}" @click="selectNav(3)">最新</li>
      </ul>
      <ul class="nav-bar">
        <li class="nav-item btn" v-if="isAdmin" @click="$router.push('/template/upload')">上传模板</li>
      </ul>
    </div>
    <section class="template">
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in templates"
          :key="item._id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <template-cover :id="item._id" :name="item.name" :cover="host + item.cover" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import env from "../../env"
import { mapState } from 'vuex'
import TemplateCover from "../components/list/template-cover";
export default {
  middleware: "auth",
  components: {
    TemplateCover
  },
  computed: mapState({
    templates: state => state.template.list,
    isAdmin: state => state.user.isAdmin
  }),
  mounted() {
    this.$store.dispatch("template/getList")
  },
  data() {
    return {
      type: "latest",
      activeNav: 1,
      host: "http://localhost:3300"
    };
  },
  methods: {
    selectNav(nav) {
      this.activeNav = nav  
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
}
</style>
