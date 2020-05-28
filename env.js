module.exports = {
  development: {
    NODE_ENV: "development",
    ENV_API: "https://canada.larryzheng.cn",
    // ENV_API: "https://api.foodsamplingcanada.cn",
    // ENV_API: "http://127.0.0.1:3000",
    ROUTER_BASE: "/"
  },
  production: {
    NODE_ENV: "production",
    ENV_API: "https://canada.larryzheng.cn",
    // ENV_API: "https://api.foodsamplingcanada.cn",
    ROUTER_BASE: "/"
  },
  mock: {
    NODE_ENV: "mock",
    ENV_API: "https://api.foodsamplingcanada.cn",
    ROUTER_BASE: "/"
  }
}
