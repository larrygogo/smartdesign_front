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
  async login({
    commit
  }, params) {
    const res = await this.$axios.post("/user/token", params)
    commit("SET_TOKEN", res.data.data.token)
    this.$cookies.set("token", res.data.data.token, {
      path: "/",
      maxAge: 2 * 60 * 60
    })
    this.$router.push("/")
    return res
  },
  async register({}, params) {
    return await this.$axios.post("/user/register", params).then(res => {
      if(res.status === 200 && res.data.code === "0") {
        this.$alert('恭喜你已注册成功，请登录后验证邮箱', '注册成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.replace("/login")
          }
        });
      }
    })
  },
  async logout({
    commit,
    state
  }) {
    commit("SET_TOKEN", null)
    commit("SET_USERINFO", {
      email: "",
      userId: "",
      isAdmin: false,
      verify: false
    })
  },
  async getUserInfo({
    commit
  }) {
    const res = await this.$axios.get("/user/info")
    commit("SET_USERINFO", res.data.data)
    return res
  },
  async sendMail() {
    const res = await this.$axios.post("/user/verify/mail")
  },
  async verify({}, code) {
    return await this.$axios({
      method: "post",
      url: "/user/verify",
      headers: {
        Authorization: "Bearer " + code
      }
    }).then(res => {
      if(res.status === 200 && res.data.code === "0") {
        this.$massage.success("验证成功")
        this.$router.replace("/login")
      }
    }).catch(e => {
      this.$massage.error("验证失败")
    })
  },
}