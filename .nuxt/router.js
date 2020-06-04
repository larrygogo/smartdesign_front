import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7922e1ae = () => interopDefault(import('../client/pages/editor.vue' /* webpackChunkName: "pages/editor" */))
const _60b0c75d = () => interopDefault(import('../client/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _8b7d8f42 = () => interopDefault(import('../client/pages/register.vue' /* webpackChunkName: "pages/register" */))
const _19294a10 = () => interopDefault(import('../client/pages/verify/index.vue' /* webpackChunkName: "pages/verify/index" */))
const _6ddd8baa = () => interopDefault(import('../client/pages/template/upload.vue' /* webpackChunkName: "pages/template/upload" */))
const _a438fafe = () => interopDefault(import('../client/pages/verify/mail.vue' /* webpackChunkName: "pages/verify/mail" */))
const _d1edb774 = () => interopDefault(import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/editor",
    component: _7922e1ae,
    name: "editor"
  }, {
    path: "/login",
    component: _60b0c75d,
    name: "login"
  }, {
    path: "/register",
    component: _8b7d8f42,
    name: "register"
  }, {
    path: "/verify",
    component: _19294a10,
    name: "verify"
  }, {
    path: "/template/upload",
    component: _6ddd8baa,
    name: "template-upload"
  }, {
    path: "/verify/mail",
    component: _a438fafe,
    name: "verify-mail"
  }, {
    path: "/",
    component: _d1edb774,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
