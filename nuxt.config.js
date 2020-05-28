const env = require("./env")

module.exports = {
  srcDir: "client/",
  head: {
    title: "Manager System",
    meta: [
      { lang: "zh-cn" },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "Meta description" }]
  },
  // global css
  css: [],
  dev: process.env.NODE_ENV !== "production",
  server: {
    host: "127.0.0.1",
    port: "3001",
    timing: {
      total: true
    }
  },
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/moment",
    "cookie-universal-nuxt"
  ],
  plugins: [
    "~/plugins/axios",
    { src: "@/plugins/charts", ssr: false },
    "~/plugins/element-ui"
  ],
  axios: {
    baseURL: env[process.env.NODE_ENV].ENV_API,
    credentials: true, // 跨域携带证书
    timeout: 6000
  },
  moment: {
    locales: ["zh-cn"],
    timezone: true
  },
  build: {
    cssSourceMap: process.env.NODE_ENV !== "production",
    babel: {
      plugins: [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator"
      ]
    },
    postcss: {
      plugins: {
        "postcss-px2rem": {
          remUnit: 16
        }
      }
    }
  }
}
