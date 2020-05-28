export const state = () => ({
  count: 0,
  pageSize: 12,
  goodsList: []
})

export const mutations = {
  SET_PAGE: (state, page) => {
    state.page = page
  },
  SET_COUNT: (state, count) => {
    state.count = count
  },
  SET_GOODS_LIST: (state, goodsList) => {
    state.goodsList = goodsList
  }
}

export const actions = {
  async getGoodsList({ state, commit }, { page }) {
    const res = await this.$axios.get(`/goods/all?page=${page}&pageSize=${state.pageSize}`)
      .then(res => res.data)
    commit("SET_GOODS_LIST", res.data.rows)
    commit("SET_COUNT", res.data.count)
    return res.data.rows
  },
  async getGoodsInfo({ commit }, { id }) {
    const res = await this.$axios.get("/goods/info?id=" + id).then(res => res.data)
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
  },
  async create({ commit, state }, params) {
    return await this.$axios.post("/goods/create", params).then(res => res.data)
  },
  async update({ commit, state }, params) {
    return await this.$axios.post("/goods/update", params).then(res => res.data)
  },
  async delete({ commit, state }, params) {
    return await this.$axios.post("/goods/delete", params).then(res => res.data)
  }
}
