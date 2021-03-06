import {MessageBox} from 'element-ui'
export default async({ store, redirect, app }) => {
  try {
    const token = app.$cookies.get("token")
    if (!token) {
      MessageBox('请重新登录', '登录超时', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.replace("/login")
        }
      });
      redirect("/login")
    }
  } catch (e) {
    MessageBox('请重新登录', '登录超时', {
      confirmButtonText: '确定',
      callback: action => {
        this.$router.replace("/login")
      }
    });
    redirect("/login")
  }
}
