export const state = () => ({
  page: 0,
  pageSize: 10,
  count: 0,
  list: []
})

export const mutations = {
  SET_PAGE: (state, page) => {
    state.page = page
  },
  SET_PAGE_SIZE: (state, pageSize) => {
    state.pageSize = pageSize
  },
  SET_LIST: (state, list) => {
    state.list = list
  },
  SET_COUNT: (state, count) => {
    state.count = count
  }
}

export const actions = {
  async getList({
    state, commit
  }) {
    const res = await this.$axios.get(`/template/list?page=${state.page}&pageSize=${state.pageSize}`,)
    if(res.status === 200 && res.data.code === "0") {
      commit("SET_COUNT", res.data.data.count)
      return res.data.data.rows
    } else {
      return []
    }
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
  },
  async delete({}, {id, bothResource}) {
    return await this.$axios.post("/template/delete", {id, bothResource})
  }
}