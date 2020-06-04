export const state = () => ({
  token: null,
  email: "",
  userId: "",
  isAdmin: false,
  verify: false
})

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userId = userInfo.userId
    state.email = userInfo.email
    state.isAdmin = userInfo.admin || false
    state.verify = userInfo.verify || false
  }
}

export const actions = {
  async login({ commit }, params) {
    const res = await this.$axios.post("/user/token", params)
      .then(res => res.data)
    commit("SET_TOKEN", res.data.token)
    this.$cookies.set("token", res.data.token, {
      path: "/",
      maxAge: 2 * 60 * 60
    })
    return res
  },
  async getUserInfo({ commit }) {
    const res = await this.$axios.get("/user/info").then(res => res.data)
    commit("SET_USERINFO", res.data)
    return res
  },
  async sendMail() {
    const res = await this.$axios.post("/user/verify/mail")
    console.log(res.data)
  }
}
