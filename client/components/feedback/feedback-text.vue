<template>
  <div
    class="feedback feedback-text">
    <el-form ref="form">
      <h5>问答框</h5>
      <el-form-item label="问题">
        <el-input
          v-model="ques"
          placeholder="请输入问题"
          :disabled="disabled || !edit" />
      </el-form-item>
      <div class="action">
        <div />
        <div>
          <el-button
            v-if="!edit"
            size="mini"
            @click="handleEdit">
            编辑
          </el-button>
          <div v-else>
            <el-popconfirm
              v-if="edit"
              title="确定删除该组件吗？"
              @onConfirm="handleRemove">
              <el-button
                slot="reference"
                type="danger"
                size="mini">
                删除
              </el-button>
            </el-popconfirm>
            <el-button
              type="primary"
              size="mini"
              @click="handleSave">
              保存
            </el-button>
          </div>

        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    question: String,
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      edit: false,
      ques: ""
    }
  },
  mounted() {
    this.ques = this.question
  },
  methods: {
    handleRemove() {
      this.$emit("remove", this.id)
    },
    handleEdit() {
      this.edit = true
    },
    handleSave() {
      if (this.ques === "") {
        this.$alert("问题不能为空")
      } else {
        this.edit = false
        this.$emit("save", "text", this.id, this.ques)
      }
    }
  }
}
</script>

<style lang="scss">
.feedback {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;

  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
}

.action {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.delete-ans {
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    color: crimson;
  }
}
</style>
