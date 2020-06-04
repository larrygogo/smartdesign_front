import {MessageBox} from 'element-ui'
export default async({ store, redirect, app }) => {
  try {
    const verify = store.state.user.verify
    if (!verify) {
        redirect("/verify/mail")
    }
  } catch (e) {
    redirect("/verify/mail")
  }
}
