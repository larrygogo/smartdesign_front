<template>
  <div class="page">
    <div class="header">
      <h3 class="title">
        模板管理
      </h3>
      <section class="action">
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="$router.push('/template/upload')">
          新建模板
        </el-button>
        <!-- <el-radio-group
          v-model="type"
          class="type-button">
          <el-radio-button label="latest">
            <i class="el-icon-time" /> 最新
          </el-radio-button>
          <el-radio-button label="hottest">
            <i class="el-icon-star-off" /> 最火
          </el-radio-button>
          <el-radio-button label="name">
            <i class="el-icon-s-data" /> 名称
          </el-radio-button>
        </el-radio-group> -->
      </section>
    </div>

    <section class="template">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="template-type">
            <h3>分类</h3>
          </el-card>
        </el-col>
        <el-col :span="18">
          <div class="template-row">
            <el-row :gutter="20">
              <el-col
                v-for="(item, index) in templates"
                :key="index"
                :span="12"
                :sm="12"
                :md="8">
                <el-card
                  class="template-item"
                  shadow="hover">
                  <img
                    class="template-cover"
                    :src="item.cover"
                    alt="">
                  <div class="template-info">
                    <p class="name">
                      {{ item.name }}
                    </p>
                    <el-dropdown
                      class="more"
                      trigger="click">
                      <span class="el-dropdown-link">
                        <i class="el-icon-more el-icon--right" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-edit">
                          编辑
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete">
                          删除
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  // middleware: "auth",
  // layout: "auth",
  data() {
    return {
      type: "latest",
      templates: [{
        name: "test",
        cover: "/images/test.png"
      }, {
        name: "test2",
        cover: "/images/test2.png"
      }, {
        name: "test3",
        cover: "/images/test3.png"
      }]
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
    margin-bottom: 20px;

    .title {
      font-size: 20px;
      font-weight: normal;
    }
  }
  .action {
    .type-button {
      margin-left: 20px;
    }
  }
  .template-type {
    border-radius: 20px;
  }
  .template-row {
    padding: 20px;
    background-color: #DCDFE6;
    border-radius: 20px;

    .template-item {
      border-radius: 20px;
      margin-bottom: 20px;

      .template-cover {
        width: 100%;
        border-radius: 20px;
      }
      .template-info {
        display: flex;
        justify-content: space-between;
        height: 30px;

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
  }
}
</style>
