<template>
    <div>
        <b-input-group>
            <h2 id="headline"> Omeka Hierarchical Browser </h2>
            <b-form-input id="search-box" type="text" placeholder="Enter Search Query" v-model.trim="search_query"></b-form-input>
        </b-input-group>

        <div id="search-results" v-if="search_query">
            <b-list-group>
                <b-list-group-item v-for="result in filteredSearchResults">
                    <router-link :to="{name: 'hbrowser', params: {type: resource_type[result['o:resource_template']['o:id']], id: result['o:id']}}">
                        {{ result["dcterms:title"][0]["@value"] }}
                    </router-link>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>


<script>
import {mapGetters, mapState} from 'vuex' 

export default {
    name: "Search",
    data: () => ({
        search_query: "",
        resource_templates: {
            5: "Course",
            6: "Professor",
            2: "Class Material/Assignment",
            3: "Syllabus",
            9: "Final Report",
            7: "Course Media"
        },
        resource_type: {
            5: "course",
            6: "professor",
            2: "course_leaf",
            3: "course_leaf",
            9: "course_leaf",
            7: "course_leaf"
        }
    }),

    mounted() {
        this.$store.dispatch('loadAllItems') // call the loadAllItems action in the Vuex Store
    },
    methods: {
    },
    computed: {
        ...mapState([
            'all_items'
        ]),
        filteredSearchResults () {
            // filters for search results based on the query. Also we want to filter for only courses/professors/course leaf items
            return this.all_items.filter(result => {
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
        }
    }
}

</script>

<style scoped>
#headline {
    margin-right: 20px;
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
</style>
