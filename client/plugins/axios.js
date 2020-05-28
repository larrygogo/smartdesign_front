import { getError } from "../utils/error"
import { Message } from "element-ui"

export default function({ $axios, store, redirect }) {
  $axios.onRequest(config => {
    const token = store.state.manager.token
    config.headers.Authorization = "Bearer " + token
    console.log("Making request to " + config.url)
  })

  $axios.onError(error => {
    const err = getError(error)
    if (err.status === 401 || err.status === 403) {
      redirect("/login")
    }
    Message.error(err.message)
  })
}
