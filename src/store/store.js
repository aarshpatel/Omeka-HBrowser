import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
    state: {
        all_items: [],
        resource_type: {
            5: "course",
            6: "prof",
            2: "leaf",
            3: "leaf",
            9: "leaf",
            7: "leaf"
        },
        search_query: ""
    },
    actions: {
        loadAllItems({ commit }) {
            const all_items_rest_url = "http://resourcescopy.5colldh.org/api/items"
            this._vm.$http.get(all_items_rest_url).then(response => {
                commit("SET_ITEMS", response.data)
            }).catch(error => {
                console.log('Error: ', error);
            });
        }
    },
    mutations: {
        SET_ITEMS(state, data) {
            state.all_items = data;
        },
        SET_QUERY(state, data) {
            state.search_query = data;
        }
    }
});
