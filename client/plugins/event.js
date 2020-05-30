import Vue from 'vue'
var event = {
    install(Vue){
        Vue.prototype.$Event = new Vue()
    }
}
Vue.use(event);