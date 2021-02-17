<template>
  <a-tooltip
    placement="top"
    class="tool-icon"
    :class="{ active }"
  >
    <template slot="title">
      <span>{{ text }}</span>
    </template>
    <MyIcon :type="'icon-' + type" @click="handleClick"/>
  </a-tooltip>
</template>

<script>
import MyIcon from '../../pub/MyIcon'
export default {
  name: 'Toolicon',
  props: {
    type: String,
    text: String,
    active: Boolean
  },
  components: {
    MyIcon
  },
  methods: {
    handleClick() {
      this.$emit("action")
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-icon {
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
  outline: none;

  &:hover,
  &.active {
    background-color: #5a5a5a;
  }
}
</style>