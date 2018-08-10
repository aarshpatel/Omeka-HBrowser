import Vue from 'vue'
import Search from '../components/Search.vue'
import HBrowser from '../components/HBrowser.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            name: 'search',
            path: '/',
            component: Search
        },
        {
            name: 'hbrowser',
            path: '/hbrowser',
            component: Search,
        }
    ]
});

