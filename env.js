module.exports = {
  development: {
    NODE_ENV: "development",
    ENV_API: "http://127.0.0.1:3300",
    ROUTER_BASE: "/"
  },
  production: {
    NODE_ENV: "production",
    ENV_API: "http://api.toolbee.cn",
    ROUTER_BASE: "/"
  }
}
