<template>
  <div class="pc-page">
    <nuxt />
  </div>
</template>

<script>
import EditorHeader from '@/components/pub/EditorHeader'
export default {
  name: "editor",
  middleware: 'userinfo',
  components: {
    EditorHeader
  }
}
</script>

<style>
  html {
    font-family: Mircosoft YaHei, PingFang, Helvetica;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
    margin: 0;
  }

  a {
    text-decoration: none;
  }
</style>

<style lang="scss" scoped>
  .pc-page {
    background-color: #eff1f4;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    @media screen and (max-width: 1220px) {
      width: 960px !important;
      min-width: 960px !important;
    }
    @media screen and (min-width: 1460px){
      width: 1440px !important;
    }
  }
</style>
