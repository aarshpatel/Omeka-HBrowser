<template>
    <div>
            <b-row>
                <b-col cols="5">
                    <a href="/">
                        <h2 id="headline"> Omeka Hierarchical Browser </h2>
                    </a>
                </b-col>
                <b-col cols="7">
                    <b-input-group>
                        <b-form-input id="search-box" type="text" placeholder="Enter Search Query" v-model="search_query"></b-form-input>
                        <b-button variant="primary" id="search-button">Search</b-button>
                    </b-input-group>
                </b-col>
            </b-row>

        <b-row id="content">
            <b-col id="sidebar" cols="5">
                <Sidebar></Sidebar>
            </b-col>

            <b-col cols="7">

                <div id="hbrowser-view" v-if="$route.name == 'hbrowser'">
                    <HBrowser></HBrowser>
                </div>

                <div id="search-results" v-if="$route.name == 'search' && search_query">
                    <b-list-group>
                        <b-list-group-item v-for="result in filteredSearchResults">
                            <router-link :to="{name: 'hbrowser', query: { [resource_type[result['o:resource_template']['o:id']]] : String(result['o:id']) }}">
                                <icon name="user" scale=".9" v-if="resource_type[result['o:resource_template']['o:id']] == 'prof'"></icon>
                                <icon name="file" scale=".9" v-if="resource_type[result['o:resource_template']['o:id']] == 'leaf'"></icon>
                                <icon name="chalkboard" scale=".9" v-if="resource_type[result['o:resource_template']['o:id']] == 'course'"></icon>
                                {{ result["dcterms:title"][0]["@value"] }}
                            </router-link>
                        </b-list-group-item>
                    </b-list-group>
                </div>

            </b-col>

        </b-row>
    </div>
</template>


<script>
import {mapGetters, mapState} from 'vuex'
import Icon from 'vue-awesome/components/Icon'
import Sidebar from './Sidebar.vue'
import HBrowser from './HBrowser.vue'

export default {
    name: "Search",
    data: () => ({
        resource_templates: {
            5: "Course",
            6: "Professor",
            2: "Class Material/Assignment",
            3: "Syllabus",
            9: "Final Report",
            7: "Course Media"
        }
    }),
    components: {
        Icon, Sidebar, HBrowser
    },
    mounted() {
        this.$store.dispatch('loadAllItems') // call the loadAllItems action in the Vuex Store
    },
    methods: {
        sortByTitle(items) {
            return items.sort(function(a, b) {
                var nameA = a["dcterms:title"][0]["@value"].toLowerCase();
                var nameB = b["dcterms:title"][0]["@value"].toLowerCase();
                if(nameA < nameB) return -1;
                if(nameA > nameB) return 1;
                return 0
            });
        }
    },
    computed: {
        ...mapState([
            'all_items',
            'resource_type',
        ]),
        filteredSearchResults () {
            // filters for search results based on the query. Also we want to filter for only courses/professors/course leaf items
            var results =  this.all_items.filter(result => {
                var resource_template_keys = Object.keys(this.resource_templates).map(Number);
                if(result["o:resource_template"] !== null) {
                    var resource_class = result["o:resource_template"]["o:id"];
                    if (resource_template_keys.includes(resource_class)) {
                        if("dcterms:title" in result && result["dcterms:title"][0]["@value"].toLowerCase().includes(this.search_query.toLowerCase())) {
                            return true;
                        }
                    }
                }
                else return false;
            });
            return this.sortByTitle(results);
        },
        search_query: {
            get () {
                return this.$store.state.search_query
            },
            set (value) {
                this.$store.commit('SET_QUERY', value)
            }
        }
    }
}

</script>

<style scoped>
#headline, #sidebar {
    margin-right: 20px;
}

#headline {
    color: black;
}

#sidebar {
    text-align: left;
    margin-right: 0px;
    padding: 0px;
}

#content {
    margin-top: 20px;
}

#submit-query {
    height: 38px;
    margin-left: 10px;
}
li {
    list-style-type: none;
}

#search-results {
    margin-top: 20px;
    text-align: left;
}


#search-box {
    border-radius: 5px;
}

svg {
    margin-right: 10px;
}

#search-button {
    margin-left: 10px;
}

</style>
