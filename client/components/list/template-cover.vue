<template>
  <div class="template-item" shadow="hover">
    <img class="template-cover" :src="cover" alt />
    <div class="template-info">
      <p class="name">{{ name }}</p>
      <el-dropdown class="more" trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-more el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit">编辑</el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        name: String,
        cover: String
    }
};
</script>

<style lang="scss" scoped>
.template-item {
  border-radius: 20px;
  margin-bottom: 20px;

  .template-cover {
    width: 100%;
    border-radius: 5px;
  }
  .template-info {
    display: flex;
    justify-content: space-between;
    height: 30px;
    padding: 0 5px;

    .name {
      font-size: 18px;
      line-height: 30px;
      color: #333;
    }

    .more {
      height: 30px;
      padding: 7px 0;
      cursor: pointer;
    }
  }
}
</style>