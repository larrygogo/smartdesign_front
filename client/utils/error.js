function consoleError(error) {
  const err = Object.assign(
    {
      status: 0,
      url: "未知请求地址",
      message: "未知错误"
    },
    error
  )
  console.error(
    `------------------
url: ${err.url}
msg: ${err.message}
------------------`
  )
}

export function getError(error) {
  const url = error?.config?.url
  const status = error?.response?.status ?? 0
  const message = error?.response?.data?.msg ??
    (error.message === "Network Error" && "网络异常，请稍后再试") ??
    "服务器内部错误"
  const err = { url, status, message }
  consoleError(err)
  return err
}
