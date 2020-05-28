export const state = () => ({
  token: null,
  userId: null,
  nickname: ""
})

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userId = userInfo.userId
    state.nickname = userInfo.nickname
  }
}

export const actions = {
  async login({ commit }, params) {
    const res = await this.$axios.post("/manager/token", params)
      .then(res => res.data)
    commit("SET_TOKEN", res.data.token)
    this.$cookies.set("token", res.data.token, {
      path: "/",
      maxAge: 2 * 60 * 60
    })
    return res
  },
  async getUserInfo({ commit }) {
    const res = await this.$axios.get("/manager/info").then(res => res.data)
    commit("SET_USERINFO", res.data)
    return res
  },
  async logout({ commit, state }) {
    commit("SET_USERINFO", {
      // 用户指纹
      token: null,
      // 用户ID
      userId: null,
      // 昵称
      nickname: ""
    })
  }
}
