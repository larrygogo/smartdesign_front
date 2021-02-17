
module.exports = {
  srcDir: "client/",
  env: {
    NODE_ENV: process.env.NODE_ENV,
    ENV_API: process.env.ENV_API
  },
  head: {
    title: "图必ToolBee",
    meta: [
      { lang: "zh-cn" },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "Meta description" }],
    link: [{ href: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap", ref: "stylesheet" }]
  },
  css: [],
  dev: process.env.NODE_ENV !== "production",
  server: {
    host: "127.0.0.1",
    port: "3301",
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
    "~/plugins/awe-dnd",
    "~/plugins/axios",
    "~/plugins/event",
    { src: "@/plugins/charts", ssr: false },
    { src: "@/plugins/antdv", ssr: false },
    "~/plugins/element-ui",
  ],
  axios: {
    baseURL: process.env.ENV_API,
    credentials: true, // 跨域携带证书
    timeout: 6000
  },
  moment: {
    locales: ["zh-cn"],
    timezone: true
  },
  build: {
    babel: {
      plugins: [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator"
      ]
    },
    // postcss: {
    //   plugins: {
    //     "postcss-px2rem": {
    //       remUnit: 16
    //     }
    //   }
    // }
  }
}
