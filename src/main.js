import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import store from './store/store'
import router from './router/router'
import VueTreeNavigation from 'vue-tree-navigation';
import 'vue-awesome/icons'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(VueTreeNavigation)

Vue.config.productiontip = false
Vue.config.devtools = true

new Vue({
    router,
    render: h => h(App),
    store
}).$mount('#app')
