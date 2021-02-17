export default async ({ store, redirect, app }) => {
  const token = app.$cookies.get("token");
  if (token) {
    store.commit("user/SET_TOKEN", token);
    await store.dispatch("user/getUserInfo");
  }
};
