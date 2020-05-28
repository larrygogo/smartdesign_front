export const state = () => ({
})

export const mutations = {

}

export const actions = {
  async getBanner({ commit }) {
    const res = await this.$axios.get("/setting/get?keys=home_banner")
    if (res.status === 200 && res.data.code === "0") {
      commit("SET_BANNER", res.data.data.home_banner)
    } else {
      commit("SET_BANNER", "")
    }
    return res
  },
  async setBanner({ commit }, banner) {
    const res = await this.$axios.post("/setting/update", {
      key: "home_banner", value: banner
    })
    return res
  }
}

