export const state = () => ({
  count: 0,
  pageSize: 10,
  userList: []
})

export const mutations = {
  SET_PAGE: (state, page) => {
    state.page = page
  },
  SET_COUNT: (state, count) => {
    state.count = count
  },
  SET_USER_LIST: (state, userList) => {
    state.userList = userList
  }
}

export const actions = {
  async getUserList({ state, commit }, { page }) {
    const res = await this.$axios.get(`/user/list?page=${page}&pageSize=${state.pageSize}`)
      .then(res => res.data)
    commit("SET_USER_LIST", res.data.rows)
    commit("SET_COUNT", res.data.count)
    return res.data.rows
  }
}
