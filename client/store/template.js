export const state = () => ({
  count: 0,
  list: []
})

export const mutations = {
  SET_LIST: (state, list) => {
    state.list = list
  },
  SET_COUNT: (state, count) => {
    state.count = count
  }
}

export const actions = {
  async getList({
    commit
  }, params) {
    const res = await this.$axios.get("/template/list", params)
      .then(res => res.data)
    commit("SET_LIST", res.data.rows)
    commit("SET_COUNT", res.data.count)
    return res
  },
  async createTemplate({}, {
    name,
    filepath,
    tag
  }) {
    return await this.$axios.post("/template/create", {
      name,
      filepath,
      tag
    })
  }
}