export const state = () => ({
  userCount: 1,
  goodsCount: 2,
  orderCount: 3,
  weekly: {
    columns: ["日期", "打开次数", "访问次数", "访问人数", "新用户数", "人均停留时长 (秒)", "次均停留时长 (秒)", "平均访问深度"],
    rows: [
      {}
    ]
  }
})

export const mutations = {
  SET_WEEKLY: (state, weekly) => {
    state.weekly = weekly
  },
  SET_DATA: (state, { userCount, goodsCount, orderCount }) => {
    state.userCount = userCount
    state.goodsCount = goodsCount
    state.orderCount = orderCount
  }
}

export const actions = {
  async getWeekly({ commit }) {
    const res = await this.$axios.get("/wx/weekly").then(res => res.data)
    const columns = res.data.map(item => {
      const columns = Object.entries(item).map(([key, value]) => {
        return key
      })
      return columns
    })
    const weekly = {
      columns: columns[0],
      rows: res.data
    }
    commit("SET_WEEKLY", weekly)
    return weekly
  },
  async getData({ commit }) {
    const res = await this.$axios.get("/wx/data").then(res => res.data)
    commit("SET_DATA", res.data)
    return res.data
  }
}
