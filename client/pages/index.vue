<template>
  <div class="page">
    <div class="header">
    </div>
    <section class="template">
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in templates"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <template-cover :name="item.name" :cover="item.cover" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import TemplateCover from "../components/list/template-cover";
export default {
  middleware: "auth",
  components: {
    TemplateCover
  },
  data() {
    return {
      type: "latest",
      templates: [
        {
          name: "test",
          cover: "/images/test.png"
        },
        {
          name: "test2",
          cover: "/images/test2.png"
        },
        {
          name: "test3",
          cover: "/images/test3.png"
        },
        {
          name: "test3",
          cover: "/images/test3.png"
        },
        {
          name: "test3",
          cover: "/images/test3.png"
        },
        {
          name: "test3",
          cover: "/images/test3.png"
        },
        {
          name: "test3",
          cover: "/images/test3.png"
        },
        {
          name: "test3",
          cover: "/images/test3.png"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.page {
 
}
</style>
