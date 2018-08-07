<template>
    <div>
        <b-input-group>
            <h2 id="headline"> Omeka Hierarchical Browser </h2>
            <b-form-input type="text" placeholder="Enter Search Query" v-model.trim="search_query"></b-form-input>
        </b-input-group>

        <div id="search-results" v-if="search_query">
            <b-list-group>
                <b-list-group-item v-for="result in filteredSearchResults">
                    {{ result["dcterms:title"][0]["@value"] }}
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>


<script>
export default {
    name: "Search",
    data: () => ({
        search_query: "",
        search_ok: false,
        search_results: []
    }),
    mounted() {
        this.getAllItems()
    },
    methods: {
        getAllItems () {

            const all_items_rest_url = "http://resourcescopy.5colldh.org/api/items"

            this.$http.get(all_items_rest_url).then(response => {

                this.search_results = response.data;
                console.log(this.search_results);

            }).catch(error => {
                console.log(error);
            });
        }
    },
    computed: {
        filteredSearchResults () {
            // filters for search results based on the query. Also we want to filter for only courses/professors/course leaf items

            const resource_templates = {
                5: "Class",
                6: "Professor",
                2: "Class Material/Assignment",
                3: "Syllabus",
                9: "Final Report",
                7: "Course Media"
            }

            return this.search_results.filter(result => {
                if("dcterms:title" in result && result["dcterms:title"][0]["@value"].toLowerCase().includes(this.search_query)) {
                    return true;
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

</style>
