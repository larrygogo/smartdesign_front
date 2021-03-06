<template>
  <div class="auto-cover" @click="handleClick">
    <img class="cover-bg" :src="host + cover" alt="" srcset="" />
    <img class="cover-image" :src="host + cover" alt="" srcset="" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    cover: String,
    index: Number,
  },
  computed: mapState({
    templates: (state) => state.layerTag.templates,
  }),
  data() {
    return {
      host:
        process.env.NODE_ENV === "development"
          ? process.env.DEV_HOST
          : process.env.PRO_HOST,
    };
  },
  methods: {
    handleClick() {
      this.$router.push("/editor?index=" + this.index);
    },
  },
};
</script>

<style lang="scss">
.auto-cover {
  position: relative;
  width: 100%;
  min-height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 3px;

  .cover-image {
    width: 86%;
    z-index: 1;
  }

  .cover-bg {
    position: absolute;
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
    -webkit-filter: blur(9px) grayscale(15%) brightness(93%); /* Chrome, Safari, Opera */
    filter: blur(9px) grayscale(15%) brightness(93%);
  }
}
</style>
