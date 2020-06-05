import { getError } from "../utils/error"
import { Message } from "element-ui"

export default function({ $axios, store, redirect }) {
  $axios.onRequest(config => {
    const token = store.state.user.token
    if(!config.headers.Authorization) {
      config.headers.Authorization = "Bearer " + token
    }
    console.log("Making request to " + config.url)
  })

  $axios.onError(error => {
    const err = getError(error)
    if (error.config.url === "/user/verify") {
      Message.error("验证失败")
    } else if (err.status === 401 || err.status === 403) {
      redirect("/login")
      Message.error(err.message)
    } else {
      Message.error(err.message)
    }
    return error
  })
}
