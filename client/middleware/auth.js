export default async({ store, redirect, app }) => {
  try {
    const token = app.$cookies.get("token")
    if (token) {
      store.commit("user/SET_TOKEN", token)
    } else {
      redirect("/login")
    }
  } catch (e) {
    redirect("/login")
  }
}
