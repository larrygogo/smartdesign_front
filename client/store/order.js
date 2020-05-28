export const state = () => ({
  count: 0,
  pageSize: 10,
  orderList: []
})

export const mutations = {
  SET_PAGE: (state, page) => {
    state.page = page
  },
  SET_COUNT: (state, count) => {
    state.count = count
  },
  SET_ORDER_LIST: (state, orderList) => {
    state.orderList = orderList
  }
}

export const actions = {
  async getOrderList({ state, commit }, { page, status }) {
    const url = status ? `/order/list?page=${page}&pageSize=${state.pageSize}&status=${status}`
      : `/order/list?page=${page}&pageSize=${state.pageSize}`
    const res = await this.$axios.get(url)
      .then(res => res.data)
    commit("SET_ORDER_LIST", res.data.rows)
    commit("SET_COUNT", res.data.count)
    return res.data.rows
  },
  async auditOrder({ state, commit }, { orderId, express, status }) {
    return await this.$axios.post("/order/audit", { orderId, express, status })
      .then(res => res.data)
  },
  async setOrderExpress({ state, commit }, { orderId, express }) {
    return await this.$axios.post("/order/express", { orderId, express })
      .then(res => res.data)
  }
}
