import {Message} from 'element-ui'
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
    await this.$axios.post("/user/token", params).then(res => {
      if(res.status === 200 &&  res.data.code === "0") {
        commit("SET_TOKEN", res.data.data.token)
        this.$cookies.set("token", res.data.data.token, {
          path: "/",
          maxAge: 2 * 60 * 60
        })
        this.$router.push("/")
      }
    })
  },
  async register({}, params) {
    await this.$axios.post("/user/register", params).then(res => {
      if(res.status === 200 && res.data.code === "0") {
        Message({
          showClose: true,
          message: "恭喜你已注册成功，请登录后验证邮箱",
          type: 'success'
        })
        this.$router.replace("/login")
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
  async verify({state}, code) {
    return await this.$axios({
      method: "post",
      url: "/user/verify",
      headers: {
        Authorization: "Bearer " + code
      }
    }).then(res => {
      console.log(res.status === 200 && res.data.code === "0")
      if(res.status === 200 && res.data.code === "0") {
        Message.success("验证成功")
        this.$router.replace("/login")
      }
    }).catch(e => {
      console.log(e)
      Message.error("验证失败")
    })
  },
}