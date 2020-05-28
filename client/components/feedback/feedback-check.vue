<template>
  <div
    class="feedback feedback-check">
    <el-form
      ref="form">
      <h5>多选框</h5>
      <el-form-item label="问题">
        <el-input
          v-model="ques"
          placeholder="请输入问题"
          :disabled="disabled || !edit" />
      </el-form-item>
      <el-form-item
        v-for="(item, index) in opts"
        :key="index"
        :label="'选项' + (index + 1)">
        <el-input
          v-model="opts[index]"
          :disabled="disabled || !edit">
          <template slot="suffix">
            <div
              v-if="!disabled && edit"
              class="delete-opts"
              @click="handleRemoveoptswer(index)">
              <i class="el-icon-delete" />
            </div>
          </template>
        </el-input>
      </el-form-item>
      <div class="action">
        <div v-if="disabled || !edit" />
        <el-button
          v-if="!disabled && edit"
          size="mini"
          type="success"
          @click="handleAddoptswer">
          新增选项
        </el-button>
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
    options: Array,
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
      ques: "",
      opts: []
    }
  },
  mounted() {
    this.ques = this.question
    this.opts = this.options
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
      } else if (this.opts.length === 0) {
        this.$alert("至少需要一个选项")
      } else {
        const valid = this.opts.some(item => item === "")
        if (valid) {
          this.$alert("选项不能为空")
        } else {
          this.edit = false
          this.$emit("save", "check", this.id, this.ques, this.opts)
        }
      }
    },
    handleAddoptswer() {
      this.opts.push("")
    },
    handleRemoveoptswer(index) {
      this.opts = this.opts.filter((item, idx) => idx !== index)
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

.delete-opts {
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    color: crimson;
  }
}
</style>
